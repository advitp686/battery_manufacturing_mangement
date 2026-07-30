using BatteryManagement.Domain;
using Microsoft.Data.Sqlite;
using System.Data.Common;
using System.Globalization;
using System.Text.Json;

namespace BatteryManagement.Infrastructure;

public sealed class BatteryService(Database database)
{
    private readonly Database _database = database;
    private static string Utc(DateTime value) => value.ToUniversalTime().ToString("O");
    private static DateTime Date(SqliteDataReader r, int i) => DateTime.Parse(r.GetString(i), CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind).ToLocalTime();
    private static decimal Money(decimal value) => decimal.Round(value, 2, MidpointRounding.AwayFromZero);

    public async Task<List<BatteryModel>> GetModelsAsync()
    {
        var result = new List<BatteryModel>(); await using var c = _database.Open(); await c.OpenAsync(); await using var cmd = c.CreateCommand();
        cmd.CommandText = "SELECT Id,Code,Name,Chemistry,Voltage,CapacityAh,Configuration,BmsSpecification,Dimensions,WarrantyMonths,Active FROM BatteryModels ORDER BY Code";
        await using var r = await cmd.ExecuteReaderAsync(); while (await r.ReadAsync()) result.Add(new BatteryModel { Id=r.GetInt64(0), Code=r.GetString(1), Name=r.GetString(2), Chemistry=r.GetString(3), Voltage=r.GetDecimal(4), CapacityAh=r.GetDecimal(5), Configuration=r.IsDBNull(6)?"":r.GetString(6), BmsSpecification=r.IsDBNull(7)?"":r.GetString(7), Dimensions=r.IsDBNull(8)?"":r.GetString(8), WarrantyMonths=r.GetInt32(9), Active=r.GetBoolean(10) }); return result;
    }
    public async Task<List<ComponentBatch>> GetBatchesAsync()
    {
        var result = new List<ComponentBatch>(); await using var c = _database.Open(); await c.OpenAsync(); await using var cmd = c.CreateCommand();
        cmd.CommandText = "SELECT Id,ComponentName,Supplier,BatchCode,Quantity,AvailableQuantity,UnitCost,Location,Reference,ReceivedAt FROM ComponentBatches ORDER BY ReceivedAt DESC"; await using var r = await cmd.ExecuteReaderAsync();
        while (await r.ReadAsync()) result.Add(new ComponentBatch { Id=r.GetInt64(0), ComponentName=r.GetString(1), Supplier=r.IsDBNull(2)?"":r.GetString(2), BatchCode=r.GetString(3), Quantity=r.GetDecimal(4), AvailableQuantity=r.GetDecimal(5), UnitCost=r.GetDecimal(6), Location=r.GetString(7), Reference=r.IsDBNull(8)?"":r.GetString(8), ReceivedAt=Date(r,9) }); return result;
    }
    public async Task<List<BatteryPack>> GetPacksAsync()
    {
        var result = new List<BatteryPack>(); await using var c = _database.Open(); await c.OpenAsync(); await using var cmd = c.CreateCommand(); cmd.CommandText="SELECT Id,SerialNumber,QrToken,ModelCode,ModelName,Chemistry,SourceBatch,ManufacturedAt,Status,MeasuredVoltage,MeasuredCapacityAh,HealthPercent,BmsSpecification,Tester,QcNotes FROM BatteryPacks ORDER BY Id DESC"; await using var r=await cmd.ExecuteReaderAsync();
        while(await r.ReadAsync()) result.Add(new BatteryPack { Id=r.GetInt64(0),SerialNumber=r.GetString(1),QrToken=r.GetString(2),ModelCode=r.GetString(3),ModelName=r.GetString(4),Chemistry=r.IsDBNull(5)?"":r.GetString(5),SourceBatch=r.IsDBNull(6)?"":r.GetString(6),ManufacturedAt=Date(r,7),Status=r.GetString(8),MeasuredVoltage=r.IsDBNull(9)?0:r.GetDecimal(9),MeasuredCapacityAh=r.IsDBNull(10)?0:r.GetDecimal(10),HealthPercent=r.IsDBNull(11)?0:r.GetDecimal(11),BmsSpecification=r.IsDBNull(12)?"":r.GetString(12),Tester=r.IsDBNull(13)?"":r.GetString(13),QcNotes=r.IsDBNull(14)?"":r.GetString(14) }); return result;
    }
    public async Task<List<Warranty>> GetWarrantiesAsync()
    {
        var list=new List<Warranty>(); await using var c=_database.Open();await c.OpenAsync();await using var cmd=c.CreateCommand();cmd.CommandText="SELECT Id,PackSerial,CustomerName,StartDate,EndDate,Status FROM Warranties ORDER BY EndDate";await using var r=await cmd.ExecuteReaderAsync();while(await r.ReadAsync())list.Add(new Warranty{Id=r.GetInt64(0),PackSerial=r.GetString(1),CustomerName=r.GetString(2),StartDate=Date(r,3),EndDate=Date(r,4),Status=r.GetString(5)});return list;
    }
    public async Task<List<Sale>> GetSalesAsync()
    { var list=new List<Sale>();await using var c=_database.Open();await c.OpenAsync();await using var cmd=c.CreateCommand();cmd.CommandText="SELECT Id,InvoiceNumber,PackSerial,SaleType,PartyName,Amount,SoldAt FROM Sales ORDER BY Id DESC";await using var r=await cmd.ExecuteReaderAsync();while(await r.ReadAsync())list.Add(new Sale{Id=r.GetInt64(0),InvoiceNumber=r.GetString(1),PackSerial=r.GetString(2),SaleType=r.GetString(3),PartyName=r.GetString(4),Amount=r.GetDecimal(5),SoldAt=Date(r,6)});return list; }
    public async Task<List<InvoiceHeader>> GetInvoicesAsync()
    {
        var list = new List<InvoiceHeader>();
        await using var c = _database.Open();
        await c.OpenAsync();
        await using var cmd = c.CreateCommand();
        cmd.CommandText = "SELECT Id,InvoiceNumber,SaleType,PartyName,FatherName,Phone,Address,VehicleNumber,TaxableAmount,CgstAmount,SgstAmount,IgstAmount,CessAmount,GrandTotal,PaidAmount,BalanceAmount,SoldAt,WarrantyStatus FROM Invoices ORDER BY Id DESC";
        await using var r = await cmd.ExecuteReaderAsync();
        while (await r.ReadAsync())
        {
            list.Add(new InvoiceHeader
            {
                Id = r.GetInt64(0),
                InvoiceNumber = r.GetString(1),
                SaleType = r.GetString(2),
                PartyName = r.GetString(3),
                FatherName = r.IsDBNull(4) ? "" : r.GetString(4),
                Phone = r.IsDBNull(5) ? "" : r.GetString(5),
                Address = r.IsDBNull(6) ? "" : r.GetString(6),
                VehicleNumber = r.IsDBNull(7) ? "" : r.GetString(7),
                TaxableAmount = r.GetDecimal(8),
                CgstAmount = r.GetDecimal(9),
                SgstAmount = r.GetDecimal(10),
                IgstAmount = r.GetDecimal(11),
                CessAmount = r.GetDecimal(12),
                GrandTotal = r.GetDecimal(13),
                PaidAmount = r.GetDecimal(14),
                BalanceAmount = r.GetDecimal(15),
                SoldAt = Date(r, 16),
                WarrantyStatus = r.IsDBNull(17) ? "" : r.GetString(17)
            });
        }
        return list;
    }
    public async Task<InvoiceHeader?> GetInvoiceAsync(string invoiceNumber)
    {
        if (string.IsNullOrWhiteSpace(invoiceNumber)) return null;
        await using var c = _database.Open();
        await c.OpenAsync();
        await using var cmd = c.CreateCommand();
        cmd.CommandText = "SELECT Id,InvoiceNumber,SaleType,PartyName,FatherName,Phone,Address,VehicleNumber,TaxableAmount,CgstAmount,SgstAmount,IgstAmount,CessAmount,GrandTotal,PaidAmount,BalanceAmount,SoldAt,WarrantyStatus FROM Invoices WHERE InvoiceNumber=$invoice LIMIT 1";
        cmd.Parameters.AddWithValue("$invoice", invoiceNumber.Trim());
        await using var r = await cmd.ExecuteReaderAsync();
        if (!await r.ReadAsync()) return null;
        return new InvoiceHeader
        {
            Id = r.GetInt64(0),
            InvoiceNumber = r.GetString(1),
            SaleType = r.GetString(2),
            PartyName = r.GetString(3),
            FatherName = r.IsDBNull(4) ? "" : r.GetString(4),
            Phone = r.IsDBNull(5) ? "" : r.GetString(5),
            Address = r.IsDBNull(6) ? "" : r.GetString(6),
            VehicleNumber = r.IsDBNull(7) ? "" : r.GetString(7),
            TaxableAmount = r.GetDecimal(8),
            CgstAmount = r.GetDecimal(9),
            SgstAmount = r.GetDecimal(10),
            IgstAmount = r.GetDecimal(11),
            CessAmount = r.GetDecimal(12),
            GrandTotal = r.GetDecimal(13),
            PaidAmount = r.GetDecimal(14),
            BalanceAmount = r.GetDecimal(15),
            SoldAt = Date(r, 16),
            WarrantyStatus = r.IsDBNull(17) ? "" : r.GetString(17)
        };
    }
    public async Task<List<SaleItemRow>> GetInvoiceItemsAsync(string invoiceNumber)
    {
        var list = new List<SaleItemRow>();
        if (string.IsNullOrWhiteSpace(invoiceNumber)) return list;
        await using var c = _database.Open();
        await c.OpenAsync();
        await using var cmd = c.CreateCommand();
        cmd.CommandText = "SELECT Id,InvoiceNumber,ItemType,ItemDescription,PackSerial,HsnCode,ChassisVin,EngineMotor,Color,KeyController,WrcNo,ChargerInfo,BatteryInfo,Quantity,UnitPrice,TotalAmount FROM SaleItems WHERE InvoiceNumber=$invoice ORDER BY Id ASC";
        cmd.Parameters.AddWithValue("$invoice", invoiceNumber.Trim());
        await using var r = await cmd.ExecuteReaderAsync();
        while (await r.ReadAsync())
        {
            list.Add(new SaleItemRow
            {
                Id = r.GetInt64(0),
                InvoiceNumber = r.GetString(1),
                ItemType = r.GetString(2),
                ItemDescription = r.GetString(3),
                PackSerial = r.IsDBNull(4) ? "" : r.GetString(4),
                HsnCode = r.IsDBNull(5) ? "" : r.GetString(5),
                ChassisVin = r.IsDBNull(6) ? "" : r.GetString(6),
                EngineMotor = r.IsDBNull(7) ? "" : r.GetString(7),
                Color = r.IsDBNull(8) ? "" : r.GetString(8),
                KeyController = r.IsDBNull(9) ? "" : r.GetString(9),
                WrcNo = r.IsDBNull(10) ? "" : r.GetString(10),
                ChargerInfo = r.IsDBNull(11) ? "" : r.GetString(11),
                BatteryInfo = r.IsDBNull(12) ? "" : r.GetString(12),
                Quantity = r.GetDecimal(13),
                UnitPrice = r.GetDecimal(14)
            });
        }
        return list;
    }
    public async Task<List<WarrantyClaim>> GetClaimsAsync()
    { var list=new List<WarrantyClaim>();await using var c=_database.Open();await c.OpenAsync();await using var cmd=c.CreateCommand();cmd.CommandText="SELECT Id,ClaimNumber,PackSerial,Complaint,Status,Resolution,ReplacementSerial,Notes,CreatedAt FROM WarrantyClaims ORDER BY Id DESC";await using var r=await cmd.ExecuteReaderAsync();while(await r.ReadAsync())list.Add(new WarrantyClaim{Id=r.GetInt64(0),ClaimNumber=r.GetString(1),PackSerial=r.GetString(2),Complaint=r.GetString(3),Status=r.GetString(4),Resolution=r.IsDBNull(5)?"":r.GetString(5),ReplacementSerial=r.IsDBNull(6)?"":r.GetString(6),Notes=r.IsDBNull(7)?"":r.GetString(7),CreatedAt=Date(r,8)});return list; }
    public async Task<List<StockMovement>> GetMovementsAsync()
    { var list=new List<StockMovement>();await using var c=_database.Open();await c.OpenAsync();await using var cmd=c.CreateCommand();cmd.CommandText="SELECT Id,MovementType,Reference,Item,Quantity,OccurredAt,Notes FROM StockMovements ORDER BY Id DESC LIMIT 500";await using var r=await cmd.ExecuteReaderAsync();while(await r.ReadAsync())list.Add(new StockMovement{Id=r.GetInt64(0),MovementType=r.GetString(1),Reference=r.GetString(2),Item=r.GetString(3),Quantity=r.GetDecimal(4),OccurredAt=Date(r,5),Notes=r.IsDBNull(6)?"":r.GetString(6)});return list; }

