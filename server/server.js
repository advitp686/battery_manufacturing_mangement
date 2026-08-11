require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcryptjs');
const path = require('path');
const routes = require('./routes');
const { pool, initDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 4173;
const CORS_ORIGIN = process.env.CORS_ORIGIN || `http://localhost:${PORT}`;
const SESSION_SECRET = process.env.SESSION_SECRET || (process.env.NODE_ENV === 'production' ? undefined : 'local-development-session-secret');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? undefined : 'ChangeMe123!');
const STAFF_PASSWORD = process.env.STAFF_PASSWORD || (process.env.NODE_ENV === 'production' ? undefined : '');

if (process.env.NODE_ENV === 'production' && (!SESSION_SECRET || !ADMIN_PASSWORD)) {
    throw new Error('SESSION_SECRET and ADMIN_PASSWORD must be configured in production');
}

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
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
        /^\/(models|components|inventory|suppliers|supplier-ledger|vehicle-models|vehicles|vehicle-invoices|bank-accounts)(\/|$)/.test(req.path) ||
        req.method === 'DELETE');
    if (adminMutation && req.session.user?.role !== 'Admin') return res.status(403).json({ error: 'Administrator role required' });
    next();
});

app.post('/api/auth/login', async (req, res) => {
    const { username = 'admin', password = '' } = req.body || {};
    const isAdmin = username === 'admin' && (ADMIN_PASSWORD.startsWith('$2') ? await bcrypt.compare(password, ADMIN_PASSWORD) : password === ADMIN_PASSWORD);
    const isStaff = username === 'staff' && STAFF_PASSWORD && password === STAFF_PASSWORD;
    if (!isAdmin && !isStaff) return res.status(401).json({ error: 'Invalid username or password' });
    req.session.user = { username, role: isAdmin ? 'Admin' : 'Staff' };
    res.json({ authenticated: true, role: req.session.user.role });
});
app.get('/api/auth/me', (req, res) => res.json({ authenticated: Boolean(req.session.user), user: req.session.user || null }));
app.post('/api/auth/logout', (req, res) => req.session.destroy(() => res.status(204).end()));

// API routes
app.use(routes);

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'web-preview')));

// SPA fallback for frontend routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'web-preview', 'index.html'));
});

// Start server only after the Neon schema is ready.
initDatabase().then(() => app.listen(PORT, '0.0.0.0', () => {
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
    console.log(`  CORS Origin: ${CORS_ORIGIN}`);
    console.log('  Press Ctrl+C to stop\n');
})).catch(error => {
    console.error('Database initialization failed:', error);
    process.exitCode = 1;
});
