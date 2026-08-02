@echo off
title Create Lithynova Desktop Shortcut
cd /d "%~dp0"

echo Creating Lithynova Desktop Shortcut...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0create-shortcut.ps1"

echo.
pause
