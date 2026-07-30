@echo off
:: Lithynova EV Battery Pack Management System Launcher
set "APP_PATH=%~dp0web-preview\index.html"
start "" "msedge.exe" "--app=file:///%APP_PATH%"
exit
