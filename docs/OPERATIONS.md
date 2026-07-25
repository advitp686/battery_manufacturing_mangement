# Operations guide

## First use

Sign in with `admin` / `ChangeMe123!`, then change the administrator password
before adding business data. Add battery models, receive component/cell batches,
and then create finished packs using Production & QC.

Only a passed QC pack becomes `Saleable`. Every pass generates a unique serial
and opaque QR token. Generate the QR label from the selected pack row.

## Sales and warranty

- A direct retail sale creates a receipt, activates its warranty, and creates a
  warranty certificate.
- A dealer sale moves the pack to `DealerStock`; it cannot be claimed until staff
  registers the actual end customer under Warranty & claims.
- Claim replacements require an unused saleable pack and retain the original
  warranty dates.

## QR and Google synchronization

Use the `public-qr` setup guide to deploy the Apps Script. Save the same `/exec`
URL as the QR base URL and Apps Script sync URL, along with the secret from script
properties. The system queues records while offline; **Publish pending QR records**
retries the queue manually. Do not put the private customer/sales workbook into
the public QR sheet.

## Local backups

Create a backup before system upgrades and at the end of each business day. The
application database and generated documents reside in `%ProgramData%\BatteryManagement`.
Copy that directory to a controlled Drive folder until OAuth Drive backup is configured.
