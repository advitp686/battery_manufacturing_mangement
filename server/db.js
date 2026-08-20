const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required. Configure Neon PostgreSQL before starting the server.');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.DB_POOL_MAX || 10),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

const TABLES = [
    'components', 'models', 'model_bom', 'inventory', 'production', 'dealers', 'sales',
    'invoices', 'invoice_items', 'ledger', 'warranties', 'claims', 'suppliers',
    'supplier_ledger', 'purchase_bills', 'purchase_bill_items', 'vehicle_models',
    'vehicles', 'vehicle_invoices', 'bank_accounts', 'system_settings', 'sync_log', 'auth_users'
];

async function initDatabase() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS components (
            id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT, spec TEXT,
            price NUMERIC DEFAULT 0, supplier TEXT, hsn TEXT,
            cgst_rate NUMERIC DEFAULT 0, sgst_rate NUMERIC DEFAULT 0, igst_rate NUMERIC DEFAULT 0, other_tax_rate NUMERIC DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS models (
            code TEXT PRIMARY KEY, name TEXT NOT NULL, chemistry TEXT, config TEXT,
            capacity TEXT, warranty TEXT, warranty_months INTEGER DEFAULT 24,
            warranty_activation_rule TEXT DEFAULT 'sale_type_default', status TEXT DEFAULT 'Active'
        );
        CREATE TABLE IF NOT EXISTS model_bom (
            id BIGSERIAL PRIMARY KEY, model_code TEXT NOT NULL REFERENCES models(code) ON DELETE CASCADE,
            component_id TEXT, name TEXT, category TEXT, qty NUMERIC, unit_price NUMERIC
        );
        CREATE TABLE IF NOT EXISTS inventory (
            batch TEXT PRIMARY KEY, material TEXT, category TEXT, supplier TEXT, received TEXT,
            available TEXT, location TEXT, health TEXT DEFAULT 'Good', unit_price NUMERIC DEFAULT 0,
            hsn TEXT, gst_rate NUMERIC DEFAULT 0, bill_no TEXT, eway_bill_no TEXT
        );
        CREATE TABLE IF NOT EXISTS production (
            id TEXT PRIMARY KEY, model TEXT, operator TEXT, built TEXT, qc TEXT DEFAULT 'Awaiting',
            serial TEXT UNIQUE, status TEXT DEFAULT 'In QC'
        );
        CREATE TABLE IF NOT EXISTS dealers (
            id TEXT PRIMARY KEY, name TEXT NOT NULL, title TEXT, contact_person TEXT, gst_type TEXT,
            gstin TEXT, pan TEXT, phone TEXT, address TEXT, city TEXT, state TEXT, pin TEXT,
            credit_limit NUMERIC DEFAULT 0, credit_days INTEGER DEFAULT 0, opening_balance NUMERIC DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS sales (
            id BIGSERIAL PRIMARY KEY, invoice TEXT NOT NULL, pack TEXT, party TEXT, type TEXT, gstin TEXT, date TEXT, warranty TEXT,
            amount NUMERIC DEFAULT 0, "desc" TEXT, status TEXT DEFAULT 'Active', cancel_reason TEXT, cancelled_at TEXT
        );
        CREATE TABLE IF NOT EXISTS invoices (
            invoice TEXT PRIMARY KEY, date TEXT, party TEXT, father_name TEXT, phone TEXT, address TEXT,
            vehicle TEXT, type TEXT, party_state TEXT, tax_mode TEXT, taxable_value NUMERIC, total_gst NUMERIC,
            cgst_rate NUMERIC, cgst_amount NUMERIC, sgst_rate NUMERIC, sgst_amount NUMERIC,
            igst_rate NUMERIC, igst_amount NUMERIC, cess_amount NUMERIC DEFAULT 0, grand_total NUMERIC,
            amount_in_words TEXT, paid_amount NUMERIC DEFAULT 0, balance_amount NUMERIC DEFAULT 0, warranty_status TEXT
        );
        CREATE TABLE IF NOT EXISTS invoice_items (
            id BIGSERIAL PRIMARY KEY, invoice_no TEXT NOT NULL REFERENCES invoices(invoice) ON DELETE CASCADE,
            sr INTEGER, "desc" TEXT, pack_serial TEXT, hsn TEXT, chassis_vin TEXT, engine_motor TEXT,
            color TEXT, key_controller TEXT, wrc_no TEXT, charger_info TEXT, battery_info TEXT,
            qty NUMERIC, price NUMERIC, amount NUMERIC,
            gst_rate NUMERIC DEFAULT 0, gst_amount NUMERIC DEFAULT 0,
            cgst_amount NUMERIC DEFAULT 0, sgst_amount NUMERIC DEFAULT 0,
            igst_amount NUMERIC DEFAULT 0, cess_amount NUMERIC DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS ledger (
            id TEXT PRIMARY KEY, date TEXT, party TEXT, party_type TEXT, ref TEXT, "desc" TEXT,
            debit NUMERIC DEFAULT 0, credit NUMERIC DEFAULT 0, balance NUMERIC DEFAULT 0, bank_account TEXT
        );
        CREATE TABLE IF NOT EXISTS warranties (
            pack TEXT PRIMARY KEY, customer TEXT, registered TEXT, "end" TEXT, status TEXT DEFAULT 'Active',
            term_months INTEGER DEFAULT 24, activation_rule TEXT DEFAULT 'sale_type_default', activation_date TEXT
        );
        CREATE TABLE IF NOT EXISTS claims (
            claim TEXT PRIMARY KEY, pack TEXT, customer TEXT, issue TEXT, opened TEXT, outcome TEXT,
            status TEXT DEFAULT 'Open', replaced_with TEXT, replaced_comp TEXT, repair_labor NUMERIC DEFAULT 0,
            repair_elec NUMERIC DEFAULT 0, repair_invoice_no TEXT
        );
        CREATE TABLE IF NOT EXISTS suppliers (
            id TEXT PRIMARY KEY, name TEXT NOT NULL, contact_person TEXT, phone TEXT, gstin TEXT,
            address TEXT, state TEXT, category TEXT
        );
        CREATE TABLE IF NOT EXISTS supplier_ledger (
            id TEXT PRIMARY KEY, date TEXT, supplier TEXT, ref TEXT, "desc" TEXT,
            debit NUMERIC DEFAULT 0, credit NUMERIC DEFAULT 0, balance NUMERIC DEFAULT 0, bank_account TEXT
        );
        CREATE TABLE IF NOT EXISTS purchase_bills (
            id TEXT PRIMARY KEY, bill_no TEXT NOT NULL, bill_date TEXT, eway_bill_no TEXT, supplier TEXT, vendor_gstin TEXT,
            taxable_value NUMERIC DEFAULT 0, cgst_amount NUMERIC DEFAULT 0, sgst_amount NUMERIC DEFAULT 0, igst_amount NUMERIC DEFAULT 0,
            other_amount NUMERIC DEFAULT 0, vehicle_other_charges NUMERIC DEFAULT 0, tax_mode TEXT DEFAULT 'INTRA', grand_total NUMERIC DEFAULT 0,
            payment_status TEXT DEFAULT 'Unpaid', payment_percent NUMERIC DEFAULT 0, paid_amount NUMERIC DEFAULT 0, balance_amount NUMERIC DEFAULT 0, payment_mode TEXT
        );
        CREATE TABLE IF NOT EXISTS purchase_bill_items (
            id BIGSERIAL PRIMARY KEY, bill_id TEXT NOT NULL REFERENCES purchase_bills(id) ON DELETE CASCADE,
            component_id TEXT, name TEXT, category TEXT, qty NUMERIC, unit_price NUMERIC, hsn TEXT,
            cgst_rate NUMERIC DEFAULT 0, sgst_rate NUMERIC DEFAULT 0, igst_rate NUMERIC DEFAULT 0, other_rate NUMERIC DEFAULT 0,
            taxable_value NUMERIC DEFAULT 0, cgst_amount NUMERIC DEFAULT 0, sgst_amount NUMERIC DEFAULT 0, igst_amount NUMERIC DEFAULT 0,
            other_amount NUMERIC DEFAULT 0, model_no TEXT, chassis_no TEXT, motor_no TEXT,
            controller_no TEXT, battery_serial TEXT, color TEXT, other_charges NUMERIC DEFAULT 0, remarks TEXT
        );
        CREATE TABLE IF NOT EXISTS vehicle_models (
            id TEXT PRIMARY KEY, name TEXT, type TEXT, motor TEXT, battery_spec TEXT, hsn TEXT,
            gst_rate NUMERIC, price NUMERIC
        );
        CREATE TABLE IF NOT EXISTS vehicles (
            chassis_no TEXT PRIMARY KEY, model TEXT, model_no TEXT, motor_no TEXT, controller_no TEXT, battery_serial TEXT, color TEXT,
            other_charges NUMERIC DEFAULT 0, remarks TEXT, price NUMERIC, purchase_bill_no TEXT, status TEXT DEFAULT 'Available in Showroom'
        );
        CREATE TABLE IF NOT EXISTS vehicle_invoices (
            invoice TEXT PRIMARY KEY, party TEXT, father_name TEXT, phone TEXT, address TEXT,
            party_state TEXT, type TEXT, date TEXT, model TEXT, chassis_no TEXT, motor_no TEXT,
            battery_serial TEXT, color TEXT, hsn TEXT, gst_rate NUMERIC DEFAULT 0,
            taxable_value NUMERIC, total_gst NUMERIC, cgst_amount NUMERIC DEFAULT 0,
            sgst_amount NUMERIC DEFAULT 0, igst_amount NUMERIC DEFAULT 0,
            grand_total NUMERIC, bank_account TEXT, paid_amount NUMERIC DEFAULT 0,
            balance_amount NUMERIC DEFAULT 0, status TEXT
        );
        CREATE TABLE IF NOT EXISTS bank_accounts (
            id TEXT PRIMARY KEY, bank_name TEXT, acc_type TEXT, acc_no TEXT, ifsc TEXT, branch TEXT,
            is_primary BOOLEAN DEFAULT FALSE
        );
        ALTER TABLE purchase_bills ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'Unpaid';
        ALTER TABLE purchase_bills ADD COLUMN IF NOT EXISTS payment_percent NUMERIC DEFAULT 0;
        ALTER TABLE purchase_bills ADD COLUMN IF NOT EXISTS paid_amount NUMERIC DEFAULT 0;
        ALTER TABLE purchase_bills ADD COLUMN IF NOT EXISTS balance_amount NUMERIC DEFAULT 0;
        ALTER TABLE purchase_bills ADD COLUMN IF NOT EXISTS payment_mode TEXT;
        ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS gst_rate NUMERIC DEFAULT 0;
        ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS gst_amount NUMERIC DEFAULT 0;
        ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS cgst_amount NUMERIC DEFAULT 0;
        ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS sgst_amount NUMERIC DEFAULT 0;
        ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS igst_amount NUMERIC DEFAULT 0;
        ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS cess_amount NUMERIC DEFAULT 0;
        ALTER TABLE vehicle_invoices ADD COLUMN IF NOT EXISTS gst_rate NUMERIC DEFAULT 0;
        ALTER TABLE vehicle_invoices ADD COLUMN IF NOT EXISTS cgst_amount NUMERIC DEFAULT 0;
        ALTER TABLE vehicle_invoices ADD COLUMN IF NOT EXISTS sgst_amount NUMERIC DEFAULT 0;
        ALTER TABLE vehicle_invoices ADD COLUMN IF NOT EXISTS igst_amount NUMERIC DEFAULT 0;
        CREATE TABLE IF NOT EXISTS system_settings (key TEXT PRIMARY KEY, value TEXT);
        CREATE TABLE IF NOT EXISTS sync_log (
            id BIGSERIAL PRIMARY KEY, table_name TEXT, record_count INTEGER, action TEXT,
            status TEXT, error TEXT, timestamp TEXT
        );
        CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS auth_users (
            username TEXT PRIMARY KEY, role TEXT NOT NULL, password_hash TEXT NOT NULL,
            active BOOLEAN NOT NULL DEFAULT TRUE, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_no ON invoice_items(invoice_no)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_model_bom_model_code ON model_bom(model_code)`);
    await pool.query(`ALTER TABLE sales ADD COLUMN IF NOT EXISTS amount NUMERIC DEFAULT 0`);
    await pool.query(`ALTER TABLE sales ADD COLUMN IF NOT EXISTS "desc" TEXT`);
    await pool.query(`ALTER TABLE sales ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active'`);
    await pool.query(`ALTER TABLE sales ADD COLUMN IF NOT EXISTS cancel_reason TEXT`);
    await pool.query(`ALTER TABLE sales ADD COLUMN IF NOT EXISTS cancelled_at TEXT`);
    await pool.query(`ALTER TABLE claims ADD COLUMN IF NOT EXISTS notes TEXT`);
    await pool.query(`ALTER TABLE components ADD COLUMN IF NOT EXISTS cgst_rate NUMERIC DEFAULT 0`);
    await pool.query(`ALTER TABLE purchase_bills ADD COLUMN IF NOT EXISTS cgst_amount NUMERIC DEFAULT 0`);
    await pool.query(`ALTER TABLE purchase_bills ADD COLUMN IF NOT EXISTS tax_mode TEXT DEFAULT 'INTRA'`);
    await pool.query(`ALTER TABLE purchase_bills ADD COLUMN IF NOT EXISTS vehicle_other_charges NUMERIC DEFAULT 0`);
    await pool.query(`ALTER TABLE purchase_bills ADD COLUMN IF NOT EXISTS vendor_gstin TEXT`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS cgst_rate NUMERIC DEFAULT 0`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS cgst_amount NUMERIC DEFAULT 0`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS model_no TEXT`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS chassis_no TEXT`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS motor_no TEXT`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS controller_no TEXT`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS battery_serial TEXT`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS color TEXT`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS other_charges NUMERIC DEFAULT 0`);
    await pool.query(`ALTER TABLE purchase_bill_items ADD COLUMN IF NOT EXISTS remarks TEXT`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS model_no TEXT`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS controller_no TEXT`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS other_charges NUMERIC DEFAULT 0`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS remarks TEXT`);
    await pool.query(`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS purchase_bill_no TEXT`);
    await pool.query(`ALTER TABLE sales ADD COLUMN IF NOT EXISTS id BIGSERIAL`);
    await pool.query(`ALTER TABLE ledger ADD COLUMN IF NOT EXISTS receipt_no TEXT`);
    await pool.query(`ALTER TABLE ledger ADD COLUMN IF NOT EXISTS receipt_type TEXT`);
    await pool.query(`ALTER TABLE ledger ADD COLUMN IF NOT EXISTS transaction_ref TEXT`);
    await pool.query(`ALTER TABLE ledger ADD COLUMN IF NOT EXISTS amount_in_words TEXT`);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_ledger_receipt_no ON ledger(receipt_no) WHERE receipt_no IS NOT NULL`);
    await pool.query(`ALTER TABLE models ADD COLUMN IF NOT EXISTS warranty_months INTEGER DEFAULT 24`);
    await pool.query(`ALTER TABLE models ADD COLUMN IF NOT EXISTS warranty_activation_rule TEXT DEFAULT 'sale_type_default'`);
    await pool.query(`ALTER TABLE warranties ADD COLUMN IF NOT EXISTS term_months INTEGER DEFAULT 24`);
    await pool.query(`ALTER TABLE warranties ADD COLUMN IF NOT EXISTS activation_rule TEXT DEFAULT 'sale_type_default'`);
    await pool.query(`ALTER TABLE warranties ADD COLUMN IF NOT EXISTS activation_date TEXT`);
    await pool.query(`
        DO $$ BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'components_price_nonnegative') THEN
                ALTER TABLE components ADD CONSTRAINT components_price_nonnegative CHECK (price >= 0);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'components_tax_rates_valid') THEN
                ALTER TABLE components ADD CONSTRAINT components_tax_rates_valid CHECK (
                    cgst_rate BETWEEN 0 AND 100 AND sgst_rate BETWEEN 0 AND 100 AND
                    igst_rate BETWEEN 0 AND 100 AND other_tax_rate BETWEEN 0 AND 100
                );
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'models_warranty_months_valid') THEN
                ALTER TABLE models ADD CONSTRAINT models_warranty_months_valid CHECK (warranty_months BETWEEN 1 AND 120);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'warranties_term_months_valid') THEN
                ALTER TABLE warranties ADD CONSTRAINT warranties_term_months_valid CHECK (term_months BETWEEN 1 AND 120);
            END IF;
        END $$;
    `);
    await pool.query(`ALTER TABLE sales DROP CONSTRAINT IF EXISTS sales_pkey`);
    await pool.query(`ALTER TABLE sales ADD CONSTRAINT sales_pkey PRIMARY KEY (id)`);
}

function toSnake(str) { return str.replace(/[A-Z]/g, l => '_' + l.toLowerCase()); }
function toCamel(str) { return str.replace(/_([a-z])/g, (_, l) => l.toUpperCase()); }
function keysToSnake(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [toSnake(k), v]));
}
function keysToCamel(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [toCamel(k), v]));
}
function assertTable(table) { if (!TABLES.includes(table)) throw new Error(`Unsupported table: ${table}`); }
function assertColumns(obj) {
    for (const key of Object.keys(obj)) if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) throw new Error(`Invalid column: ${key}`);
}

