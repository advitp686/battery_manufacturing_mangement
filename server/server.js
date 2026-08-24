require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcryptjs');
const path = require('path');
const routes = require('./routes');
const { pool, query, initDatabase } = require('./db');
const { ROLES, ROLE_LABELS, normalizeRole, assertKnownRole, hasPermission, permissionsForRole } = require('./access');

const app = express();
const PORT = process.env.PORT || 4173;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '';
const SESSION_SECRET = process.env.SESSION_SECRET || (process.env.NODE_ENV === 'production' ? undefined : 'local-development-session-secret');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? undefined : 'ChangeMe123!');
const STAFF_PASSWORD = process.env.STAFF_PASSWORD || (process.env.NODE_ENV === 'production' ? undefined : '');
const BATTERY_OPERATOR_PASSWORD = process.env.BATTERY_OPERATOR_PASSWORD || (process.env.NODE_ENV === 'production' ? undefined : '');
const loginAttempts = new Map();

if (process.env.NODE_ENV === 'production' && (!SESSION_SECRET || !ADMIN_PASSWORD)) {
    throw new Error('SESSION_SECRET and ADMIN_PASSWORD must be configured in production');
}

// Render terminates TLS at its reverse proxy. Trusting the first proxy lets
// Express recognise the original HTTPS request so express-session can set its
// secure cookie in production.
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

// The hosted frontend is served by this same Express process, so no CORS
// middleware is needed unless a separate frontend origin is configured.
if (CORS_ORIGIN) {
    const configuredOrigins = CORS_ORIGIN.split(',').map(value => value.trim()).filter(Boolean);
    app.use(cors({
        origin(origin, callback) {
            if (!origin || configuredOrigins.includes(origin)) return callback(null, true);
            return callback(new Error('Origin is not allowed by CORS'));
        },
        credentials: true
    }));
}
// Keep ordinary API requests small. The two bulk endpoints opt into the larger
// parser below before this default parser runs.
app.use('/api/migrate', express.json({ limit: '50mb' }));
app.use('/api/sync-state', express.json({ limit: '50mb' }));
app.use(express.json({ limit: '1mb' }));
app.use(session({
    store: new PgSession({ pool, tableName: 'user_sessions', createTableIfMissing: true }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 8 * 60 * 60 * 1000 }
}));

function sessionUser(account) {
    const role = normalizeRole(account?.role);
    return { username: account.username, role, label: ROLE_LABELS[role] || role, permissions: permissionsForRole(role) };
}

async function recordAudit(req, action, target = '', details = '') {
    try {
        await query('INSERT INTO audit_log(username, role, action, target, details, ip) VALUES ($1, $2, $3, $4, $5, $6)', [
            req.session.user?.username || 'anonymous', req.session.user?.role || '', action, target, details, req.ip || ''
        ]);
    } catch (error) {
        console.warn('Audit log notice:', error.message);
    }
}

const resourcePermission = {
    components: ['components.read', 'components.write'], models: ['models.read', 'models.write'], model_bom: ['models.read', 'models.write'],
    inventory: ['inventory.read', 'inventory.write'], production: ['production.read', 'production.write'], dealers: ['dealers.read', 'dealers.write'],
    sales: ['sales.read', 'sales.write'], invoices: ['sales.read', 'sales.write'], invoice_items: ['sales.read', 'sales.write'],
    ledger: ['finance.read', 'finance.write'], warranties: ['warranty.read', 'warranty.write'], claims: ['warranty.read', 'warranty.write'],
    suppliers: ['suppliers.read', 'suppliers.write'], supplier_ledger: ['purchase.read', 'finance.write'], purchase_bills: ['purchase.read', 'purchase.write'],
    purchase_bill_items: ['purchase.read', 'purchase.write'], vehicle_models: ['models.read', 'models.write'], vehicles: ['inventory.read', 'inventory.write'],
    vehicle_invoices: ['sales.read', 'sales.write'], bank_accounts: ['finance.read', 'finance.write']
};

