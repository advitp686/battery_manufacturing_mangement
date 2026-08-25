const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { query, getAll, getById, insert, update, remove, withTransaction, getTotalRecords, keysToCamel, TABLES } = require('./db');
const { ROLES, normalizeRole, writableTablesForRole } = require('./access');

const asyncRoute = handler => (req, res) => Promise.resolve(handler(req, res)).catch(error => {
    console.error('API error:', error);
    const status = error.statusCode || 500;
    res.status(status).json({ error: status >= 500 ? 'Internal server error' : error.message });
});
const badRequest = message => Object.assign(new Error(message), { statusCode: 400 });
const { money, finiteNumber, calculateSaleTax, resolveTaxMode, DEFAULT_TAX_RATES } = require('./tax');

async function getSystemSettings(client) {
    const rows = (await query('SELECT key, value FROM system_settings', [], client)).rows;
    const settings = {};
    for (const row of rows) {
        try { settings[row.key] = JSON.parse(row.value); } catch { settings[row.key] = row.value; }
    }
    return settings;
}

async function partyBalance(party, client) {
    const row = (await query('SELECT COALESCE(SUM(debit), 0) AS debit, COALESCE(SUM(credit), 0) AS credit FROM ledger WHERE party = $1', [party], client)).rows[0] || {};
    return money(Number(row.debit || 0) - Number(row.credit || 0));
}

function assertPaymentAmount(total, paid) {
    const amount = finiteNumber(paid ?? 0, 'Paid amount', { min: 0, max: total });
    return money(amount);
}

async function embeddedModels(client) {
    const models = await getAll('models', client);
    const bom = (await query('SELECT * FROM model_bom', [], client)).rows.map(keysToCamel);
    return models.map(model => ({ ...model, bom: bom.filter(item => item.modelCode === model.code) }));
}
async function embeddedInvoices(client) {
    const invoices = await getAll('invoices', client);
    const items = (await query('SELECT * FROM invoice_items', [], client)).rows.map(keysToCamel);
    return invoices.map(invoice => ({ ...invoice, items: items.filter(item => item.invoiceNo === invoice.invoice) }));
}
async function embeddedPurchaseBills(client) {
    const bills = await getAll('purchase_bills', client);
    const items = (await query('SELECT * FROM purchase_bill_items', [], client)).rows.map(keysToCamel);
    return bills.map(bill => ({ ...bill, items: items.filter(item => item.billId === bill.id) }));
}

router.get('/api/models', asyncRoute(async (req, res) => res.json(await embeddedModels())));
router.post('/api/models', asyncRoute(async (req, res) => {
    const { bom = [], ...model } = req.body || {};
    if (!model.code || !model.name) throw badRequest('Model code and name are required');
    await withTransaction(async client => {
        await insert('models', model, client);
        for (const item of bom) await insert('model_bom', { ...item, modelCode: model.code }, client);
    });
    res.status(201).json({ ...model, bom });
}));
router.put('/api/models/:code', asyncRoute(async (req, res) => {
    const { bom, ...model } = req.body || {};
    await withTransaction(async client => {
        await update('models', 'code', req.params.code, model, client);
        if (bom !== undefined) {
            await query('DELETE FROM model_bom WHERE model_code = $1', [req.params.code], client);
            for (const item of bom) await insert('model_bom', { ...item, modelCode: req.params.code }, client);
        }
    });
    res.json({ ...model, code: req.params.code, bom: bom || [] });
}));
router.delete('/api/models/:code', asyncRoute(async (req, res) => { await remove('models', 'code', req.params.code); res.status(204).end(); }));

router.get('/api/invoices', asyncRoute(async (req, res) => res.json(await embeddedInvoices())));
router.post('/api/invoices', asyncRoute(async (req, res) => {
    const { items = [], ...invoice } = req.body || {};
    if (!invoice.invoice) throw badRequest('Invoice number is required');
    const settings = await getSystemSettings();
    const totals = calculateSaleTax(items, invoice, settings);
    const paidAmount = assertPaymentAmount(totals.grandTotal, invoice.paidAmount);
    Object.assign(invoice, {
        taxMode: totals.taxMode,
        taxableValue: totals.taxableValue, totalGst: totals.totalGst,
        cgstAmount: totals.cgstAmount, sgstAmount: totals.sgstAmount,
        igstAmount: totals.igstAmount, cessAmount: totals.cessAmount,
        grandTotal: totals.grandTotal,
        paidAmount,
        balanceAmount: money(totals.grandTotal - paidAmount)
    });
    await withTransaction(async client => {
        await insert('invoices', invoice, client);
        for (const item of totals.items) await insert('invoice_items', { ...item, invoiceNo: invoice.invoice }, client);
    });
    res.status(201).json({ ...invoice, items: totals.items });
}));
router.put('/api/invoices/:invoice', asyncRoute(async (req, res) => {
    const { items, ...invoice } = req.body || {};
    const settings = await getSystemSettings();
    const totals = items === undefined ? null : calculateSaleTax(items, invoice, settings);
    if (totals) {
        const paidAmount = assertPaymentAmount(totals.grandTotal, invoice.paidAmount);
        Object.assign(invoice, {
            taxMode: totals.taxMode,
            taxableValue: totals.taxableValue, totalGst: totals.totalGst,
            cgstAmount: totals.cgstAmount, sgstAmount: totals.sgstAmount,
            igstAmount: totals.igstAmount, cessAmount: totals.cessAmount,
            grandTotal: totals.grandTotal,
            paidAmount,
            balanceAmount: money(totals.grandTotal - paidAmount)
        });
    }
    await withTransaction(async client => {
        await update('invoices', 'invoice', req.params.invoice, invoice, client);
        if (items !== undefined) {
            await query('DELETE FROM invoice_items WHERE invoice_no = $1', [req.params.invoice], client);
            for (const item of totals.items) await insert('invoice_items', { ...item, invoiceNo: req.params.invoice }, client);
        }
    });
    res.json({ ...invoice, invoice: req.params.invoice, items: totals ? totals.items : [] });
}));
router.delete('/api/invoices/:invoice', asyncRoute(async (req, res) => {
    res.status(405).json({ error: 'Invoices cannot be deleted. Use the cancellation workflow to reverse business state.' });
}));

