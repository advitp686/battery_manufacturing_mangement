using BatteryManagement.Domain;
using BatteryManagement.Infrastructure;
using System.Windows;

namespace BatteryManagement.Views;

public partial class LoginWindow : Window
{
    public AppUser? CurrentUser { get; private set; }
    public LoginWindow() { InitializeComponent(); UsernameBox.Focus(); }
    private async void SignIn_Click(object sender, RoutedEventArgs e)
    {
        CurrentUser = await AppServices.Database.AuthenticateAsync(UsernameBox.Text, PasswordBox.Password);
        if (CurrentUser is null) { MessageBox.Show("Invalid username or password.", "Sign in", MessageBoxButton.OK, MessageBoxImage.Warning); return; }
        DialogResult = true;
    }
    private void Exit_Click(object sender, RoutedEventArgs e) => DialogResult = false;
}