async function query(text, params = [], client = pool) { return client.query(text, params); }
async function getAll(table, client = pool) {
    assertTable(table); const result = await query(`SELECT * FROM "${table}"`, [], client); return result.rows.map(keysToCamel);
}
async function getById(table, pkCol, id, client = pool) {
    assertTable(table); const result = await query(`SELECT * FROM "${table}" WHERE "${pkCol}" = $1`, [id], client);
    return result.rows[0] ? keysToCamel(result.rows[0]) : null;
}
async function insert(table, obj, client = pool) {
    assertTable(table); const row = keysToSnake(obj); assertColumns(row); const keys = Object.keys(row);
    if (!keys.length) throw new Error('Cannot insert an empty record');
    const values = Object.values(row); const params = values.map((_, i) => `$${i + 1}`).join(',');
    const result = await query(`INSERT INTO "${table}" (${keys.map(k => `"${k}"`).join(',')}) VALUES (${params}) RETURNING *`, values, client);
    return result.rows[0];
}
async function update(table, pkCol, id, obj, client = pool) {
    assertTable(table); const row = keysToSnake(obj); assertColumns(row); const keys = Object.keys(row);
    if (!keys.length) return { rowCount: 0 };
    const values = Object.values(row); const set = keys.map((k, i) => `"${k}" = $${i + 1}`).join(',');
    return query(`UPDATE "${table}" SET ${set} WHERE "${pkCol}" = $${values.length + 1}`, [...values, id], client);
}
async function remove(table, pkCol, id, client = pool) {
    assertTable(table); return query(`DELETE FROM "${table}" WHERE "${pkCol}" = $1`, [id], client);
}
async function withTransaction(callback) {
    const client = await pool.connect();
    try { await client.query('BEGIN'); const result = await callback(client); await client.query('COMMIT'); return result; }
    catch (error) { await client.query('ROLLBACK'); throw error; }
    finally { client.release(); }
}
async function getTotalRecords() {
    const tables = TABLES.filter(t => !['system_settings', 'sync_log'].includes(t));
    const entries = await Promise.all(tables.map(async table => [table, Number((await query(`SELECT COUNT(*)::int AS count FROM "${table}"`)).rows[0].count)]));
    const breakdown = Object.fromEntries(entries); return { total: entries.reduce((sum, [, count]) => sum + count, 0), tables: breakdown };
}

module.exports = { pool, query, initDatabase, getAll, getById, insert, update, remove, withTransaction, getTotalRecords, keysToSnake, keysToCamel, TABLES };