router.delete('/api/purchase-bills/:id', asyncRoute(async (req, res) => {
    const result = await withTransaction(async client => {
        const bill = (await query('SELECT * FROM purchase_bills WHERE id = $1 FOR UPDATE', [req.params.id], client)).rows[0];
        if (!bill) throw operationError(`Purchase bill not found: ${req.params.id}`, 404);

        // Bill number is currently the foreign key stored on inventory, vehicles, and
        // supplier-ledger rows. Refuse ambiguous numbers so one delete cannot affect
        // records belonging to another bill.
        const billNumberCount = Number((await query('SELECT COUNT(*)::int AS count FROM purchase_bills WHERE bill_no = $1', [bill.bill_no], client)).rows[0].count);
        if (billNumberCount !== 1) throw operationError(`Purchase bill ${bill.bill_no} cannot be deleted because its bill number is duplicated.`, 409);

        const inventoryRows = (await query('SELECT * FROM inventory WHERE bill_no = $1 FOR UPDATE', [bill.bill_no], client)).rows;
        const usedInventoryRows = inventoryRows.filter(row => {
            const availability = parseInventoryAvailabilityForDelete(row.available);
            return !availability || availability.available < availability.total;
        });
        if (usedInventoryRows.length) {
            throw operationError(`Purchase bill ${bill.bill_no} cannot be deleted: ${usedInventoryRows.length} linked stock batch(es) were already used or have an unknown stock balance.`, 409);
        }

        const vehicleRows = (await query('SELECT * FROM vehicles WHERE purchase_bill_no = $1 FOR UPDATE', [bill.bill_no], client)).rows;
        if (vehicleRows.length) {
            const chassisNumbers = vehicleRows.map(row => row.chassis_no).filter(Boolean);
            const invoicedChassis = chassisNumbers.length
                ? (await query('SELECT chassis_no FROM vehicle_invoices WHERE chassis_no = ANY($1::text[])', [chassisNumbers], client)).rows.map(row => row.chassis_no)
                : [];
            const invoicedSet = new Set(invoicedChassis);
            const usedVehicles = vehicleRows.filter(row => row.status !== 'Available in Showroom' || invoicedSet.has(row.chassis_no));
            if (usedVehicles.length) {
                throw operationError(`Purchase bill ${bill.bill_no} cannot be deleted: ${usedVehicles.length} linked vehicle(s) were already sold, dispatched, or invoiced.`, 409);
            }
        }

        const ledgerRows = (await query(
            'SELECT * FROM supplier_ledger WHERE supplier = $1 AND ref IN ($2, $3) FOR UPDATE',
            [bill.supplier, bill.bill_no, `PAY-${bill.bill_no}`],
            client
        )).rows;
        const paymentRows = ledgerRows.filter(row => row.ref === `PAY-${bill.bill_no}` || (row.ref === bill.bill_no && Number(row.debit || 0) > 0));
        if (Number(bill.paid_amount || 0) > 0 || String(bill.payment_status || '').toLowerCase() === 'paid' || paymentRows.length) {
            throw operationError(`Purchase bill ${bill.bill_no} cannot be deleted because a supplier payment is recorded. Reverse or remove the payment first.`, 409);
        }
        const billLedgerRows = ledgerRows.filter(row => row.ref === bill.bill_no);
        if (billLedgerRows.length > 1) {
            throw operationError(`Purchase bill ${bill.bill_no} cannot be deleted because its supplier-ledger posting is duplicated.`, 409);
        }

        await query('DELETE FROM inventory WHERE bill_no = $1', [bill.bill_no], client);
        await query('DELETE FROM vehicles WHERE purchase_bill_no = $1', [bill.bill_no], client);
        await query('DELETE FROM supplier_ledger WHERE supplier = $1 AND ref = $2', [bill.supplier, bill.bill_no], client);
        await query('DELETE FROM purchase_bills WHERE id = $1', [bill.id], client);

        const currentVersion = Number((await query("SELECT value FROM app_meta WHERE key = 'state_version'", [], client)).rows[0]?.value || 0);
        const nextVersion = currentVersion + 1;
        await query("INSERT INTO app_meta(key,value) VALUES ('state_version',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value", [String(nextVersion)], client);
        return { billId: bill.id, billNo: bill.bill_no, version: nextVersion };
    });
    res.json({ success: true, ...result });
}));

// Purchase bills are posted as one transaction so a failed inventory, ledger,
// or duplicate check cannot leave a half-created purchase behind.
router.post('/api/purchase-bills', asyncRoute(async (req, res) => {
    const payload = req.body || {};
    const bill = { ...(payload.bill || {}) };
    const items = Array.isArray(payload.items) ? payload.items : [];
    const inventoryRows = Array.isArray(payload.inventory) ? payload.inventory : [];
    const ledgerRows = Array.isArray(payload.supplierLedger) ? payload.supplierLedger : [];
    const vehicleRows = Array.isArray(payload.vehicles) ? payload.vehicles : [];
    delete bill.items;
    if (!bill.id || !bill.billNo || !bill.supplier) throw badRequest('Bill id, bill number, and supplier are required');
    if (!items.length) throw badRequest('At least one purchase item is required');
    if (inventoryRows.length && inventoryRows.some(row => !row.batch)) throw badRequest('Every inventory row needs a batch number');
    if (vehicleRows.length && vehicleRows.some(row => !row.chassisNo)) throw badRequest('Every vehicle row needs a chassis number');

    const result = await withTransaction(async client => {
        const duplicate = (await query('SELECT id FROM purchase_bills WHERE id = $1 OR bill_no = $2 LIMIT 1', [bill.id, bill.billNo], client)).rows[0];
        if (duplicate) throw operationError(`Purchase bill ${bill.billNo} already exists. Use a unique bill number.`, 409);
        for (const row of inventoryRows) {
            const exists = (await query('SELECT batch FROM inventory WHERE batch = $1', [row.batch], client)).rows[0];
            if (exists) throw operationError(`Inventory batch ${row.batch} already exists. Use a unique bill number.`, 409);
        }
        for (const row of vehicleRows) {
            const exists = (await query('SELECT chassis_no FROM vehicles WHERE chassis_no = $1', [row.chassisNo], client)).rows[0];
            if (exists) throw operationError(`Vehicle chassis ${row.chassisNo} already exists.`, 409);
        }
        await insert('purchase_bills', bill, client);
        for (const item of items) await insert('purchase_bill_items', { ...item, billId: bill.id }, client);
        for (const row of inventoryRows) await insert('inventory', row, client);
        for (const row of ledgerRows) await insert('supplier_ledger', row, client);
        for (const row of vehicleRows) await insert('vehicles', row, client);

        const currentVersion = Number((await query("SELECT value FROM app_meta WHERE key = 'state_version'", [], client)).rows[0]?.value || 0);
        const nextVersion = currentVersion + 1;
        await query("INSERT INTO app_meta(key,value) VALUES ('state_version',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value", [String(nextVersion)], client);
        return { version: nextVersion };
    });
    res.status(201).json({ success: true, bill, version: result.version });
}));

const stateTableMap = {
    components: 'components', inventory: 'inventory', production: 'production', dealers: 'dealers',
    sales: 'sales', ledger: 'ledger', warranties: 'warranties', claims: 'claims', suppliers: 'suppliers',
    supplierLedger: 'supplier_ledger', purchaseBills: 'purchase_bills', vehicleModels: 'vehicle_models',
    vehicles: 'vehicles', vehicleInvoices: 'vehicle_invoices', bankAccounts: 'bank_accounts'
};
const allDataTables = ['invoice_items', 'model_bom', 'purchase_bill_items', ...Object.values(stateTableMap), 'invoices', 'models'];

const syncPrimaryKeys = {
    components: ['components', 'id', 'id'], inventory: ['inventory', 'batch', 'batch'], production: ['production', 'id', 'id'],
    dealers: ['dealers', 'id', 'id'], sales: ['sales', 'id', 'id'], ledger: ['ledger', 'id', 'id'], warranties: ['warranties', 'pack', 'pack'],
    claims: ['claims', 'claim', 'claim'], suppliers: ['suppliers', 'id', 'id'], supplierLedger: ['supplier_ledger', 'id', 'id'],
    purchaseBills: ['purchase_bills', 'id', 'id'], vehicles: ['vehicles', 'chassis_no', 'chassisNo'], vehicleInvoices: ['vehicle_invoices', 'invoice', 'invoice'],
    models: ['models', 'code', 'code'], invoices: ['invoices', 'invoice', 'invoice']
};

