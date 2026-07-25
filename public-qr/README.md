# Public QR verification setup

1. Create a private Google Sheet and open **Extensions → Apps Script**.
2. Replace `Code.gs` with this folder's script.
3. Set script properties `SPREADSHEET_ID`, `SYNC_SECRET`, and `SUPPORT_CONTACT`.
4. Deploy as a Web App, execute as the sheet owner, and allow public access.
5. Copy the `/exec` URL to the desktop app's `QR base URL` and `Apps Script sync URL`; use the same `SYNC_SECRET`.

The public page reads only `Public_QR`, which contains no customer, price, test,
or claim data. Do not share the private workbook with public users.
