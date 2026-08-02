const { db, getAll } = require('./db');

const TABLE_SHEET_MAP = {
    components: 'Raw Materials Catalog',
    models: 'Battery Models & BOM',
    inventory: 'Stock Batches',
    production: 'Production & QC Logs',
    dealers: 'Dealers & Customers',
    sales: 'Sales Dispatches',
    invoices: 'Tax Invoices',
    ledger: 'Customer Ledger',
    warranties: 'Warranty Registry',
    claims: 'Warranty Claims',
    suppliers: 'Supplier Master',
    supplier_ledger: 'Supplier Ledger',
    vehicle_models: 'Vehicle Models',
    vehicles: 'Showroom Stock',
    vehicle_invoices: 'Vehicle Invoices',
    bank_accounts: 'Bank Accounts'
};

/**
 * Synchronizes all database tables to Google Sheets via webhook.
 * @returns {Promise<{success: boolean, error?: string, results?: Array<Object>}>} The sync result
 */
async function syncAllTables() {
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
        console.error('Google Sheets webhook URL is missing.');
        return { success: false, error: 'No webhook URL configured' };
    }
    
    const results = [];
    for (const [table, sheetName] of Object.entries(TABLE_SHEET_MAP)) {
        try {
            const rows = getAll(table);
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sheetName,
                    entityType: table,
                    data: rows,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const timestamp = new Date().toISOString();
            const logEntry = { 
                table_name: table, 
                record_count: rows.length, 
                action: 'full_sync', 
                status: 'success', 
                error: null, 
                timestamp 
            };
            
            db.prepare(
                'INSERT INTO sync_log (table_name, record_count, action, status, error, timestamp) VALUES (?, ?, ?, ?, ?, ?)'
            ).run(table, rows.length, 'full_sync', 'success', null, timestamp);
            
            results.push(logEntry);
        } catch (err) {
            console.error(`Error syncing table ${table}:`, err);
            const timestamp = new Date().toISOString();
            db.prepare(
                'INSERT INTO sync_log (table_name, record_count, action, status, error, timestamp) VALUES (?, ?, ?, ?, ?, ?)'
            ).run(table, 0, 'full_sync', 'failed', err.message, timestamp);
            
            results.push({ 
                table_name: table, 
                record_count: 0, 
                action: 'full_sync', 
                status: 'failed', 
                error: err.message,
                timestamp
            });
        }
    }
    return { success: true, results };
}

module.exports = { syncAllTables, TABLE_SHEET_MAP };
