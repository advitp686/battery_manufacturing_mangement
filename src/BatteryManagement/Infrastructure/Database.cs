using BatteryManagement.Domain;
using Microsoft.Data.Sqlite;
using System.Data.Common;
using System.Security.Cryptography;
using System.Text;

namespace BatteryManagement.Infrastructure;

public sealed class Database
{
    private string ConnectionString => new SqliteConnectionStringBuilder { DataSource = AppPaths.Database, ForeignKeys = true }.ToString();
    public SqliteConnection Open() => new(ConnectionString);

    public async Task InitializeAsync()
    {
        AppPaths.EnsureDirectories();
        await using var connection = Open(); await connection.OpenAsync();
        var sql = """
        CREATE TABLE IF NOT EXISTS Users(Id INTEGER PRIMARY KEY, Username TEXT NOT NULL UNIQUE, PasswordHash TEXT NOT NULL, Role TEXT NOT NULL, Active INTEGER NOT NULL DEFAULT 1);
        CREATE TABLE IF NOT EXISTS BatteryModels(Id INTEGER PRIMARY KEY, Code TEXT NOT NULL UNIQUE, Name TEXT NOT NULL, Chemistry TEXT NOT NULL, Voltage REAL NOT NULL, CapacityAh REAL NOT NULL, Configuration TEXT, BmsSpecification TEXT, Dimensions TEXT, WarrantyMonths INTEGER NOT NULL, Active INTEGER NOT NULL DEFAULT 1);
        CREATE TABLE IF NOT EXISTS ComponentBatches(Id INTEGER PRIMARY KEY, ComponentName TEXT NOT NULL, Supplier TEXT, BatchCode TEXT NOT NULL UNIQUE, Quantity REAL NOT NULL, AvailableQuantity REAL NOT NULL, UnitCost REAL NOT NULL, Location TEXT NOT NULL, Reference TEXT, ReceivedAt TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS BatteryPacks(Id INTEGER PRIMARY KEY, SerialNumber TEXT NOT NULL UNIQUE, QrToken TEXT NOT NULL UNIQUE, ModelCode TEXT NOT NULL, ModelName TEXT NOT NULL, SourceBatch TEXT, ManufacturedAt TEXT NOT NULL, Status TEXT NOT NULL, MeasuredVoltage REAL, MeasuredCapacityAh REAL, HealthPercent REAL, BmsSpecification TEXT, Tester TEXT, QcNotes TEXT);
        CREATE TABLE IF NOT EXISTS Customers(Id INTEGER PRIMARY KEY, Name TEXT NOT NULL, Phone TEXT, Address TEXT, VehicleNumber TEXT);
        CREATE TABLE IF NOT EXISTS Dealers(Id INTEGER PRIMARY KEY, Name TEXT NOT NULL UNIQUE, Phone TEXT, Address TEXT);
        CREATE TABLE IF NOT EXISTS Sales(Id INTEGER PRIMARY KEY, InvoiceNumber TEXT NOT NULL UNIQUE, PackSerial TEXT NOT NULL UNIQUE, SaleType TEXT NOT NULL, PartyName TEXT NOT NULL, Amount REAL NOT NULL, SoldAt TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS Warranties(Id INTEGER PRIMARY KEY, PackSerial TEXT NOT NULL UNIQUE, CustomerName TEXT NOT NULL, StartDate TEXT NOT NULL, EndDate TEXT NOT NULL, Status TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS WarrantyClaims(Id INTEGER PRIMARY KEY, ClaimNumber TEXT NOT NULL UNIQUE, PackSerial TEXT NOT NULL, Complaint TEXT NOT NULL, Status TEXT NOT NULL, Resolution TEXT, ReplacementSerial TEXT, Notes TEXT, CreatedAt TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS StockMovements(Id INTEGER PRIMARY KEY, MovementType TEXT NOT NULL, Reference TEXT NOT NULL, Item TEXT NOT NULL, Quantity REAL NOT NULL, OccurredAt TEXT NOT NULL, Notes TEXT);
        CREATE TABLE IF NOT EXISTS SyncEvents(Id INTEGER PRIMARY KEY, EntityType TEXT NOT NULL, EntityId TEXT NOT NULL, Payload TEXT NOT NULL, Status TEXT NOT NULL, Attempts INTEGER NOT NULL DEFAULT 0, LastError TEXT, CreatedAt TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS AuditLog(Id INTEGER PRIMARY KEY, OccurredAt TEXT NOT NULL, Actor TEXT NOT NULL, Action TEXT NOT NULL, Details TEXT NOT NULL);
        """;
        await ExecuteAsync(connection, sql);
        var exists = await ScalarAsync<long>(connection, "SELECT COUNT(*) FROM Users");
        if (exists == 0)
        {
            await ExecuteAsync(connection, "INSERT INTO Users(Username,PasswordHash,Role,Active) VALUES($u,$p,'Admin',1)", ("$u", "admin"), ("$p", PasswordHash("ChangeMe123!")));
            await AuditAsync(connection, "system", "Bootstrap", "Created default administrator.");
        }
    }