    public async Task AddModelAsync(BatteryModel model, string actor)
    { if(string.IsNullOrWhiteSpace(model.Code)||string.IsNullOrWhiteSpace(model.Name)||model.Voltage<=0||model.CapacityAh<=0)throw new InvalidOperationException("Code, name, voltage, and capacity are required.");await using var c=_database.Open();await c.OpenAsync();using var tx=c.BeginTransaction();await Exec(c,tx,"INSERT INTO BatteryModels(Code,Name,Chemistry,Voltage,CapacityAh,Configuration,BmsSpecification,Dimensions,WarrantyMonths,Active) VALUES($code,$name,$chem,$voltage,$capacity,$configuration,$bms,$dimensions,$warranty,1)",( "$code",model.Code.Trim().ToUpperInvariant()),("$name",model.Name.Trim()),("$chem",model.Chemistry),("$voltage",model.Voltage),("$capacity",model.CapacityAh),("$configuration",model.Configuration),("$bms",model.BmsSpecification),("$dimensions",model.Dimensions),("$warranty",model.WarrantyMonths));await Queue(c,tx,"BatteryModel",model.Code,new {model.Code,model.Name,model.Chemistry,model.Voltage,model.CapacityAh,model.WarrantyMonths});await _database.AuditAsync(c,actor,"Add model",model.Code,tx);tx.Commit(); }

