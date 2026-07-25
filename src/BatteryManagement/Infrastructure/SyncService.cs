using Microsoft.Data.Sqlite;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

namespace BatteryManagement.Infrastructure;

public sealed class SyncService(Database database)
{
    private readonly Database _database=database;
    private readonly HttpClient _http=new() { Timeout=TimeSpan.FromSeconds(20) };
    public async Task<(int Sent,int Pending,string Message)> FlushAsync()
    {
        var settings=SettingsService.Load();
        await using var c=_database.Open();await c.OpenAsync();
        var events=new List<(long Id,string Type,string Entity,string Payload,int Attempts)>();
        await using(var cmd=c.CreateCommand()){cmd.CommandText="SELECT Id,EntityType,EntityId,Payload,Attempts FROM SyncEvents WHERE Status='Pending' ORDER BY Id LIMIT 100";await using var r=await cmd.ExecuteReaderAsync();while(await r.ReadAsync())events.Add((r.GetInt64(0),r.GetString(1),r.GetString(2),r.GetString(3),r.GetInt32(4)));}
        if(events.Count==0)return(0,0,"Nothing pending.");
        if(string.IsNullOrWhiteSpace(settings.AppsScriptSyncUrl)||string.IsNullOrWhiteSpace(settings.SyncSecret))return(0,events.Count,"Google sync is not configured; events remain queued locally.");
        var sent=0;
        foreach(var item in events){try{var payload=JsonSerializer.Deserialize<JsonElement>(item.Payload);var response=await _http.PostAsJsonAsync(settings.AppsScriptSyncUrl,new{secret=settings.SyncSecret,entityType=item.Type,entityId=item.Entity,payload});response.EnsureSuccessStatusCode();await Update(item.Id,"Sent",item.Attempts+1,"");sent++;}catch(Exception ex){await Update(item.Id,"Pending",item.Attempts+1,ex.Message);}}
        return(sent,events.Count-sent,$"Published {sent}; {events.Count-sent} remain queued.");
    }
    public async Task<int> PendingAsync(){await using var c=_database.Open();await c.OpenAsync();return await Database.ScalarAsync<int>(c,"SELECT COUNT(*) FROM SyncEvents WHERE Status='Pending'");}
    private async Task Update(long id,string status,int attempts,string error){await using var c=_database.Open();await c.OpenAsync();await Database.ExecuteAsync(c,"UPDATE SyncEvents SET Status=$status,Attempts=$attempts,LastError=$error WHERE Id=$id",("$status",status),("$attempts",attempts),("$error",error),("$id",id));}
}