async function assertNoNonAdminSyncDeletes(state, client, writable) {
    for (const [stateKey, [table, column, incomingKey]] of Object.entries(syncPrimaryKeys)) {
        if (!writable.has(table) || state[stateKey] === undefined) continue;
        if (!Array.isArray(state[stateKey])) throw badRequest(`${stateKey} must be an array`);
        const incoming = new Set(state[stateKey].map(row => String(row[incomingKey] ?? '')).filter(Boolean));
        const existing = (await query(`SELECT "${column}" FROM "${table}"`, [], client)).rows;
        const removed = existing.map(row => String(row[column] ?? '')).filter(value => value && !incoming.has(value));
        if (removed.length) throw operationError(`This role cannot delete existing ${stateKey} record(s). Use an Administrator account for deletions.`, 403);
    }
}

async function replaceState(state, client, { full = true, writableTables } = {}) {
    const writable = full ? new Set(allDataTables) : new Set(writableTables || ['sales', 'ledger', 'warranties', 'claims', 'invoices', 'invoice_items']);
    if (!full) await assertNoNonAdminSyncDeletes(state, client, writable);
    for (const table of [...new Set(allDataTables)]) if (writable.has(table)) await query(`DELETE FROM "${table}"`, [], client);
    for (const [key, table] of Object.entries(stateTableMap)) {
        if (!writable.has(table)) continue;
        if (state[key] === undefined) continue;
        if (!Array.isArray(state[key])) throw badRequest(`${key} must be an array`);
        for (const row of state[key]) {
            if (table === 'purchase_bills') {
                const { items = [], ...bill } = row; await insert(table, bill, client);
                for (const item of items) await insert('purchase_bill_items', { ...item, billId: bill.id }, client);
            } else {
                const normalizedRow = table === 'production' && ['—', '–', '-', ''].includes(String(row.serial ?? '').trim())
                    ? { ...row, serial: null }
                    : row;
                await insert(table, normalizedRow, client);
            }
        }
    }
    if ((full || writable.has('models')) && state.models !== undefined) {
        if (!Array.isArray(state.models)) throw badRequest('models must be an array');
        for (const row of state.models) {
            const { bom = [], ...model } = row;
            if (!model.code) throw badRequest(`Model ${model.name || '(unnamed)'} is missing code`);
            await insert('models', model, client);
            for (const item of bom) await insert('model_bom', { ...item, modelCode: model.code }, client);
        }
    }
    if (writable.has('invoices') && state.invoices !== undefined) {
        if (!Array.isArray(state.invoices)) throw badRequest('invoices must be an array');
        for (const row of state.invoices) {
            const { items = [], ...invoice } = row; await insert('invoices', invoice, client);
            for (const item of items) await insert('invoice_items', { ...item, invoiceNo: invoice.invoice }, client);
        }
    }
    if (full && state.settings && typeof state.settings === 'object') {
        await query('DELETE FROM system_settings', [], client);
        for (const [key, value] of Object.entries(state.settings)) await insert('system_settings', { key, value: typeof value === 'object' ? JSON.stringify(value) : String(value) }, client);
    }
}

router.post('/api/migrate', asyncRoute(async (req, res) => {
    if (!req.body || typeof req.body !== 'object') throw badRequest('Invalid state object');
    await withTransaction(client => replaceState(req.body, client));
    res.json({ success: true, timestamp: new Date().toISOString() });
}));
router.post('/api/sync-state', asyncRoute(async (req, res) => {
    if (!req.body || typeof req.body !== 'object') throw badRequest('Invalid state object');
    const result = await withTransaction(async client => {
        const current = Number((await query("SELECT value FROM app_meta WHERE key = 'state_version'", [], client)).rows[0]?.value || 0);
        const expected = req.body._syncVersion;
        if ((expected === undefined && current > 0) || (expected !== undefined && Number(expected) !== current)) {
            const error = new Error('State has changed on the server; reload before saving again'); error.statusCode = 409; error.currentVersion = current; throw error;
        }
        const role = normalizeRole(req.session.user?.role);
        await replaceState(req.body, client, { full: role === ROLES.ADMIN, writableTables: writableTablesForRole(role) });
        const next = current + 1;
        await query("INSERT INTO app_meta(key,value) VALUES ('state_version',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value", [String(next)], client);
        return next;
    });
    res.json({ success: true, version: result, timestamp: new Date().toISOString() });
}));
router.post('/api/reset', asyncRoute(async (req, res) => {
    await withTransaction(async client => {
        for (const table of [...new Set(allDataTables)]) await query(`DELETE FROM "${table}"`, [], client);
        await query('DELETE FROM system_settings', [], client);
        await query("INSERT INTO app_meta(key,value) VALUES ('state_version','0') ON CONFLICT(key) DO UPDATE SET value='0'", [], client);
    });
    res.json({ success: true });
}));

function parseAvailable(value) {
    const parts = String(value || '').split('/').map(part => Number(String(part).replace(/,/g, '').trim()));
    return { available: Number.isFinite(parts[0]) ? parts[0] : 0, total: Number.isFinite(parts[1]) ? parts[1] : parts[0] || 0 };
}
function parseInventoryAvailabilityForDelete(value) {
    const parts = String(value ?? '').split('/').map(part => Number(String(part).replace(/,/g, '').trim()));
    if (parts.length !== 2 || parts.some(part => !Number.isFinite(part)) || parts[0] < 0 || parts[1] <= 0 || parts[0] > parts[1]) return null;
    return { available: parts[0], total: parts[1] };
}
function formatAvailable(available, total) { return `${available.toLocaleString()} / ${total.toLocaleString()}`; }
function operationError(message, statusCode = 409) { return Object.assign(new Error(message), { statusCode }); }