    public async Task ReceiveBatchAsync(ComponentBatch batch, string actor)
    { if(string.IsNullOrWhiteSpace(batch.ComponentName)||string.IsNullOrWhiteSpace(batch.BatchCode)||batch.Quantity<=0)throw new InvalidOperationException("Component, unique batch code, and positive quantity are required.");await using var c=_database.Open();await c.OpenAsync();using var tx=c.BeginTransaction();var now=DateTime.Now;await Exec(c,tx,"INSERT INTO ComponentBatches(ComponentName,Supplier,BatchCode,Quantity,AvailableQuantity,UnitCost,Location,Reference,ReceivedAt) VALUES($item,$supplier,$batch,$qty,$qty,$cost,$location,$reference,$at)",( "$item",batch.ComponentName.Trim()),("$supplier",batch.Supplier),("$batch",batch.BatchCode.Trim().ToUpperInvariant()),("$qty",batch.Quantity),("$cost",batch.UnitCost),("$location",batch.Location),("$reference",batch.Reference),("$at",Utc(now)));await Movement(c,tx,"Receipt",batch.BatchCode,batch.ComponentName,batch.Quantity,batch.Reference);await Queue(c,tx,"ComponentBatch",batch.BatchCode,batch);await _database.AuditAsync(c,actor,"Receive batch",batch.BatchCode,tx);tx.Commit(); }

