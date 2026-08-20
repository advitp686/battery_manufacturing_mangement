# Lithynova Component Catalogue

Version: 1.0  
Scope: Master Components Catalog in **Battery & Vehicle Models**

This is the baseline catalogue captured from the current application data. It is the reference list we will use while testing each feature.

## Component master

| ID | Component | Category | Specification | Unit price (INR) | Supplier |
|---|---|---|---|---:|---|
| CMP-001 | DALY 16S 100A Smart BMS | BMS | 16S 48V/51.2V 100A UART/CAN | 3,400 | Daly Electronics |
| CMP-002 | JBD 13S 60A Smart BMS | BMS | 13S 48V 60A Bluetooth | 2,100 | JBD BMS |
| CMP-003 | CATL 3.2V 100Ah LFP Prismatic Cell | Cell | Grade A 3.2V 100Ah (320Wh) | 3,200 | EVE / CATL China |
| CMP-004 | Lishen 21700 4500mAh NMC Cell | Cell | 3.6V 4.5Ah 15A discharge | 210 | Lishen China |
| CMP-005 | IP67 Heavy-Duty Waterproof Toggle Switch | Switch | 12V/250V 30A LED illuminated | 450 | Schneider / Local |
| CMP-006 | Digital Color LCD SOC Fuel Gauge Meter | SOC Display | 8V–100V voltage and capacity display | 650 | TF03 Meter |
| CMP-007 | 10AWG Silicone Wire Harness Set | Wire / Harness | 200°C high-temp 10AWG with M8 ring terminals | 550 | FlexWire India |
| CMP-008 | Aluminium Alloy Enclosure Casing 51.2V | Enclosure | Laser-cut, powder-coated IP65 casing | 4,200 | Shenzhen Cases |
| CMP-009 | M8 Nickel-Plated Copper Busbars | Busbar | 2mm thick, 150A continuous rating | 85 | Apex Metals |

## Catalogue rules

- Component ID must remain unique and stable after creation.
- Category, specification, supplier, and unit price are required master data.
- Unit price is stored in INR and should be a non-negative number.
- Components are reused by battery-model BOMs and raw-stock records, so deleting one may affect downstream features.
- Before destructive cleanup, export a backup and confirm the exact records to remove.

## Feature map

| Feature | Uses the component catalogue |
|---|---|
| Battery Models & BOM | Selects components and quantities for each battery model |
| Stock & Inventory | Tracks received and available component batches |
| Production & QC | Consumes BOM components during pack assembly |
| Supplier Purchase Ledger | Links purchased components to suppliers and balances |
| Reports | Exports component and stock information |
| Google Sheets sync | Mirrors inventory and production records |

## Test order

We will test one feature at a time in this order:

1. Open the Master Components Catalog and verify all 9 baseline records.
2. Search/filter the catalogue and confirm matching and empty-result states.
3. Create one temporary component and verify it appears in the catalogue.
4. Edit that component and verify the updated fields persist after reload.
5. Check how the component appears in a battery-model BOM.
6. Check stock entry and availability for the component.
7. Check production consumption and QC impact.
8. Check report/export output.
9. Only after the above passes, decide whether any seeded test record should be removed.

## Baseline observed on 20 Aug 2026

- Application: Lithynova — EV Battery Systems & Warranty Ops
- Database indicator: PostgreSQL Connected
- Current page: Dashboard
- Master Components Catalog location: **Battery & Vehicle Models → Master Components Catalog**
- Dashboard finished stock metric: 0
- Dashboard active warranty metric: 2
- Dashboard recorded sales metric: 4
- Dashboard open claims metric: 2

## Test log

| Test | Result | Notes |
|---|---|---|
| Dashboard loads | PASS | Main navigation and dashboard cards rendered |
| Component catalogue baseline | PASS | Master Components Catalog opened; 9 records displayed |
| Component search/filter | PENDING |  |
| Component create | PENDING | Use a temporary test record |
| Component edit/persistence | PENDING |  |
| BOM linkage | PENDING |  |
| Stock linkage | PENDING |  |
| Production linkage | PENDING |  |
| Report/export linkage | PENDING |  |

## Initial finding

All 9 components currently display `HSN —` and `0% CGST · 0% SGST · 0% IGST · 0% Other`. This is not blocking catalogue browsing, but it should be confirmed before tax-rated sales, purchase, or report testing.
