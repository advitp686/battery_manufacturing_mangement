Set WshShell = CreateObject("WScript.Shell")
Dim fso, scriptDir, htmlPath
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
htmlPath = scriptDir & "\web-preview\index.html"
WshShell.Run """msedge.exe"" ""--app=file:///" & htmlPath & """", 1, False
