namespace BatteryManagement.Infrastructure;

public static class AppServices
{
    public static readonly Database Database = new();
    public static readonly BatteryService Batteries = new(Database);
    public static readonly DocumentService Documents = new();
    public static readonly SyncService Sync = new(Database);
}