router.post('/api/operations/production', asyncRoute(async (req, res) => {
    const data = req.body || {};
    if (!data.model || !data.operator) throw badRequest('Model and operator are required');
    const result = await withTransaction(async client => {
        const model = (await query('SELECT * FROM models WHERE name = $1 LIMIT 1', [data.model], client)).rows[0];
        if (!model) throw operationError(`Battery model not found: ${data.model}`, 422);
        const bomRows = (await query('SELECT * FROM model_bom WHERE model_code = $1', [model.code], client)).rows;
        const bomByMaterial = new Map();
        for (const item of bomRows) {
            const material = String(item.name || '').trim();
            if (!material) throw operationError(`Model ${data.model} has a BOM item without a material name`, 422);
            const qty = finiteNumber(item.qty, `BOM quantity for ${material}`, { min: 0.0001, max: 1000000 });
            const current = bomByMaterial.get(material) || 0;
            bomByMaterial.set(material, current + qty);
        }
        const inventoryUpdates = [];
        for (const [material, required] of bomByMaterial) {
            const inventories = (await query('SELECT * FROM inventory WHERE material = $1 ORDER BY batch FOR UPDATE', [material], client)).rows;
            if (!inventories.length) throw operationError(`Required stock is missing: ${material}`, 422);
            const parsedInventories = inventories.map(inventory => ({ inventory, parsed: parseAvailable(inventory.available) }));
            const totalAvailable = parsedInventories.reduce((sum, row) => sum + row.parsed.available, 0);
            if (totalAvailable < required) throw operationError(`Insufficient stock for ${material}: required ${required}, available ${totalAvailable}`, 422);
            let remainingRequired = required;
            for (const row of parsedInventories) {
                if (remainingRequired <= 0) break;
                const consumed = Math.min(row.parsed.available, remainingRequired);
                inventoryUpdates.push({ inventory: row.inventory, remaining: row.parsed.available - consumed, total: row.parsed.total });
                remainingRequired -= consumed;
            }
        }
        const id = `PR-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
        await insert('production', { id, model: data.model, operator: data.operator, built: data.built || new Date().toISOString().slice(0, 10), qc: 'Awaiting', serial: null, status: 'In QC' }, client);
        for (const updateRow of inventoryUpdates) {
            const health = updateRow.remaining / (updateRow.total || 1) < 0.25 ? 'Low' : 'Good';
            await query('UPDATE inventory SET available = $1, health = $2 WHERE batch = $3', [formatAvailable(updateRow.remaining, updateRow.total), health, updateRow.inventory.batch], client);
        }
        return { id, serial: null };
    });
    res.status(201).json({ success: true, ...result });
}));

router.post('/api/operations/sale', asyncRoute(async (req, res) => {
    const payload = req.body || {};
    const invoice = payload.invoice || {};
    const items = Array.isArray(invoice.items) ? invoice.items : [];
    if (!invoice.invoice || !invoice.party || !items.length) throw badRequest('Invoice, party, and at least one item are required');
    if (!['Retail', 'Dealer'].includes(invoice.type)) throw badRequest('Sale type must be Retail or Dealer');
    const settings = await getSystemSettings();
    const totals = calculateSaleTax(items, invoice, settings);
    const paidAmount = assertPaymentAmount(totals.grandTotal, invoice.paidAmount);
    const calculatedInvoice = {
        ...invoice,
        taxMode: totals.taxMode,
        taxableValue: totals.taxableValue,
        totalGst: totals.totalGst,
        cgstAmount: totals.cgstAmount,
        sgstAmount: totals.sgstAmount,
        igstAmount: totals.igstAmount,
        cessAmount: totals.cessAmount,
        grandTotal: totals.grandTotal,
        paidAmount,
        balanceAmount: money(totals.grandTotal - paidAmount)
    };
    const serials = items.map(item => item.packSerial).filter(Boolean);
    if (new Set(serials).size !== serials.length) throw operationError('A battery serial cannot appear twice on one invoice', 422);
    const chassisNumbers = items.map(item => item.chassisVin).filter(Boolean);
    if (new Set(chassisNumbers).size !== chassisNumbers.length) throw operationError('A vehicle chassis number cannot appear twice on one invoice', 422);
    await withTransaction(async client => {
        for (const serial of serials) {
            const production = (await query('SELECT * FROM production WHERE serial = $1 FOR UPDATE', [serial], client)).rows[0];
            if (!production) throw operationError(`Battery serial not found: ${serial}`, 422);
            if (['Sold (Retail)', 'Dispatched (Dealer)'].includes(production.status)) throw operationError(`Battery ${serial} has already been sold`, 409);
            const existingSale = (await query("SELECT 1 FROM sales WHERE pack = $1 AND COALESCE(status, 'Active') <> 'Cancelled' LIMIT 1", [serial], client)).rows[0];
            if (existingSale) throw operationError(`Battery ${serial} already has a dispatch record`, 409);
        }
        for (const chassisNo of chassisNumbers) {
            const vehicle = (await query('SELECT * FROM vehicles WHERE chassis_no = $1 FOR UPDATE', [chassisNo], client)).rows[0];
            if (!vehicle) throw operationError(`Vehicle chassis not found: ${chassisNo}`, 422);
            if (vehicle.status && vehicle.status !== 'Available in Showroom') throw operationError(`Vehicle ${chassisNo} has already been sold`, 409);
        }
        const { items: ignoredItems, ...invoiceRow } = calculatedInvoice;
        await insert('invoices', invoiceRow, client);
        for (const item of totals.items) {
            await insert('invoice_items', {
                sr: item.sr, desc: item.desc || item.description, packSerial: item.packSerial || item.serial,
                hsn: item.hsn, chassisVin: item.chassisVin, engineMotor: item.engineMotor, color: item.color,
                keyController: item.keyController, wrcNo: item.wrcNo, chargerInfo: item.chargerInfo,
                batteryInfo: item.batteryInfo, qty: item.qty, price: item.price ?? item.unitPrice, amount: item.amount,
                gstRate: item.gstRate, gstAmount: item.gstAmount, cgstAmount: item.cgstAmount,
                sgstAmount: item.sgstAmount, igstAmount: item.igstAmount, cessAmount: item.cessAmount,
                invoiceNo: calculatedInvoice.invoice
            }, client);
            if (item.packSerial) {
                await insert('sales', { invoice: calculatedInvoice.invoice, pack: item.packSerial, party: calculatedInvoice.party, type: calculatedInvoice.type, date: calculatedInvoice.date, warranty: calculatedInvoice.warrantyStatus, amount: item.amount, desc: item.desc || item.description, status: 'Active' }, client);
                await query('UPDATE production SET status = $1 WHERE serial = $2', [calculatedInvoice.type === 'Retail' ? 'Sold (Retail)' : 'Dispatched (Dealer)', item.packSerial], client);
                const productionModel = (await query('SELECT model FROM production WHERE serial = $1 LIMIT 1', [item.packSerial], client)).rows[0];
                const model = productionModel ? (await query('SELECT warranty_months, warranty_activation_rule FROM models WHERE name = $1 LIMIT 1', [productionModel.model], client)).rows[0] : null;
                const termMonths = Number(model?.warranty_months) > 0 ? Number(model.warranty_months) : 24;
                const activationRule = model?.warranty_activation_rule || 'sale_type_default';
                const start = new Date(`${invoice.date || new Date().toISOString().slice(0, 10)}T00:00:00`);
                if (activationRule === 'sale_type_default' && calculatedInvoice.type !== 'Retail') start.setMonth(start.getMonth() + 1);
                const end = new Date(start); end.setMonth(end.getMonth() + termMonths);
                const status = calculatedInvoice.warrantyStatus || (calculatedInvoice.type === 'Retail' ? 'Active (Same Day Auto)' : 'Dealer Auto (+1 Month)');
                await query('INSERT INTO warranties(pack,customer,registered,"end",status,term_months,activation_rule,activation_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(pack) DO UPDATE SET customer=EXCLUDED.customer,registered=EXCLUDED.registered,"end"=EXCLUDED."end",status=EXCLUDED.status,term_months=EXCLUDED.term_months,activation_rule=EXCLUDED.activation_rule,activation_date=EXCLUDED.activation_date', [item.packSerial, calculatedInvoice.type === 'Retail' ? calculatedInvoice.party : `${calculatedInvoice.party} (Dealer Auto)`, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10), status, termMonths, activationRule, start.toISOString().slice(0, 10)], client);
            }
            if (item.chassisVin) {
                await query('UPDATE vehicles SET status = $1 WHERE chassis_no = $2', [calculatedInvoice.type === 'Retail' ? 'Sold (Retail)' : 'Dispatched (Dealer)', item.chassisVin], client);
            }
        }
        const ledgerId = `LEDG-${crypto.randomUUID()}`;
        const currentBalance = await partyBalance(calculatedInvoice.party, client);
        await insert('ledger', { id: ledgerId, date: calculatedInvoice.date, party: calculatedInvoice.party, partyType: calculatedInvoice.type, ref: calculatedInvoice.invoice, desc: `Tax Invoice ${calculatedInvoice.invoice} (${items.length} items)`, debit: calculatedInvoice.grandTotal, credit: 0, balance: money(currentBalance + calculatedInvoice.grandTotal) }, client);
        if (Number(calculatedInvoice.paidAmount) > 0) await insert('ledger', { id: `LEDG-${crypto.randomUUID()}`, date: calculatedInvoice.date, party: calculatedInvoice.party, partyType: calculatedInvoice.type, ref: `PAY-${calculatedInvoice.invoice}`, desc: `Upfront Payment Received for ${calculatedInvoice.invoice}`, debit: 0, credit: calculatedInvoice.paidAmount, balance: money(currentBalance + calculatedInvoice.grandTotal - calculatedInvoice.paidAmount) }, client);
    });
    res.status(201).json({ success: true, invoice: invoice.invoice });
}));

router.post('/api/operations/vehicle-sale', asyncRoute(async (req, res) => {
    const invoice = req.body || {};
    const grandTotal = finiteNumber(invoice.grandTotal, 'Vehicle invoice total', { min: 0.01, max: 1000000000 });
    if (!invoice.invoice || !invoice.party || !invoice.chassisNo || !Number.isFinite(grandTotal) || grandTotal <= 0) {
        throw badRequest('Vehicle invoice, party, chassis number, and a positive total are required');
    }
    if (!['Retail', 'Dealer'].includes(invoice.type)) throw badRequest('Vehicle sale type must be Retail or Dealer');
    await withTransaction(async client => {
        const vehicle = (await query('SELECT * FROM vehicles WHERE chassis_no = $1 FOR UPDATE', [invoice.chassisNo], client)).rows[0];
        if (!vehicle) throw operationError(`Vehicle not found: ${invoice.chassisNo}`, 422);
        if (vehicle.status !== 'Available in Showroom') throw operationError(`Vehicle ${invoice.chassisNo} is not available for sale`, 409);
        const duplicate = (await query('SELECT 1 FROM vehicle_invoices WHERE invoice = $1', [invoice.invoice], client)).rows[0];
        if (duplicate) throw operationError(`Vehicle invoice already exists: ${invoice.invoice}`, 409);

        const settings = await getSystemSettings(client);
        const vehicleModel = (await query('SELECT * FROM vehicle_models WHERE id = $1 OR name = $2 LIMIT 1', [vehicle.modelNo || invoice.model, vehicle.model || invoice.model], client)).rows[0];
        const gstRate = finiteNumber(vehicleModel?.gst_rate ?? settings.gstRateVehicle ?? settings.gstRate ?? DEFAULT_TAX_RATES.vehicle, 'Vehicle GST rate', { min: 0, max: 100 });
        const taxMode = resolveTaxMode(invoice, settings);
        const taxableValue = money(grandTotal / (1 + gstRate / 100));
        const totalGst = money(grandTotal - taxableValue);
        const cgstAmount = taxMode === 'IGST' ? 0 : money(totalGst / 2);
        const sgstAmount = taxMode === 'IGST' ? 0 : money(totalGst - cgstAmount);
        const igstAmount = taxMode === 'IGST' ? totalGst : 0;
        const paidAmount = assertPaymentAmount(grandTotal, invoice.paidAmount);
        const balanceAmount = money(grandTotal - paidAmount);
        const { items: ignoredItems, ...invoiceRow } = invoice;
        await insert('vehicle_invoices', { ...invoiceRow, taxMode, gstRate, taxableValue, totalGst, cgstAmount, sgstAmount, igstAmount, grandTotal, paidAmount, balanceAmount }, client);
        await query("UPDATE vehicles SET status = 'Sold & Dispatched' WHERE chassis_no = $1", [invoice.chassisNo], client);
        const currentBalance = await partyBalance(invoice.party, client);
        await insert('ledger', {
            id: `LEDG-${crypto.randomUUID()}`,
            date: invoice.date,
            party: invoice.party,
            partyType: invoice.type,
            ref: invoice.invoice,
            desc: `EV Vehicle Tax Invoice ${invoice.invoice} (${invoice.model} · Chassis ${invoice.chassisNo})`,
            debit: grandTotal,
            credit: 0,
            balance: money(currentBalance + grandTotal),
            bankAccount: invoice.bankAccount
        }, client);
        if (paidAmount > 0) await insert('ledger', {
            id: `LEDG-${crypto.randomUUID()}`,
            date: invoice.date,
            party: invoice.party,
            partyType: invoice.type,
            ref: `PAY-${invoice.invoice}`,
            desc: `Vehicle Payment Received via ${invoice.bankAccount || 'Bank Account'}`,
            debit: 0,
            credit: paidAmount,
            balance: money(currentBalance + grandTotal - paidAmount),
            bankAccount: invoice.bankAccount
        }, client);
    });
    res.status(201).json({ success: true, invoice: invoice.invoice, chassisNo: invoice.chassisNo });
}));

router.post('/api/operations/payment', asyncRoute(async (req, res) => {
    const data = req.body || {};
    const party = String(data.party || '').trim();
    const amount = finiteNumber(data.amount, 'Payment amount', { min: 0.01, max: 1000000000 });
    if (!party) throw badRequest('Party is required for a payment');
    const date = data.date || new Date().toISOString().slice(0, 10);
    const bankAccount = String(data.bankAccount || 'Unspecified payment mode').trim().slice(0, 200);
    const result = await withTransaction(async client => {
        const invoiceRows = (await query('SELECT invoice, party, date, grand_total, paid_amount, balance_amount FROM invoices WHERE LOWER(party) = LOWER($1) FOR UPDATE', [party], client)).rows.map(row => ({ ...row, table: 'invoices' }));
        const vehicleRows = (await query('SELECT invoice, party, date, grand_total, paid_amount, balance_amount FROM vehicle_invoices WHERE LOWER(party) = LOWER($1) FOR UPDATE', [party], client)).rows.map(row => ({ ...row, table: 'vehicle_invoices' }));
        const openInvoices = [...invoiceRows, ...vehicleRows].sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')) || String(a.invoice).localeCompare(String(b.invoice)));
        let remaining = money(amount);
        const allocations = [];
        for (const invoice of openInvoices) {
            if (remaining <= 0) break;
            const grandTotal = money(invoice.grand_total);
            const paidAmount = money(invoice.paid_amount);
            const outstanding = money(grandTotal - paidAmount);
            if (outstanding <= 0) continue;
            const applied = money(Math.min(remaining, outstanding));
            const nextPaid = money(paidAmount + applied);
            const nextBalance = money(grandTotal - nextPaid);
            await query(`UPDATE ${invoice.table} SET paid_amount = $1, balance_amount = $2 WHERE invoice = $3`, [nextPaid, nextBalance, invoice.invoice], client);
            allocations.push({ invoice: invoice.invoice, amount: applied, balanceAmount: nextBalance });
            remaining = money(remaining - applied);
        }
        const currentBalance = await partyBalance(party, client);
        const receiptNo = String(data.ref || `PAY-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`).slice(0, 100);
        await insert('ledger', {
            id: `LEDG-${crypto.randomUUID()}`, date, party, partyType: data.partyType || 'Customer', ref: receiptNo,
            desc: data.notes || `Payment Received via ${bankAccount}`, debit: 0, credit: amount,
            balance: money(currentBalance - amount), bankAccount
        }, client);
        return { receiptNo, allocations, unappliedAmount: remaining };
    });
    res.status(201).json({ success: true, party, amount: money(amount), ...result });
}));

router.post('/api/operations/ledger-entry', asyncRoute(async (req, res) => {
    const data = req.body || {};
    const party = String(data.party || '').trim();
    const entryType = String(data.entryType || '').trim().toLowerCase();
    const amount = finiteNumber(data.amount, 'Ledger amount', { min: 0.01, max: 1000000000 });
    if (!party || !['credit-note', 'debit-note', 'opening-balance'].includes(entryType)) throw badRequest('Party and a supported ledger entry type are required');
    const date = data.date || new Date().toISOString().slice(0, 10);
    const isCredit = entryType === 'credit-note' || (entryType === 'opening-balance' && data.balanceType === 'Credit');
    const debit = isCredit ? 0 : amount;
    const credit = isCredit ? amount : 0;
    const result = await withTransaction(async client => {
        if (entryType === 'credit-note' && data.invoice) {
            const genericInvoice = (await query('SELECT party, balance_amount FROM invoices WHERE invoice = $1 FOR UPDATE', [data.invoice], client)).rows[0];
            const vehicleInvoice = genericInvoice ? null : (await query('SELECT party, balance_amount FROM vehicle_invoices WHERE invoice = $1 FOR UPDATE', [data.invoice], client)).rows[0];
            const linkedInvoice = genericInvoice || vehicleInvoice;
            if (!linkedInvoice) throw operationError(`Invoice not found: ${data.invoice}`, 404);
            if (String(linkedInvoice.party || '').toLowerCase() !== party.toLowerCase()) throw operationError('Credit note party does not match the invoice party', 422);
            const table = genericInvoice ? 'invoices' : 'vehicle_invoices';
            await query(`UPDATE ${table} SET balance_amount = COALESCE(balance_amount, 0) - $1 WHERE invoice = $2`, [amount, data.invoice], client);
        }
        const currentBalance = await partyBalance(party, client);
        const ref = String(data.ref || `${entryType === 'credit-note' ? 'CN' : entryType === 'debit-note' ? 'DN' : 'OB'}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`).slice(0, 100);
        await insert('ledger', { id: `LEDG-${crypto.randomUUID()}`, date, party, partyType: data.partyType || 'Customer', ref, desc: String(data.notes || data.reason || `${entryType} for ${party}`).slice(0, 500), debit, credit, balance: money(currentBalance + debit - credit), bankAccount: data.bankAccount || entryType }, client);
        return { ref, balance: money(currentBalance + debit - credit) };
    });
    res.status(201).json({ success: true, party, amount: money(amount), ...result });
}));

router.post('/api/operations/sale/:invoice/cancel', asyncRoute(async (req, res) => {
    if (req.session.user?.role !== 'Admin') throw operationError('Administrator role required to cancel an invoice', 403);
    const invoiceNo = req.params.invoice;
    const reason = String(req.body?.reason || 'User requested cancellation').trim().slice(0, 500);
    const result = await withTransaction(async client => {
        const invoice = (await query('SELECT * FROM invoices WHERE invoice = $1 FOR UPDATE', [invoiceNo], client)).rows[0];
        if (!invoice) throw operationError(`Invoice not found: ${invoiceNo}`, 404);
        if (invoice.warranty_status === 'Cancelled') throw operationError(`Invoice ${invoiceNo} is already cancelled`, 409);
        const items = (await query('SELECT * FROM invoice_items WHERE invoice_no = $1', [invoiceNo], client)).rows;
        for (const item of items) {
            if (item.pack_serial) {
                const production = (await query('SELECT status FROM production WHERE serial = $1 FOR UPDATE', [item.pack_serial], client)).rows[0];
                if (production && ['Sold (Retail)', 'Dispatched (Dealer)'].includes(production.status)) await query("UPDATE production SET status = 'Saleable' WHERE serial = $1", [item.pack_serial], client);
                await query("UPDATE warranties SET status = 'Cancelled' WHERE pack = $1 AND status <> 'Replaced'", [item.pack_serial], client);
            }
            if (item.chassis_vin) {
                await query("UPDATE vehicles SET status = 'Available in Showroom' WHERE chassis_no = $1 AND status IN ('Sold (Retail)', 'Dispatched (Dealer)', 'Sold & Dispatched')", [item.chassis_vin], client);
            }
        }
        await query("UPDATE sales SET status = 'Cancelled', cancel_reason = $1, cancelled_at = $2 WHERE invoice = $3", [reason, new Date().toISOString(), invoiceNo], client);
        const currentBalance = await partyBalance(invoice.party, client);
        await insert('ledger', { id: `LEDG-${crypto.randomUUID()}`, date: new Date().toISOString().slice(0, 10), party: invoice.party, partyType: invoice.type, ref: `CN-${invoiceNo}`, desc: `Sale Cancellation (${invoiceNo}) — ${reason}`, debit: 0, credit: money(invoice.grand_total), balance: money(currentBalance - Number(invoice.grand_total || 0)), bankAccount: 'Sale Cancellation Reversal' }, client);
        await query("UPDATE invoices SET warranty_status = 'Cancelled', balance_amount = $1 WHERE invoice = $2", [money(-Number(invoice.paid_amount || 0)), invoiceNo], client);
        return { invoice: invoiceNo, refundDue: money(invoice.paid_amount || 0) };
    });
    res.json({ success: true, ...result });
}));

router.post('/api/operations/vehicle-sale/:invoice/cancel', asyncRoute(async (req, res) => {
    if (req.session.user?.role !== 'Admin') throw operationError('Administrator role required to cancel an invoice', 403);
    const invoiceNo = req.params.invoice;
    const reason = String(req.body?.reason || 'User requested cancellation').trim().slice(0, 500);
    const result = await withTransaction(async client => {
        const invoice = (await query('SELECT * FROM vehicle_invoices WHERE invoice = $1 FOR UPDATE', [invoiceNo], client)).rows[0];
        if (!invoice) throw operationError(`Vehicle invoice not found: ${invoiceNo}`, 404);
        if (invoice.status === 'Cancelled') throw operationError(`Vehicle invoice ${invoiceNo} is already cancelled`, 409);
        if (invoice.chassis_no) await query("UPDATE vehicles SET status = 'Available in Showroom' WHERE chassis_no = $1 AND status IN ('Sold & Dispatched', 'Sold (Retail)', 'Dispatched (Dealer)')", [invoice.chassis_no], client);
        const currentBalance = await partyBalance(invoice.party, client);
        await insert('ledger', { id: `LEDG-${crypto.randomUUID()}`, date: new Date().toISOString().slice(0, 10), party: invoice.party, partyType: invoice.type, ref: `CN-${invoiceNo}`, desc: `Vehicle Sale Cancellation (${invoiceNo}) — ${reason}`, debit: 0, credit: money(invoice.grand_total), balance: money(currentBalance - Number(invoice.grand_total || 0)), bankAccount: 'Sale Cancellation Reversal' }, client);
        await query("UPDATE vehicle_invoices SET status = 'Cancelled', balance_amount = $1 WHERE invoice = $2", [money(-Number(invoice.paid_amount || 0)), invoiceNo], client);
        return { invoice: invoiceNo, refundDue: money(invoice.paid_amount || 0) };
    });
    res.json({ success: true, ...result });
}));

router.post('/api/operations/qc', asyncRoute(async (req, res) => {
    const { productionId, qc, serial } = req.body || {};
    if (!productionId || !['Passed', 'Failed'].includes(qc)) throw badRequest('Production ID and valid QC result are required');
    await withTransaction(async client => {
        const row = (await query('SELECT * FROM production WHERE id = $1 FOR UPDATE', [productionId], client)).rows[0];
        if (!row) throw operationError(`Production record not found: ${productionId}`, 404);
        if (qc === 'Passed') {
            if (!serial || serial === '—') throw operationError('A valid serial is required to release a pack', 422);
            const duplicate = (await query('SELECT id FROM production WHERE serial = $1 AND id <> $2 LIMIT 1', [serial, productionId], client)).rows[0];
            if (duplicate) throw operationError(`Serial already assigned: ${serial}`, 409);
            await query('UPDATE production SET qc=$1, serial=$2, status=$3 WHERE id=$4', [qc, serial, 'Saleable', productionId], client);
        } else await query('UPDATE production SET qc=$1, serial=NULL, status=$2 WHERE id=$3', [qc, 'QC failed', productionId], client);
    });
    res.json({ success: true, productionId });
}));

router.post('/api/operations/warranty', asyncRoute(async (req, res) => {
    const { pack, customer, registered, end, status = 'Active', allowCustom = false } = req.body || {};
    if (!pack || !customer) throw badRequest('Pack serial and customer are required');
    const registeredDate = new Date(`${registered || ''}T00:00:00`);
    const endDate = new Date(`${end || ''}T00:00:00`);
    if (Number.isNaN(registeredDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate < registeredDate) throw badRequest('Warranty dates are invalid or the end date is before registration');
    if (!['Active', 'Active (Same Day Auto)', 'Dealer Auto (+1 Month)', 'Cancelled', 'Replaced'].includes(status)) throw badRequest('Unsupported warranty status');
    await withTransaction(async client => {
        const production = (await query('SELECT status FROM production WHERE serial = $1 FOR UPDATE', [pack], client)).rows[0];
        const customAllowed = Boolean(allowCustom) && req.session.user?.role === 'Admin';
        if (!production && !customAllowed) throw operationError(`Cannot activate warranty for unknown pack: ${pack}`, 422);
        if (production && ['QC failed', 'In QC'].includes(production.status)) throw operationError(`Pack ${pack} is not released for warranty`, 422);
        await query('INSERT INTO warranties(pack,customer,registered,"end",status) VALUES($1,$2,$3,$4,$5) ON CONFLICT(pack) DO UPDATE SET customer=EXCLUDED.customer,registered=EXCLUDED.registered,"end"=EXCLUDED."end",status=EXCLUDED.status', [pack, customer, registered, end, status], client);
    });
    res.json({ success: true, pack });
}));

router.post('/api/operations/claim', asyncRoute(async (req, res) => {
    const data = req.body || {};
    const action = data.action || 'create';
    if (action === 'create') {
        if (!data.pack || !data.issue) throw badRequest('Pack and issue are required');
        const claim = data.claim || `CLM-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
        await withTransaction(async client => {
            const warranty = (await query('SELECT pack FROM warranties WHERE pack = $1', [data.pack], client)).rows[0];
            if (!warranty) throw operationError(`No warranty exists for pack ${data.pack}`, 422);
            const duplicate = (await query('SELECT claim FROM claims WHERE claim = $1', [claim], client)).rows[0];
            if (duplicate) throw operationError(`Claim already exists: ${claim}`, 409);
            await insert('claims', { claim, pack: data.pack, customer: data.customer || 'Unregistered', issue: data.issue, opened: data.opened || new Date().toISOString().slice(0, 10), outcome: data.outcome || 'Inspection', status: 'Open', notes: data.notes || '' }, client);
        });
        return res.status(201).json({ success: true, claim });
    }
    if (action === 'replace') {
        const { claim, defectivePack, replacementPack, customer, inheritedEndDate } = data;
        if (!claim || !defectivePack || !replacementPack) throw badRequest('Claim and both pack serials are required');
        await withTransaction(async client => {
            const existingClaim = (await query('SELECT * FROM claims WHERE claim = $1 FOR UPDATE', [claim], client)).rows[0];
            if (!existingClaim) throw operationError(`Claim not found: ${claim}`, 404);
            if (existingClaim.pack !== defectivePack) throw operationError('Defective pack does not match the warranty claim', 422);
            if (existingClaim.status === 'Resolved') throw operationError(`Claim ${claim} is already resolved`, 409);
            const replacement = (await query('SELECT status FROM production WHERE serial = $1 FOR UPDATE', [replacementPack], client)).rows[0];
            if (!replacement || !['Saleable', 'Dealer stock'].includes(replacement.status)) throw operationError(`Replacement pack is not available: ${replacementPack}`, 422);
            await query('UPDATE claims SET status=$1,outcome=$2,replaced_with=$3 WHERE claim=$4', ['Resolved', `Replacement (${replacementPack})`, replacementPack, claim], client);
            await query('UPDATE warranties SET status=$1 WHERE pack=$2', ['Replaced', defectivePack], client);
            await query('UPDATE production SET status=$1 WHERE serial=$2', ['Sold (Warranty Replacement)', replacementPack], client);
            await query('INSERT INTO warranties(pack,customer,registered,"end",status) VALUES($1,$2,$3,$4,$5) ON CONFLICT(pack) DO UPDATE SET customer=EXCLUDED.customer,"end"=EXCLUDED."end",status=EXCLUDED.status', [replacementPack, customer, new Date().toISOString().slice(0, 10), inheritedEndDate, 'Active'], client);
        });
        return res.json({ success: true, claim });
    }
    if (action === 'update') {
        if (!data.claim) throw badRequest('Claim is required');
        const allowedStatuses = ['Open', 'In Repair', 'Resolved', 'Rejected'];
        if (!allowedStatuses.includes(data.status)) throw badRequest('Unsupported claim status');
        await withTransaction(async client => {
            const existing = (await query('SELECT claim FROM claims WHERE claim = $1 FOR UPDATE', [data.claim], client)).rows[0];
            if (!existing) throw operationError(`Claim not found: ${data.claim}`, 404);
            await query('UPDATE claims SET status=$1,outcome=$2,issue=$3,notes=$4,replaced_comp=$5,repair_labor=$6,repair_elec=$7 WHERE claim=$8', [data.status, data.outcome || 'Inspection', data.issue || '', data.notes || '', data.replacedComp || 'None', finiteNumber(data.repairLabor || 0, 'Repair labour', { min: 0 }), finiteNumber(data.repairElec || 0, 'Repair electricity', { min: 0 }), data.claim], client);
        });
        return res.json({ success: true, claim: data.claim });
    }
    if (action === 'repair') {
        const { claim, party, customerState, invoice, items = [], status = 'Resolved', outcome = 'Repaired' } = data;
        if (!claim || !invoice?.invoice || !items.length) throw badRequest('Claim, invoice, and repair items are required');
        await withTransaction(async client => {
            const existing = (await query('SELECT * FROM claims WHERE claim = $1 FOR UPDATE', [claim], client)).rows[0];
            if (!existing) throw operationError(`Claim not found: ${claim}`, 404);
            const duplicate = (await query('SELECT invoice FROM invoices WHERE invoice = $1', [invoice.invoice], client)).rows[0];
            if (duplicate) throw operationError(`Repair invoice already exists: ${invoice.invoice}`, 409);
            const settings = await getSystemSettings(client);
            const invoiceParty = party || existing.customer || 'Repair Customer';
            const invoiceInput = { ...invoice, party: invoiceParty, taxMode: invoice.taxMode || 'INTRA' };
            const totals = calculateSaleTax(items, invoiceInput, settings);
            const paidAmount = assertPaymentAmount(totals.grandTotal, invoice.paidAmount);
            const calculatedInvoice = {
                ...invoiceInput,
                taxMode: totals.taxMode,
                taxableValue: totals.taxableValue,
                totalGst: totals.totalGst,
                cgstAmount: totals.cgstAmount,
                sgstAmount: totals.sgstAmount,
                igstAmount: totals.igstAmount,
                cessAmount: totals.cessAmount,
                grandTotal: totals.grandTotal,
                paidAmount,
                balanceAmount: money(totals.grandTotal - paidAmount)
            };
            const { items: ignoredItems, ...invoiceRow } = calculatedInvoice;
            await insert('invoices', invoiceRow, client);
            for (const item of totals.items) await insert('invoice_items', { sr: item.sr, desc: item.desc || item.description, packSerial: item.packSerial || item.serial, hsn: item.hsn, qty: item.qty, price: item.price, amount: item.amount, gstRate: item.gstRate, gstAmount: item.gstAmount, cgstAmount: item.cgstAmount, sgstAmount: item.sgstAmount, igstAmount: item.igstAmount, cessAmount: item.cessAmount, invoiceNo: calculatedInvoice.invoice }, client);
            const currentBalance = await partyBalance(invoiceParty, client);
            await insert('ledger', { id: `LEDG-${crypto.randomUUID()}`, date: calculatedInvoice.date, party: invoiceParty, partyType: 'Customer', ref: calculatedInvoice.invoice, desc: `Repair Invoice ${calculatedInvoice.invoice}`, debit: calculatedInvoice.grandTotal, credit: 0, balance: money(currentBalance + calculatedInvoice.grandTotal) }, client);
            if (paidAmount > 0) await insert('ledger', { id: `LEDG-${crypto.randomUUID()}`, date: calculatedInvoice.date, party: invoiceParty, partyType: 'Customer', ref: `PAY-${calculatedInvoice.invoice}`, desc: `Repair Payment Received`, debit: 0, credit: paidAmount, balance: money(currentBalance + calculatedInvoice.grandTotal - paidAmount), bankAccount: calculatedInvoice.bankAccount }, client);
            await query('UPDATE claims SET status=$1,outcome=$2,repair_invoice_no=$3,repair_labor=$4,repair_elec=$5,replaced_comp=$6,notes=$7 WHERE claim=$8', [status, outcome, calculatedInvoice.invoice, finiteNumber(data.repairLabor || 0, 'Repair labour', { min: 0 }), finiteNumber(data.repairElec || 0, 'Repair electricity', { min: 0 }), data.replacedComp || 'None', data.notes || '', claim], client);
        });
        return res.status(201).json({ success: true, claim, invoice: invoice.invoice });
    }
    throw badRequest(`Unsupported claim action: ${action}`);
}));

router.get('/api/settings', asyncRoute(async (req, res) => {
    const rows = (await query('SELECT * FROM system_settings')).rows; const settings = {};
    for (const row of rows) { try { settings[row.key] = JSON.parse(row.value); } catch { settings[row.key] = row.value; } }
    res.json(settings);
}));
router.put('/api/settings', asyncRoute(async (req, res) => {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) throw badRequest('Settings must be an object');
    for (const key of ['gstRate', 'gstRateBattery', 'gstRateVehicle', 'gstRateCharger', 'gstRateAccessory', 'gstRateService']) {
        if (req.body[key] !== undefined) finiteNumber(req.body[key], key, { min: 0, max: 100 });
    }
    await withTransaction(async client => { for (const [key, value] of Object.entries(req.body)) await query('INSERT INTO system_settings (key,value) VALUES ($1,$2) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value', [key, typeof value === 'object' ? JSON.stringify(value) : String(value)], client); });
    res.json(req.body);
}));
router.get('/api/health', asyncRoute(async (req, res) => { const records = await getTotalRecords(); res.json({ status: 'ok', database: 'postgres', totalRecords: records.total, tables: records.tables }); }));
router.post('/api/backup', asyncRoute(async (req, res) => res.status(410).json({ error: 'Local SQLite backup is not available in hosted mode. Use Neon backups and exports.' })));
router.post('/api/sync/backup-now', asyncRoute(async (req, res) => {
    const { syncAllTables } = require('./sheetsSync'); res.json(await syncAllTables());
}));
router.get('/api/sync/status', asyncRoute(async (req, res) => res.json((await query('SELECT * FROM sync_log ORDER BY id DESC LIMIT 50')).rows.map(keysToCamel))));

