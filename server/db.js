const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Open DB with better-sqlite3
const dbPath = path.join(dataDir, 'battery_mgmt.db');
const db = new Database(dbPath);

// Enable WAL and Foreign Keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create ALL 20 tables
db.exec(`
    CREATE TABLE IF NOT EXISTS components (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        spec TEXT,
        price REAL DEFAULT 0,
        supplier TEXT
    );

    CREATE TABLE IF NOT EXISTS models (
        code TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        chemistry TEXT,
        config TEXT,
        capacity TEXT,
        warranty TEXT,
        status TEXT DEFAULT 'Active'
    );

    CREATE TABLE IF NOT EXISTS model_bom (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        model_code TEXT NOT NULL REFERENCES models(code) ON DELETE CASCADE,
        component_id TEXT,
        name TEXT,
        category TEXT,
        qty REAL,
        unit_price REAL
    );

    CREATE TABLE IF NOT EXISTS inventory (
        batch TEXT PRIMARY KEY,
        material TEXT,
        category TEXT,
        supplier TEXT,
        received TEXT,
        available TEXT,
        location TEXT,
        health TEXT DEFAULT 'Good',
        unit_price REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS production (
        id TEXT PRIMARY KEY,
        model TEXT,
        operator TEXT,
        built TEXT,
        qc TEXT DEFAULT 'Awaiting',
        serial TEXT UNIQUE,
        status TEXT DEFAULT 'In QC'
    );

    CREATE TABLE IF NOT EXISTS dealers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT,
        contact_person TEXT,
        gst_type TEXT,
        gstin TEXT,
        pan TEXT,
        phone TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        pin TEXT,
        credit_limit REAL DEFAULT 0,
        credit_days INTEGER DEFAULT 0,
        opening_balance REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sales (
        invoice TEXT PRIMARY KEY,
        pack TEXT,
        party TEXT,
        type TEXT,
        gstin TEXT,
        date TEXT,
        warranty TEXT
    );

    CREATE TABLE IF NOT EXISTS invoices (
        invoice TEXT PRIMARY KEY,
        date TEXT,
        party TEXT,
        father_name TEXT,
        phone TEXT,
        address TEXT,
        vehicle TEXT,
        type TEXT,
        party_state TEXT,
        tax_mode TEXT,
        taxable_value REAL,
        total_gst REAL,
        cgst_rate REAL,
        cgst_amount REAL,
        sgst_rate REAL,
        sgst_amount REAL,
        igst_rate REAL,
        igst_amount REAL,
        cess_amount REAL DEFAULT 0,
        grand_total REAL,
        amount_in_words TEXT,
        paid_amount REAL DEFAULT 0,
        balance_amount REAL DEFAULT 0,
        warranty_status TEXT
    );

    CREATE TABLE IF NOT EXISTS invoice_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice_no TEXT NOT NULL REFERENCES invoices(invoice) ON DELETE CASCADE,
        sr INTEGER,
        desc TEXT,
        pack_serial TEXT,
        hsn TEXT,
        chassis_vin TEXT,
        engine_motor TEXT,
        color TEXT,
        key_controller TEXT,
        wrc_no TEXT,
        charger_info TEXT,
        battery_info TEXT,
        qty REAL,
        price REAL,
        amount REAL
    );

    CREATE TABLE IF NOT EXISTS ledger (
        id TEXT PRIMARY KEY,
        date TEXT,
        party TEXT,
        party_type TEXT,
        ref TEXT,
        desc TEXT,
        debit REAL DEFAULT 0,
        credit REAL DEFAULT 0,
        balance REAL DEFAULT 0,
        bank_account TEXT
    );

    CREATE TABLE IF NOT EXISTS warranties (
        pack TEXT PRIMARY KEY,
        customer TEXT,
        registered TEXT,
        end TEXT,
        status TEXT DEFAULT 'Active'
    );

    CREATE TABLE IF NOT EXISTS claims (
        claim TEXT PRIMARY KEY,
        pack TEXT,
        customer TEXT,
        issue TEXT,
        opened TEXT,
        outcome TEXT,
        status TEXT DEFAULT 'Open',
        replaced_with TEXT,
        replaced_comp TEXT,
        repair_labor REAL DEFAULT 0,
        repair_elec REAL DEFAULT 0,
        repair_invoice_no TEXT
    );

    CREATE TABLE IF NOT EXISTS suppliers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        contact_person TEXT,
        phone TEXT,
        gstin TEXT,
        address TEXT,
        state TEXT,
        category TEXT
    );

    CREATE TABLE IF NOT EXISTS supplier_ledger (
        id TEXT PRIMARY KEY,
        date TEXT,
        supplier TEXT,
        ref TEXT,
        desc TEXT,
        debit REAL DEFAULT 0,
        credit REAL DEFAULT 0,
        balance REAL DEFAULT 0,
        bank_account TEXT
    );

    CREATE TABLE IF NOT EXISTS vehicle_models (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT,
        motor TEXT,
        battery_spec TEXT,
        hsn TEXT,
        gst_rate REAL,
        price REAL
    );

    CREATE TABLE IF NOT EXISTS vehicles (
        chassis_no TEXT PRIMARY KEY,
        model TEXT,
        motor_no TEXT,
        battery_serial TEXT,
        color TEXT,
        price REAL,
        status TEXT DEFAULT 'Available in Showroom'
    );

    CREATE TABLE IF NOT EXISTS vehicle_invoices (
        invoice TEXT PRIMARY KEY,
        party TEXT,
        father_name TEXT,
        phone TEXT,
        address TEXT,
        party_state TEXT,
        type TEXT,
        date TEXT,
        model TEXT,
        chassis_no TEXT,
        motor_no TEXT,
        battery_serial TEXT,
        color TEXT,
        hsn TEXT,
        taxable_value REAL,
        total_gst REAL,
        grand_total REAL,
        bank_account TEXT,
        paid_amount REAL DEFAULT 0,
        balance_amount REAL DEFAULT 0,
        status TEXT
    );

    CREATE TABLE IF NOT EXISTS bank_accounts (
        id TEXT PRIMARY KEY,
        bank_name TEXT,
        acc_type TEXT,
        acc_no TEXT,
        ifsc TEXT,
        branch TEXT,
        is_primary INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS system_settings (
        key TEXT PRIMARY KEY,
        value TEXT
    );

    CREATE TABLE IF NOT EXISTS sync_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_name TEXT,
        record_count INTEGER,
        action TEXT,
        status TEXT,
        error TEXT,
        timestamp TEXT
    );
`);

