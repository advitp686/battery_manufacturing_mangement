using System.Text.Json;
using System.IO;

namespace BatteryManagement.Infrastructure;

public sealed class AppSettings
{
    public string CompanyName { get; set; } = "Battery Management";
    public string SupportContact { get; set; } = "";
    public string QrBaseUrl { get; set; } = "";
    public string AppsScriptSyncUrl { get; set; } = "";
    public string SyncSecret { get; set; } = "";
    public string DriveFolderId { get; set; } = "";
}

public static class SettingsService
{
    private static readonly JsonSerializerOptions Options = new() { WriteIndented = true };
    public static AppSettings Load()
    {
        if (!File.Exists(AppPaths.Settings)) return new AppSettings();
        return JsonSerializer.Deserialize<AppSettings>(File.ReadAllText(AppPaths.Settings), Options) ?? new AppSettings();
    }
    public static void Save(AppSettings settings)
    {
        AppPaths.EnsureDirectories();
        File.WriteAllText(AppPaths.Settings, JsonSerializer.Serialize(settings, Options));
    }
}
