$ErrorActionPreference = 'Stop'
$previewRoot = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'web-preview'
Write-Host "VoltForge browser preview: http://localhost:4173" -ForegroundColor Cyan
Write-Host "Keep this window open while testing. Press Ctrl+C to stop." -ForegroundColor DarkGray
python -m http.server 4173 --directory $previewRoot
