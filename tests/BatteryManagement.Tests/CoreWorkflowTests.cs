using BatteryManagement.Domain;
using BatteryManagement.Infrastructure;
using System.IO;
using Xunit;

[assembly: CollectionBehavior(DisableTestParallelization = true)]

namespace BatteryManagement.Tests;

public sealed class CoreWorkflowTests
{
    [Fact]
    public async Task Direct_and_dealer_lifecycles_preserve_traceability_and_warranty_dates()
    {
        var sandbox = Path.Combine(Path.GetTempPath(), "BatteryManagementTests", Guid.NewGuid().ToString("N"));
        Environment.SetEnvironmentVariable("BATTERY_MANAGEMENT_DATA_DIR", sandbox);
        var database = new Database();
        await database.InitializeAsync();
        SettingsService.Save(new AppSettings
        {
            CompanyName = "Battery Management",
            CompanyAddress = "Test Address",
            CompanyGstin = "09AAAAA0000A1Z5",
            CompanyPhone = "9999999999",
            SupportContact = "support@example.com",
            DefaultGstRate = 18m
        });
        var admin = await database.AuthenticateAsync("admin", "ChangeMe123!");
        Assert.NotNull(admin);

        var service = new BatteryService(database);
        var model = new BatteryModel { Code = "LFP48-100", Name = "48V 100Ah LFP", Chemistry = "LFP", Voltage = 48, CapacityAh = 100, Configuration = "16S1P", BmsSpecification = "100A BMS", WarrantyMonths = 24 };
        await service.AddModelAsync(model, admin!.Username);
        await service.ReceiveBatchAsync(new ComponentBatch { ComponentName = "LFP Cell", Supplier = "China Supplier", BatchCode = "CELL-2026-01", Quantity = 10, UnitCost = 3500, Location = "Main Store", Reference = "IMP-001" }, admin.Username);

        var storedModel = Assert.Single(await service.GetModelsAsync());
        var batch = Assert.Single(await service.GetBatchesAsync());
        var directPack = await service.BuildPackAsync(storedModel, batch, 1, 51.2m, 99.2m, 99m, "QC-1", true, "Pass", admin.Username);
        Assert.Equal("Saleable", directPack.Status);
        Assert.StartsWith("BAT-", directPack.SerialNumber);
        Assert.NotEmpty(directPack.QrToken);
        Assert.Equal(storedModel.Chemistry, directPack.Chemistry);

        var directSale = await service.SellPackAsync(directPack, false, "Retail Customer", "9999999999", "Pune", "EV-01", 85000m, admin.Username);
        var directInvoice = await service.GetInvoiceAsync(directSale.InvoiceNumber);
        Assert.NotNull(directInvoice);
        Assert.Equal(85000m, directInvoice!.TaxableAmount);
        Assert.Equal(directInvoice.CgstAmount, directInvoice.SgstAmount);
        Assert.True(directInvoice.GrandTotal > directInvoice.TaxableAmount);
        var directInvoiceItems = await service.GetInvoiceItemsAsync(directSale.InvoiceNumber);
        Assert.Single(directInvoiceItems);
        Assert.Equal(directPack.SerialNumber, directInvoiceItems[0].PackSerial);
        var directWarranty = Assert.Single(await service.GetWarrantiesAsync(), x => x.PackSerial == directPack.SerialNumber);
        Assert.Equal(directWarranty.StartDate.AddMonths(24), directWarranty.EndDate);
        Assert.Equal("WarrantyActive", (await service.GetPacksAsync()).Single(x => x.SerialNumber == directPack.SerialNumber).Status);

        batch = Assert.Single(await service.GetBatchesAsync());
        var dealerPack = await service.BuildPackAsync(storedModel, batch, 1, 51.1m, 98.8m, 98m, "QC-1", true, "Pass", admin.Username);
        var dealerSale = await service.SellPackAsync(dealerPack, true, "EV Dealer", "8888888888", "Mumbai", "", 80000m, admin.Username);
        var dealerInvoice = await service.GetInvoiceAsync(dealerSale.InvoiceNumber);
        Assert.NotNull(dealerInvoice);
        Assert.Equal("Dealer", dealerInvoice!.SaleType);
        Assert.Equal(80000m, dealerInvoice.TaxableAmount);
        Assert.Equal(2, (await service.GetInvoicesAsync()).Count);
        var dealerStockPack = (await service.GetPacksAsync()).Single(x => x.SerialNumber == dealerPack.SerialNumber);
        Assert.Equal("DealerStock", dealerStockPack.Status);

        var activation = DateTime.Today.AddDays(-3);
        await service.RegisterDealerWarrantyAsync(dealerStockPack, "Dealer Customer", "7777777777", "Nashik", "EV-02", activation, admin.Username);
        var dealerWarranty = (await service.GetWarrantiesAsync()).Single(x => x.PackSerial == dealerPack.SerialNumber);
        Assert.Equal(activation, dealerWarranty.StartDate);
        Assert.Equal(activation.AddMonths(24), dealerWarranty.EndDate);

        var activeDealerPack = (await service.GetPacksAsync()).Single(x => x.SerialNumber == dealerPack.SerialNumber);
        var claim = await service.AddClaimAsync(activeDealerPack, "Low range reported", admin.Username);
        await service.ResolveClaimAsync(claim, "Repair", "", "Inspected and repaired", admin.Username);
        var resolved = Assert.Single(await service.GetClaimsAsync());
        Assert.Equal("Resolved", resolved.Status);
        Assert.Equal("Repair", resolved.Resolution);
        Assert.Contains(await service.GetMovementsAsync(), x => x.MovementType == "Assembly consumption");
    }
}