/**
 * Convert string from camelCase to snake_case
 * @param {string} str 
 * @returns {string}
 */
function toSnake(str) {
    return str.replace(/[A-Z]/g, l => '_' + l.toLowerCase());
}

/**
 * Convert string from snake_case to camelCase
 * @param {string} str 
 * @returns {string}
 */
function toCamel(str) {
    return str.replace(/_([a-z])/g, (_, l) => l.toUpperCase());
}

/**
 * Convert object keys from camelCase to snake_case
 * @param {Object} obj 
 * @returns {Object}
 */
function keysToSnake(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        result[toSnake(key)] = value;
    }
    return result;
}

/**
 * Convert object keys from snake_case to camelCase
 * @param {Object} obj 
 * @returns {Object}
 */
function keysToCamel(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        result[toCamel(key)] = value;
    }
    return result;
}

/**
 * Get all records from a table
 * @param {string} table 
 * @returns {Array<Object>}
 */
function getAll(table) {
    return db.prepare(`SELECT * FROM ${table}`).all().map(keysToCamel);
}

/**
 * Get a single record by primary key
 * @param {string} table 
 * @param {string} pkCol 
 * @param {string|number} id 
 * @returns {Object|null}
 */
function getById(table, pkCol, id) {
    const record = db.prepare(`SELECT * FROM ${table} WHERE "${pkCol}" = ?`).get(id);
    return record ? keysToCamel(record) : null;
}

/**
 * Insert a record into a table
 * @param {string} table 
 * @param {Object} obj 
 * @returns {Object} info object from sqlite
 */
function insert(table, obj) {
    const snakeObj = keysToSnake(obj);
    const keys = Object.keys(snakeObj);
    const quotedKeys = keys.map(k => `"${k}"`).join(',');
    const placeholders = keys.map(() => '?').join(',');
    const stmt = db.prepare(`INSERT INTO ${table} (${quotedKeys}) VALUES (${placeholders})`);
    return stmt.run(Object.values(snakeObj));
}

/**
 * Update a record in a table
 * @param {string} table 
 * @param {string} pkCol 
 * @param {string|number} id 
 * @param {Object} obj 
 * @returns {Object} info object from sqlite
 */
function update(table, pkCol, id, obj) {
    const snakeObj = keysToSnake(obj);
    const keys = Object.keys(snakeObj);
    if (keys.length === 0) return { changes: 0 };
    
    const setClause = keys.map(k => `"${k}" = ?`).join(',');
    const stmt = db.prepare(`UPDATE ${table} SET ${setClause} WHERE "${pkCol}" = ?`);
    return stmt.run([...Object.values(snakeObj), id]);
}

/**
 * Delete a record from a table
 * @param {string} table 
 * @param {string} pkCol 
 * @param {string|number} id 
 * @returns {Object} info object from sqlite
 */
function remove(table, pkCol, id) {
    return db.prepare(`DELETE FROM ${table} WHERE "${pkCol}" = ?`).run(id);
}

/**
 * Count total records across main entities
 * @returns {Object} total and breakdown
 */
function getTotalRecords() {
    const tables = [
        'components', 'models', 'model_bom', 'inventory', 'production',
        'dealers', 'sales', 'invoices', 'invoice_items', 'ledger',
        'warranties', 'claims', 'suppliers', 'supplier_ledger',
        'vehicle_models', 'vehicles', 'vehicle_invoices', 'bank_accounts'
    ];
    let total = 0;
    const breakdown = {};
    for (const table of tables) {
        const result = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get();
        breakdown[table] = result.count;
        total += result.count;
    }
    return { total, tables: breakdown };
}

module.exports = { 
    db, 
    getAll, 
    getById, 
    insert, 
    update, 
    remove, 
    getTotalRecords, 
    keysToSnake, 
    keysToCamel 
};
