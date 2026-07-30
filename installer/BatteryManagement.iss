#define MyAppName "Battery Management"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Battery Management"
#define MyAppExeName "BatteryManagement.exe"

[Setup]
AppId={{5EE8DA44-9A51-4BE7-BB57-61121C949DA2}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\Battery Management
DefaultGroupName=Battery Management
OutputDir=output
OutputBaseFilename=BatteryManagement-Setup
Compression=lzma
SolidCompression=yes
WizardStyle=modern
ArchitecturesInstallIn64BitMode=x64
ArchitecturesAllowed=x64compatible
PrivilegesRequired=admin

[Files]
Source: "..\publish\*"; DestDir: "{app}"; Flags: recursesubdirs ignoreversion

[Icons]
Name: "{autoprograms}\Battery Management"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\Battery Management"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional shortcuts:"; Flags: unchecked

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Launch Battery Management"; Flags: nowait postinstall skipifsilent