    public async Task<BatteryPack> BuildPackAsync(BatteryModel model, ComponentBatch batch, decimal componentQuantity, decimal measuredVoltage, decimal measuredCapacity, decimal health, string tester, bool passed, string notes, string actor)
    { if(componentQuantity<=0||batch.AvailableQuantity<componentQuantity)throw new InvalidOperationException("The selected batch does not have enough available stock."); if(measuredVoltage<=0||measuredCapacity<=0)throw new InvalidOperationException("Final voltage and capacity are required.");await using var c=_database.Open();await c.OpenAsync();using var tx=c.BeginTransaction();var year=DateTime.Now.Year;var count=await Scalar(c,tx,"SELECT COUNT(*) FROM BatteryPacks WHERE strftime('%Y',ManufacturedAt)= $year",("$year",year.ToString()));var serial=$"BAT-{year}-{count+1:000000}";var pack=new BatteryPack{SerialNumber=serial,QrToken=Guid.NewGuid().ToString("N"),ModelCode=model.Code,ModelName=model.Name,Chemistry=model.Chemistry,SourceBatch=batch.BatchCode,ManufacturedAt=DateTime.Now,Status=passed?"Saleable":"QCFailed",MeasuredVoltage=measuredVoltage,MeasuredCapacityAh=measuredCapacity,HealthPercent=health,BmsSpecification=model.BmsSpecification,Tester=tester,QcNotes=notes};await Exec(c,tx,"UPDATE ComponentBatches SET AvailableQuantity=AvailableQuantity-$used WHERE Id=$id",("$used",componentQuantity),("$id",batch.Id));await Movement(c,tx,"Assembly consumption",serial,batch.BatchCode,-componentQuantity,$"Pack {serial}");await Exec(c,tx,"INSERT INTO BatteryPacks(SerialNumber,QrToken,ModelCode,ModelName,Chemistry,SourceBatch,ManufacturedAt,Status,MeasuredVoltage,MeasuredCapacityAh,HealthPercent,BmsSpecification,Tester,QcNotes) VALUES($serial,$token,$code,$name,$chemistry,$batch,$manufactured,$status,$voltage,$capacity,$health,$bms,$tester,$notes)",( "$serial",pack.SerialNumber),("$token",pack.QrToken),("$code",pack.ModelCode),("$name",pack.ModelName),("$chemistry",pack.Chemistry),("$batch",pack.SourceBatch),("$manufactured",Utc(pack.ManufacturedAt)),("$status",pack.Status),("$voltage",pack.MeasuredVoltage),("$capacity",pack.MeasuredCapacityAh),("$health",pack.HealthPercent),("$bms",pack.BmsSpecification),("$tester",pack.Tester),("$notes",pack.QcNotes));if(passed)await Movement(c,tx,"QC output",serial,model.Code,1,"Passed final QC");await Queue(c,tx,"BatteryPack",serial,PublicPack(pack,null));await _database.AuditAsync(c,actor,"Build pack",serial,tx);tx.Commit();return pack; }

