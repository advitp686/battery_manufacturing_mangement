# Lithynova EV Battery Pack Management System — Web Application Architecture 🔋⚡

This directory contains the production web application for the Lithynova EV Battery Pack Management System. It is an offline-first, high-performance web app providing full manufacturing, BOM stock control, sequential tax invoicing, ISO QR code generation, supplier ledgers, warranty claims management, and Google Sheets cloud synchronization.

## 🚀 Running the Web Application

### Option A: Using PowerShell Launcher
From the repository root:
```powershell
.\start-app.ps1
```
Then open [http://localhost:4173](http://localhost:4173) in your browser.

### Option B: Using Node / NPM
From the repository root:
```bash
npm start
```

### Option C: Direct Python Server
```bash
python -m http.server 4173 --directory web-preview
```

## ⚡ Features
- **Dashboard**: Live workshop stats, stock availability, sales dispatches, and warranty status.
- **Battery Models & BOM**: Model configurations with component breakdown and price calculations.
- **Stock & Inventory**: Cell, BMS, enclosure, and component inventory tracking with assigned HSN/GST rates.
- **Production & QC**: Pack assembly creation with automatic material deduction and QR label rendering.
- **Commercial Sales**: Direct retail receipts & GST-compliant sequential tax invoices with party auto-fill.
- **Supplier Ledger**: Purchase orders, vendor balances, and payment postings.
- **Warranty & Claims**: Active warranty registrations, claim tracking, and itemized repair billing.
- **QR Lookup**: Instant serial number verification and ISO QR code lookup.
- **System Settings**: Admin password controls, JSON data import/export, and Google Sheets Cloud Sync.