function permissionForRequest(req) {
    const path = req.path;
    const mutating = !['GET', 'HEAD', 'OPTIONS'].includes(req.method);
    if (path === '/health' || path === '/auth/login' || path === '/auth/me' || path === '/auth/roles') return null;
    if (path.startsWith('/auth/users') || path === '/auth/change-password') return 'admin.users';
    if (path === '/audit-log') return 'admin.users';
    if (path === '/reset' || path === '/migrate' || path === '/settings' || path === '/backup' || path === '/sync/backup-now') return 'admin.settings';
    if (path === '/sync-state') return 'sync.write';
    if (path === '/load-state') return null;
    if (path === '/operations/production') return mutating ? 'production.write' : 'production.read';
    if (path === '/operations/qc') return 'production.qc';
    if (path === '/operations/sale' || path === '/operations/vehicle-sale') return 'sales.write';
    if (path === '/operations/payment' || path === '/operations/ledger-entry') return 'finance.write';
    if (path === '/operations/warranty' || path === '/operations/claim') return 'warranty.write';
    if (/^\/operations\/(sale|vehicle-sale)\/[^/]+\/cancel$/.test(path)) return 'admin.delete';
    if (path.startsWith('/purchase-bills/')) return 'admin.delete';
    if (req.method === 'DELETE') return 'admin.delete';
    const resource = Object.keys(resourcePermission).find(name => path === `/${name}` || path.startsWith(`/${name}/`));
    if (!resource) return mutating ? 'admin.settings' : null;
    return resourcePermission[resource][mutating ? 1 : 0];
}

// Session auth and server-side permission enforcement for every /api route.
app.use('/api', (req, res, next) => {
    if (['/health', '/auth/login', '/auth/me', '/auth/roles'].includes(req.path)) return next();
    if (req.session.user) return next();
    return res.status(401).json({ error: 'Authentication required' });
});

app.use('/api', (req, res, next) => {
    const permission = permissionForRequest(req);
    if (permission && !hasPermission(req.session.user?.role, permission)) {
        recordAudit(req, 'permission_denied', req.path, `${req.method} requires ${permission}`);
        return res.status(403).json({ error: `${ROLE_LABELS[normalizeRole(req.session.user?.role)] || 'Current role'} is not allowed to perform this action.` });
    }
    next();
});

app.post('/api/auth/login', async (req, res) => {
    const { username = 'admin', password = '' } = req.body || {};
    const now = Date.now();
    for (const [key, value] of loginAttempts) if (now > value.resetAt) loginAttempts.delete(key);
    const attemptKey = `${req.ip}:${username}`;
    const attempt = loginAttempts.get(attemptKey) || { count: 0, resetAt: now + 15 * 60 * 1000 };
    if (now > attempt.resetAt) { attempt.count = 0; attempt.resetAt = now + 15 * 60 * 1000; }
    if (attempt.count >= 10) return res.status(429).json({ error: 'Too many login attempts. Try again later.' });
    const account = (await query('SELECT username, role, password_hash FROM auth_users WHERE username = $1 AND active = TRUE', [username])).rows[0];
    const accountMatches = account ? await bcrypt.compare(password, account.password_hash) : false;
    const envAdminMatches = !account && username === 'admin' && (ADMIN_PASSWORD.startsWith('$2') ? await bcrypt.compare(password, ADMIN_PASSWORD) : password === ADMIN_PASSWORD);
    const envStaffMatches = !account && username === 'staff' && STAFF_PASSWORD && (STAFF_PASSWORD.startsWith('$2') ? await bcrypt.compare(password, STAFF_PASSWORD) : password === STAFF_PASSWORD);
    if (!accountMatches && !envAdminMatches && !envStaffMatches) {
        attempt.count += 1;
        loginAttempts.set(attemptKey, attempt);
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    loginAttempts.delete(attemptKey);
    const role = normalizeRole(account?.role || (envAdminMatches ? ROLES.ADMIN : ROLES.SALES));
    req.session.regenerate(error => {
        if (error) return res.status(500).json({ error: 'Unable to create login session' });
        req.session.user = sessionUser({ username, role });
        req.session.save(async saveError => {
            if (saveError) return res.status(500).json({ error: 'Unable to save login session' });
            await recordAudit(req, 'login_success', username, role);
            res.json({ authenticated: true, user: req.session.user, role, permissions: req.session.user.permissions });
        });
    });
});
app.get('/api/auth/me', (req, res) => {
    if (req.session.user) req.session.user = sessionUser(req.session.user);
    res.json({ authenticated: Boolean(req.session.user), user: req.session.user || null, permissions: req.session.user?.permissions || [] });
});
app.get('/api/auth/roles', (req, res) => res.json({ roles: Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label })) }));
app.post('/api/auth/logout', (req, res) => req.session.destroy(() => res.status(204).end()));
app.post('/api/auth/change-password', async (req, res) => {
    const password = String(req.body?.password || '');
    if (password.length < 10 || password.length > 200) return res.status(400).json({ error: 'Password must be between 10 and 200 characters' });
    const passwordHash = await bcrypt.hash(password, 12);
    await query('INSERT INTO auth_users(username, role, password_hash) VALUES ($1, $2, $3) ON CONFLICT(username) DO UPDATE SET password_hash = EXCLUDED.password_hash, active = TRUE', ['admin', 'Admin', passwordHash]);
    res.json({ success: true });
});