    public async Task<Sale> SellPackAsync(BatteryPack pack, bool dealerSale, string partyName, string phone, string address, string vehicle, decimal amount, string actor)
    {
        if (pack.Status != "Saleable") throw new InvalidOperationException("Only saleable packs can be sold.");
        if (string.IsNullOrWhiteSpace(partyName)) throw new InvalidOperationException("Customer or dealer name is required.");

        await using var c = _database.Open();
        await c.OpenAsync();
        await using var tx = await c.BeginTransactionAsync();

        var date = DateTime.Now;
        var invoice = $"INV-{date:yyyy}-{await Scalar(c, tx, "SELECT COUNT(*) FROM Sales") + 1:000000}";
        var party = partyName.Trim();
        var saleType = dealerSale ? "Dealer" : "Retail";
        var settings = SettingsService.Load();
        var gstRate = settings.DefaultGstRate < 0 ? 0m : settings.DefaultGstRate;
        var taxableAmount = Money(amount);
        var gstAmount = Money(taxableAmount * gstRate / 100m);
        var cgstAmount = Money(gstAmount / 2m);
        var sgstAmount = Money(gstAmount - cgstAmount);
        var igstAmount = 0m;
        var cessAmount = 0m;
        var grandTotal = Money(taxableAmount + gstAmount + cessAmount);
        long months = 0;
        Warranty? warranty = null;

        var sale = new Sale
        {
            InvoiceNumber = invoice,
            PackSerial = pack.SerialNumber,
            SaleType = saleType,
            PartyName = party,
            Amount = taxableAmount,
            SoldAt = date
        };

        if (dealerSale)
        {
            await Exec(c, tx, "INSERT OR IGNORE INTO Dealers(Name,Phone,Address) VALUES($name,$phone,$address)", ("$name", party), ("$phone", phone), ("$address", address));
            await Exec(c, tx, "UPDATE BatteryPacks SET Status='DealerStock' WHERE SerialNumber=$serial", ("$serial", pack.SerialNumber));
            await Queue(c, tx, "Dealer", party, new { Name = party, Phone = phone, Address = address });
        }
        else
        {
            await Exec(c, tx, "INSERT INTO Customers(Name,Phone,Address,VehicleNumber) VALUES($name,$phone,$address,$vehicle)", ("$name", party), ("$phone", phone), ("$address", address), ("$vehicle", vehicle));
            months = await Scalar(c, tx, "SELECT WarrantyMonths FROM BatteryModels WHERE Code=$code", ("$code", pack.ModelCode));
            warranty = new Warranty
            {
                PackSerial = pack.SerialNumber,
                CustomerName = party,
                StartDate = date,
                EndDate = date.AddMonths((int)months),
                Status = "Active"
            };
            await Exec(c, tx, "INSERT INTO Warranties(PackSerial,CustomerName,StartDate,EndDate,Status) VALUES($serial,$customer,$start,$end,'Active')", ("$serial", pack.SerialNumber), ("$customer", party), ("$start", Utc(date)), ("$end", Utc(date.AddMonths((int)months))));
            await Exec(c, tx, "UPDATE BatteryPacks SET Status='WarrantyActive' WHERE SerialNumber=$serial", ("$serial", pack.SerialNumber));
            await Queue(c, tx, "Customer", party, new { Name = party, Phone = phone, Address = address, VehicleNumber = vehicle });
            await Queue(c, tx, "Warranty", pack.SerialNumber, warranty);
        }

        await Exec(c, tx, "INSERT INTO Sales(InvoiceNumber,PackSerial,SaleType,PartyName,Amount,SoldAt) VALUES($invoice,$serial,$type,$party,$amount,$at)",
            ("$invoice", invoice), ("$serial", pack.SerialNumber), ("$type", saleType), ("$party", sale.PartyName), ("$amount", taxableAmount), ("$at", Utc(date)));

        await Exec(c, tx, """
            INSERT INTO Invoices(
                InvoiceNumber,SaleType,PartyName,FatherName,Phone,Address,VehicleNumber,
                TaxableAmount,CgstAmount,SgstAmount,IgstAmount,CessAmount,
                GrandTotal,PaidAmount,BalanceAmount,SoldAt,WarrantyStatus
            ) VALUES(
                $invoice,$type,$party,'',$phone,$address,$vehicle,
                $taxable,$cgst,$sgst,$igst,$cess,
                $grandTotal,0,$balance,$at,$warrantyStatus
            )
        """,
            ("$invoice", invoice),
            ("$type", saleType),
            ("$party", party),
            ("$phone", phone),
            ("$address", address),
            ("$vehicle", vehicle),
            ("$taxable", taxableAmount),
            ("$cgst", cgstAmount),
            ("$sgst", sgstAmount),
            ("$igst", igstAmount),
            ("$cess", cessAmount),
            ("$grandTotal", grandTotal),
            ("$balance", grandTotal),
            ("$at", Utc(date)),
            ("$warrantyStatus", dealerSale ? "Dealer stock" : "Warranty active"));

        await Exec(c, tx, """
            INSERT INTO SaleItems(
                InvoiceNumber,ItemType,ItemDescription,PackSerial,HsnCode,
                ChassisVin,EngineMotor,Color,KeyController,WrcNo,ChargerInfo,BatteryInfo,
                Quantity,UnitPrice,TotalAmount
            ) VALUES(
                $invoice,$itemType,$itemDescription,$serial,$hsn,
                '','','','','','','',
                1,$unitPrice,$totalAmount
            )
        """,
            ("$invoice", invoice),
            ("$itemType", "Battery"),
            ("$itemDescription", $"{pack.ModelName} ({pack.SerialNumber})"),
            ("$serial", pack.SerialNumber),
            ("$hsn", "87116020"),
            ("$unitPrice", taxableAmount),
            ("$totalAmount", taxableAmount));

        await PostLedgerEntryAsync(c, tx, party, saleType, invoice, $"Tax Invoice {invoice} ({saleType} Sale)", grandTotal, 0m, date);
        await Queue(c, tx, "Sale", invoice, sale);
        await Queue(c, tx, "InvoiceHeader", invoice, new InvoiceHeader
        {
            InvoiceNumber = invoice,
            SaleType = saleType,
            PartyName = party,
            FatherName = "",
            Phone = phone,
            Address = address,
            VehicleNumber = vehicle,
            TaxableAmount = taxableAmount,
            CgstAmount = cgstAmount,
            SgstAmount = sgstAmount,
            IgstAmount = igstAmount,
            CessAmount = cessAmount,
            GrandTotal = grandTotal,
            PaidAmount = 0m,
            BalanceAmount = grandTotal,
            SoldAt = date,
            WarrantyStatus = dealerSale ? "Dealer stock" : "Warranty active"
        });
        await Queue(c, tx, "SaleItemRow", invoice, new SaleItemRow
        {
            InvoiceNumber = invoice,
            ItemType = "Battery",
            ItemDescription = $"{pack.ModelName} ({pack.SerialNumber})",
            PackSerial = pack.SerialNumber,
            HsnCode = "87116020",
            Quantity = 1,
            UnitPrice = taxableAmount
        });
        await Queue(c, tx, "PartyLedger", invoice, new { PartyName = party, PartyType = saleType, TransactionDate = Utc(date), Reference = invoice, Description = $"Tax Invoice {invoice} ({saleType} Sale)", Debit = grandTotal, Credit = 0m });
        await Movement(c, tx, "Sale", invoice, pack.SerialNumber, -1, $"{saleType} sale");
        await Queue(c, tx, "BatteryPack", pack.SerialNumber, PublicPack(pack, dealerSale ? null : warranty));
        await _database.AuditAsync(c, actor, "Sell pack", invoice, tx);
        await tx.CommitAsync();
        return sale;
    }

