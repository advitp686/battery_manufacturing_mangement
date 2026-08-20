require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcryptjs');
const path = require('path');
const routes = require('./routes');
const { pool, query, initDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 4173;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '';
const SESSION_SECRET = process.env.SESSION_SECRET || (process.env.NODE_ENV === 'production' ? undefined : 'local-development-session-secret');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? undefined : 'ChangeMe123!');
const STAFF_PASSWORD = process.env.STAFF_PASSWORD || (process.env.NODE_ENV === 'production' ? undefined : '');
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
app.use(express.json({ limit: '50mb' })); // Large limit for migration payload
app.use(session({
    store: new PgSession({ pool, tableName: 'user_sessions', createTableIfMissing: true }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 8 * 60 * 60 * 1000 }
}));

// Session auth for /api/* routes. A legacy API key is accepted only during local development.
app.use('/api', (req, res, next) => {
    if (['/health', '/auth/login', '/auth/me'].includes(req.path)) return next();
    if (req.session.user) return next();
    return res.status(401).json({ error: 'Authentication required' });
});

app.use('/api', (req, res, next) => {
    const mutating = !['GET', 'HEAD', 'OPTIONS'].includes(req.method);
    const adminMutation = mutating && (req.path === '/reset' || req.path === '/migrate' || req.path === '/sync-state' ||
        req.path === '/settings' || req.path === '/backup' || req.path === '/sync/backup-now' ||
        /^\/(models|components|inventory|suppliers|supplier-ledger|vehicle-models|vehicles|vehicle-invoices|bank-accounts|invoices|production|sales|ledger|warranties|claims)(\/|$)/.test(req.path) ||
        /^\/operations\/(sale|vehicle-sale)\/[^/]+\/cancel$/.test(req.path) ||
        req.method === 'DELETE');
    if (adminMutation && req.session.user?.role !== 'Admin') return res.status(403).json({ error: 'Administrator role required' });
    next();
});

app.post('/api/auth/login', async (req, res) => {
    const { username = 'admin', password = '' } = req.body || {};
    const attemptKey = `${req.ip}:${username}`;
    const attempt = loginAttempts.get(attemptKey) || { count: 0, resetAt: Date.now() + 15 * 60 * 1000 };
    if (Date.now() > attempt.resetAt) { attempt.count = 0; attempt.resetAt = Date.now() + 15 * 60 * 1000; }
    if (attempt.count >= 10) return res.status(429).json({ error: 'Too many login attempts. Try again later.' });
    const account = (await query('SELECT username, role, password_hash FROM auth_users WHERE username = $1 AND active = TRUE', [username])).rows[0];
    const accountMatches = account ? await bcrypt.compare(password, account.password_hash) : false;
    const envAdminMatches = !account && username === 'admin' && (ADMIN_PASSWORD.startsWith('$2') ? await bcrypt.compare(password, ADMIN_PASSWORD) : password === ADMIN_PASSWORD);
    const envStaffMatches = !account && username === 'staff' && STAFF_PASSWORD && password === STAFF_PASSWORD;
    if (!accountMatches && !envAdminMatches && !envStaffMatches) {
        attempt.count += 1;
        loginAttempts.set(attemptKey, attempt);
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    loginAttempts.delete(attemptKey);
    const role = account?.role || (envAdminMatches ? 'Admin' : 'Staff');
    req.session.regenerate(error => {
        if (error) return res.status(500).json({ error: 'Unable to create login session' });
        req.session.user = { username, role };
        req.session.save(saveError => saveError ? res.status(500).json({ error: 'Unable to save login session' }) : res.json({ authenticated: true, role }));
    });
});
app.get('/api/auth/me', (req, res) => res.json({ authenticated: Boolean(req.session.user), user: req.session.user || null }));
app.post('/api/auth/logout', (req, res) => req.session.destroy(() => res.status(204).end()));
app.post('/api/auth/change-password', async (req, res) => {
    if (req.session.user?.role !== 'Admin') return res.status(403).json({ error: 'Administrator role required' });
    const password = String(req.body?.password || '');
    if (password.length < 10 || password.length > 200) return res.status(400).json({ error: 'Password must be between 10 and 200 characters' });
    const passwordHash = await bcrypt.hash(password, 12);
    await query('INSERT INTO auth_users(username, role, password_hash) VALUES ($1, $2, $3) ON CONFLICT(username) DO UPDATE SET password_hash = EXCLUDED.password_hash, active = TRUE', ['admin', 'Admin', passwordHash]);
    res.json({ success: true });
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
    const accounts = [
        ['admin', 'Admin', ADMIN_PASSWORD],
        ['staff', 'Staff', STAFF_PASSWORD]
    ];
    for (const [username, role, configuredPassword] of accounts) {
        if (!configuredPassword) continue;
        const existing = (await query('SELECT username FROM auth_users WHERE username = $1', [username])).rows[0];
        if (existing) continue;
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
