const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'battery_mgmt.db');
const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const MAX_BACKUPS = 10;

/**
 * Creates a backup of the local SQLite database file.
 * Manages backup rotation by keeping only the MAX_BACKUPS most recent files.
 * @returns {{success: boolean, message: string, filename?: string, error?: string}}
 */
function createBackup() {
    try {
        // 1. Ensure backups/ dir exists
        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR, { recursive: true });
        }

        if (!fs.existsSync(DB_PATH)) {
            return { success: false, error: 'Database file not found at ' + DB_PATH };
        }

        // 2. Copy DB file to backups/battery_mgmt_YYYY-MM-DD_HHmmss.db
        const now = new Date();
        const timestamp = now.toISOString().replace(/T/, '_').replace(/:/g, '').split('.')[0];
        const backupFilename = `battery_mgmt_${timestamp}.db`;
        const backupPath = path.join(BACKUP_DIR, backupFilename);

        fs.copyFileSync(DB_PATH, backupPath);

        // 3. List all backup files, sort by date, delete oldest if > MAX_BACKUPS
        const files = fs.readdirSync(BACKUP_DIR)
            .filter(file => file.startsWith('battery_mgmt_') && file.endsWith('.db'))
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time); // sort descending by modified time (newest first)

        if (files.length > MAX_BACKUPS) {
            const filesToDelete = files.slice(MAX_BACKUPS);
            for (const fileObj of filesToDelete) {
                fs.unlinkSync(path.join(BACKUP_DIR, fileObj.name));
            }
        }

        // 4. Return backup filename
        return { success: true, message: 'Backup created successfully', filename: backupFilename };
    } catch (err) {
        console.error('Error creating backup:', err);
        return { success: false, error: err.message };
    }
}

// If run directly from CLI: node server/backup.js
if (require.main === module) {
    const result = createBackup();
    console.log(result);
}

module.exports = { createBackup };
