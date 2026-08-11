# Hosted deployment plan

## Target architecture

- Render Web Service: Express API and the `web-preview` frontend from one origin.
- Neon PostgreSQL: system of record for all application data.
- Browser storage: temporary offline cache only; it is not authoritative.
- Google Sheets: optional export/integration, never the primary database.

## Migration phases

### Phase 1 — Deployment and security contract

- Add Render Blueprint configuration and environment variable documentation.
- Remove production secrets and default credentials from source code.
- Restrict CORS to the configured application origin.
- Keep `/api/health` lightweight and make it report database readiness.
- Add structured startup validation so a missing production database fails fast.

### Phase 2 — Neon PostgreSQL data layer

- Replace SQLite-specific schema and helpers with PostgreSQL migrations.
- Use parameterized queries and a connection pool.
- Preserve foreign keys and add constraints for inventory, invoices, warranties, and ledgers.
- Add a migration command that imports the existing SQLite database once.
- Do not run the old table-replacement sync against PostgreSQL.

### Phase 3 — Server-owned business operations

- Move production stock consumption, sales, warranty activation, payments, and resets into server transactions.
- Revalidate serials and quantities inside the transaction.
- Generate invoice, production, ledger, and warranty identifiers server-side.
- Return validation errors as 4xx responses instead of silently skipping rows.

### Phase 4 — Authentication and authorization

- Replace the shared API key with authenticated users and server-side roles.
- Protect administrator operations on the server, not only in browser JavaScript.
- Store password hashes, never plaintext passwords in localStorage or settings.
- Add rate limiting and audit logs for destructive operations.

### Phase 5 — Frontend cutover and offline behavior

- Replace full-state browser-to-server replacement with resource-level API calls.
- Keep localStorage/IndexedDB as a queued offline cache with conflict handling.
- Show an explicit pending/offline state and retry failed writes.
- Remove hard-coded API keys from the bundle.

### Phase 6 — Verification and rollout

- Run schema, migration, API, concurrency, and backup-restore tests.
- Deploy a staging Render service connected to a separate Neon branch/database.
- Import a copy of the SQLite data and reconcile record counts and financial totals.
- Perform a controlled production cutover with a final read-only export and rollback backup.

## Render configuration

- Build: `npm ci`
- Start: `npm start`
- Health check: `/api/health`
- Required secrets: `DATABASE_URL`, `API_KEY`, and `CORS_ORIGIN` during the initial API-key phase.

## Neon configuration

Create separate development, staging, and production databases or branches. Use the pooled connection string with SSL enabled. The Render service must be the only component holding `DATABASE_URL`; it must never be sent to the browser.

## Current implementation boundary

The server data layer now targets Neon PostgreSQL and includes schema initialization, session-backed authentication, transactional state replacement, optimistic state-version checks, and a SQLite-to-Neon import command. The remaining hardening work is to move each business workflow from browser-side state mutation into dedicated server transactions and to complete concurrency/business-rule tests before production cutover.
