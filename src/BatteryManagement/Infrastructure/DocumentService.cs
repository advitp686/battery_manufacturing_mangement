using BatteryManagement.Domain;
using QRCoder;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.IO;

namespace BatteryManagement.Infrastructure;

public sealed class DocumentService
{
    public string CreateQrLabel(BatteryPack pack)
    {
        var settings = SettingsService.Load();
        var url = string.IsNullOrWhiteSpace(settings.QrBaseUrl) ? $"https://example.invalid/verify?t={pack.QrToken}" : $"{settings.QrBaseUrl.TrimEnd('/', '?')}{(settings.QrBaseUrl.Contains('?') ? "&" : "?t=")}{pack.QrToken}";
        using var generator = new QRCodeGenerator(); using var data = generator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q);
        var bytes = new PngByteQRCode(data).GetGraphic(12);
        var file = Path.Combine(AppPaths.Labels, $"{pack.SerialNumber}.png"); File.WriteAllBytes(file, bytes);
        return file;
    }
    public string CreateSaleReceipt(Sale sale, BatteryPack pack, Warranty? warranty)
    {
        var settings=SettingsService.Load(); var file=Path.Combine(AppPaths.Documents,$"{sale.InvoiceNumber}-receipt.pdf");
        Document.Create(root => root.Page(page => { page.Margin(36); page.Header().Text(settings.CompanyName).SemiBold().FontSize(20); page.Content().Column(c => { c.Spacing(8); c.Item().Text($"Sale receipt: {sale.InvoiceNumber}"); c.Item().Text($"Date: {sale.SoldAt:dd MMM yyyy}"); c.Item().Text($"Customer / dealer: {sale.PartyName}"); c.Item().Text($"Battery: {pack.ModelName} ({pack.SerialNumber})"); c.Item().Text($"Amount: ₹ {sale.Amount:N2}"); c.Item().Text($"Sale type: {sale.SaleType}"); if(warranty is not null)c.Item().Text($"Warranty: {warranty.StartDate:dd MMM yyyy} to {warranty.EndDate:dd MMM yyyy}"); }); page.Footer().AlignCenter().Text(settings.SupportContact); })).GeneratePdf(file); return file;
    }
    public string CreateWarrantyCertificate(BatteryPack pack, Warranty warranty)
    {
        var settings=SettingsService.Load(); var file=Path.Combine(AppPaths.Documents,$"{pack.SerialNumber}-warranty.pdf"); var label=CreateQrLabel(pack);
        Document.Create(root=>root.Page(page=>{page.Margin(36);page.Header().Text("Warranty Certificate").SemiBold().FontSize(22);page.Content().Column(c=>{c.Spacing(10);c.Item().Text(settings.CompanyName).Bold();c.Item().Text($"Serial: {pack.SerialNumber}");c.Item().Text($"Model: {pack.ModelName}");c.Item().Text($"Manufactured: {pack.ManufacturedAt:dd MMM yyyy}");c.Item().Text($"Customer: {warranty.CustomerName}");c.Item().Text($"Valid: {warranty.StartDate:dd MMM yyyy} to {warranty.EndDate:dd MMM yyyy}");c.Item().Width(120).Image(File.ReadAllBytes(label));});page.Footer().AlignCenter().Text(settings.SupportContact);})).GeneratePdf(file);return file;
    }
}