app.get('/api/auth/users', async (req, res) => {
    const users = (await query('SELECT username, role, active, created_at FROM auth_users ORDER BY username')).rows
        .map(user => ({ ...user, role: normalizeRole(user.role), label: ROLE_LABELS[normalizeRole(user.role)] || user.role }));
    res.json(users);
});
app.post('/api/auth/users', async (req, res) => {
    const username = String(req.body?.username || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    let role;
    try { role = assertKnownRole(req.body?.role); } catch (error) { return res.status(400).json({ error: 'Select a valid role.' }); }
    if (!/^[a-z0-9][a-z0-9._-]{2,79}$/.test(username)) return res.status(400).json({ error: 'Username must be 3-80 characters using letters, numbers, dot, dash, or underscore.' });
    if (password.length < 10 || password.length > 200) return res.status(400).json({ error: 'Password must be between 10 and 200 characters.' });
    const passwordHash = await bcrypt.hash(password, 12);
    try {
        await query('INSERT INTO auth_users(username, role, password_hash, active) VALUES ($1, $2, $3, TRUE)', [username, role, passwordHash]);
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Username already exists.' });
        throw error;
    }
    await recordAudit(req, 'user_created', username, role);
    res.status(201).json({ username, role, label: ROLE_LABELS[role], active: true });
});
app.put('/api/auth/users/:username', async (req, res) => {
    const username = String(req.params.username || '').trim().toLowerCase();
    if (username === req.session.user?.username && (req.body?.active === false || req.body?.role)) return res.status(400).json({ error: 'You cannot deactivate or change your own role while signed in.' });
    const existing = (await query('SELECT username, role, active FROM auth_users WHERE username = $1', [username])).rows[0];
    if (!existing) return res.status(404).json({ error: 'User not found.' });
    let role;
    try { role = req.body?.role ? assertKnownRole(req.body.role) : normalizeRole(existing.role); }
    catch (error) { return res.status(400).json({ error: 'Select a valid role.' }); }
    const active = req.body?.active === undefined ? existing.active : Boolean(req.body.active);
    const password = req.body?.password === undefined ? '' : String(req.body.password);
    if (password && (password.length < 10 || password.length > 200)) return res.status(400).json({ error: 'Password must be between 10 and 200 characters.' });
    const adminCount = Number((await query("SELECT COUNT(*)::int AS count FROM auth_users WHERE active = TRUE AND role = 'Admin' AND username <> $1", [username])).rows[0].count);
    if ((!active || role !== ROLES.ADMIN) && normalizeRole(existing.role) === ROLES.ADMIN && adminCount === 0) return res.status(400).json({ error: 'At least one active Administrator account is required.' });
    const passwordHash = password ? await bcrypt.hash(password, 12) : null;
    await query(`UPDATE auth_users SET role = $1, active = $2${passwordHash ? ', password_hash = $3' : ''} WHERE username = $${passwordHash ? 4 : 3}`, passwordHash ? [role, active, passwordHash, username] : [role, active, username]);
    await recordAudit(req, 'user_updated', username, `${role}; active=${active}`);
    res.json({ username, role, label: ROLE_LABELS[role], active });
});
app.delete('/api/auth/users/:username', async (req, res) => {
    const username = String(req.params.username || '').trim().toLowerCase();
    if (username === req.session.user?.username) return res.status(400).json({ error: 'You cannot deactivate your own signed-in account.' });
    const existing = (await query('SELECT username, role, active FROM auth_users WHERE username = $1', [username])).rows[0];
    if (!existing) return res.status(404).json({ error: 'User not found.' });
    if (normalizeRole(existing.role) === ROLES.ADMIN) {
        const admins = Number((await query("SELECT COUNT(*)::int AS count FROM auth_users WHERE active = TRUE AND role = 'Admin'", [])).rows[0].count);
        if (admins <= 1) return res.status(400).json({ error: 'At least one active Administrator account is required.' });
    }
    await query('UPDATE auth_users SET active = FALSE WHERE username = $1', [username]);
    await recordAudit(req, 'user_deactivated', username, existing.role);
    res.status(204).end();
});
app.get('/api/audit-log', async (req, res) => {
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 100, 1), 500);
    const rows = (await query('SELECT id, username, role, action, target, details, ip, created_at FROM audit_log ORDER BY id DESC LIMIT $1', [limit])).rows;
    res.json(rows);
});

