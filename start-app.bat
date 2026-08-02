@echo off
title Lithynova EV Battery Pack Management System
cd /d "%~dp0"

echo =================================================================
echo ⚡ Lithynova EV Battery Pack Management System (v3.0.0)
echo =================================================================

if not exist "node_modules\" (
    echo.
    echo [1/2] First-Time Auto Setup: Installing server packages...
    call npm install --no-audit --no-fund
    if errorlevel 1 (
        echo.
        echo ❌ ERROR: Node.js is required. Please install Node.js v18+ from https://nodejs.org
        pause
        exit /b 1
    )
    echo ✅ Setup complete!
)

echo.
echo [2/2] Starting Server & Opening Web App...
echo.
echo Server running at: http://localhost:4173
echo Press Ctrl+C or close this window to stop.
echo.

start http://localhost:4173
node server/server.js
pause
