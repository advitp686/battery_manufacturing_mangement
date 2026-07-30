# Lithynova Battery Pack Management System 🔋⚡

Offline-first, production-ready Windows desktop management software for lithium battery manufacturing, inventory control, sequential tax invoicing, ISO QR code traceability, warranty management, and party ledger accounting.

---

## 🚀 Client Installation & Setup Guidelines (Simple 1-Click Desktop App)

No complex installers or admin passwords are required on the client machine. Follow these simple steps to install and run the app on any client Windows PC:

### Option A: Using Pre-Packaged Client ZIP (Recommended for Quick Delivery)
1. Download **`Lithynova_Client_Installation_Package.zip`** (2.1 MB) from this repository.
2. Extract the ZIP file to any folder on the client PC (e.g., `C:\Lithynova_App\` or `Desktop`).
3. Double-click **`Create_Desktop_Shortcut.bat`** — this automatically creates a **"Lithynova Battery Management App"** icon on the Windows Desktop.
4. Double-click the desktop shortcut or **`Launch_Lithynova_App.vbs`** to launch the standalone desktop app!

### Option B: Downloading Directly from GitHub
1. On the client PC, visit:  
   👉 **`https://github.com/advitp686/battery_manufacturing_mangement`**
2. Click **Code** ➔ **Download ZIP**.
3. Extract the downloaded ZIP file.
4. Run **`Create_Desktop_Shortcut.bat`** to generate the desktop launcher.

---

## 🔑 Default Profile Credentials & Roles

| Profile Role | Default Password / Mode | Capabilities |
| :--- | :--- | :--- |
| **👨‍💼 Administrator** | `ChangeMe123!` | Full unrestricted access to System Settings, BOM prices, Stock, Reports, Reset & Data Backup tools. |
| **👤 Reception Staff** | *None (Unlocked)* | Daily reception operations: Record Sales, Customer Ledger, Warranty Registrations & QR Labels. |

> 🔒 **Security Note**: Switching from Reception Staff to Administrator mode requires entering the Admin Password (`ChangeMe123!`). The Administrator can change this password anytime in **System Settings ➔ Company Profile**.

---

## ✨ Key Features & Capabilities

- 🏭 **Production & BOM Assembly**: Automatic Raw Material stock deduction upon pack assembly creation.
- 🏷️ **Component HSN & GST Catalog**: Category-wise and per-component HSN code & GST rate assignment (5%, 12%, 18%, 28%) with Assigned vs. Unassigned inventory filters.
- 🧾 **Sequential Tax Invoicing & Party Ledger**: GST-compliant invoices with automatic party detail auto-fill (address, phone, state, contact person) to prevent duplicate dealer ledgers.
- 🛠️ **Warranty Claim & Repair Invoicing**: Itemized repair billing for warranty claims with parts cost breakdown, service fees, and pending/paid ledger posting.
- 📱 **Standard ISO QR Code Traceability**: 100% compliant ISO/IEC 18004 QR codes readable by Google Lens, iPhone Camera, WhatsApp, and all Android devices.
- ☁️ **Google Sheets Cloud Sync**: Mirror inventory, production, sales dispatches, and warranties directly to client Google Sheets via Apps Script.

---

## 💻 Tech Stack & Offline Storage

- **Core Engine**: HTML5 / JavaScript (Vanilla ES6) / Native Canvas 2D QR Encoder / CSS3 Modern Glassmorphic Design.
- **Desktop Launcher**: Native VBScript / Windows Edge App Mode (`--app`).
- **Data Persistence**: Offline-first `localStorage` + JSON Import/Export Backup + Google Sheets Cloud Sync.

---

## 🤝 Support & Maintenance

Developed for **HK MOTORS** (Electric Vehicle & Lithium Battery Systems).  
For technical support or feature requests, contact: `hkmotorsofficial@gmail.com`
