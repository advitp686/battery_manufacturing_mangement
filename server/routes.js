const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { query, getAll, getById, insert, update, remove, withTransaction, getTotalRecords, keysToCamel, TABLES } = require('./db');

const asyncRoute = handler => (req, res) => Promise.resolve(handler(req, res)).catch(error => {
    console.error('API error:', error);
    res.status(error.statusCode || 500).json({ error: error.message });
});
const badRequest = message => Object.assign(new Error(message), { statusCode: 400 });

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
    await withTransaction(async client => {
        await insert('invoices', invoice, client);
        for (const item of items) await insert('invoice_items', { ...item, invoiceNo: invoice.invoice }, client);
    });
    res.status(201).json({ ...invoice, items });
}));
router.put('/api/invoices/:invoice', asyncRoute(async (req, res) => {
    const { items, ...invoice } = req.body || {};
    await withTransaction(async client => {
        await update('invoices', 'invoice', req.params.invoice, invoice, client);
        if (items !== undefined) {
            await query('DELETE FROM invoice_items WHERE invoice_no = $1', [req.params.invoice], client);
            for (const item of items) await insert('invoice_items', { ...item, invoiceNo: req.params.invoice }, client);
        }
    });
    res.json({ ...invoice, invoice: req.params.invoice, items: items || [] });
}));
router.delete('/api/invoices/:invoice', asyncRoute(async (req, res) => { await remove('invoices', 'invoice', req.params.invoice); res.status(204).end(); }));

const stateTableMap = {
    components: 'components', inventory: 'inventory', production: 'production', dealers: 'dealers',
    sales: 'sales', ledger: 'ledger', warranties: 'warranties', claims: 'claims', suppliers: 'suppliers',
    supplierLedger: 'supplier_ledger', purchaseBills: 'purchase_bills', vehicleModels: 'vehicle_models',
    vehicles: 'vehicles', vehicleInvoices: 'vehicle_invoices', bankAccounts: 'bank_accounts'
};
const allDataTables = ['invoice_items', 'model_bom', 'purchase_bill_items', ...Object.values(stateTableMap), 'invoices', 'models'];

async function replaceState(state, client, { full = true } = {}) {
    const writable = full ? new Set(allDataTables) : new Set(['sales', 'ledger', 'warranties', 'claims', 'invoices', 'invoice_items']);
    for (const table of [...new Set(allDataTables)]) if (writable.has(table)) await query(`DELETE FROM "${table}"`, [], client);
    for (const [key, table] of Object.entries(stateTableMap)) {
        if (!writable.has(table)) continue;
        if (state[key] === undefined) continue;
        if (!Array.isArray(state[key])) throw badRequest(`${key} must be an array`);
        for (const row of state[key]) {
            if (table === 'purchase_bills') {
                const { items = [], ...bill } = row; await insert(table, bill, client);
                for (const item of items) await insert('purchase_bill_items', { ...item, billId: bill.id }, client);
            } else await insert(table, row, client);
        }
    }
    if (full && state.models !== undefined) {
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
        await replaceState(req.body, client, { full: req.session.user?.role === 'Admin' });
        const next = current + 1;
        await query("INSERT INTO app_meta(key,value) VALUES ('state_version',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value", [String(next)], client);
        return next;
    });
    res.json({ success: true, version: result, timestamp: new Date().toISOString() });
}));
router.post('/api/reset', asyncRoute(async (req, res) => {
    await withTransaction(async client => { for (const table of [...new Set(allDataTables)]) await query(`DELETE FROM "${table}"`, [], client); await query('DELETE FROM system_settings', [], client); });
    res.json({ success: true });
}));

function parseAvailable(value) {
    const parts = String(value || '').split('/').map(part => Number(String(part).replace(/,/g, '').trim()));
    return { available: Number.isFinite(parts[0]) ? parts[0] : 0, total: Number.isFinite(parts[1]) ? parts[1] : parts[0] || 0 };
}
function formatAvailable(available, total) { return `${available.toLocaleString()} / ${total.toLocaleString()}`; }
function operationError(message, statusCode = 409) { return Object.assign(new Error(message), { statusCode }); }

