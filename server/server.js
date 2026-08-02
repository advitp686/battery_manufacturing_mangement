require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4173;
const API_KEY = process.env.API_KEY || 'lithynova-factory-2024';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Large limit for migration payload

// API Key auth for /api/* routes
app.use('/api', (req, res, next) => {
    // Skip auth for health check
    if (req.path === '/health') return next();
    
    const key = req.headers['x-api-key'];
    if (!key || key !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }
    next();
});

// API routes
app.use(routes);

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'web-preview')));

// SPA fallback for frontend routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'web-preview', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
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
    console.log(`  API Key: ${API_KEY}`);
    console.log('  Press Ctrl+C to stop\n');
});