// API routes
app.use(routes);

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'web-preview')));

// SPA fallback for frontend routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'web-preview', 'index.html'));
});

async function ensureAuthUsers() {
    await query("UPDATE auth_users SET role = $1 WHERE username = 'staff' AND role = 'Staff'", [ROLES.SALES]);
    const accounts = [
        ['admin', ROLES.ADMIN, ADMIN_PASSWORD],
        ['staff', ROLES.SALES, STAFF_PASSWORD],
        ['battery-operator', ROLES.BATTERY, BATTERY_OPERATOR_PASSWORD]
    ];
    for (const [username, role, configuredPassword] of accounts) {
        if (!configuredPassword) continue;
        const existing = (await query('SELECT username, role FROM auth_users WHERE username = $1', [username])).rows[0];
        if (existing) {
            continue;
        }
        const passwordHash = configuredPassword.startsWith('$2') ? configuredPassword : await bcrypt.hash(configuredPassword, 12);
        await query('INSERT INTO auth_users(username, role, password_hash) VALUES ($1, $2, $3)', [username, role, passwordHash]);
    }
}

// Start server only after the Neon schema and bootstrap accounts are ready.
initDatabase().then(ensureAuthUsers).then(() => app.listen(PORT, '0.0.0.0', () => {
    const os = require('os');
    const nets = os.networkInterfaces();
    let lanIP = 'localhost';
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                lanIP = net.address;
                break;
            }
        }
    }
    
    console.log('\n⚡ Lithynova Battery Management System');
    console.log(`  Local:   http://localhost:${PORT}`);
    console.log(`  Network: http://${lanIP}:${PORT}`);
    console.log(`  CORS Origin: ${CORS_ORIGIN || 'same-origin / any origin when explicitly requested'}`);
    console.log('  Press Ctrl+C to stop\n');
})).catch(error => {
    console.error('Database initialization failed:', error);
    process.exitCode = 1;
});
