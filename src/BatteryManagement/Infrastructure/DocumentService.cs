using BatteryManagement.Domain;
using QRCoder;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace BatteryManagement.Infrastructure;

public sealed class DocumentService
{
    public string CreateQrLabel(BatteryPack pack)
    {
        var settings = SettingsService.Load();
        var url = string.IsNullOrWhiteSpace(settings.QrBaseUrl)
            ? $"https://example.invalid/verify?t={pack.QrToken}"
            : $"{settings.QrBaseUrl.TrimEnd('/', '?')}{(settings.QrBaseUrl.Contains('?') ? "&" : "?t=")}{pack.QrToken}";

        using var generator = new QRCodeGenerator();
        using var data = generator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q);
        var bytes = new PngByteQRCode(data).GetGraphic(12);

        var file = Path.Combine(AppPaths.Labels, $"{pack.SerialNumber}.png");
        File.WriteAllBytes(file, bytes);
        return file;
    }

    public string CreateSaleReceipt(InvoiceHeader invoice, IEnumerable<SaleItemRow> items, BatteryPack pack, Warranty? warranty)
    {
        var settings = SettingsService.Load();
        var file = Path.Combine(AppPaths.Documents, $"{invoice.InvoiceNumber}-tax-invoice.pdf");
        var lineItems = items?.ToList() ?? [];
        if (lineItems.Count == 0)
        {
            lineItems.Add(new SaleItemRow
            {
                InvoiceNumber = invoice.InvoiceNumber,
                ItemDescription = $"{pack.ModelName} ({pack.SerialNumber})",
                PackSerial = pack.SerialNumber,
                HsnCode = "87116020",
                Quantity = 1,
                UnitPrice = invoice.TaxableAmount
            });
        }

        var gstRate = settings.DefaultGstRate < 0 ? 0m : settings.DefaultGstRate;
        var taxTotal = invoice.CgstAmount + invoice.SgstAmount + invoice.IgstAmount + invoice.CessAmount;
        var grandTotal = invoice.GrandTotal > 0 ? invoice.GrandTotal : invoice.TaxableAmount + taxTotal;
        var companyContact = string.IsNullOrWhiteSpace(settings.CompanyPhone) ? settings.SupportContact : settings.CompanyPhone;
        var companyAddress = settings.CompanyAddress?.Trim() ?? string.Empty;
        var companyGstin = settings.CompanyGstin?.Trim() ?? string.Empty;
        var logo = LoadLogoBytes();

        Document.Create(root => root.Page(page =>
        {
            page.Margin(28);
            page.DefaultTextStyle(style => style.FontSize(10));

            page.Header().Column(header =>
            {
                if (logo is not null)
                {
                    header.Item().AlignCenter().Width(74).Height(58).Image(logo);
                }
                header.Item().AlignCenter().Text("TAX INVOICE").SemiBold().FontSize(16);
                header.Item().AlignCenter().Text(settings.CompanyName).Bold().FontSize(18);
                if (!string.IsNullOrWhiteSpace(companyAddress)) header.Item().AlignCenter().Text(companyAddress).FontSize(10);
                if (!string.IsNullOrWhiteSpace(companyContact)) header.Item().AlignCenter().Text($"Contact: {companyContact}");
                if (!string.IsNullOrWhiteSpace(companyGstin)) header.Item().AlignCenter().Text($"GSTIN: {companyGstin}").SemiBold();
                header.Item().PaddingTop(6).LineHorizontal(1);
            });

            page.Content().Column(content =>
            {
                content.Spacing(10);

                content.Item().Row(row =>
                {
                    row.RelativeItem().Border(1).Padding(8).Column(col =>
                    {
                        col.Item().Text("Bill To").Bold();
                        col.Item().Text(invoice.PartyName);
                        if (!string.IsNullOrWhiteSpace(invoice.FatherName)) col.Item().Text($"Father/Contact: {invoice.FatherName}");
                        if (!string.IsNullOrWhiteSpace(invoice.Phone)) col.Item().Text($"Phone: {invoice.Phone}");
                        if (!string.IsNullOrWhiteSpace(invoice.Address)) col.Item().Text($"Address: {invoice.Address}");
                        if (!string.IsNullOrWhiteSpace(invoice.VehicleNumber)) col.Item().Text($"Vehicle/Ref: {invoice.VehicleNumber}");
                    });

                    row.ConstantItem(220).Border(1).Padding(8).Column(col =>
                    {
                        col.Item().Text($"Invoice No: {invoice.InvoiceNumber}").Bold();
                        col.Item().Text($"Date: {invoice.SoldAt:dd MMM yyyy}");
                        col.Item().Text($"Sale Type: {invoice.SaleType}");
                        col.Item().Text($"Warranty: {invoice.WarrantyStatus}");
                    });
                });

                content.Item().Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.ConstantColumn(35);
                        columns.RelativeColumn(3);
                        columns.ConstantColumn(70);
                        columns.ConstantColumn(45);
                        columns.ConstantColumn(55);
                        columns.ConstantColumn(65);
                        columns.ConstantColumn(65);
                        columns.ConstantColumn(85);
                    });

                    table.Header(header =>
                    {
                        HeaderCell(header.Cell(), "No");
                        HeaderCell(header.Cell(), "Description");
                        HeaderCell(header.Cell(), "HSN");
                        HeaderCell(header.Cell(), "Qty");
                        HeaderCell(header.Cell(), "Rate");
                        HeaderCell(header.Cell(), $"GST {gstRate:0.##}%");
                        HeaderCell(header.Cell(), "GST Amt");
                        HeaderCell(header.Cell(), "Amount");
                    });

                    for (var i = 0; i < lineItems.Count; i++)
                    {
                        var item = lineItems[i];
                        var taxable = item.TotalAmount > 0 ? item.TotalAmount : item.Quantity * item.UnitPrice;
                        var gstAmount = item.ItemType.Equals("Battery", StringComparison.OrdinalIgnoreCase)
                            ? taxable * gstRate / 100m
                            : 0m;
                        var lineAmount = taxable + gstAmount;

                        DataCell(table.Cell(), (i + 1).ToString(CultureInfo.InvariantCulture));
                        DataCell(table.Cell(), item.ItemDescription);
                        DataCell(table.Cell(), string.IsNullOrWhiteSpace(item.HsnCode) ? "87116020" : item.HsnCode);
                        DataCell(table.Cell(), item.Quantity.ToString("0.##", CultureInfo.InvariantCulture));
                        DataCell(table.Cell(), taxable.ToString("0.00", CultureInfo.InvariantCulture));
                        DataCell(table.Cell(), gstRate.ToString("0.##", CultureInfo.InvariantCulture));
                        DataCell(table.Cell(), gstAmount.ToString("0.00", CultureInfo.InvariantCulture));
                        DataCell(table.Cell(), lineAmount.ToString("0.00", CultureInfo.InvariantCulture));
                    }
                });

                content.Item().Row(row =>
                {
                    row.RelativeItem().Border(1).Padding(8).Column(col =>
                    {
                        col.Item().Text("Notes").Bold();
                        col.Item().Text("Generated from the local invoice workflow. Keep the PDF and synced records together.");
                        if (warranty is not null)
                        {
                            col.Item().PaddingTop(4).Text($"Warranty period: {warranty.StartDate:dd MMM yyyy} to {warranty.EndDate:dd MMM yyyy}");
                        }
                    });

                    row.ConstantItem(220).Border(1).Padding(8).Column(col =>
                    {
                        MoneyRow(col, "Taxable", invoice.TaxableAmount);
                        MoneyRow(col, "CGST", invoice.CgstAmount);
                        MoneyRow(col, "SGST", invoice.SgstAmount);
                        MoneyRow(col, "IGST", invoice.IgstAmount);
                        MoneyRow(col, "Cess", invoice.CessAmount);
                        col.Item().LineHorizontal(1);
                        MoneyRow(col, "Grand Total", grandTotal, true);
                    });
                });
            });

            page.Footer().AlignCenter().Text(string.IsNullOrWhiteSpace(settings.SupportContact) ? settings.CompanyName : settings.SupportContact);
        })).GeneratePdf(file);

        return file;
    }

    public string CreateWarrantyCertificate(BatteryPack pack, Warranty warranty)
    {
        var settings = SettingsService.Load();
        var file = Path.Combine(AppPaths.Documents, $"{pack.SerialNumber}-warranty.pdf");
        var label = CreateQrLabel(pack);
        var logo = LoadLogoBytes();

        Document.Create(root => root.Page(page =>
        {
            page.Margin(36);
            page.Header().Column(header =>
            {
                if (logo is not null)
                {
                    header.Item().AlignCenter().Width(74).Height(58).Image(logo);
                }
                header.Item().AlignCenter().Text("Warranty Certificate").SemiBold().FontSize(22);
            });
            page.Content().Column(c =>
            {
                c.Spacing(10);
                c.Item().Text(settings.CompanyName).Bold();
                c.Item().Text($"Serial: {pack.SerialNumber}");
                c.Item().Text($"Model: {pack.ModelName}");
                c.Item().Text($"Manufactured: {pack.ManufacturedAt:dd MMM yyyy}");
                c.Item().Text($"Customer: {warranty.CustomerName}");
                c.Item().Text($"Valid: {warranty.StartDate:dd MMM yyyy} to {warranty.EndDate:dd MMM yyyy}");
                c.Item().Width(120).Image(File.ReadAllBytes(label));
            });
            page.Footer().AlignCenter().Text(settings.SupportContact);
        })).GeneratePdf(file);

        return file;
    }

    private static void HeaderCell(IContainer cell, string text) => cell.Border(1).Background("#EAF2F8").Padding(4).AlignCenter().Text(text).SemiBold();
    private static void DataCell(IContainer cell, string text) => cell.Border(1).Padding(4).Text(text);
    private static byte[]? LoadLogoBytes()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Assets", "lithynova_logo.png");
        return File.Exists(path) ? File.ReadAllBytes(path) : null;
    }
    private static void MoneyRow(ColumnDescriptor col, string label, decimal value, bool bold = false)
    {
        col.Item().Row(row =>
        {
            row.RelativeItem().Text(label);
            if (bold)
            {
                row.ConstantItem(90).AlignRight().Text($"Rs. {value:0.00}").Bold();
            }
            else
            {
                row.ConstantItem(90).AlignRight().Text($"Rs. {value:0.00}");
            }
        });
    }
}
