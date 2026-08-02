const express = require('express');
const router = express.Router();
const { db, getAll, getById, insert, update, remove, getTotalRecords, keysToCamel, keysToSnake } = require('./db');

// --- SPECIAL CASES ---

// 1. GET /api/models - join with model_bom
router.get('/api/models', (req, res) => {
    try {
        const models = getAll('models');
        const allBom = db.prepare('SELECT * FROM model_bom').all();
        models.forEach(m => {
            m.bom = allBom.filter(b => b.model_code === m.code).map(keysToCamel);
        });
        res.json(models);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. POST /api/models - extract bom array and insert
router.post('/api/models', (req, res) => {
    try {
        const { bom, ...modelData } = req.body;
        const insertModel = db.transaction(() => {
            insert('models', modelData);
            if (bom && bom.length) {
                bom.forEach(b => insert('model_bom', { ...b, modelCode: modelData.code }));
            }
        });
        insertModel();
        res.status(201).json({ ...modelData, bom: bom || [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. PUT /api/models/:code - replace BOM entries
router.put('/api/models/:code', (req, res) => {
    try {
        const code = req.params.code;
        const { bom, ...modelData } = req.body;
        const updateModel = db.transaction(() => {
            update('models', 'code', code, modelData);
            if (bom) {
                // Delete existing and insert new
                db.prepare('DELETE FROM model_bom WHERE model_code = ?').run(code);
                bom.forEach(b => insert('model_bom', { ...b, modelCode: code }));
            }
        });
        updateModel();
        res.json({ ...modelData, bom: bom || [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/api/models/:code', (req, res) => {
    try {
        remove('models', 'code', req.params.code);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. GET /api/invoices - join with invoice_items
router.get('/api/invoices', (req, res) => {
    try {
        const invoices = getAll('invoices');
        const allItems = db.prepare('SELECT * FROM invoice_items').all();
        invoices.forEach(inv => {
            inv.items = allItems.filter(item => item.invoice_no === inv.invoice).map(keysToCamel);
        });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. POST /api/invoices - extract items array and insert
router.post('/api/invoices', (req, res) => {
    try {
        const { items, ...invoiceData } = req.body;
        const insertInvoice = db.transaction(() => {
            insert('invoices', invoiceData);
            if (items && items.length) {
                items.forEach(item => insert('invoice_items', { ...item, invoiceNo: invoiceData.invoice }));
            }
        });
        insertInvoice();
        res.status(201).json({ ...invoiceData, items: items || [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. PUT /api/invoices/:invoice - replace items entries
router.put('/api/invoices/:invoice', (req, res) => {
    try {
        const invoiceId = req.params.invoice;
        const { items, ...invoiceData } = req.body;
        const updateInvoice = db.transaction(() => {
            update('invoices', 'invoice', invoiceId, invoiceData);
            if (items) {
                db.prepare('DELETE FROM invoice_items WHERE invoice_no = ?').run(invoiceId);
                items.forEach(item => insert('invoice_items', { ...item, invoiceNo: invoiceId }));
            }
        });
        updateInvoice();
        res.json({ ...invoiceData, items: items || [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. DELETE /api/invoices/:invoice - Cascade deletes items via FK
router.delete('/api/invoices/:invoice', (req, res) => {
    try {
        remove('invoices', 'invoice', req.params.invoice);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 8. POST /api/migrate - Import whole state
router.post('/api/migrate', (req, res) => {
    try {
        const state = req.body;
        const tables = [
            'components', 'inventory', 'production', 'dealers', 'sales',
            'ledger', 'warranties', 'claims', 'suppliers', 'supplier_ledger',
            'vehicle_models', 'vehicles', 'vehicle_invoices', 'bank_accounts'
        ];

        let counts = {};

        const migrateTx = db.transaction(() => {
            // Standard tables
            for (const table of tables) {
                if (state[table] && Array.isArray(state[table])) {
                    // Clear existing
                    db.prepare(`DELETE FROM ${table}`).run();
                    state[table].forEach(item => insert(table, item));
                    counts[table] = state[table].length;
                }
            }
            
            // Models and BOM
            if (state.models && Array.isArray(state.models)) {
                db.prepare('DELETE FROM model_bom').run();
                db.prepare('DELETE FROM models').run();
                let bomCount = 0;
                state.models.forEach(model => {
                    const { bom, ...modelData } = model;
                    insert('models', modelData);
                    if (bom && Array.isArray(bom)) {
                        bom.forEach(b => {
                            insert('model_bom', { ...b, modelCode: modelData.code });
                            bomCount++;
                        });
                    }
                });
                counts.models = state.models.length;
                counts.model_bom = bomCount;
            }

            // Invoices and Items
            if (state.invoices && Array.isArray(state.invoices)) {
                db.prepare('DELETE FROM invoice_items').run();
                db.prepare('DELETE FROM invoices').run();
                let itemCount = 0;
                state.invoices.forEach(inv => {
                    const { items, ...invData } = inv;
                    insert('invoices', invData);
                    if (items && Array.isArray(items)) {
                        items.forEach(i => {
                            insert('invoice_items', { ...i, invoiceNo: invData.invoice });
                            itemCount++;
                        });
                    }
                });
                counts.invoices = state.invoices.length;
                counts.invoice_items = itemCount;
            }

            // System Settings
            if (state.settings && typeof state.settings === 'object') {
                db.prepare('DELETE FROM system_settings').run();
                const stmt = db.prepare('INSERT INTO system_settings (key, value) VALUES (?, ?)');
                Object.entries(state.settings).forEach(([key, value]) => {
                    stmt.run(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
                });
                counts.settings = Object.keys(state.settings).length;
            }
        });
        
        migrateTx();
        res.json({ success: true, counts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 9. GET /api/settings - Return single object
router.get('/api/settings', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM system_settings').all();
        const settings = {};
        rows.forEach(row => {
            try {
                settings[row.key] = JSON.parse(row.value);
            } catch (e) {
                settings[row.key] = row.value;
            }
        });
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 10. PUT /api/settings - Upsert settings
router.put('/api/settings', (req, res) => {
    try {
        const settings = req.body;
        const updateSettingsTx = db.transaction(() => {
            const stmt = db.prepare('INSERT INTO system_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value');
            Object.entries(settings).forEach(([key, value]) => {
                stmt.run(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
            });
        });
        updateSettingsTx();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 11. GET /api/health
router.get('/api/health', (req, res) => {
    try {
        const recordsInfo = getTotalRecords();
        res.json({
            status: 'ok',
            totalRecords: recordsInfo.total,
            tables: recordsInfo.tables
        });
    } catch (error) {
        res.status(500).json({ error: error.message, status: 'error' });
    }
});

// 12. POST /api/backup
router.post('/api/backup', (req, res) => {
    try {
        const { createBackup } = require('./backup');
        const result = createBackup();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 13. POST /api/sync/backup-now
router.post('/api/sync/backup-now', async (req, res) => {
    try {
        const { syncAllTables } = require('./sheetsSync');
        const result = await syncAllTables();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 14. GET /api/sync/status
router.get('/api/sync/status', (req, res) => {
    try {
        const logs = db.prepare('SELECT * FROM sync_log ORDER BY id DESC LIMIT 50').all();
        res.json(logs.map(keysToCamel));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 15. POST /api/sync-state — Accept full state object from browser's saveState()
// This mirrors the localStorage.setItem('voltforge_state_v3', JSON.stringify(state)) pattern
router.post('/api/sync-state', (req, res) => {
    try {
        const state = req.body;
        if (!state || typeof state !== 'object') {
            return res.status(400).json({ error: 'Invalid state object' });
        }

        // Map of state keys to { table, pk } — simple flat arrays
        const simpleMap = {
            components: { table: 'components', pk: 'id' },
            inventory: { table: 'inventory', pk: 'batch' },
            production: { table: 'production', pk: 'id' },
            dealers: { table: 'dealers', pk: 'id' },
            sales: { table: 'sales', pk: 'invoice' },
            ledger: { table: 'ledger', pk: 'id' },
            warranties: { table: 'warranties', pk: 'pack' },
            claims: { table: 'claims', pk: 'claim' },
            suppliers: { table: 'suppliers', pk: 'id' },
            supplierLedger: { table: 'supplier_ledger', pk: 'id' },
            vehicleModels: { table: 'vehicle_models', pk: 'id' },
            vehicles: { table: 'vehicles', pk: 'chassis_no' },
            vehicleInvoices: { table: 'vehicle_invoices', pk: 'invoice' },
            bankAccounts: { table: 'bank_accounts', pk: 'id' }
        };

        const syncTx = db.transaction(() => {
            // Sync simple entities — clear and re-insert
            for (const [stateKey, { table }] of Object.entries(simpleMap)) {
                if (state[stateKey] && Array.isArray(state[stateKey])) {
                    db.prepare(`DELETE FROM ${table}`).run();
                    state[stateKey].forEach(row => {
                        try { insert(table, row); } catch (e) { /* skip bad rows */ }
                    });
                }
            }

            // Models with embedded BOM
            if (state.models && Array.isArray(state.models)) {
                db.prepare('DELETE FROM model_bom').run();
                db.prepare('DELETE FROM models').run();
                state.models.forEach(model => {
                    const { bom, ...modelData } = model;
                    try {
                        insert('models', modelData);
                        if (bom && Array.isArray(bom)) {
                            bom.forEach(b => {
                                try { insert('model_bom', { ...b, modelCode: modelData.code }); } catch (e) {}
                            });
                        }
                    } catch (e) { /* skip bad rows */ }
                });
            }

            // Invoices with embedded items
            if (state.invoices && Array.isArray(state.invoices)) {
                db.prepare('DELETE FROM invoice_items').run();
                db.prepare('DELETE FROM invoices').run();
                state.invoices.forEach(inv => {
                    const { items, ...invData } = inv;
                    try {
                        insert('invoices', invData);
                        if (items && Array.isArray(items)) {
                            items.forEach(item => {
                                try { insert('invoice_items', { ...item, invoiceNo: invData.invoice }); } catch (e) {}
                            });
                        }
                    } catch (e) { /* skip bad rows */ }
                });
            }
        });

        syncTx();
        res.json({ success: true, timestamp: new Date().toISOString() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 16. GET /api/load-state — Return full state object matching browser's state structure
router.get('/api/load-state', (req, res) => {
    try {
        // Simple entities
        const stateObj = {
            components: getAll('components'),
            inventory: getAll('inventory'),
            production: getAll('production'),
            dealers: getAll('dealers'),
            sales: getAll('sales'),
            ledger: getAll('ledger'),
            warranties: getAll('warranties'),
            claims: getAll('claims'),
            suppliers: getAll('suppliers'),
            supplierLedger: getAll('supplier_ledger'),
            vehicleModels: getAll('vehicle_models'),
            vehicles: getAll('vehicles'),
            vehicleInvoices: getAll('vehicle_invoices'),
            bankAccounts: getAll('bank_accounts')
        };

        // Models with embedded BOM
        const models = getAll('models');
        const allBom = db.prepare('SELECT * FROM model_bom').all().map(keysToCamel);
        models.forEach(m => {
            m.bom = allBom.filter(b => b.modelCode === m.code);
        });
        stateObj.models = models;

        // Invoices with embedded items
        const invoices = getAll('invoices');
        const allItems = db.prepare('SELECT * FROM invoice_items').all().map(keysToCamel);
        invoices.forEach(inv => {
            inv.items = allItems.filter(i => i.invoiceNo === inv.invoice);
        });
        stateObj.invoices = invoices;

        res.json(stateObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- SIMPLE ENTITIES (REST PATTERNS) ---
const simpleEntities = [
    { table: 'components', pk: 'id', path: '/api/components' },
    { table: 'inventory', pk: 'batch', path: '/api/inventory' },
    { table: 'production', pk: 'id', path: '/api/production' },
    { table: 'dealers', pk: 'id', path: '/api/dealers' },
    { table: 'sales', pk: 'invoice', path: '/api/sales' },
    { table: 'ledger', pk: 'id', path: '/api/ledger' },
    { table: 'warranties', pk: 'pack', path: '/api/warranties' },
    { table: 'claims', pk: 'claim', path: '/api/claims' },
    { table: 'suppliers', pk: 'id', path: '/api/suppliers' },
    { table: 'supplier_ledger', pk: 'id', path: '/api/supplier-ledger' },
    { table: 'vehicle_models', pk: 'id', path: '/api/vehicle-models' },
    { table: 'vehicles', pk: 'chassis_no', path: '/api/vehicles' },
    { table: 'vehicle_invoices', pk: 'invoice', path: '/api/vehicle-invoices' },
    { table: 'bank_accounts', pk: 'id', path: '/api/bank-accounts' }
];

simpleEntities.forEach(entity => {
    // GET
    router.get(entity.path, (req, res) => {
        try {
            res.json(getAll(entity.table));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // POST
    router.post(entity.path, (req, res) => {
        try {
            insert(entity.table, req.body);
            res.status(201).json(req.body);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // PUT
    router.put(`${entity.path}/:id`, (req, res) => {
        try {
            update(entity.table, entity.pk, req.params.id, req.body);
            res.json(req.body);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // DELETE
    router.delete(`${entity.path}/:id`, (req, res) => {
        try {
            remove(entity.table, entity.pk, req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
});

module.exports = router;