    public async Task<AppUser?> AuthenticateAsync(string username, string password)
    {
        await using var c = Open(); await c.OpenAsync();
        await using var cmd = c.CreateCommand(); cmd.CommandText = "SELECT Id,Username,PasswordHash,Role,Active FROM Users WHERE Username=$u"; cmd.Parameters.AddWithValue("$u", username.Trim());
        await using var r = await cmd.ExecuteReaderAsync();
        if (!await r.ReadAsync() || !r.GetBoolean(4) || !VerifyPassword(password, r.GetString(2))) return null;
        return new AppUser { Id = r.GetInt64(0), Username = r.GetString(1), Role = r.GetString(3), Active = true };
    }

    public async Task ChangePasswordAsync(AppUser user, string currentPassword, string newPassword)
    {
        if (newPassword.Length < 10) throw new InvalidOperationException("Use a password with at least 10 characters.");
        if (await AuthenticateAsync(user.Username, currentPassword) is null) throw new InvalidOperationException("Current password is incorrect.");
        await using var c = Open(); await c.OpenAsync();
        await ExecuteAsync(c, "UPDATE Users SET PasswordHash=$password WHERE Id=$id", ("$password", PasswordHash(newPassword)), ("$id", user.Id));
        await AuditAsync(c, user.Username, "Change password", user.Username);
    }
    public async Task CreateUserAsync(AppUser actor, string username, string password, string role)
    {
        if (actor.Role != "Admin") throw new UnauthorizedAccessException("Only administrators can create users.");
        if (string.IsNullOrWhiteSpace(username) || password.Length < 10) throw new InvalidOperationException("A username and password of at least 10 characters are required.");
        if (role is not ("Admin" or "Operator" or "Reports")) throw new InvalidOperationException("Invalid role.");
        await using var c = Open(); await c.OpenAsync();
        await ExecuteAsync(c, "INSERT INTO Users(Username,PasswordHash,Role,Active) VALUES($username,$password,$role,1)", ("$username", username.Trim()), ("$password", PasswordHash(password)), ("$role", role));
        await AuditAsync(c, actor.Username, "Create user", username.Trim());
    }

    public static string PasswordHash(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(16);
        var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 210_000, HashAlgorithmName.SHA256, 32);
        return $"{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
    }
    public static bool VerifyPassword(string password, string stored)
    {
        var parts = stored.Split('.'); if (parts.Length != 2) return false;
        var salt = Convert.FromBase64String(parts[0]); var actual = Convert.FromBase64String(parts[1]);
        var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 210_000, HashAlgorithmName.SHA256, actual.Length);
        return CryptographicOperations.FixedTimeEquals(hash, actual);
    }
    public async Task AuditAsync(SqliteConnection c, string actor, string action, string details, DbTransaction? tx = null) => await ExecuteAsync(c, "INSERT INTO AuditLog(OccurredAt,Actor,Action,Details) VALUES($at,$actor,$action,$details)", new[] { ("$at", (object?)DateTime.UtcNow.ToString("O")), ("$actor", (object?)actor), ("$action", (object?)action), ("$details", (object?)details) }, tx);
    public static async Task ExecuteAsync(SqliteConnection c, string sql, params (string Name, object? Value)[] parameters) => await ExecuteAsync(c, sql, parameters, null);
    public static async Task ExecuteAsync(SqliteConnection c, string sql, (string Name, object? Value)[] parameters, DbTransaction? tx)
    { await using var cmd = c.CreateCommand(); cmd.CommandText = sql; cmd.Transaction = tx as SqliteTransaction; foreach (var p in parameters) cmd.Parameters.AddWithValue(p.Name, p.Value ?? DBNull.Value); await cmd.ExecuteNonQueryAsync(); }
    public static async Task<T> ScalarAsync<T>(SqliteConnection c, string sql, params (string Name, object? Value)[] parameters)
    { await using var cmd = c.CreateCommand(); cmd.CommandText = sql; foreach (var p in parameters) cmd.Parameters.AddWithValue(p.Name, p.Value ?? DBNull.Value); var result = await cmd.ExecuteScalarAsync(); return (T)Convert.ChangeType(result!, typeof(T)); }
}
