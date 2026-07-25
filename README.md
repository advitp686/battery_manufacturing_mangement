# Battery Pack Management

Offline-first Windows desktop application for battery-pack inventory, production,
QR traceability, sales, warranty, and claims.

## Run locally

1. Install the .NET 8 SDK on a Windows 10/11 PC.
2. Run `dotnet restore` and `dotnet run --project src/BatteryManagement`.
3. Sign in using the first-run administrator account: `admin` / `ChangeMe123!`.
   Change this password immediately in Settings.

The database is created under `%ProgramData%\\BatteryManagement` and is never
committed to source control. Google/App Script integration is configured from
Settings after the client owns the target Google account and Drive folder.

## Important limitations in this first implementation

- The SQLite application, workflows, QR labels, PDFs, CSV export, imports, audit
  trail, and durable sync outbox run locally.
- The included Apps Script exposes public QR records. The desktop sync adapter
  posts redacted public records to that script when an Apps Script endpoint is set.
  Google Drive OAuth backup needs the client OAuth credential file and is intentionally
  disabled until those client-owned credentials are supplied.
