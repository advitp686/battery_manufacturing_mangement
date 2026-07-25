# VoltForge browser preview

This is a local, browser-based preview of the Battery Pack Management System. It is intentionally self-contained and uses sample data plus browser-only interactions so the team can quickly review the workflow before connecting the desktop app's SQLite, Google Sheets, Drive, and Apps Script services.

## Start on Windows

From the repository root, run:

```powershell
.\web-preview\start-preview.ps1
```

Then open http://localhost:4173.

If Python is already on PATH, the equivalent command is:

```powershell
python -m http.server 4173 --directory web-preview
```

The preview includes dashboard, battery models, inventory, production/QC, direct/dealer sales, warranty registrations, claims, reports, and redacted QR lookup screens. New records are simulated in memory for the current browser session.
