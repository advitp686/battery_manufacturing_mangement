# Lithynova Web Application Operations Guide 🔋⚡

## First Use & Profile Access

1. Open the Web Application in your web browser (e.g. via `.\start-app.ps1` or `npm start`).
2. Switch to **Administrator** profile (Default password: `ChangeMe123!`). Change the admin password in **System Settings ➔ Company Profile** before logging production data.
3. Configure battery models, component HSN/GST rates, and initial raw material stock batches.
4. Finished packs are assembled via **Production & QC**. Passing QC marks a pack as `Saleable` and generates its ISO QR code and unique serial number.

## Sales, Invoicing & Warranty Workflows

- **Direct Retail Sale**: Generates a GST-compliant sales invoice and automatically activates the pack's warranty coverage.
- **Dealer Sale**: Allocates the pack as `DealerStock`. The warranty is activated once staff registers the end-customer under **Warranty & Claims**.
- **Warranty Claims & Repair Billing**: Open claims for defective packs, log replacement components/service charges, and generate itemized repair invoices.

## QR Traceability & Google Sheets Cloud Synchronization

1. Follow the guide in `public-qr/` to deploy the Google Apps Script.
2. In **System Settings ➔ Cloud Sync**, enter your Web App `/exec` URL and secret key.
3. The web application operates offline-first. Pending transactions are automatically synced to Google Sheets when internet connection is available or when clicking **Sync Sheets**.

## Data Persistence & Backup Management

- System data is automatically stored in browser persistent storage (`localStorage` + `IndexedDB`).
- To create a full system backup, go to **System Settings ➔ Database Storage & Backup Tools** and click **Backup System Data (JSON Export)**.
- Store JSON backups safely on your local drive or cloud storage.
