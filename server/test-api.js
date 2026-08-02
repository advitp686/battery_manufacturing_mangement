const http = require('http');

const API_KEY = 'lithynova-factory-2024';
const BASE_URL = 'http://localhost:4173';

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
        ...headers,
      },
    };

    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let parsed;
        try {
          parsed = data ? JSON.parse(data) : {};
        } catch (e) {
          parsed = data;
        }
        resolve({ statusCode: res.statusCode, body: parsed });
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Running Lithynova SQLite API Verification Suite...\n');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (e) {
      console.error(`  ❌ FAIL: ${name}\n     Error: ${e.message}`);
      failed++;
    }
  }

  // 1. Health check (no key required)
  await test('GET /api/health returns 200 OK', async () => {
    const res = await request('GET', '/api/health', null, { 'X-API-Key': '' });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (res.body.status !== 'ok') throw new Error(`Unexpected body: ${JSON.stringify(res.body)}`);
  });

  // 2. Authentication check
  await test('GET /api/components without valid API Key returns 401', async () => {
    const res = await request('GET', '/api/components', null, { 'X-API-Key': 'wrong-key' });
    if (res.statusCode !== 401) throw new Error(`Expected 401, got ${res.statusCode}`);
  });

  // 3. Components CRUD
  const testComp = {
    id: 'TEST-CMP-999',
    name: 'Test 18650 Battery Cell',
    category: 'Cell',
    spec: '3.7V 2500mAh',
    price: 150,
    supplier: 'Test Supplier Co.',
  };

  await test('POST /api/components creates new component', async () => {
    const res = await request('POST', '/api/components', testComp);
    if (res.statusCode !== 201) throw new Error(`Status ${res.statusCode}: ${JSON.stringify(res.body)}`);
  });

  await test('GET /api/components fetches components including created one', async () => {
    const res = await request('GET', '/api/components');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    const found = res.body.find((c) => c.id === testComp.id);
    if (!found) throw new Error('Component not found in list');
    if (found.name !== testComp.name) throw new Error('Field mismatch');
  });

  await test('PUT /api/components/:id updates component', async () => {
    const updated = { ...testComp, price: 180 };
    const res = await request('PUT', `/api/components/${testComp.id}`, updated);
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
  });

  await test('DELETE /api/components/:id removes component', async () => {
    const res = await request('DELETE', `/api/components/${testComp.id}`);
    if (res.statusCode !== 204) throw new Error(`Status ${res.statusCode}`);
  });

  // 4. Models & BOM
  const testModel = {
    code: 'TEST-MODEL-01',
    name: 'Test Battery 24V',
    chemistry: 'LFP',
    config: '8S 1P',
    capacity: '50Ah',
    warranty: '12 Months',
    status: 'Active',
    bom: [
      { componentId: 'CMP-001', name: 'DALY BMS', category: 'BMS', qty: 1, unitPrice: 3400 },
    ],
  };

  await test('POST /api/models creates model with embedded BOM', async () => {
    const res = await request('POST', '/api/models', testModel);
    if (res.statusCode !== 201) throw new Error(`Status ${res.statusCode}: ${JSON.stringify(res.body)}`);
  });

  await test('GET /api/models returns model with re-embedded BOM', async () => {
    const res = await request('GET', '/api/models');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    const found = res.body.find((m) => m.code === testModel.code);
    if (!found) throw new Error('Model not found');
    if (!Array.isArray(found.bom) || found.bom.length !== 1) throw new Error('BOM re-embedding failed');
  });

  await test('DELETE /api/models/:code removes model and cascades BOM', async () => {
    const res = await request('DELETE', `/api/models/${testModel.code}`);
    if (res.statusCode !== 204) throw new Error(`Status ${res.statusCode}`);
  });

  // 5. System Settings
  await test('PUT /api/settings and GET /api/settings', async () => {
    const settingsPayload = { companyName: 'Lithynova Test Factory', gstRate: 18 };
    const putRes = await request('PUT', '/api/settings', settingsPayload);
    if (putRes.statusCode !== 200) throw new Error(`PUT Status ${putRes.statusCode}`);

    const getRes = await request('GET', '/api/settings');
    if (getRes.statusCode !== 200) throw new Error(`GET Status ${getRes.statusCode}`);
    if (getRes.body.companyName !== settingsPayload.companyName) throw new Error('Settings mismatch');
  });

  // 6. Backup endpoint
  await test('POST /api/backup creates database backup file', async () => {
    const res = await request('POST', '/api/backup');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.success) throw new Error('Backup failed');
  });

  console.log(`\n========================================`);
  console.log(`Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