router.post('/api/operations/production', asyncRoute(async (req, res) => {
    const data = req.body || {};
    if (!data.model || !data.operator) throw badRequest('Model and operator are required');
    const result = await withTransaction(async client => {
        const model = (await query('SELECT * FROM models WHERE name = $1 LIMIT 1', [data.model], client)).rows[0];
        if (!model) throw operationError(`Battery model not found: ${data.model}`, 422);
        const bom = (await query('SELECT * FROM model_bom WHERE model_code = $1', [model.code], client)).rows;
        const inventoryUpdates = [];
        for (const item of bom) {
            const inventory = (await query('SELECT * FROM inventory WHERE material = $1 FOR UPDATE', [item.name], client)).rows[0];
            if (!inventory) throw operationError(`Required stock is missing: ${item.name}`, 422);
            const parsed = parseAvailable(inventory.available);
            const required = Number(item.qty) || 1;
            if (parsed.available < required) throw operationError(`Insufficient stock for ${item.name}: required ${required}, available ${parsed.available}`, 422);
            const remaining = parsed.available - required;
            inventoryUpdates.push({ inventory, remaining, total: parsed.total });
        }
        const id = data.id || `PR-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
        const serial = data.serial && data.serial !== '—' ? data.serial : null;
        await insert('production', { id, model: data.model, operator: data.operator, built: data.built || new Date().toISOString().slice(0, 10), qc: data.qc || 'Awaiting', serial, status: data.status || 'In QC' }, client);
        for (const updateRow of inventoryUpdates) {
            const health = updateRow.remaining / (updateRow.total || 1) < 0.25 ? 'Low' : 'Good';
            await query('UPDATE inventory SET available = $1, health = $2 WHERE batch = $3', [formatAvailable(updateRow.remaining, updateRow.total), health, updateRow.inventory.batch], client);
        }
        return { id, serial };
    });
    res.status(201).json({ success: true, ...result });
}));

router.post('/api/operations/sale', asyncRoute(async (req, res) => {
    const payload = req.body || {};
    const invoice = payload.invoice || {};
    const items = Array.isArray(invoice.items) ? invoice.items : [];
    if (!invoice.invoice || !invoice.party || !items.length) throw badRequest('Invoice, party, and at least one item are required');
    const serials = items.map(item => item.packSerial).filter(Boolean);
    if (new Set(serials).size !== serials.length) throw operationError('A battery serial cannot appear twice on one invoice', 422);
    await withTransaction(async client => {
        for (const serial of serials) {
            const production = (await query('SELECT * FROM production WHERE serial = $1 FOR UPDATE', [serial], client)).rows[0];
            if (!production) throw operationError(`Battery serial not found: ${serial}`, 422);
            if (['Sold (Retail)', 'Dispatched (Dealer)'].includes(production.status)) throw operationError(`Battery ${serial} has already been sold`, 409);
            const existingSale = (await query('SELECT 1 FROM sales WHERE pack = $1 LIMIT 1', [serial], client)).rows[0];
            if (existingSale) throw operationError(`Battery ${serial} already has a dispatch record`, 409);
        }
        const { items: ignoredItems, ...invoiceRow } = invoice;
        await insert('invoices', invoiceRow, client);
        for (const item of items) {
            await insert('invoice_items', {
                sr: item.sr, desc: item.desc || item.description, packSerial: item.packSerial || item.serial,
                hsn: item.hsn, chassisVin: item.chassisVin, engineMotor: item.engineMotor, color: item.color,
                keyController: item.keyController, wrcNo: item.wrcNo, chargerInfo: item.chargerInfo,
                batteryInfo: item.batteryInfo, qty: item.qty, price: item.price ?? item.unitPrice, amount: item.amount,
                invoiceNo: invoice.invoice
            }, client);
            if (item.packSerial) {
                await insert('sales', { invoice: invoice.invoice, pack: item.packSerial, party: invoice.party, type: invoice.type, date: invoice.date, warranty: invoice.warrantyStatus, amount: item.amount, desc: item.desc || item.description }, client);
                await query('UPDATE production SET status = $1 WHERE serial = $2', [invoice.type === 'Retail' ? 'Sold (Retail)' : 'Dispatched (Dealer)', item.packSerial], client);
                const start = new Date(); if (invoice.type !== 'Retail') start.setMonth(start.getMonth() + 1);
                const end = new Date(start); end.setFullYear(end.getFullYear() + 2);
                await query('INSERT INTO warranties(pack,customer,registered,"end",status) VALUES($1,$2,$3,$4,$5) ON CONFLICT(pack) DO UPDATE SET customer=EXCLUDED.customer,registered=EXCLUDED.registered,"end"=EXCLUDED."end",status=EXCLUDED.status', [item.packSerial, invoice.type === 'Retail' ? invoice.party : `${invoice.party} (Dealer Auto)`, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10), invoice.warrantyStatus || (invoice.type === 'Retail' ? 'Active (Same Day Auto)' : 'Dealer Auto (+1 Month)')], client);
            }
        }
        const ledgerId = `LEDG-${crypto.randomUUID()}`;
        await insert('ledger', { id: ledgerId, date: invoice.date, party: invoice.party, partyType: invoice.type, ref: invoice.invoice, desc: `Tax Invoice ${invoice.invoice} (${items.length} items)`, debit: invoice.grandTotal, credit: 0, balance: invoice.balanceAmount ?? invoice.grandTotal }, client);
        if (Number(invoice.paidAmount) > 0) await insert('ledger', { id: `LEDG-${crypto.randomUUID()}`, date: invoice.date, party: invoice.party, partyType: invoice.type, ref: `PAY-${invoice.invoice}`, desc: `Upfront Payment Received for ${invoice.invoice}`, debit: 0, credit: invoice.paidAmount, balance: invoice.balanceAmount ?? 0 }, client);
    });
    res.status(201).json({ success: true, invoice: invoice.invoice });
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
    await withTransaction(async client => {
        const production = (await query('SELECT status FROM production WHERE serial = $1 FOR UPDATE', [pack], client)).rows[0];
        if (!production && !allowCustom) throw operationError(`Cannot activate warranty for unknown pack: ${pack}`, 422);
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
            await insert('claims', { claim, pack: data.pack, customer: data.customer || 'Unregistered', issue: data.issue, opened: data.opened || new Date().toISOString().slice(0, 10), outcome: data.outcome || 'Inspection', status: 'Open', notes: data.notes || '' }, client);
        });
        return res.status(201).json({ success: true, claim });
    }
    if (action === 'replace') {
        const { claim, defectivePack, replacementPack, customer, inheritedEndDate } = data;
        if (!claim || !defectivePack || !replacementPack) throw badRequest('Claim and both pack serials are required');
        await withTransaction(async client => {
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
        await query('UPDATE claims SET status=$1,outcome=$2,issue=$3,notes=$4,replaced_comp=$5,repair_labor=$6,repair_elec=$7 WHERE claim=$8', [data.status, data.outcome, data.issue, data.notes || '', data.replacedComp || 'None', data.repairLabor || 0, data.repairElec || 0, data.claim]);
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
            const { items: ignoredItems, ...invoiceRow } = invoice;
            await insert('invoices', invoiceRow, client);
            for (const item of items) await insert('invoice_items', { sr: item.sr, desc: item.desc, packSerial: item.packSerial, hsn: item.hsn, qty: item.qty, price: item.price, amount: item.amount, invoiceNo: invoice.invoice }, client);
            await insert('ledger', { id: `LEDG-${crypto.randomUUID()}`, date: invoice.date, party: party || existing.customer, partyType: 'Customer', ref: invoice.invoice, desc: `Repair Invoice ${invoice.invoice}`, debit: invoice.grandTotal, credit: 0, balance: invoice.balanceAmount ?? invoice.grandTotal }, client);
            await query('UPDATE claims SET status=$1,outcome=$2,repair_invoice_no=$3,repair_labor=$4,repair_elec=$5,replaced_comp=$6,notes=$7 WHERE claim=$8', [status, outcome, invoice.invoice, data.repairLabor || 0, data.repairElec || 0, data.replacedComp || 'None', data.notes || '', claim], client);
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
