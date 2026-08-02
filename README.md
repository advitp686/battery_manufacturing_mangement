# Lithynova EV Battery Pack Management System 🔋⚡

Offline-first, production-ready Web Application for lithium battery manufacturing, raw material stock & BOM control, sequential tax invoicing, ISO QR code traceability, warranty management, supplier ledgers, and Google Sheets cloud synchronization.

---

## 🚀 Getting Started (Zero-Dependency Web Application)

Launch the web application instantly on any computer using your preferred tool:

### Option A: 1-Click Double-Click Launcher (Windows)
Double-click **`start-app.bat`** in the extracted folder.
*(Automatically installs dependencies on first run, starts server, and opens browser)*

### Option B: PowerShell Launcher (Windows)
```powershell
.\start-app.ps1
```

### Option C: Using Node / NPM
```bash
npm start
```

### Option C: Python HTTP Server
```bash
python -m http.server 4173 --directory web-preview
```

---

## 🔑 Default Profile Credentials & Access Roles

| Profile Role | Default Password / Mode | Capabilities |
| :--- | :--- | :--- |
| **👨‍💼 Administrator** | `ChangeMe123!` | Full unrestricted access to System Settings, BOM pricing, Stock management, Reports, Reset & Data Backup tools. |
| **👤 Reception Staff** | *None (Unlocked)* | Daily reception operations: Record Sales, Customer Ledger, Warranty Registrations & QR Label rendering. |

> 🔒 **Security Note**: Switching from Reception Staff to Administrator mode requires entering the Admin Password (`ChangeMe123!`). The Administrator can change this password anytime in **System Settings ➔ Company Profile**.

---

## ✨ Key Features & Capabilities

- 🏭 **Production & BOM Assembly**: Automatic Raw Material stock deduction upon pack assembly creation.
- 🏷️ **Component HSN & GST Catalog**: Category-wise and per-component HSN code & GST rate assignment (5%, 12%, 18%, 28%) with Assigned vs. Unassigned inventory filters.
- 🧾 **Sequential Tax Invoicing & Party Ledger**: GST-compliant invoices with automatic party detail auto-fill (address, phone, state, contact person) to prevent duplicate dealer ledgers.
- 🛠️ **Warranty Claim & Repair Invoicing**: Itemized repair billing for warranty claims with parts cost breakdown, service fees, and pending/paid ledger posting.
- 📱 **Standard ISO QR Code Traceability**: 100% compliant ISO/IEC 18004 QR codes readable by Google Lens, iPhone Camera, WhatsApp, and all smartphones.
- ☁️ **Google Sheets Cloud Sync**: Mirror inventory, production, sales dispatches, and warranties directly to client Google Sheets via Apps Script.
- 💾 **Fail-Safe Offline Storage**: Browser-local persistent storage (`localStorage` & `IndexedDB`) with 1-click JSON backup export and restore tools.

---

## 💻 Tech Stack

- **Frontend**: HTML5 / JavaScript (Vanilla ES6) / Native Canvas 2D QR Encoder / CSS3 Modern Glassmorphic Design.
- **Data Persistence**: Offline-first Browser Storage (`localStorage` + `IndexedDB`) + JSON Data Export/Import.
- **Cloud Backend Integration**: Google Apps Script & Google Sheets API for cloud sync & public QR code verification.

---

## 🤝 Support & Maintenance

Developed for **HK MOTORS** (Electric Vehicle & Lithium Battery Systems).  
For technical support or feature requests, contact: `support@lithynova.com`
