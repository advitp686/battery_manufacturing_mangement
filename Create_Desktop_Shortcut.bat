@echo off
:: Lithynova Desktop Shortcut Installer
set "TARGET_SCRIPT=%~dp0Launch_Lithynova_App.vbs"
set "SHORTCUT_PATH=%USERPROFILE%\Desktop\Lithynova Battery Management.lnk"

powershell -Command "$s=(New-Object -COM WScript.Shell).CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath='wscript.exe'; $s.Arguments='\"%TARGET_SCRIPT%\"'; $s.WorkingDirectory='%~dp0'; $s.WindowStyle=1; $s.Description='Lithynova EV Battery Pack Management System'; $s.Save()"

echo.
echo =======================================================
echo   Lithynova Desktop Shortcut Created Successfully!
echo   Icon created on Desktop: "Lithynova Battery Management"
echo =======================================================
echo.
