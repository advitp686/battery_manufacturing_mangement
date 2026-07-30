using System.IO;

namespace BatteryManagement.Infrastructure;

public static class AppPaths
{
    private static readonly string? OverrideRoot = Environment.GetEnvironmentVariable("BATTERY_MANAGEMENT_DATA_DIR");
    private static readonly string LegacyRoot = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "BatteryManagement");
    public static readonly string Root = OverrideRoot is { Length: > 0 } overriddenRoot
        ? overriddenRoot
        : Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "BatteryManagement");
    public static readonly string Database = Path.Combine(Root, "battery-management.db");
    public static readonly string Labels = Path.Combine(Root, "Labels");
    public static readonly string Documents = Path.Combine(Root, "Documents");
    public static readonly string Backups = Path.Combine(Root, "Backups");
    public static readonly string Settings = Path.Combine(Root, "settings.json");
    public static void EnsureDirectories()
    {
        if (OverrideRoot is null or { Length: 0 } && !Directory.Exists(Root) && Directory.Exists(LegacyRoot))
        {
            Directory.CreateDirectory(Root);
            foreach (var file in Directory.EnumerateFiles(LegacyRoot, "*", SearchOption.AllDirectories))
            {
                var target = Path.Combine(Root, Path.GetRelativePath(LegacyRoot, file));
                Directory.CreateDirectory(Path.GetDirectoryName(target)!);
                File.Copy(file, target);
            }
        }

        Directory.CreateDirectory(Root);
        Directory.CreateDirectory(Labels);
        Directory.CreateDirectory(Documents);
        Directory.CreateDirectory(Backups);
    }
}