    public async Task RegisterDealerWarrantyAsync(BatteryPack pack,string customerName,string phone,string address,string vehicle,DateTime start,string actor)
    {
        if (pack.Status != "DealerStock") throw new InvalidOperationException("Only dealer-stock packs can be activated this way.");
        if (string.IsNullOrWhiteSpace(customerName)) throw new InvalidOperationException("Customer name is required.");
        await using var c = _database.Open();
        await c.OpenAsync();
        await using var tx = await c.BeginTransactionAsync();
        var months = await Scalar(c, tx, "SELECT WarrantyMonths FROM BatteryModels WHERE Code=$code", ("$code", pack.ModelCode));
        var warranty = new Warranty { PackSerial = pack.SerialNumber, CustomerName = customerName.Trim(), StartDate = start.Date, EndDate = start.Date.AddMonths((int)months), Status = "Active" };
        await Exec(c, tx, "INSERT INTO Customers(Name,Phone,Address,VehicleNumber) VALUES($name,$phone,$address,$vehicle)", ("$name", warranty.CustomerName), ("$phone", phone), ("$address", address), ("$vehicle", vehicle));
        await Exec(c, tx, "INSERT INTO Warranties(PackSerial,CustomerName,StartDate,EndDate,Status) VALUES($serial,$customer,$start,$end,'Active')", ("$serial", warranty.PackSerial), ("$customer", warranty.CustomerName), ("$start", Utc(warranty.StartDate)), ("$end", Utc(warranty.EndDate)));
        await Exec(c, tx, "UPDATE BatteryPacks SET Status='WarrantyActive' WHERE SerialNumber=$serial", ("$serial", pack.SerialNumber));
        await Queue(c, tx, "Customer", warranty.CustomerName, new { Name = warranty.CustomerName, Phone = phone, Address = address, VehicleNumber = vehicle });
        await Queue(c, tx, "Warranty", warranty.PackSerial, warranty);
        await Queue(c, tx, "BatteryPack", pack.SerialNumber, PublicPack(pack, warranty));
        await _database.AuditAsync(c, actor, "Activate dealer warranty", pack.SerialNumber, tx);
        await tx.CommitAsync();
    }

    public async Task<List<string>> GetLedgerPartiesAsync()
    {
        var parties = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        await using var c = _database.Open();
        await c.OpenAsync();

        async Task CollectAsync(string sql)
        {
            await using var cmd = c.CreateCommand();
            cmd.CommandText = sql;
            await using var r = await cmd.ExecuteReaderAsync();
            while (await r.ReadAsync())
            {
                var value = r.IsDBNull(0) ? "" : r.GetString(0).Trim();
                if (!string.IsNullOrWhiteSpace(value)) parties.Add(value);
            }
        }

        await CollectAsync("SELECT Name FROM Customers UNION SELECT Name FROM Dealers UNION SELECT PartyName FROM PartyLedger ORDER BY 1");
        return parties.OrderBy(x => x).ToList();
    }

    public async Task<List<PartyLedgerEntry>> GetPartyLedgerAsync(string party)
    {
        if (string.IsNullOrWhiteSpace(party)) return [];
        await using var c = _database.Open();
        await c.OpenAsync();
        await using var cmd = c.CreateCommand();
        cmd.CommandText = """
            SELECT Id, PartyName, PartyType, TransactionDate, Reference, Description, Debit, Credit, Balance
            FROM PartyLedger
            WHERE PartyName = $party
            ORDER BY datetime(TransactionDate) ASC, Id ASC
        """;
        cmd.Parameters.AddWithValue("$party", party.Trim());

        var result = new List<PartyLedgerEntry>();
        var running = 0m;
        await using var r = await cmd.ExecuteReaderAsync();
        while (await r.ReadAsync())
        {
            var debit = r.IsDBNull(6) ? 0m : r.GetDecimal(6);
            var credit = r.IsDBNull(7) ? 0m : r.GetDecimal(7);
            running += debit - credit;
            result.Add(new PartyLedgerEntry
            {
                Id = r.GetInt64(0),
                PartyName = r.GetString(1),
                PartyType = r.GetString(2),
                TransactionDate = Date(r, 3),
                Reference = r.GetString(4),
                Description = r.GetString(5),
                Debit = debit,
                Credit = credit,
                Balance = running
            });
        }
        return result;
    }