router.get('/api/load-state', asyncRoute(async (req, res) => {
    const state = {};
    for (const [key, table] of Object.entries(stateTableMap)) state[key] = await getAll(table);
    state.models = await embeddedModels(); state.invoices = await embeddedInvoices(); state.purchaseBills = await embeddedPurchaseBills();
    state._syncVersion = Number((await query("SELECT value FROM app_meta WHERE key = 'state_version'")).rows[0]?.value || 0);
    const rows = (await query('SELECT * FROM system_settings')).rows; state.settings = {};
    for (const row of rows) { try { state.settings[row.key] = JSON.parse(row.value); } catch { state.settings[row.key] = row.value; } }
    res.json(state);
}));

const simpleEntities = [
    ['components', 'id', '/api/components'], ['inventory', 'batch', '/api/inventory'], ['production', 'id', '/api/production'],
    ['dealers', 'id', '/api/dealers'], ['sales', 'invoice', '/api/sales'], ['ledger', 'id', '/api/ledger'],
    ['warranties', 'pack', '/api/warranties'], ['claims', 'claim', '/api/claims'], ['suppliers', 'id', '/api/suppliers'],
    ['supplier_ledger', 'id', '/api/supplier-ledger'], ['vehicle_models', 'id', '/api/vehicle-models'],
    ['vehicles', 'chassis_no', '/api/vehicles'], ['vehicle_invoices', 'invoice', '/api/vehicle-invoices'], ['bank_accounts', 'id', '/api/bank-accounts']
];
for (const [table, pk, path] of simpleEntities) {
    router.get(path, asyncRoute(async (req, res) => res.json(await getAll(table))));
    router.post(path, asyncRoute(async (req, res) => { await insert(table, req.body || {}); res.status(201).json(req.body); }));
    router.put(`${path}/:id`, asyncRoute(async (req, res) => { await update(table, pk, req.params.id, req.body || {}); res.json(req.body); }));
    router.delete(`${path}/:id`, asyncRoute(async (req, res) => { await remove(table, pk, req.params.id); res.status(204).end(); }));
}

module.exports = router;
