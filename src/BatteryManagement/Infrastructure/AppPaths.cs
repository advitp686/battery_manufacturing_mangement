using System.IO;

namespace BatteryManagement.Infrastructure;

public static class AppPaths
{
    public static readonly string Root = Environment.GetEnvironmentVariable("BATTERY_MANAGEMENT_DATA_DIR") is { Length: > 0 } overriddenRoot
        ? overriddenRoot
        : Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "BatteryManagement");
    public static readonly string Database = Path.Combine(Root, "battery-management.db");
    public static readonly string Labels = Path.Combine(Root, "Labels");
    public static readonly string Documents = Path.Combine(Root, "Documents");
    public static readonly string Backups = Path.Combine(Root, "Backups");
    public static readonly string Settings = Path.Combine(Root, "settings.json");
    public static void EnsureDirectories() { Directory.CreateDirectory(Root); Directory.CreateDirectory(Labels); Directory.CreateDirectory(Documents); Directory.CreateDirectory(Backups); }
}
