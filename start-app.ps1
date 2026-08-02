$ErrorActionPreference = 'Stop'
Write-Host "Starting Lithynova Battery Management System (v3.0 SQLite Backend)..." -ForegroundColor Cyan
Write-Host "Server at http://localhost:4173" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop." -ForegroundColor DarkGray
Set-Location $PSScriptRoot
node server/server.js
