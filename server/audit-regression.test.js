const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');
const routes = read('routes.js');
const server = read('server.js');
const db = read('db.js');
const sheetsSync = read('sheetsSync.js');
const testApi = read('test-api.js');
const frontend = fs.readFileSync(path.join(__dirname, '..', 'web-preview', 'app.js'), 'utf8');

assert.match(routes, /return \{ id, serial: null \}/);
assert.doesNotMatch(routes, /return \{ id, serial \}/);
assert.doesNotMatch(routes, /\], \[\], client\);/);
assert.match(routes, /const paidAmount = assertPaymentAmount\(totals\.grandTotal, invoice\.paidAmount\)/);
assert.match(routes, /const currentBalance = await partyBalance\(calculatedInvoice\.party, client\)/);
assert.match(routes, /Invoices cannot be deleted/);

assert.doesNotMatch(sheetsSync, /\bdb\.prepare\s*\(/);
assert.match(sheetsSync, /await query\(/);
assert.match(sheetsSync, /GOOGLE_SHEETS_SYNC_SECRET/);

assert.match(server, /STAFF_PASSWORD\.startsWith\('\$2'\)/);
assert.match(server, /express\.json\(\{ limit: '1mb' \}\)/);
assert.match(server, /app\.use\('\/api\/migrate', express\.json\(\{ limit: '50mb' \}\)\)/);
assert.match(db, /rejectUnauthorized: true/);
assert.doesNotMatch(db, /rejectUnauthorized: false/);

assert.match(testApi, /sessionCookie/);
assert.doesNotMatch(testApi, /const API_KEY/);
assert.match(frontend, /igstAmount: invoiceTotals\.igstAmount/);
assert.match(frontend, /form\.dataset\.submitting/);
assert.match(frontend, /function escapeHtml/);
assert.match(frontend, /payload\.sheetName && Array\.isArray\(payload\.data\)/);

console.log('audit-regression.test.js passed');