    public async Task RecordLedgerPaymentAsync(string party, decimal amount, string reference, string mode, string notes, string actor)
    {
        if (string.IsNullOrWhiteSpace(party)) throw new InvalidOperationException("Party name is required.");
        if (amount <= 0) throw new InvalidOperationException("Payment amount must be positive.");
        reference = string.IsNullOrWhiteSpace(reference) ? $"PAY-{DateTime.Now:yyyyMMddHHmmssfff}" : reference.Trim();
        mode = string.IsNullOrWhiteSpace(mode) ? "Cash/Bank" : mode.Trim();
        notes = string.IsNullOrWhiteSpace(notes) ? "Received payment credit" : notes.Trim();

        await using var c = _database.Open();
        await c.OpenAsync();
        await using var tx = await c.BeginTransactionAsync();
        var partyType = await ResolvePartyTypeAsync(c, tx, party.Trim());
        await PostLedgerEntryAsync(c, tx, party.Trim(), partyType, reference, $"{notes} via {mode}", 0m, amount, DateTime.Now);
        await Queue(c, tx, "PartyLedger", reference, new { PartyName = party.Trim(), PartyType = partyType, TransactionDate = Utc(DateTime.Now), Reference = reference, Description = $"{notes} via {mode}", Debit = 0m, Credit = amount });
        await _database.AuditAsync(c, actor, "Record ledger payment", $"{party.Trim()} | {amount:N2} | {reference}", tx);
        await tx.CommitAsync();
    }

    public async Task<WarrantyClaim> AddClaimAsync(BatteryPack pack,string complaint,string actor)
    { if(pack.Status!="WarrantyActive")throw new InvalidOperationException("Claims can be opened only for warranty-active packs.");if(string.IsNullOrWhiteSpace(complaint))throw new InvalidOperationException("Enter the customer complaint.");await using var c=_database.Open();await c.OpenAsync();await using var tx=await c.BeginTransactionAsync();var claim=new WarrantyClaim{ClaimNumber=$"CLM-{DateTime.Now:yyyy}-{await Scalar(c,tx,"SELECT COUNT(*) FROM WarrantyClaims")+1:000000}",PackSerial=pack.SerialNumber,Complaint=complaint.Trim(),Status="Submitted",CreatedAt=DateTime.Now};await Exec(c,tx,"INSERT INTO WarrantyClaims(ClaimNumber,PackSerial,Complaint,Status,CreatedAt) VALUES($number,$serial,$complaint,$status,$at)",( "$number",claim.ClaimNumber),("$serial",claim.PackSerial),("$complaint",claim.Complaint),("$status",claim.Status),("$at",Utc(claim.CreatedAt)));claim.Id=await Scalar(c,tx,"SELECT last_insert_rowid()");await Exec(c,tx,"UPDATE BatteryPacks SET Status='ClaimUnderInspection' WHERE SerialNumber=$serial",("$serial",pack.SerialNumber));await Queue(c,tx,"WarrantyClaim",claim.ClaimNumber,claim);await _database.AuditAsync(c,actor,"Create claim",claim.ClaimNumber,tx);await tx.CommitAsync();return claim; }

    public async Task ResolveClaimAsync(WarrantyClaim claim,string outcome,string replacementSerial,string notes,string actor)
    { if(outcome is not ("Repair" or "Replace" or "Reject"))throw new InvalidOperationException("Select Repair, Replace, or Reject.");await using var c=_database.Open();await c.OpenAsync();await using var tx=await c.BeginTransactionAsync();var status=outcome=="Repair"?"Repaired":outcome=="Replace"?"Replaced":"Rejected";if(outcome=="Replace"){if(string.IsNullOrWhiteSpace(replacementSerial))throw new InvalidOperationException("Select a replacement pack serial.");var available=await Scalar(c,tx,"SELECT COUNT(*) FROM BatteryPacks WHERE SerialNumber=$serial AND Status='Saleable'",("$serial",replacementSerial));if(available==0)throw new InvalidOperationException("Replacement pack must be saleable.");var warranty=await GetWarrantyInTransaction(c,tx,claim.PackSerial);await Exec(c,tx,"INSERT INTO Warranties(PackSerial,CustomerName,StartDate,EndDate,Status) VALUES($serial,$customer,$start,$end,'Active')",("$serial",replacementSerial),("$customer",warranty.CustomerName),("$start",Utc(warranty.StartDate)),("$end",Utc(warranty.EndDate)));await Exec(c,tx,"UPDATE BatteryPacks SET Status='WarrantyActive' WHERE SerialNumber=$serial",("$serial",replacementSerial));await Movement(c,tx,"Claim replacement",claim.ClaimNumber,replacementSerial,-1,$"Replaces {claim.PackSerial}");}await Exec(c,tx,"UPDATE WarrantyClaims SET Status='Resolved',Resolution=$outcome,ReplacementSerial=$replacement,Notes=$notes WHERE Id=$id",("$outcome",outcome),("$replacement",replacementSerial),("$notes",notes),("$id",claim.Id));await Exec(c,tx,"UPDATE BatteryPacks SET Status=$status WHERE SerialNumber=$serial",("$status",status),("$serial",claim.PackSerial));await Queue(c,tx,"WarrantyClaim",claim.ClaimNumber,new {claim.ClaimNumber,claim.PackSerial,Resolution=outcome,ReplacementSerial=replacementSerial});await _database.AuditAsync(c,actor,"Resolve claim",claim.ClaimNumber,tx);await tx.CommitAsync(); }

