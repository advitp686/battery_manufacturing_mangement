require('dotenv').config({ path: __dirname + '/.env' });
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { initDatabase, withTransaction, insert, query } = require('./db');

const sqlitePath = process.argv[2] || path.join(__dirname, '..', 'data', 'battery_mgmt.db');
const childTables = ['invoice_items', 'model_bom', 'purchase_bill_items'];
const tables = [
  'components', 'inventory', 'production', 'dealers', 'sales', 'ledger', 'warranties', 'claims',
  'suppliers', 'supplier_ledger', 'vehicle_models', 'vehicles', 'vehicle_invoices', 'bank_accounts',
  'purchase_bills', 'models', 'invoices'
];

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  if (!fs.existsSync(sqlitePath)) throw new Error(`SQLite file not found: ${sqlitePath}`);
  const sqlite = new Database(sqlitePath, { readonly: true });
  const rows = table => sqlite.prepare(`SELECT * FROM "${table}"`).all();
  const models = rows('models').map(model => ({ ...model, bom: rows('model_bom').filter(item => item.model_code === model.code) }));
  const invoices = rows('invoices').map(invoice => ({ ...invoice, items: rows('invoice_items').filter(item => item.invoice_no === invoice.invoice) }));
  const bills = rows('purchase_bills').map(bill => ({ ...bill, items: rows('purchase_bill_items').filter(item => item.bill_id === bill.id) }));
  const settings = Object.fromEntries(rows('system_settings').map(row => { try { return [row.key, JSON.parse(row.value)]; } catch { return [row.key, row.value]; } }));

  await initDatabase();
  await withTransaction(async client => {
    for (const table of [...childTables, ...tables]) await query(`DELETE FROM "${table}"`, [], client);
    await query('DELETE FROM system_settings', [], client);
    for (const table of tables.filter(t => !['models', 'invoices', 'purchase_bills'].includes(t))) {
      for (const row of rows(table)) await insert(table, row, client);
    }
    for (const model of models) {
      const { bom, ...data } = model; await insert('models', data, client);
      for (const item of bom) await insert('model_bom', item, client);
    }
    for (const invoice of invoices) {
      const { items, ...data } = invoice; await insert('invoices', data, client);
      for (const item of items) await insert('invoice_items', item, client);
    }
    for (const bill of bills) {
      const { items, ...data } = bill; await insert('purchase_bills', data, client);
      for (const item of items) await insert('purchase_bill_items', item, client);
    }
    for (const [key, value] of Object.entries(settings)) await insert('system_settings', { key, value: typeof value === 'object' ? JSON.stringify(value) : String(value) }, client);
    await query("INSERT INTO app_meta(key,value) VALUES ('state_version','1') ON CONFLICT(key) DO UPDATE SET value='1'", [], client);
  });
  sqlite.close();
  console.log(JSON.stringify({ success: true, source: sqlitePath, models: models.length, invoices: invoices.length, purchaseBills: bills.length }));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
