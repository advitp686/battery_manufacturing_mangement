using BatteryManagement.Infrastructure;
using BatteryManagement.Views;
using QuestPDF.Infrastructure;
using System.Windows;

namespace BatteryManagement;

public partial class App : Application
{
    private MainWindow? _mainWindow;

    protected override async void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        try
        {
            QuestPDF.Settings.License = LicenseType.Community;
            await AppServices.Database.InitializeAsync();
            var login = new LoginWindow();
            if (login.ShowDialog() == true)
            {
                _mainWindow = new MainWindow(login.CurrentUser!);
                MainWindow = _mainWindow;
                _mainWindow.Show();
            }
            else
            {
                Shutdown();
            }
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Battery Management could not start.\n\n{ex.Message}", "Battery Management", MessageBoxButton.OK, MessageBoxImage.Error);
            Shutdown();
        }
    }
}
