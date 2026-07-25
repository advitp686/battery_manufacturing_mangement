using BatteryManagement.Infrastructure;
using BatteryManagement.Views;
using QuestPDF.Infrastructure;
using System.Windows;

namespace BatteryManagement;

public partial class App : Application
{
    protected override async void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        QuestPDF.Settings.License = LicenseType.Community;
        await AppServices.Database.InitializeAsync();
        var login = new LoginWindow();
        if (login.ShowDialog() == true)
        {
            new MainWindow(login.CurrentUser!).Show();
        }
        else
        {
            Shutdown();
        }
    }
}
