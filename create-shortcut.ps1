$ErrorActionPreference = 'Stop'
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$ws = New-Object -ComObject WScript.Shell
$desktop = [System.Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktop "⚡ Lithynova Battery System.lnk"

$s = $ws.CreateShortcut($shortcutPath)
$s.TargetPath = Join-Path $scriptPath "start-app.bat"
$s.WorkingDirectory = $scriptPath
$s.Description = "Lithynova EV Battery Pack Management System"
$s.Save()

Write-Host "✅ Desktop Shortcut Created Successfully at: $shortcutPath" -ForegroundColor Green