    public async Task<Dictionary<string,decimal>> DashboardAsync(){await using var c=_database.Open();await c.OpenAsync();return new Dictionary<string,decimal>{{"Saleable packs",await Scalar(c,null,"SELECT COUNT(*) FROM BatteryPacks WHERE Status='Saleable'")},{"Dealer stock",await Scalar(c,null,"SELECT COUNT(*) FROM BatteryPacks WHERE Status='DealerStock'")},{"Active warranties",await Scalar(c,null,"SELECT COUNT(*) FROM Warranties WHERE Status='Active'")},{"Open claims",await Scalar(c,null,"SELECT COUNT(*) FROM WarrantyClaims WHERE Status <> 'Resolved'")}};}

    private static object PublicPack(BatteryPack pack,Warranty? warranty)=>new { token=pack.QrToken,serial=pack.SerialNumber,model=pack.ModelName,chemistry=pack.Chemistry,manufactureDate=pack.ManufacturedAt.ToString("yyyy-MM-dd"),status=warranty is null?"Not yet warranty-activated":"Warranty active",warrantyEnd=warranty?.EndDate.ToString("yyyy-MM-dd") };
    private static async Task Movement(SqliteConnection c,DbTransaction tx,string type,string reference,string item,decimal quantity,string notes)=>await Exec(c,tx,"INSERT INTO StockMovements(MovementType,Reference,Item,Quantity,OccurredAt,Notes) VALUES($type,$reference,$item,$qty,$at,$notes)",( "$type",type),("$reference",reference),("$item",item),("$qty",quantity),("$at",Utc(DateTime.Now)),("$notes",notes));
    private static async Task Queue(SqliteConnection c,DbTransaction tx,string type,string id,object payload)=>await Exec(c,tx,"INSERT INTO SyncEvents(EntityType,EntityId,Payload,Status,Attempts,CreatedAt) VALUES($type,$id,$payload,'Pending',0,$at)",( "$type",type),("$id",id),("$payload",JsonSerializer.Serialize(payload)),("$at",Utc(DateTime.Now)));
    private static async Task<string> ResolvePartyTypeAsync(SqliteConnection c, DbTransaction tx, string party)
    {
        await using var dealerCmd = c.CreateCommand();
        dealerCmd.Transaction = tx as SqliteTransaction;
        dealerCmd.CommandText = "SELECT 1 FROM Dealers WHERE Name=$party LIMIT 1";
        dealerCmd.Parameters.AddWithValue("$party", party);
        var dealerFound = await dealerCmd.ExecuteScalarAsync();
        if (dealerFound is not null) return "Dealer";

        await using var customerCmd = c.CreateCommand();
        customerCmd.Transaction = tx as SqliteTransaction;
        customerCmd.CommandText = "SELECT 1 FROM Customers WHERE Name=$party LIMIT 1";
        customerCmd.Parameters.AddWithValue("$party", party);
        var customerFound = await customerCmd.ExecuteScalarAsync();
        return customerFound is not null ? "Customer" : "Customer";
    }

    private static async Task PostLedgerEntryAsync(SqliteConnection c, DbTransaction tx, string party, string partyType, string reference, string description, decimal debit, decimal credit, DateTime when)
    {
        var running = await Scalar(c, tx, "SELECT COALESCE(SUM(Debit - Credit), 0) FROM PartyLedger WHERE PartyName=$party", ("$party", party));
        var balance = running + debit - credit;
        await Exec(c, tx, "INSERT INTO PartyLedger(PartyName,PartyType,TransactionDate,Reference,Description,Debit,Credit,Balance) VALUES($party,$type,$at,$ref,$desc,$debit,$credit,$balance)",
            ("$party", party), ("$type", partyType), ("$at", Utc(when)), ("$ref", reference), ("$desc", description), ("$debit", debit), ("$credit", credit), ("$balance", balance));
    }
    private static async Task<Warranty> GetWarrantyInTransaction(SqliteConnection c,DbTransaction tx,string serial){await using var cmd=c.CreateCommand();cmd.Transaction=tx as SqliteTransaction;cmd.CommandText="SELECT CustomerName,StartDate,EndDate,Status FROM Warranties WHERE PackSerial=$serial";cmd.Parameters.AddWithValue("$serial",serial);await using var r=await cmd.ExecuteReaderAsync();if(!await r.ReadAsync())throw new InvalidOperationException("No active warranty was found.");return new Warranty{PackSerial=serial,CustomerName=r.GetString(0),StartDate=Date(r,1),EndDate=Date(r,2),Status=r.GetString(3)};}
    private static async Task<long> Scalar(SqliteConnection c,DbTransaction? tx,string sql,params (string,object?)[] p){await using var cmd=c.CreateCommand();cmd.Transaction=tx as SqliteTransaction;cmd.CommandText=sql;foreach(var x in p)cmd.Parameters.AddWithValue(x.Item1,x.Item2??DBNull.Value);return Convert.ToInt64(await cmd.ExecuteScalarAsync());}
    private static async Task Exec(SqliteConnection c,DbTransaction tx,string sql,params (string,object?)[] p){await using var cmd=c.CreateCommand();cmd.Transaction=tx as SqliteTransaction;cmd.CommandText=sql;foreach(var x in p)cmd.Parameters.AddWithValue(x.Item1,x.Item2??DBNull.Value);await cmd.ExecuteNonQueryAsync();}
}
