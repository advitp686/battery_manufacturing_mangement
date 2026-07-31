const state = {
  components: [
    { id: 'CMP-001', name: 'DALY 16S 100A Smart BMS', category: 'BMS', spec: '16S 48V/51.2V 100A UART/CAN', price: 3400, supplier: 'Daly Electronics' },
    { id: 'CMP-002', name: 'JBD 13S 60A Smart BMS', category: 'BMS', spec: '13S 48V 60A Bluetooth', price: 2100, supplier: 'JBD BMS' },
    { id: 'CMP-003', name: 'CATL 3.2V 100Ah LFP Prismatic Cell', category: 'Cell', spec: 'Grade A 3.2V 100Ah (320Wh)', price: 3200, supplier: 'EVE / CATL China' },
    { id: 'CMP-004', name: 'Lishen 21700 4500mAh NMC Cell', category: 'Cell', spec: '3.6V 4.5Ah 15A Discharge', price: 210, supplier: 'Lishen China' },
    { id: 'CMP-005', name: 'IP67 Heavy-Duty Waterproof Toggle Switch', category: 'Switch', spec: '12V/250V 30A LED Illuminated', price: 450, supplier: 'Schneider / Local' },
    { id: 'CMP-006', name: 'Digital Color LCD SOC Fuel Gauge Meter', category: 'SOC Display', spec: '8V-100V Voltage & Capacity % Display', price: 650, supplier: 'TF03 Meter' },
    { id: 'CMP-007', name: '10AWG Silicone Wire Harness Set', category: 'Wire / Harness', spec: '200°C High-Temp 10AWG with M8 Ring Terminals', price: 550, supplier: 'FlexWire India' },
    { id: 'CMP-008', name: 'Aluminium Alloy Enclosure Casing 51.2V', category: 'Enclosure', spec: 'Laser-Cut Powder Coated IP65 Casing', price: 4200, supplier: 'Shenzhen Cases' },
    { id: 'CMP-009', name: 'M8 Nickel-Plated Copper Busbars', category: 'Busbar', spec: '2mm Thick 150A Continuous Rating', price: 85, supplier: 'Apex Metals' }
  ],
  models: [
    {
      code: 'LFP-48-100',
      name: 'LFP City 3.2kWh',
      chemistry: 'LFP',
      config: '16S 1P',
      capacity: '100Ah · 51.2V',
      warranty: '24 months',
      status: 'Active',
      bom: [
        { componentId: 'CMP-001', name: 'DALY 16S 100A Smart BMS', category: 'BMS', qty: 1, unitPrice: 3400 },
        { componentId: 'CMP-003', name: 'CATL 3.2V 100Ah LFP Prismatic Cell', category: 'Cell', qty: 16, unitPrice: 3200 },
        { componentId: 'CMP-005', name: 'IP67 Heavy-Duty Waterproof Toggle Switch', category: 'Switch', qty: 1, unitPrice: 450 },
        { componentId: 'CMP-006', name: 'Digital Color LCD SOC Fuel Gauge Meter', category: 'SOC Display', qty: 1, unitPrice: 650 },
        { componentId: 'CMP-007', name: '10AWG Silicone Wire Harness Set', category: 'Wire / Harness', qty: 1, unitPrice: 550 },
        { componentId: 'CMP-008', name: 'Aluminium Alloy Enclosure Casing 51.2V', category: 'Enclosure', qty: 1, unitPrice: 4200 },
        { componentId: 'CMP-009', name: 'M8 Nickel-Plated Copper Busbars', category: 'Busbar', qty: 15, unitPrice: 85 }
      ]
    },
    {
      code: 'LFP-48-200',
      name: 'LFP Cargo 5.1kWh',
      chemistry: 'LFP',
      config: '16S 2P',
      capacity: '200Ah · 51.2V',
      warranty: '24 months',
      status: 'Active',
      bom: [
        { componentId: 'CMP-001', name: 'DALY 16S 100A Smart BMS', category: 'BMS', qty: 1, unitPrice: 3400 },
        { componentId: 'CMP-003', name: 'CATL 3.2V 100Ah LFP Prismatic Cell', category: 'Cell', qty: 32, unitPrice: 3200 },
        { componentId: 'CMP-005', name: 'IP67 Heavy-Duty Waterproof Toggle Switch', category: 'Switch', qty: 1, unitPrice: 450 },
        { componentId: 'CMP-006', name: 'Digital Color LCD SOC Fuel Gauge Meter', category: 'SOC Display', qty: 1, unitPrice: 650 },
        { componentId: 'CMP-007', name: '10AWG Silicone Wire Harness Set', category: 'Wire / Harness', qty: 2, unitPrice: 550 },
        { componentId: 'CMP-008', name: 'Aluminium Alloy Enclosure Casing 51.2V', category: 'Enclosure', qty: 1, unitPrice: 4200 }
      ]
    },
    {
      code: 'NMC-48-60',
      name: 'NMC Sprint 2.8kWh',
      chemistry: 'NMC',
      config: '13S 1P',
      capacity: '60Ah · 48.1V',
      warranty: '18 months',
      status: 'Active',
      bom: [
        { componentId: 'CMP-002', name: 'JBD 13S 60A Smart BMS', category: 'BMS', qty: 1, unitPrice: 2100 },
        { componentId: 'CMP-004', name: 'Lishen 21700 4500mAh NMC Cell', category: 'Cell', qty: 182, unitPrice: 210 },
        { componentId: 'CMP-005', name: 'IP67 Heavy-Duty Waterproof Toggle Switch', category: 'Switch', qty: 1, unitPrice: 450 },
        { componentId: 'CMP-006', name: 'Digital Color LCD SOC Fuel Gauge Meter', category: 'SOC Display', qty: 1, unitPrice: 650 }
      ]
    },
    {
      code: 'LFP-48-300',
      name: 'LFP Fleet 7.6kWh',
      chemistry: 'LFP',
      config: '16S 3P',
      capacity: '300Ah · 51.2V',
      warranty: '36 months',
      status: 'Draft',
      bom: [
        { componentId: 'CMP-001', name: 'DALY 16S 100A Smart BMS', category: 'BMS', qty: 2, unitPrice: 3400 },
        { componentId: 'CMP-003', name: 'CATL 3.2V 100Ah LFP Prismatic Cell', category: 'Cell', qty: 48, unitPrice: 3200 },
        { componentId: 'CMP-008', name: 'Aluminium Alloy Enclosure Casing 51.2V', category: 'Enclosure', qty: 1, unitPrice: 4200 }
      ]
    }
  ],
  inventory: [
    { batch: 'CATL-LFP-280-07', material: 'CATL 3.2V 100Ah LFP Prismatic Cell', category: 'Cell', supplier: 'EVE China', received: '18 Jul 2026', available: '44 / 52', location: 'Main workshop', health: 'Low' },
    { batch: 'DALY-BMS-16S-40', material: 'DALY 16S 100A Smart BMS', category: 'BMS', supplier: 'Daly Electronics', received: '15 Jul 2026', available: '28 / 30', location: 'Main workshop', health: 'Good' },
    { batch: 'CHG-58V-10A-02', material: '58.4V 10A Fast Battery Charger', category: 'Charger / Extra', supplier: 'PowerTech India', received: '14 Jul 2026', available: '15 / 20', location: 'Main workshop', health: 'Good' },
    { batch: 'NMC-21700-06', material: 'Lishen 21700 4500mAh NMC Cell', category: 'Cell', supplier: 'Lishen China', received: '12 Jul 2026', available: '1,840 / 2,000', location: 'Main workshop', health: 'Good' },
    { batch: 'CASE-51V-04', material: 'Aluminium Alloy Enclosure Casing 51.2V', category: 'Enclosure', supplier: 'Shenzhen Cases', received: '04 Jul 2026', available: '31 / 40', location: 'Rack B2', health: 'Good' }
  ],
  production: [
    { id: 'PR-2026-0048', model: 'LFP City 3.2kWh', operator: 'Nagin Ji', built: '25 Jul 2026', qc: 'Passed', serial: 'BAT-2026-000048', status: 'Saleable' },
    { id: 'PR-2026-0047', model: 'NMC Sprint 2.8kWh', operator: 'Rakesh', built: '25 Jul 2026', qc: 'Awaiting', serial: '—', status: 'In QC' },
    { id: 'PR-2026-0046', model: 'LFP Cargo 5.1kWh', operator: 'Nagin Ji', built: '24 Jul 2026', qc: 'Passed', serial: 'BAT-2026-000047', status: 'Dealer stock' },
    { id: 'PR-2026-0045', model: 'LFP City 3.2kWh', operator: 'Rakesh', built: '24 Jul 2026', qc: 'Failed', serial: '—', status: 'QC failed' }
  ],
  dealers: [
    {
      id: 'DLR-001',
      name: 'Rahul EV Hub',
      title: 'M/s.',
      contactPerson: 'S/o Shri Baijnath Prasad',
      gstType: 'Registered Dealer',
      gstin: '09AAACR1234F1Z5',
      pan: 'AAACR1234F',
      phone: '9876543210',
      address: 'Senduli Benduli, Rustampur',
      city: 'GORAKHPUR',
      state: 'UTTAR PRADESH',
      pin: '273016',
      creditLimit: 500000,
      creditDays: 30,
      openingBalance: 0
    },
    {
      id: 'DLR-002',
      name: 'DELTA AUTOCORP LIMITED',
      title: 'Messrs.',
      contactPerson: 'S/o Shri Vikram Singh',
      gstType: 'Registered Dealer',
      gstin: '09ABACD5678G1Z9',
      pan: 'ABACD5678G',
      phone: '9812345678',
      address: 'Transport Nagar',
      city: 'GORAKHPUR',
      state: 'UTTAR PRADESH',
      pin: '273001',
      creditLimit: 1000000,
      creditDays: 45,
      openingBalance: 0
    }
  ],
  sales: [
    { invoice: 'HK/26-27/120', pack: 'BAT-2026-000048', party: 'RANJEET KUMAR', type: 'Retail', date: '13 Jul 2026', warranty: 'Active (Same Day Auto)' },
    { invoice: 'INV-2026-0118', pack: 'BAT-2026-000047', party: 'Rahul EV Hub', type: 'Dealer', gstin: '09AAACR1234F1Z5', date: '24 Jul 2026', warranty: 'Dealer Auto (+1 Month)' }
  ],
  invoices: [
    {
      invoice: 'HK/26-27/120',
      date: '2026-07-13',
      party: 'RANJEET KUMAR',
      fatherName: 'BAIJNATH',
      phone: '9935453963',
      address: '290 RANIBAG, PATHRA, BARGO, GORAKHPUR, UTTAR PRADESH, 273016',
      vehicle: 'UP-53-EV-1024',
      type: 'Retail',
      items: [
        {
          sr: 1,
          desc: 'M++',
          packSerial: 'BAT-2026-000048',
          hsn: '87116020',
          chassisVin: '256012DLTCS0015',
          engineMotor: '256011DLTCS0077',
          color: 'Red',
          keyController: '256010DLTCS0010',
          wrcNo: '',
          chargerInfo: 'WITH LEAD CHARGER',
          batteryInfo: '60V LEAD BATTERY',
          qty: 1,
          price: 70476.19,
          amount: 70476.19
        }
      ],
      taxableValue: 70476.19,
      cgstRate: 2.5,
      cgstAmount: 1761.91,
      sgstRate: 2.5,
      sgstAmount: 1761.91,
      igstRate: 0,
      igstAmount: 0,
      cessAmount: 0,
      grandTotal: 74000.00,
      amountInWords: 'SEVENTY-FOUR THOUSAND ONLY',
      paidAmount: 74000.00,
      balanceAmount: 0.00,
      warrantyStatus: 'Active (Auto Same Day)'
    },
    {
      invoice: 'INV-2026-0118',
      date: '2026-07-24',
      party: 'Rahul EV Hub',
      fatherName: 'Rajesh Hub',
      phone: '9876543210',
      address: 'Gorakhpur Dealer Point, UP',
      vehicle: 'UP-53-DL-5522',
      type: 'Dealer',
      items: [
        {
          sr: 1,
          desc: 'LFP City 3.2kWh Battery Pack',
          packSerial: 'BAT-2026-000047',
          hsn: '87116020',
          chassisVin: '256012DLTCS0088',
          engineMotor: '256011DLTCS0099',
          color: 'Blue',
          keyController: '256010DLTCS0088',
          wrcNo: '',
          chargerInfo: 'WITH FAST CHARGER',
          batteryInfo: 'LFP 51.2V 60Ah',
          qty: 1,
          price: 64761.90,
          amount: 64761.90
        }
      ],
      taxableValue: 64761.90,
      cgstRate: 2.5,
      cgstAmount: 1619.05,
      sgstRate: 2.5,
      sgstAmount: 1619.05,
      igstRate: 0,
      igstAmount: 0,
      cessAmount: 0,
      grandTotal: 68000.00,
      amountInWords: 'SIXTY-EIGHT THOUSAND ONLY',
      paidAmount: 25000.00,
      balanceAmount: 43000.00,
      warrantyStatus: 'Dealer Auto (+1 Month)'
    }
  ],
  ledger: [
    {
      id: 'LEDG-001',
      date: '2026-07-13',
      party: 'RANJEET KUMAR',
      partyType: 'Retail',
      ref: 'HK/26-27/120',
      desc: 'Tax Invoice HK/26-27/120 (M++ Sale)',
      debit: 74000.00,
      credit: 0.00,
      balance: 74000.00
    },
    {
      id: 'LEDG-002',
      date: '2026-07-13',
      party: 'RANJEET KUMAR',
      partyType: 'Retail',
      ref: 'PAY-2026-001',
      desc: 'Full Payment Received (Cash/UPI)',
      debit: 0.00,
      credit: 74000.00,
      balance: 0.00
    },
    {
      id: 'LEDG-003',
      date: '2026-07-24',
      party: 'Rahul EV Hub',
      partyType: 'Dealer',
      ref: 'INV-2026-0118',
      desc: 'Tax Invoice INV-2026-0118 (Dealer Dispatch)',
      debit: 68000.00,
      credit: 0.00,
      balance: 68000.00
    },
    {
      id: 'LEDG-004',
      date: '2026-07-25',
      party: 'Rahul EV Hub',
      partyType: 'Dealer',
      ref: 'PAY-2026-002',
      desc: 'Advance Payment Received via NEFT',
      debit: 0.00,
      credit: 25000.00,
      balance: 43000.00
    }
  ],
  warranties: [
    { pack: 'BAT-2026-000048', customer: 'RANJEET KUMAR', registered: '13 Jul 2026', end: '13 Jul 2028', status: 'Active (Same Day Auto)' },
    { pack: 'BAT-2026-000047', customer: 'Rahul EV Hub (Dealer)', registered: '24 Aug 2026', end: '24 Aug 2028', status: 'Dealer Auto (+1 Month)' },
    { pack: 'BAT-2026-000046', customer: 'Bharat S Gadhvi', registered: '23 Jul 2026', end: '23 Jul 2028', status: 'Active' },
    { pack: 'BAT-2026-000043', customer: 'Meera Auto', registered: '17 Jul 2026', end: '17 Jul 2028', status: 'Active' },
    { pack: 'BAT-2026-000039', customer: 'Sanjay Kumar', registered: '02 Jul 2026', end: '02 Jul 2028', status: 'Expiring soon' }
  ],
  claims: [
    { claim: 'CLM-2026-0009', pack: 'BAT-2026-000031', customer: 'Bharat S Gadhvi', issue: 'Capacity below 80%', opened: '22 Jul 2026', outcome: '—', status: 'Inspection' },
    { claim: 'CLM-2026-0008', pack: 'BAT-2026-000027', customer: 'Apex EV', issue: 'BMS communication', opened: '21 Jul 2026', outcome: 'Replacement', status: 'Open' },
    { claim: 'CLM-2026-0007', pack: 'BAT-2026-000020', customer: 'Sonalika Motors', issue: 'Connector damage', opened: '16 Jul 2026', outcome: 'Repair', status: 'Resolved' }
  ],
  suppliers: [
    { id: 'SUPP-001', name: 'EVE Energy Co., Ltd.', contactPerson: 'Chen Wei', phone: '+86 752 2605888', gstin: '09AAACE1234F1Z1', address: 'Huizhou, Guangdong', state: 'IMPORT/OVERSEAS', category: 'Cell Manufacturer' },
    { id: 'SUPP-002', name: 'Daly Electronics Co.', contactPerson: 'Li Na', phone: '+86 755 89221188', gstin: '09AAACD5678G1Z2', address: 'Shenzhen, China', state: 'IMPORT/OVERSEAS', category: 'BMS Supplier' },
    { id: 'SUPP-003', name: 'MINDRA POWER SOLUTIONS', contactPerson: 'Rajesh Sharma', phone: '9876501234', gstin: '09AAACM9988H1Z4', address: 'Noida Sector 63, UP', state: 'UTTAR PRADESH', category: 'Chargers & Enclosures' }
  ],
  supplierLedger: [
    { id: 'SLEDG-001', date: '2026-07-01', supplier: 'EVE Energy Co., Ltd.', ref: 'BILL-EVE-901', desc: 'Cell Batch CATL-LFP-280-08 Purchase', debit: 0, credit: 156000.00, balance: 156000.00, bankAccount: 'HDFC Bank Current A/C (50200012345678)' },
    { id: 'SLEDG-002', date: '2026-07-05', supplier: 'EVE Energy Co., Ltd.', ref: 'PAY-EVE-01', desc: 'Telegraphic Transfer Payment via HDFC Bank', debit: 100000.00, credit: 0, balance: 56000.00, bankAccount: 'HDFC Bank Current A/C (50200012345678)' },
    { id: 'SLEDG-003', date: '2026-07-10', supplier: 'Daly Electronics Co.', ref: 'BILL-DALY-440', desc: 'BMS Smart Boards Batch Purchase', debit: 0, credit: 68000.00, balance: 68000.00, bankAccount: 'ICICI Bank Business A/C (001105001234)' }
  ],
  vehicleModels: [
    { id: 'VM-001', name: 'Deltic Star E-Rickshaw (L5)', type: 'Passenger 3W E-Rickshaw', motor: '1200W BLDC Heavy Duty', batterySpec: 'LFP 51.2V 100Ah', hsn: '87116010', gstRate: 5, price: 145000 },
    { id: 'VM-002', name: 'Deltic Dromon Cargo Loader', type: 'Commercial 3W Cargo Loader', motor: '1500W High Torque', batterySpec: 'LFP 51.2V 150Ah', hsn: '87038000', gstRate: 5, price: 175000 }
  ],
  vehicles: [
    { chassisNo: 'CHASSIS-DELTIC-2026-0089', model: 'Deltic Star E-Rickshaw (L5)', motorNo: 'MTR-1200W-8891', batterySerial: 'BAT-2026-000048', color: 'Glossy Royal Blue', price: 145000, status: 'Available in Showroom' },
    { chassisNo: 'CHASSIS-DROMON-2026-0104', model: 'Deltic Dromon Cargo Loader', motorNo: 'MTR-1500W-9012', batterySerial: 'BAT-2026-000047', color: 'Signal Yellow', price: 175000, status: 'Available in Showroom' }
  ],
  vehicleInvoices: [
    {
      invoice: 'VINV-2026-0001',
      party: 'RANJEET KUMAR',
      fatherName: 'S/o Shri Baijnath Prasad',
      phone: '9876543210',
      address: 'Gaighat, Gorakhpur',
      partyState: 'UTTAR PRADESH',
      type: 'Retail',
      date: '2026-07-20',
      model: 'Deltic Star E-Rickshaw (L5)',
      chassisNo: 'CHASSIS-DELTIC-2026-0050',
      motorNo: 'MTR-1200W-7741',
      batterySerial: 'BAT-2026-000030',
      color: 'Emerald Green',
      hsn: '87116010',
      taxableValue: 138095.24,
      totalGst: 6904.76,
      grandTotal: 145000.00,
      bankAccount: 'HDFC Bank Current A/C (50200012345678)',
      paidAmount: 145000.00,
      balanceAmount: 0,
      status: 'Paid & Dispatched'
    }
  ],
  bankAccounts: [
    { id: 'BANK-01', bankName: 'HDFC Bank', accType: 'Current A/C', accNo: '50200012345678', ifsc: 'HDFC0001234', branch: 'Gorakhpur Main Branch', isPrimary: true },
    { id: 'BANK-02', bankName: 'ICICI Bank', accType: 'Business Current A/C', accNo: '001105001234', ifsc: 'ICIC0000011', branch: 'Rustampur Gorakhpur', isPrimary: false },
    { id: 'BANK-03', bankName: 'State Bank of India (SBI)', accType: 'Corporate A/C', accNo: '30981234567', ifsc: 'SBIN0000321', branch: 'Civil Lines Gorakhpur', isPrimary: false }
  ]
};

function numberToWords(num) {
  num = Math.round(num || 0);
  if (num === 0) return 'ZERO ONLY';
  const a = ['', 'ONE ', 'TWO ', 'THREE ', 'FOUR ', 'FIVE ', 'SIX ', 'SEVEN ', 'EIGHT ', 'NINE ', 'TEN ', 'ELEVEN ', 'TWELVE ', 'THIRTEEN ', 'FOURTEEN ', 'FIFTEEN ', 'SIXTEEN ', 'SEVENTEEN ', 'EIGHTEEN ', 'NINETEEN '];
  const b = ['', '', 'TWENTY ', 'THIRTY ', 'FORTY ', 'FIFTY ', 'SIXTY ', 'SEVENTY ', 'EIGHTY ', 'NINETY '];

  function inWords(n) {
    if ((n = n.toString()).length > 9) return 'OVERFLOW';
    let n_arr = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n_arr) return '';
    let str = '';
    str += (n_arr[1] != 0) ? (a[Number(n_arr[1])] || b[n_arr[1][0]] + ' ' + a[n_arr[1][1]]) + 'CRORE ' : '';
    str += (n_arr[2] != 0) ? (a[Number(n_arr[2])] || b[n_arr[2][0]] + ' ' + a[n_arr[2][1]]) + 'LAKH ' : '';
    str += (n_arr[3] != 0) ? (a[Number(n_arr[3])] || b[n_arr[3][0]] + ' ' + a[n_arr[3][1]]) + 'THOUSAND ' : '';
    str += (n_arr[4] != 0) ? (a[Number(n_arr[4])] || b[n_arr[4][0]] + ' ' + a[n_arr[4][1]]) + 'HUNDRED ' : '';
    str += (n_arr[5] != 0) ? ((str != '') ? 'AND ' : '') + (a[Number(n_arr[5])] || b[n_arr[5][0]] + ' ' + a[n_arr[5][1]]) : '';
    return str;
  }
  return inWords(num).trim() + ' ONLY';
}

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function badge(text) {
  const t = String(text ?? '').toLowerCase();
  const c = t.includes('passed') || t.includes('active') || t.includes('saleable') || t.includes('resolved') || t.includes('good')
    ? 'success'
    : t.includes('failed') || t.includes('low') || t.includes('expired')
    ? 'fail'
    : t.includes('await') || t.includes('inspection') || t.includes('dealer') || t.includes('soon') || t.includes('draft')
    ? 'warn'
    : 'neutral';
  return `<span class="badge ${c}">${text}</span>`;
}

function categoryBadge(cat) {
  const map = {
    'BMS': 'violet',
    'Cell': 'cyan',
    'Switch': 'amber',
    'SOC Display': 'green',
    'Wire / Harness': 'neutral',
    'Enclosure': 'amber',
    'Busbar': 'cyan',
    'Charger / Extra': 'amber'
  };
  const color = map[cat] || 'neutral';
  return `<span class="badge ${color}">${cat}</span>`;
}

function calcBomCost(bomList) {
  if (!bomList || !Array.isArray(bomList)) return 0;
  return bomList.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
}

function formatINR(val) {
  return '₹' + Number(val).toLocaleString('en-IN');
}

function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
}

function parseAvailableQty(value) {
  if (value == null) return 0;
  const raw = String(value).split('/')[0].replace(/,/g, '').trim();
  const qty = Number(raw);
  return Number.isFinite(qty) ? qty : 0;
}

function parseFlexibleDate(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  const raw = String(value).trim();
  const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const d = new Date(`${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const humanMatch = raw.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (humanMatch) {
    const monthMap = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
    const monthIdx = monthMap[humanMatch[2].toLowerCase()];
    if (monthIdx != null) {
      const d = new Date(Number(humanMatch[3]), monthIdx, Number(humanMatch[1]));
      return Number.isNaN(d.getTime()) ? null : d;
    }
  }

  return null;
}

const SYSTEM_SETTINGS_KEY = 'tejas_system_settings';
const DEFAULT_SYSTEM_SETTINGS = {
  companyName: 'HK MOTORS',
  tagline: '',
  gstin: '',
  jurisdiction: 'UTTAR PRADESH',
  address: '',
  phone: '',
  email: '',
  gstRate: 5,
  hsnBattery: '87116020',
  hsnCharger: '85044090',
  adminPassword: 'ChangeMe123!'
};

function getSystemSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SYSTEM_SETTINGS_KEY) || '{}');
    return { ...DEFAULT_SYSTEM_SETTINGS, ...saved };
  } catch {
    return { ...DEFAULT_SYSTEM_SETTINGS };
  }
}

function getCompanyJurisdiction() {
  return String(getSystemSettings().jurisdiction || '').trim();
}

function getPartyStateByName(partyName = '') {
  const partyKey = normalizeText(partyName);
  const dealer = (state.dealers || []).find(d => normalizeText(d.name) === partyKey);
  return String(dealer?.state || '').trim();
}

function getInvoicePartyState(partyName = '', explicitState = '', saleType = '') {
  const manualState = String(explicitState || '').trim();
  if (manualState) return manualState;
  const companyState = String(getCompanyJurisdiction() || '').trim();
  const dealerState = getPartyStateByName(partyName);
  if (String(saleType || '').trim() === 'Dealer') return dealerState || companyState;
  return dealerState || companyState;
}

function isInterstateSupply(partyName = '', partyState = '') {
  const companyState = normalizeText(getCompanyJurisdiction());
  const resolvedPartyState = normalizeText(partyState || getPartyStateByName(partyName));
  return Boolean(companyState && resolvedPartyState && companyState !== resolvedPartyState);
}

function roundMoney(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function defaultGstRateForItem(item = {}, saleType = '') {
  const settings = getSystemSettings();
  const text = `${item.category || ''} ${item.desc || ''} ${item.description || ''} ${saleType || ''}`.toLowerCase();
  const hsn = String(item.hsn || '').trim();
  const batteryHsn = String(settings.hsnBattery || '87116020').trim();
  const chargerHsn = String(settings.hsnCharger || '85044090').trim();
  
  const batteryRate = Number(settings.gstRateBattery ?? settings.gstRate ?? 5);
  const chargerRate = Number(settings.gstRateCharger ?? 18);
  const accessoryRate = Number(settings.gstRateAccessory ?? 18);
  const serviceRate = Number(settings.gstRateService ?? 18);

  if (hsn === batteryHsn || text.includes('battery') || text.includes('pack') || text.includes('lfp') || text.includes('nmc')) return batteryRate;
  if (hsn === chargerHsn || text.includes('charger') || text.includes('power unit')) return chargerRate;
  if (text.includes('repair') || text.includes('labour') || text.includes('service') || text.includes('electricity') || text.includes('testing')) return serviceRate;
  if (text.includes('accessory') || text.includes('component') || text.includes('custom') || text.includes('bms') || text.includes('cell') || text.includes('wire')) return accessoryRate;
  return accessoryRate;
}

function normalizeInvoiceItem(item = {}, idx = 0, saleType = '', taxMode = 'INTRA') {
  const qty = Number(item.qty ?? item.quantity ?? 1);
  const price = Number(item.price ?? item.unitPrice ?? 0);
  const taxableAmount = roundMoney(item.amount ?? item.taxableAmount ?? qty * price);
  const gstRate = Number(item.gstRate ?? item.taxRate ?? defaultGstRateForItem(item, saleType));
  const gstAmount = roundMoney(item.gstAmount ?? taxableAmount * gstRate / 100);
  const useIgst = String(taxMode || 'INTRA').toUpperCase() === 'IGST';
  const cgstAmount = roundMoney(item.cgstAmount ?? (useIgst ? 0 : gstAmount / 2));
  const sgstAmount = roundMoney(item.sgstAmount ?? (useIgst ? 0 : gstAmount - cgstAmount));
  const igstAmount = roundMoney(item.igstAmount ?? (useIgst ? gstAmount : 0));
  const cessAmount = roundMoney(item.cessAmount ?? 0);
  const totalTaxAmount = roundMoney(item.totalGst ?? item.totalTaxAmount ?? (cgstAmount + sgstAmount + igstAmount));
  const lineTotal = roundMoney(item.lineTotal ?? taxableAmount + totalTaxAmount + cessAmount);

  return {
    ...item,
    sr: item.sr ?? idx + 1,
    desc: item.desc || item.description || 'Battery / Service Item',
    packSerial: item.packSerial || item.serial || '',
    hsn: item.hsn || '87116020',
    qty: Number.isFinite(qty) ? qty : 1,
    price: Number.isFinite(price) ? price : 0,
    amount: taxableAmount,
    taxableAmount,
    gstRate,
    gstAmount: totalTaxAmount,
    cgstAmount,
    sgstAmount,
    igstAmount,
    cessAmount,
    lineTotal
  };
}

function calculateInvoiceTotals(items = [], saleType = '', context = {}) {
  const taxMode = context.taxMode || (isInterstateSupply(context.party || '', context.partyState || '') ? 'IGST' : 'INTRA');
  const normalizedItems = items.map((item, idx) => normalizeInvoiceItem(item, idx, saleType, taxMode));
  const taxableValue = roundMoney(normalizedItems.reduce((sum, item) => sum + item.taxableAmount, 0));
  const totalGst = roundMoney(normalizedItems.reduce((sum, item) => sum + item.gstAmount, 0));
  const totalCess = roundMoney(normalizedItems.reduce((sum, item) => sum + item.cessAmount, 0));
  const cgstAmount = roundMoney(normalizedItems.reduce((sum, item) => sum + item.cgstAmount, 0));
  const sgstAmount = roundMoney(normalizedItems.reduce((sum, item) => sum + item.sgstAmount, 0));
  const totalIgst = roundMoney(normalizedItems.reduce((sum, item) => sum + item.igstAmount, 0));
  const grandTotal = roundMoney(taxableValue + totalGst + totalCess);

  return {
    items: normalizedItems,
    taxableValue,
    totalGst,
    cgstAmount,
    sgstAmount,
    igstAmount: totalIgst,
    cessAmount: totalCess,
    grandTotal,
    taxMode
  };
}

function getFilteredSalesInvoices() {
  const timeframe = $('#sales-timeframe-filter')?.value || 'all';
  const typeFilter = $('#sales-type-filter')?.value || 'all';
  const searchQuery = ($('#sales-search-input')?.value || '').toLowerCase().trim();
  const fromDate = $('#sales-date-from')?.value;
  const toDate = $('#sales-date-to')?.value;
  const dealerByName = new Map((state.dealers || []).map(d => [normalizeText(d.name), d.gstin || '']));

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const weekAgoDate = new Date(todayDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthKey = todayDate.toISOString().slice(0, 7);
  const fromDateObj = fromDate ? parseFlexibleDate(fromDate) : null;
  const toDateObj = toDate ? parseFlexibleDate(toDate) : null;

  return (state.invoices || []).filter(inv => {
    const invoiceDateObj = parseFlexibleDate(inv.date);
    const invoiceDateKey = invoiceDateObj ? invoiceDateObj.toISOString().slice(0, 10) : '';

    if (timeframe === 'today' && invoiceDateKey !== todayDate.toISOString().slice(0, 10)) return false;
    if (timeframe === 'week' && (!invoiceDateObj || invoiceDateObj < weekAgoDate)) return false;
    if (timeframe === 'month' && invoiceDateObj && invoiceDateObj.toISOString().slice(0, 7) !== monthKey) return false;
    if (timeframe === 'custom') {
      if (fromDateObj && (!invoiceDateObj || invoiceDateObj < fromDateObj)) return false;
      if (toDateObj && (!invoiceDateObj || invoiceDateObj > toDateObj)) return false;
    }

    if (typeFilter !== 'all' && inv.type !== typeFilter) return false;

    if (searchQuery) {
      const matchParty = (inv.party || '').toLowerCase().includes(searchQuery);
      const matchInvoice = (inv.invoice || '').toLowerCase().includes(searchQuery);
      const matchPhone = (inv.phone || '').toLowerCase().includes(searchQuery);
      const matchGstin = (inv.gstin || dealerByName.get(normalizeText(inv.party)) || '').toLowerCase().includes(searchQuery);
      const matchVehicle = (inv.vehicle || '').toLowerCase().includes(searchQuery);
      if (!matchParty && !matchInvoice && !matchPhone && !matchGstin && !matchVehicle) return false;
    }

    return true;
  });
}

function nextProductionId() {
  const year = new Date().getFullYear();
  const prefix = `PR-${year}-`;
  const seqs = (state.production || [])
    .map(p => String(p.id || ''))
    .filter(id => id.startsWith(prefix))
    .map(id => {
      const match = id.match(/^PR-\d{4}-(\d{4,})$/);
      return match ? Number(match[1]) : 0;
    });

  const nextSeq = (seqs.length > 0 ? Math.max(...seqs) : 0) + 1;
  return `${prefix}${String(nextSeq).padStart(4, '0')}`;
}

function nextInvoiceNumber() {
  const now = new Date();
  const yearStr = `${now.getFullYear().toString().slice(-2)}-${(now.getFullYear() + 1).toString().slice(-2)}`;
  const prefix = `HK/${yearStr}/`;
  const seqs = (state.invoices || [])
    .map(inv => String(inv.invoice || ''))
    .map(invNo => {
      const match = invNo.match(/HK\/\d{2}-\d{2}\/(\d+)/) || invNo.match(/(\d+)$/);
      return match ? Number(match[1]) : 0;
    });
  const maxSeq = seqs.length > 0 ? Math.max(...seqs) : 0;
  const nextSeq = Math.max(120, maxSeq + 1);
  return `${prefix}${nextSeq}`;
}

function isUserAdmin() {
  const role = getCurrentUserRole();
  return String(role || '').toLowerCase().includes('admin');
}

const DB_NAME = 'LithynovaEnterpriseDB';
const DB_VERSION = 1;
const DB_STORE_NAME = 'lithynova_state_store';

function initIndexedDB() {
  return new Promise((resolve) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
          db.createObjectStore(DB_STORE_NAME);
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

function saveStateToDB(data) {
  initIndexedDB().then(db => {
    if (!db) return;
    try {
      const tx = db.transaction(DB_STORE_NAME, 'readwrite');
      const store = tx.objectStore(DB_STORE_NAME);
      store.put(JSON.parse(JSON.stringify(data)), 'main_app_state');
    } catch (e) {
      console.warn('IndexedDB save state notice:', e);
    }
  });
}

function loadStateFromDB() {
  return initIndexedDB().then(db => {
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(DB_STORE_NAME, 'readonly');
        const store = tx.objectStore(DB_STORE_NAME);
        const req = store.get('main_app_state');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  });
}

function updateDatabaseMetricsUI() {
  const totalRecs = (state.inventory || []).length +
                    (state.production || []).length +
                    (state.invoices || []).length +
                    (state.ledger || []).length +
                    (state.suppliers || []).length +
                    (state.supplierLedger || []).length +
                    (state.warranties || []).length +
                    (state.claims || []).length +
                    (state.vehicles || []).length;

  if ($('#db-total-records')) $('#db-total-records').textContent = `${totalRecs.toLocaleString('en-IN')} Records`;
  if ($('#db-engine-type')) $('#db-engine-type').textContent = window.indexedDB ? 'IndexedDB Enterprise DB (Unlimited Capacity)' : 'HTML5 Persistent Local Storage';
  if ($('#db-health-status')) {
    const isCloudConfigured = Boolean(localStorage.getItem('tejas_appscript_url'));
    $('#db-health-status').textContent = isCloudConfigured ? '🟢 100% Fail-Safe (Local DB + Cloud Sync)' : '🟢 100% Fail-Safe (Local DB Ready)';
  }
}

function saveState() {
  try {
    localStorage.setItem('voltforge_state_v3', JSON.stringify(state));
    saveStateToDB(state);
    syncToGoogleSheets(false);
    updateDatabaseMetricsUI();
  } catch (e) {
    console.warn('Failed to save state', e);
  }
}

function syncToGoogleSheets(manual = false) {
  const statusTextEl = $('#cloud-status-text');
  const syncDotEl = $('#cloud-sync-status-bar .status-dot');

  const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const webappUrl = localStorage.getItem('tejas_appscript_url');
  const syncSecret = localStorage.getItem('tejas_sync_secret') || 'SYNC_SECRET_DEFAULT';
  const clientName = localStorage.getItem('tejas_client_account_name') || 'Client Account';
  const isConfigured = Boolean(webappUrl);
  const syncLabel = isConfigured ? `Push queued at ${nowTime}` : 'Local only - configure Google Sheets';

  const logStatuses = $$('.sync-log .log-status');
  const logDots = $$('.sync-log .log-dot');

  if (statusTextEl) statusTextEl.textContent = isConfigured ? 'Sending records to configured Google Sheet...' : 'Google Sheets sync not configured';
  if (syncDotEl) {
    syncDotEl.className = isConfigured ? 'status-dot amber' : 'status-dot neutral';
  }

  // Update record counts in Sync log
  if ($('#sync-count-1')) $('#sync-count-1').textContent = state.inventory.length;
  if ($('#sync-count-2')) $('#sync-count-2').textContent = state.production.length;
  if ($('#sync-count-3')) $('#sync-count-3').textContent = state.sales.length;
  if ($('#sync-count-4')) $('#sync-count-4').textContent = state.warranties.length + state.claims.length;

  if ($('#sync-time-1')) $('#sync-time-1').textContent = `${syncLabel} · ${state.inventory.length} records`;
  if ($('#sync-time-2')) $('#sync-time-2').textContent = `${syncLabel} · ${state.production.length} records`;
  if ($('#sync-time-3')) $('#sync-time-3').textContent = `${syncLabel} · ${state.sales.length} records`;
  if ($('#sync-time-4')) $('#sync-time-4').textContent = `${syncLabel} · ${state.warranties.length + state.claims.length} records`;
  logStatuses.forEach(el => {
    el.textContent = isConfigured ? '● Push queued' : '○ Not configured';
    el.style.color = isConfigured ? '#c28712' : '#718096';
  });
  logDots.forEach(el => {
    el.className = isConfigured ? 'log-dot amber' : 'log-dot neutral';
  });

  if (!isConfigured) {
    if (manual) toast('Google Sheets sync is not configured. Add an Apps Script URL first.');
    return;
  }

  fetch(webappUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: syncSecret,
      entityType: 'SystemStateBackup',
      entityId: 'SYNC_' + Date.now(),
      payload: state,
      inventory: state.inventory,
      production: state.production,
      invoices: state.invoices,
      sales: state.sales,
      warranties: state.warranties,
      claims: state.claims
    })
  })
    .then(() => {
      if (statusTextEl) statusTextEl.textContent = `${clientName} Google Sheet push sent (${nowTime})`;
      if (syncDotEl) syncDotEl.className = 'status-dot green';
      logStatuses.forEach(el => {
        el.textContent = '● Push sent';
        el.style.color = '#2f855a';
      });
      logDots.forEach(el => {
        el.className = 'log-dot green';
      });
      if (manual) toast(`Push sent to ${clientName}'s Google Sheet. Verify the sheet for final receipt.`);
    })
    .catch(e => {
      console.warn('Cloud sync post warning:', e);
      if (statusTextEl) statusTextEl.textContent = `Google Sheets push failed (${nowTime})`;
      if (syncDotEl) syncDotEl.className = 'status-dot red';
      logStatuses.forEach(el => {
        el.textContent = '● Push failed';
        el.style.color = '#c53030';
      });
      logDots.forEach(el => {
        el.className = 'log-dot red';
      });
      if (manual) toast('Google Sheets push failed. Check the Apps Script URL and permissions.');
    });
}

function loadState() {
  try {
    const saved = localStorage.getItem('voltforge_state_v3');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        Object.keys(parsed).forEach(k => {
          if (Array.isArray(parsed[k])) {
            state[k] = parsed[k];
          }
        });
      }
    }
  } catch (e) {
    console.warn('Failed to load state', e);
  }

  // Asynchronously load from IndexedDB for high-capacity database persistence
  loadStateFromDB().then(dbData => {
    if (dbData && typeof dbData === 'object') {
      const dbRecs = (dbData.invoices || []).length + (dbData.inventory || []).length;
      const curRecs = (state.invoices || []).length + (state.inventory || []).length;
      if (dbRecs >= curRecs) {
        Object.keys(dbData).forEach(k => {
          if (Array.isArray(dbData[k])) {
            state[k] = dbData[k];
          }
        });
        try { render(); } catch (e) {}
      }
    }
    updateDatabaseMetricsUI();
  });
}

function render() {
  try {
    // Live Dashboard KPI Stat Calculations
    const activeWarrantiesCount = (state.warranties || []).filter(w => w.status === 'Active').length;
    const finishedStockCount = (state.production || []).filter(p => (p.qc === 'Passed' || p.status === 'Saleable' || p.status === 'Dealer stock') && !(state.sales || []).some(s => s.pack === p.serial || s.pack === p.id)).length;
    const recordedSalesCount = (state.sales || []).length;
    const openClaimsCount = (state.claims || []).filter(c => c.status !== 'Resolved').length;

    if ($('#dash-stat-warranties')) $('#dash-stat-warranties').textContent = activeWarrantiesCount;
    if ($('#dash-stat-stock')) $('#dash-stat-stock').textContent = finishedStockCount;
    if ($('#dash-stat-sales')) $('#dash-stat-sales').textContent = recordedSalesCount;
    if ($('#dash-stat-claims')) $('#dash-stat-claims').textContent = openClaimsCount;

    // Recent Production Queue
    const recentPacksEl = $('#recent-packs');
    if (recentPacksEl) {
      recentPacksEl.innerHTML = (state.production || []).slice(0, 5).map(p => `
        <tr>
          <td><strong>${p.id}</strong></td>
          <td>${p.model}</td>
          <td>${p.operator}</td>
          <td>${badge(p.qc)}</td>
          <td>${badge(p.status)}</td>
        </tr>
      `).join('');
    }

    // Recent Sales Table
    const recentSalesEl = $('#recent-sales-table');
    if (recentSalesEl) {
      recentSalesEl.innerHTML = (state.sales || []).slice(0, 5).map(s => `
        <tr>
          <td><strong>${s.invoice}</strong></td>
          <td>${s.pack}</td>
          <td>${s.party}</td>
          <td>${badge(s.type)}</td>
          <td>${badge(s.warranty)}</td>
        </tr>
      `).join('');
    }

    // Battery Models Table
    if ($('#models-table')) {
      $('#models-table').innerHTML = (state.models || []).map((m, idx) => {
        const bomCost = calcBomCost(m.bom);
        const bomCount = m.bom ? m.bom.length : 0;
        return `
          <tr>
            <td><strong>${m.name}</strong><br><small style="color:#718096">${m.code || 'MODEL-' + (idx+1)}</small></td>
            <td>${m.chemistry}</td>
            <td>${m.config}</td>
            <td>${m.capacity}</td>
            <td><span style="font-weight:700;color:#2b6cb0;">${bomCount} components</span></td>
            <td><strong style="color:#2f855a">${formatINR(bomCost)}</strong></td>
            <td>${m.warranty}</td>
            <td>${badge(m.status)}</td>
            <td>
              <div style="display:flex;gap:6px;">
                <button class="secondary-btn btn-view-bom" data-idx="${idx}" style="padding:4px 8px;font-size:11px;">🔍 BOM</button>
                <button class="secondary-btn btn-edit-model" data-idx="${idx}" style="padding:4px 8px;font-size:11px;background:#edf2f7;">✎ Edit</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Master Components Table
    if ($('#comp-count-badge')) $('#comp-count-badge').textContent = (state.components || []).length;
    if ($('#components-table')) {
      $('#components-table').innerHTML = (state.components || []).map((c, idx) => {
        const modelsUsing = (state.models || []).filter(m => m.bom && m.bom.some(b => b.componentId === c.id || b.name === c.name)).map(m => m.name);
        return `
          <tr>
            <td><strong>${c.name}</strong><br><small style="color:#a0aec0">${c.id}</small></td>
            <td>${categoryBadge(c.category)}</td>
            <td>${c.spec}</td>
            <td><strong style="color:#2f855a">${formatINR(c.price)}</strong></td>
            <td>${c.supplier}</td>
            <td>${modelsUsing.length > 0 ? `<span class="badge neutral">${modelsUsing.length} models</span>` : '<span style="color:#a0aec0">Unassigned</span>'}</td>
            <td><button class="secondary-btn btn-edit-comp" data-idx="${idx}" style="padding:4px 10px;font-size:11px;">✎ Edit</button></td>
          </tr>
        `;
      }).join('');
    }

    // Finished Battery Packs Stock
    const finishedPacks = (state.production || []).filter(p => 
      (p.qc === 'Passed' || p.status === 'Saleable' || p.status === 'Dealer stock') &&
      !(state.sales || []).some(s => s.pack === p.serial || s.pack === p.id)
    );
    if ($('#finished-pack-count')) $('#finished-pack-count').textContent = finishedPacks.length;

    const btrInvEl = $('#battery-inventory-table');
    if (btrInvEl) {
      btrInvEl.innerHTML = finishedPacks.length > 0 ? finishedPacks.map(p => `
        <tr>
          <td><strong>${p.serial === '—' ? p.id : p.serial}</strong></td>
          <td>${p.model}</td>
          <td>${p.operator}</td>
          <td>${p.built}</td>
          <td>${badge(p.qc)}</td>
          <td><strong>${badge(p.status)}</strong></td>
          <td>Finished Goods Rack A1</td>
        </tr>
      `).join('') : '<tr><td colspan="7" style="text-align:center;color:#a0aec0;">No finished battery packs in stock yet. Complete production QC to populate battery inventory.</td></tr>';
    }

    // Inventory Table with Assigned vs Unassigned GST filter
    if ($('#inventory-table')) {
      const invFilter = window.__currentInvGstFilter || 'all';
      const items = (state.inventory || []).filter(i => {
        const hasGst = i.hsn && (i.gstRate !== undefined && i.gstRate !== null && i.gstRate !== '');
        if (invFilter === 'assigned') return hasGst;
        if (invFilter === 'unassigned') return !hasGst;
        return true;
      });

      $('#inventory-table').innerHTML = items.length > 0 ? items.map(i => {
        const realIdx = state.inventory.indexOf(i);
        const hasGst = i.hsn && (i.gstRate !== undefined && i.gstRate !== null && i.gstRate !== '');
        const gstBadge = hasGst 
          ? `<span style="background:#e6fffa;color:#234e52;padding:2px 7px;border-radius:4px;border:1px solid #b2f5ea;font-weight:700;font-size:11px;">HSN ${i.hsn} (${i.gstRate}% GST)</span>`
          : `<span style="background:#fffaf0;color:#9c4221;padding:2px 7px;border-radius:4px;border:1px solid #feebc8;font-weight:700;font-size:11px;">⚠️ Unassigned HSN/GST</span>`;

        return `
          <tr>
            <td><strong>${i.batch}</strong></td>
            <td>${i.material}</td>
            <td>${categoryBadge(i.category || 'Component')}</td>
            <td>${gstBadge}</td>
            <td><strong>${i.available}</strong></td>
            <td>${i.supplier}</td>
            <td>${badge(i.health)}</td>
            <td>
              <button class="secondary-btn btn-edit-comp-gst" data-idx="${realIdx}" style="padding:4px 8px;font-size:11px;background:#edf2f7;color:#2b6cb0;font-weight:700;">🏷️ Set GST &amp; HSN</button>
            </td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="8" style="text-align:center;color:#a0aec0;padding:16px;">No raw components match the "${invFilter}" GST filter.</td></tr>`;
    }

    // Production Table
    if ($('#production-table')) {
      $('#production-table').innerHTML = (state.production || []).map((p, idx) => {
        const isAwaiting = p.qc === 'Awaiting' || p.qc === 'In QC';
        const actionHtml = isAwaiting
          ? `<button class="primary-btn btn-run-qc" data-idx="${idx}" style="padding:4px 9px;font-size:11px;background:#2b6cb0;">⚡ Run QC Check</button>`
          : `<button class="secondary-btn btn-run-qc" data-idx="${idx}" style="padding:4px 8px;font-size:11px;background:#edf2f7;color:#2d3748;">✎ Re-inspect / Update QC</button>`;

        return `
          <tr>
            <td><strong>${p.id}</strong></td>
            <td>${p.model}</td>
            <td>${p.operator}</td>
            <td>${p.built}</td>
            <td>${badge(p.qc)}</td>
            <td><strong>${p.serial}</strong></td>
            <td>${badge(p.status)}</td>
            <td>${actionHtml}</td>
          </tr>
        `;
      }).join('');
    }

    // Populate QR Label Pack Selector
    const qrSelect = $('#qr-pack-select');
    if (qrSelect) {
      qrSelect.innerHTML = (state.warranties || []).length > 0
        ? (state.warranties || []).map(w => `<option value="${w.pack}">${w.pack} — ${w.customer} (Ends: ${w.end})</option>`).join('')
        : '<option value="">No activated warranty packs registered yet</option>';
    }

    if ($('#qr-label-preview-container') && (state.warranties || []).length > 0) {
      renderQrLabelPreview(qrSelect?.value || state.warranties[0].pack);
    }

    // Dashboard Party Ledger Receivables & Stat Calculations
    const partyMap = {};
    (state.ledger || []).forEach(entry => {
      if (!partyMap[entry.party]) {
        partyMap[entry.party] = { party: entry.party, debit: 0, credit: 0, balance: 0 };
      }
      partyMap[entry.party].debit += Number(entry.debit || 0);
      partyMap[entry.party].credit += Number(entry.credit || 0);
      partyMap[entry.party].balance = partyMap[entry.party].debit - partyMap[entry.party].credit;
    });

    const partySummaries = Object.values(partyMap);
    const totalReceivables = partySummaries.reduce((sum, p) => sum + Math.max(0, p.balance), 0);

    if ($('#dash-stat-ledger-balance')) {
      $('#dash-stat-ledger-balance').textContent = `₹ ${totalReceivables.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    }

    const dashLedgerEl = $('#dash-ledger-summary-table');
    if (dashLedgerEl) {
      dashLedgerEl.innerHTML = partySummaries.length > 0
        ? partySummaries.map(p => `
            <tr>
              <td><strong>${p.party}</strong></td>
              <td style="text-align:right;">₹ ${p.debit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              <td style="text-align:right;color:#16a34a;">₹ ${p.credit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              <td style="text-align:right;"><strong style="color:${p.balance > 0 ? '#dc2626' : '#2563eb'};">₹ ${p.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></td>
              <td style="text-align:center;">
                <button class="secondary-btn btn-quick-record-payment" data-party="${p.party}" style="padding:3px 9px;font-size:11px;background:#edf2f7;font-weight:700;">＋ Record Payment</button>
              </td>
            </tr>
          `).join('')
        : '<tr><td colspan="5" style="text-align:center;color:#a0aec0;padding:12px;">No party ledger transactions recorded yet.</td></tr>';
    }

    // Sales & Invoices Register Table
    if ($('#sales-table')) {
      const filteredInvoices = getFilteredSalesInvoices();

      $('#sales-table').innerHTML = filteredInvoices.length > 0 ? filteredInvoices.map(inv => {
        const itemsSummary = (inv.items || []).map(i => `${i.desc}${i.packSerial ? ` (${i.packSerial})` : ''}`).join(', ');
        const warrantyBadgeText = inv.warrantyStatus || (inv.type === 'Retail' ? 'Active (Same Day Auto)' : 'Dealer Auto (+1 Month)');
        const bankAcc = inv.bankAccount || (inv.paidAmount > 0 ? 'HDFC Bank Current A/C (50200012345678)' : 'On Credit Ledger');
        return `
          <tr>
            <td><strong>${inv.invoice}</strong></td>
            <td><strong>${inv.party}</strong><br><small style="color:#64748b;">${inv.phone ? 'Mob: ' + inv.phone : ''}</small></td>
            <td>${badge(inv.type)}</td>
            <td><span style="font-size:12px;font-weight:600;">${itemsSummary}</span></td>
            <td>₹ ${inv.taxableValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            <td><strong style="color:#1e293b;">₹ ${inv.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></td>
            <td><span style="font-size:11px;color:#4a5568;font-weight:600;">${bankAcc}</span></td>
            <td>${inv.date}</td>
            <td>${badge(warrantyBadgeText)}</td>
            <td>
              <button class="primary-btn btn-print-hk-invoice" data-invoice="${inv.invoice}" style="padding:4px 8px;font-size:11px;background:#1769AA;">🖨️ HK Motors Invoice</button>
            </td>
          </tr>
        `;
      }).join('') : '<tr><td colspan="10" style="text-align:center;color:#a0aec0;padding:16px;">No invoices match the selected filter criteria.</td></tr>';
    }

    // Render Party Ledger, Dealer Accounts, Vehicles, & Suppliers
    renderLedger();
    renderDealersMaster();
    renderVehicleModels();
    renderVehicles();
    renderSuppliers();
    renderSupplierStatement();

    // Registered Warranties
    const wStatusFilter = $('#warranty-status-filter')?.value || 'all';
    const wSearchQuery = ($('#warranty-search-input')?.value || '').toLowerCase().trim();

    const filteredWarranties = (state.warranties || []).filter(w => {
      if (wStatusFilter === 'Active' && w.status !== 'Active') return false;
      if (wStatusFilter === 'Expired' && w.status === 'Active') return false;
      if (wSearchQuery) {
        const matchPack = (w.pack || '').toLowerCase().includes(wSearchQuery);
        const matchCustomer = (w.customer || '').toLowerCase().includes(wSearchQuery);
        if (!matchPack && !matchCustomer) return false;
      }
      return true;
    });

    if ($('#warranty-table')) {
      $('#warranty-table').innerHTML = filteredWarranties.length > 0 ? filteredWarranties.map(w => `
        <tr><td><strong>${w.pack}</strong></td><td>${w.customer}</td><td>${w.registered}</td><td>${w.end}</td><td>${badge(w.status)}</td></tr>
      `).join('') : '<tr><td colspan="5" style="text-align:center;color:#a0aec0;padding:14px;">No warranties match the selected status or search filter.</td></tr>';
    }

    // Unregistered Battery Packs Lying in Inventory Stock
    const unregisteredPacks = (state.production || []).filter(p => 
      p.serial !== '—' && 
      (p.qc === 'Passed' || p.status === 'Saleable' || p.status === 'Dealer stock') &&
      !(state.warranties || []).some(w => w.pack === p.serial)
    );

    const unregEl = $('#unregistered-warranty-table');
    if (unregEl) {
      unregEl.innerHTML = unregisteredPacks.length > 0 ? unregisteredPacks.map(p => `
        <tr>
          <td><strong>${p.serial}</strong></td>
          <td>${p.model}</td>
          <td>${badge(p.status)}</td>
          <td>
            <button class="primary-btn btn-activate-pack-warranty" data-serial="${p.serial}" style="padding:4px 8px;font-size:11px;background:#2b6cb0;">⚡ Activate</button>
          </td>
        </tr>
      `).join('') : '<tr><td colspan="4" style="text-align:center;color:#a0aec0;">All stock packs registered.</td></tr>';
    }

    if ($('#claims-table')) {
      $('#claims-table').innerHTML = (state.claims || []).map((c, idx) => {
        const outcomeText = String(c.outcome ?? '');
        const isReplacement = outcomeText === 'Replacement' || outcomeText.includes('Replacement');
        const isResolved = c.status === 'Resolved';

        let actionHtml = `<button class="secondary-btn btn-edit-claim" data-idx="${idx}" style="padding:4px 8px;font-size:11px;background:#edf2f7;">✎ Update</button>`;

        if (isReplacement && !isResolved) {
          actionHtml += `<button class="primary-btn btn-issue-replacement" data-idx="${idx}" style="padding:4px 8px;font-size:11px;background:#2b6cb0;">⚡ Issue Replacement</button>`;
        } else if (c.replacedWith) {
          actionHtml += `<span style="font-size:11px;color:#2f855a;font-weight:700;">Replaced (${c.replacedWith})</span>`;
        }

        return `
          <tr>
            <td><strong>${c.claim}</strong></td>
            <td>${c.pack}</td>
            <td>${c.customer}</td>
            <td>${c.issue}</td>
            <td>${c.opened}</td>
            <td><strong>${c.outcome}</strong></td>
            <td>${badge(c.status)}</td>
            <td>
              <div style="display:flex;gap:6px;align-items:center;">
                ${actionHtml}
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    renderReport(currentReportType);
    saveState();
  } catch (err) {
    console.error('Safe render notice:', err);
  }
}

let currentReportType = 'stock';

function renderReport(type = 'stock') {
  currentReportType = type;

  $$('.report-card').forEach(c => {
    c.classList.toggle('active', c.dataset.report === type);
  });

  const titleEl = $('#report-table-title');
  const subEl = $('#report-table-sub');
  const headEl = $('#report-table-head');
  const bodyEl = $('#report-table-body');

  if (!titleEl || !headEl || !bodyEl) return;

  if (type === 'stock') {
    titleEl.textContent = 'Stock & Component Inventory Report';
    subEl.textContent = 'Master components, cell batches, finished stock, and valuation';
    headEl.innerHTML = `<tr><th>Item / Batch</th><th>Material</th><th>Category</th><th>Supplier</th><th>Available Qty</th><th>Unit Cost</th><th>Total Value</th><th>Health</th></tr>`;
    
    bodyEl.innerHTML = state.inventory.map(i => {
      const matchComp = state.components.find(c => c.name === i.material);
      const unitPrice = matchComp ? matchComp.price : 2500;
      const availableQty = parseAvailableQty(i.available);
      const totalVal = formatINR(unitPrice * availableQty);
      return `
        <tr>
          <td><strong>${i.batch}</strong></td>
          <td>${i.material}</td>
          <td>${categoryBadge(i.category || 'Component')}</td>
          <td>${i.supplier}</td>
          <td><strong>${i.available}</strong></td>
          <td>${formatINR(unitPrice)}</td>
          <td><strong style="color:#2f855a;">${totalVal}</strong></td>
          <td>${badge(i.health)}</td>
        </tr>
      `;
    }).join('');
  } else if (type === 'production') {
    titleEl.textContent = 'Production & Quality Control Report';
    subEl.textContent = 'Assembly queue, operator logs, measured QC voltage & release status';
    headEl.innerHTML = `<tr><th>Production ID</th><th>Battery Model</th><th>Operator</th><th>Built Date</th><th>QC Result</th><th>Serial Assigned</th><th>Status</th></tr>`;

    bodyEl.innerHTML = state.production.map(p => `
      <tr>
        <td><strong>${p.id}</strong></td>
        <td>${p.model}</td>
        <td>${p.operator}</td>
        <td>${p.built}</td>
        <td>${badge(p.qc)}</td>
        <td><strong>${p.serial}</strong></td>
        <td>${badge(p.status)}</td>
      </tr>
    `).join('');
  } else if (type === 'traceability') {
    titleEl.textContent = 'Serialized Pack Traceability Lineage Report';
    subEl.textContent = 'Full battery lineage tracking from cell batch assembly to customer retail sale';
    headEl.innerHTML = `<tr><th>Pack Serial</th><th>Battery Model</th><th>Operator</th><th>Cell Batch</th><th>Customer / Dealer</th><th>Dispatch Date</th><th>Warranty Expiry</th></tr>`;

    bodyEl.innerHTML = state.production.filter(p => p.serial !== '—').map(p => {
      const sale = state.sales.find(s => s.pack === p.serial);
      const w = state.warranties.find(w => w.pack === p.serial);
      return `
        <tr>
          <td><strong>${p.serial}</strong></td>
          <td>${p.model}</td>
          <td>${p.operator}</td>
          <td>CATL-LFP-280-07</td>
          <td>${sale ? sale.party : (w ? w.customer : 'In Inventory')}</td>
          <td>${sale ? sale.date : '—'}</td>
          <td><strong style="color:#2f855a;">${w ? w.end : 'Not activated'}</strong></td>
        </tr>
      `;
    }).join('');
  } else if (type === 'warranty') {
    titleEl.textContent = 'Warranty & Claims Summary Report';
    subEl.textContent = 'Registered active customer warranties and claims register history';
    headEl.innerHTML = `<tr><th>Pack Serial</th><th>Customer</th><th>Registration Date</th><th>Warranty End Date</th><th>Claims History</th><th>Coverage Status</th></tr>`;

    bodyEl.innerHTML = state.warranties.map(w => {
      const claim = state.claims.find(c => c.pack === w.pack);
      return `
        <tr>
          <td><strong>${w.pack}</strong></td>
          <td>${w.customer}</td>
          <td>${w.registered}</td>
          <td><strong>${w.end}</strong></td>
          <td>${claim ? `<span style="font-weight:700;color:#c05621;">Claim (${claim.claim})</span>` : 'No claims'}</td>
          <td>${badge(w.status)}</td>
        </tr>
      `;
    }).join('');
  }
}

function downloadRowsCSV(rows, filename) {
  if (!rows || rows.length === 0) {
    toast('No data available to export.');
    return;
  }
  const csvText = rows.map(e => e.map(val => `"${String(val ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF' + csvText], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 500);
  toast(`Downloaded ${filename}`);
}

function downloadCSV() {
  let rows = [];
  let filename = `Lithynova_${currentReportType.toUpperCase()}_Report_${new Date().toISOString().split('T')[0]}.csv`;

  if (currentReportType === 'stock') {
    rows.push(['Batch ID', 'Material Name', 'Category', 'Supplier', 'Available Qty', 'Health Status']);
    (state.inventory || []).forEach(i => rows.push([i.batch, i.material, i.category || 'Component', i.supplier, i.available, i.health]));
  } else if (currentReportType === 'production') {
    rows.push(['Production ID', 'Battery Model', 'Operator', 'Built Date', 'QC Result', 'Assigned Serial', 'Status']);
    (state.production || []).forEach(p => rows.push([p.id, p.model, p.operator, p.built, p.qc, p.serial, p.status]));
  } else if (currentReportType === 'traceability') {
    rows.push(['Pack Serial', 'Battery Model', 'Operator', 'Cell Batch', 'Customer', 'Warranty Expiry']);
    (state.production || []).filter(p => p.serial !== '—').forEach(p => {
      const w = (state.warranties || []).find(w => w.pack === p.serial);
      const sale = (state.sales || []).find(s => s.pack === p.serial);
      rows.push([p.serial, p.model, p.operator, 'CATL-LFP-280-07', sale ? sale.party : 'Inventory', w ? w.end : 'Not activated']);
    });
  } else if (currentReportType === 'warranty') {
    rows.push(['Pack Serial', 'Customer', 'Registration Date', 'Warranty End Date', 'Status']);
    (state.warranties || []).forEach(w => rows.push([w.pack, w.customer, w.registered, w.end, w.status]));
  }

  downloadRowsCSV(rows, filename);
}

function downloadInventoryCSV() {
  const rows = [
    ['Batch ID', 'Material Name', 'Category', 'Supplier', 'Received Date', 'Available Qty', 'Location', 'Health Status'],
    ...(state.inventory || []).map(i => [i.batch, i.material, i.category || 'Component', i.supplier, i.received || '', i.available, i.location || '', i.health || ''])
  ];
  downloadRowsCSV(rows, `Lithynova_Inventory_${new Date().toISOString().split('T')[0]}.csv`);
}

function downloadProductionCSV() {
  const rows = [
    ['Production ID', 'Battery Model', 'Operator', 'Built Date', 'QC Result', 'Assigned Serial', 'Status'],
    ...(state.production || []).map(p => [p.id, p.model, p.operator, p.built, p.qc, p.serial, p.status])
  ];
  downloadRowsCSV(rows, `Lithynova_Production_${new Date().toISOString().split('T')[0]}.csv`);
}

function downloadWarrantyCSV() {
  const rows = [
    ['Pack Serial', 'Customer', 'Registered', 'Expiry', 'Status'],
    ...(state.warranties || []).map(w => [w.pack, w.customer, w.registered, w.end, w.status])
  ];
  downloadRowsCSV(rows, `Lithynova_Warranty_${new Date().toISOString().split('T')[0]}.csv`);
}

function downloadClaimsCSV() {
  const rows = [
    ['Claim ID', 'Pack Serial', 'Customer', 'Issue', 'Opened', 'Status', 'Outcome', 'Replacement'],
    ...(state.claims || []).map(c => [c.claim, c.pack, c.customer, c.issue, c.opened, c.status, c.outcome, c.replacedWith || ''])
  ];
  downloadRowsCSV(rows, `Lithynova_Claims_${new Date().toISOString().split('T')[0]}.csv`);
}

function downloadSalesCSV() {
  const invoices = getFilteredSalesInvoices();
  const rows = [
    ['Invoice No', 'Date', 'Type', 'Party', 'Phone', 'Items', 'Taxable Value (INR)', 'GST (INR)', 'CGST (INR)', 'SGST (INR)', 'IGST (INR)', 'Cess (INR)', 'Grand Total (INR)', 'Warranty Status']
  ];

  invoices.forEach(inv => {
    const itemsSummary = (inv.items || [])
      .map(i => `${i.desc}${i.packSerial ? ` (${i.packSerial})` : ''}`)
      .join('; ');
    rows.push([
      inv.invoice || '',
      inv.date || '',
      inv.type || '',
      inv.party || '',
      inv.phone || '',
      itemsSummary,
      inv.taxableValue ?? 0,
      inv.totalGst ?? ((inv.cgstAmount || 0) + (inv.sgstAmount || 0) + (inv.igstAmount || 0)),
      inv.cgstAmount ?? 0,
      inv.sgstAmount ?? 0,
      inv.igstAmount ?? 0,
      inv.cessAmount ?? 0,
      inv.grandTotal ?? 0,
      inv.warrantyStatus || ''
    ]);
  });

  downloadRowsCSV(rows, `Lithynova_Sales_Register_${new Date().toISOString().split('T')[0]}.csv`);
}

function getCompanyBankAccounts() {
  const customBankAccs = (state.bankAccounts || []).map(b => `${b.bankName} — ${b.accType} (${b.accNo})`);
  if (customBankAccs.length === 0) {
    customBankAccs.push(
      'HDFC Bank — Current A/C (50200012345678)',
      'ICICI Bank — Business Current A/C (001105001234)',
      'State Bank of India (SBI) — Corporate A/C (30981234567)'
    );
  }
  customBankAccs.push('UPI / PhonePe / GPay', 'Cash in Hand', 'Cheque / Demand Draft');
  return customBankAccs;
}

function getBankOptionsHtml(selectedVal = '') {
  const accs = getCompanyBankAccounts();
  return accs.map(acc => `<option value="${acc}" ${acc === selectedVal ? 'selected' : ''}>${acc}</option>`).join('');
}

function renderBankAccountsSettings() {
  if ($('#bank-count-badge')) $('#bank-count-badge').textContent = (state.bankAccounts || []).length;

  if ($('#settings-banks-table')) {
    $('#settings-banks-table').innerHTML = (state.bankAccounts || []).map((b, idx) => `
      <tr>
        <td><strong>${b.bankName}</strong></td>
        <td>${categoryBadge(b.accType)}</td>
        <td><span style="font-family:monospace;font-weight:700;color:#2b6cb0;">${b.accNo}</span></td>
        <td><span style="font-family:monospace;font-weight:700;">${b.ifsc || '—'}</span></td>
        <td>${b.branch || '—'}</td>
        <td>${b.isPrimary ? badge('PRIMARY ON INVOICES') : '<span style="color:#a0aec0">Secondary</span>'}</td>
        <td>
          <div style="display:flex;gap:6px;">
            <button class="secondary-btn btn-edit-bank-account" data-idx="${idx}" style="padding:4px 8px;font-size:11px;">✎ Edit</button>
            <button class="secondary-btn btn-remove-bank-account" data-idx="${idx}" style="padding:4px 8px;font-size:11px;background:#fff1f0;color:#c53030;">❌ Delete</button>
          </div>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="7" style="text-align:center;color:#a0aec0;padding:14px;">No bank accounts added yet. Click "+ Add Bank Account" above.</td></tr>';
  }
}

function openBankModal(editIdx = null) {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const targetBank = editIdx !== null ? (state.bankAccounts || [])[editIdx] : null;

  $('#modal-title').textContent = editIdx !== null ? 'Edit Company Bank Account' : 'Add New Company Bank Account';
  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      <input type="hidden" name="bankIdx" value="${editIdx !== null ? editIdx : ''}" />
      <div class="field"><label style="font-weight:700;">Bank Name *</label><input name="bankName" value="${targetBank ? targetBank.bankName : ''}" placeholder="e.g. HDFC Bank" required /></div>
      <div class="field"><label style="font-weight:700;">Account Type *</label><input name="accType" value="${targetBank ? targetBank.accType : 'Current A/C'}" placeholder="e.g. Current A/C" required /></div>
      <div class="field"><label style="font-weight:700;">Account Number *</label><input name="accNo" value="${targetBank ? targetBank.accNo : ''}" placeholder="e.g. 50200012345678" style="font-weight:700;" required /></div>
      <div class="field"><label style="font-weight:700;">IFSC Code *</label><input name="ifsc" value="${targetBank ? targetBank.ifsc : ''}" placeholder="e.g. HDFC0001234" style="font-weight:700;" required /></div>
      <div class="field full"><label style="font-weight:700;">Branch City / Address</label><input name="branch" value="${targetBank ? targetBank.branch : ''}" placeholder="e.g. Gorakhpur Main Branch" /></div>
      <div class="field full" style="display:flex;align-items:center;gap:8px;margin-top:6px;">
        <input type="checkbox" name="isPrimary" id="chk_bank_primary" ${targetBank && targetBank.isPrimary ? 'checked' : ''} style="width:16px;height:16px;cursor:pointer;" />
        <label for="chk_bank_primary" style="font-weight:700;cursor:pointer;color:#2b6cb0;">Set as Primary Bank Account (Print on HK Motors Tax Invoices)</label>
      </div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'company-bank';
}

function populateSettingsUI() {
  const settings = getSystemSettings();
  if ($('#set-company-name')) $('#set-company-name').value = settings.companyName || 'HK MOTORS';
  if ($('#set-company-tagline')) $('#set-company-tagline').value = settings.tagline || '';
  if ($('#set-company-gstin')) $('#set-company-gstin').value = settings.gstin || '';
  if ($('#set-company-jurisdiction')) $('#set-company-jurisdiction').value = settings.jurisdiction || '';
  if ($('#set-company-address')) $('#set-company-address').value = settings.address || '';
  if ($('#set-company-phone')) $('#set-company-phone').value = settings.phone || '';
  if ($('#set-company-email')) $('#set-company-email').value = settings.email || '';
  
  if ($('#set-gst-rate-battery')) $('#set-gst-rate-battery').value = settings.gstRateBattery ?? settings.gstRate ?? 5;
  if ($('#set-gst-rate-charger')) $('#set-gst-rate-charger').value = settings.gstRateCharger ?? 18;
  if ($('#set-gst-rate-accessory')) $('#set-gst-rate-accessory').value = settings.gstRateAccessory ?? 18;
  if ($('#set-gst-rate-service')) $('#set-gst-rate-service').value = settings.gstRateService ?? 18;

  if ($('#set-hsn-battery')) $('#set-hsn-battery').value = settings.hsnBattery || '87116020';
  if ($('#set-hsn-charger')) $('#set-hsn-charger').value = settings.hsnCharger || '85044090';
  if ($('#set-admin-password')) $('#set-admin-password').value = settings.adminPassword || 'ChangeMe123!';

  renderBankAccountsSettings();
}

function showView(view) {
  if (!view) return;
  const el = $(`#view-${view}`);
  if (!el) {
    console.warn(`View #view-${view} not found!`);
    return;
  }
  $$('.view').forEach(v => v.classList.remove('active'));
  el.classList.add('active');
  $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === view));
  const label = $(`.nav-item[data-view="${view}"]`);
  if ($('#page-title') && label) {
    const titleText = label.textContent.replace(/^[^\w\s]+/, '').trim();
    $('#page-title').textContent = titleText || view;
  }

  if (view === 'settings') populateSettingsUI();
  if (view === 'inventory' || view === 'vehicles') renderVehicles();
  if (view === 'purchase-ledger') {
    renderSuppliers();
    renderSupplierStatement();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => t.classList.remove('show'), 2600);
}

function showBomModal(modelIdx) {
  const model = state.models[modelIdx];
  if (!model) return;

  const bom = model.bom || [];
  const totalCost = calcBomCost(bom);

  const bomRowsHtml = bom.length > 0 ? bom.map(item => `
    <tr>
      <td><strong>${item.name}</strong></td>
      <td>${categoryBadge(item.category)}</td>
      <td style="text-align:center;font-weight:700;">${item.qty}</td>
      <td style="text-align:right;">${formatINR(item.unitPrice)}</td>
      <td style="text-align:right;"><strong style="color:#2f855a;">${formatINR(item.qty * item.unitPrice)}</strong></td>
    </tr>
  `).join('') : '<tr><td colspan="5" style="text-align:center;color:#a0aec0;">No components added to BOM yet.</td></tr>';

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(680px, 95%)';

  $('#modal-title').textContent = `Bill of Materials (BOM) — ${model.name}`;
  $('#modal-fields').innerHTML = `
    <div style="margin-bottom:16px;background:#f7fafc;padding:14px 16px;border-radius:10px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <strong style="font-size:16px;color:#1a202c;">${model.name}</strong> (${model.chemistry} · ${model.config})
        <div style="font-size:12px;color:#718096;margin-top:2px;">Capacity: ${model.capacity} | Warranty: ${model.warranty}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:11px;color:#718096;text-transform:uppercase;letter-spacing:0.5px;font-weight:700;">Total Pack BOM Cost</div>
        <div style="font-size:22px;font-weight:800;color:#2f855a;">${formatINR(totalCost)}</div>
      </div>
    </div>

    <table class="table-panel" style="width:100%;border-collapse:collapse;margin-top:10px;border-radius:8px;overflow:hidden;">
      <thead>
        <tr style="background:#edf2f7;font-size:11px;text-align:left;">
          <th style="padding:10px 12px;">Component Name</th>
          <th style="padding:10px 12px;">Category</th>
          <th style="padding:10px 12px;text-align:center;">Qty / Pack</th>
          <th style="padding:10px 12px;text-align:right;">Unit Price</th>
          <th style="padding:10px 12px;text-align:right;">Line Total</th>
        </tr>
      </thead>
      <tbody>
        ${bomRowsHtml}
      </tbody>
    </table>
  `;

  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;
  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'bom-view';
}

function editComponentModal(compIdx) {
  const comp = state.components[compIdx];
  if (!comp) return;

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(510px, 100%)';

  $('#modal-title').textContent = `Edit Component — ${comp.name}`;
  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      <input type="hidden" name="compIdx" value="${compIdx}" />
      <div class="field full"><label>Component Name</label><input name="name" value="${comp.name}" required /></div>
      <div class="field"><label>Category / Type</label><input name="category" value="${comp.category}" placeholder="e.g. BMS, Switch, SOC Wire, Fuse" required /></div>
      <div class="field"><label>Unit Price (₹)</label><input name="price" type="number" value="${comp.price}" required /></div>
      <div class="field full"><label>Specifications</label><input name="spec" value="${comp.spec}" required /></div>
      <div class="field full"><label>Default Supplier</label><input name="supplier" value="${comp.supplier}" required /></div>
    </div>
  `;

  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;
  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'edit-component';
  setTimeout(() => $('#modal-fields input')?.focus(), 30);
}

function editModelModal(modelIdx) {
  const model = state.models[modelIdx];
  if (!model) return;

  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(680px, 95%)';

  $('#modal-title').textContent = `Edit Battery Model — ${model.name}`;

  const isChecked = (comp) => (model.bom || []).some(b => b.componentId === comp.id || b.name === comp.name);
  const getQty = (comp) => {
    const found = (model.bom || []).find(b => b.componentId === comp.id || b.name === comp.name);
    return found ? found.qty : (comp.category === 'Cell' ? 16 : 1);
  };

  const compRows = state.components.map((c, idx) => `
    <div class="bom-select-row" style="display:grid;grid-template-columns: auto 1fr auto auto;gap:12px;align-items:center;padding:10px 12px;background:#fff;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:6px;">
      <input type="checkbox" name="comp_select" value="${c.id}" id="chk_edit_comp_${idx}" ${isChecked(c) ? 'checked' : ''} style="width:16px;height:16px;cursor:pointer;" />
      <label for="chk_edit_comp_${idx}" style="cursor:pointer;min-width:0;">
        <div style="font-weight:700;font-size:12px;color:#1a202c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.name}</div>
        <div style="font-size:10px;color:#718096;display:flex;gap:6px;align-items:center;margin-top:2px;">
          ${categoryBadge(c.category)}
          <span>${c.spec}</span>
        </div>
      </label>
      <div style="font-weight:700;font-size:12px;color:#2f855a;white-space:nowrap;">${formatINR(c.price)}</div>
      <div style="display:flex;align-items:center;gap:4px;">
        <span style="font-size:10px;color:#718096;">Qty:</span>
        <input type="number" name="comp_qty_${c.id}" value="${getQty(c)}" min="1" class="bom-qty-input" data-price="${c.price}" data-id="${c.id}" style="width:55px;padding:4px 6px;font-size:11px;border:1px solid #cbd5e0;border-radius:4px;" />
      </div>
    </div>
  `).join('');

  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      <input type="hidden" name="modelIdx" value="${modelIdx}" />
      <div class="field"><label>Model Name</label><input name="name" value="${model.name}" required /></div>
      <div class="field"><label>Chemistry</label>
        <select name="chemistry">
          <option ${model.chemistry === 'LFP' ? 'selected' : ''}>LFP</option>
          <option ${model.chemistry === 'NMC' ? 'selected' : ''}>NMC</option>
        </select>
      </div>
      <div class="field"><label>Series / Parallel Config</label><input name="config" value="${model.config}" required /></div>
      <div class="field"><label>Rated Capacity</label><input name="capacity" value="${model.capacity}" required /></div>
      <div class="field"><label>Warranty Duration</label><input name="warranty" value="${model.warranty}" required /></div>
      <div class="field"><label>Status</label>
        <select name="status">
          <option ${model.status === 'Active' ? 'selected' : ''}>Active</option>
          <option ${model.status === 'Draft' ? 'selected' : ''}>Draft</option>
          <option ${model.status === 'Archived' ? 'selected' : ''}>Archived</option>
        </select>
      </div>
      <div class="field full" style="margin-top:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <label style="font-weight:800;color:#2d3748;font-size:12px;">Update Bill of Materials (BOM Components)</label>
          <div id="live-bom-cost" style="font-size:12px;font-weight:800;color:#2f855a;background:#f0fff4;padding:4px 10px;border-radius:6px;border:1px solid #c6f6d5;">Estimated Cost: ₹0</div>
        </div>
        <div style="max-height:220px;overflow-y:auto;border:1px solid #cbd5e0;border-radius:8px;padding:8px;background:#f7fafc;">
          ${compRows}
        </div>
      </div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'edit-model';

  const updateLiveCost = () => {
    let total = 0;
    $$('input[name="comp_select"]:checked').forEach(chk => {
      const id = chk.value;
      const qtyInput = $(`input[name="comp_qty_${id}"]`);
      const price = Number(qtyInput?.dataset.price || 0);
      const qty = Number(qtyInput?.value || 1);
      total += (price * qty);
    });
    const costEl = $('#live-bom-cost');
    if (costEl) costEl.textContent = `Estimated Cost: ${formatINR(total)}`;
  };

  $$('input[name="comp_select"]').forEach(chk => chk.addEventListener('change', updateLiveCost));
  $$('.bom-qty-input').forEach(inp => inp.addEventListener('input', updateLiveCost));
  updateLiveCost();

  setTimeout(() => $('#modal-fields input')?.focus(), 30);
}

function issueReplacementModal(claimIdx) {
  const claim = state.claims[claimIdx];
  if (!claim) return;

  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(560px, 95%)';

  const existingWarranty = state.warranties.find(w => w.pack === claim.pack);
  const inheritedEndDate = existingWarranty ? existingWarranty.end : '23 Jul 2028';

  const availablePacks = state.production.filter(p => p.status === 'Saleable' || p.qc === 'Passed');
  const packOptionsHtml = availablePacks.length > 0
    ? availablePacks.map(p => `<option value="${p.serial === '—' ? p.id : p.serial}">${p.serial === '—' ? p.id : p.serial} — (${p.model})</option>`).join('')
    : `<option value="BAT-2026-000049">BAT-2026-000049 — (LFP City 3.2kWh)</option><option value="BAT-2026-000050">BAT-2026-000050 — (LFP Cargo 5.1kWh)</option>`;

  $('#modal-title').textContent = `Issue Replacement Battery Pack — ${claim.claim}`;
  $('#modal-fields').innerHTML = `
    <div style="background:#fffaf0;border:1px solid #feebc8;padding:12px;border-radius:8px;margin-bottom:14px;">
      <div style="font-weight:700;color:#c05621;font-size:13px;margin-bottom:4px;">Defective Pack Details</div>
      <div style="font-size:12px;color:#4a5568;">
        <div><strong>Defective Pack:</strong> ${claim.pack}</div>
        <div><strong>Customer:</strong> ${claim.customer}</div>
        <div><strong>Reported Issue:</strong> ${claim.issue}</div>
        <div><strong>Original Warranty Expiry Date:</strong> <span style="font-weight:800;color:#2b6cb0;">${inheritedEndDate}</span></div>
      </div>
    </div>

    <div class="form-grid">
      <input type="hidden" name="claimIdx" value="${claimIdx}" />
      <input type="hidden" name="defectivePack" value="${claim.pack}" />
      <input type="hidden" name="customer" value="${claim.customer}" />
      <input type="hidden" name="inheritedEndDate" value="${inheritedEndDate}" />

      <div class="field full">
        <label style="font-weight:800;">Select New Replacement Battery Pack</label>
        <select name="replacementPack" style="padding:10px;font-weight:700;">
          ${packOptionsHtml}
        </select>
      </div>

      <div class="field full">
        <label>Replacement Remarks / Notes</label>
        <textarea name="notes">Issued new replacement pack under warranty claim ${claim.claim}. Defective unit ${claim.pack} received at workshop.</textarea>
      </div>
    </div>

    <div style="margin-top:12px;background:#f0fff4;border:1px solid #c6f6d5;padding:10px;border-radius:6px;font-size:11px;color:#22543d;">
      ✓ <strong>Warranty Inheritance:</strong> The replacement pack will inherit warranty end date <strong>${inheritedEndDate}</strong>. The defective pack ${claim.pack} will be deactivated.
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'issue-replacement';
  setTimeout(() => $('#modal-fields select')?.focus(), 30);
}

function updateClaimModal(claimIdx) {
  const claim = state.claims[claimIdx];
  if (!claim) return;

  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(580px, 95%)';

  const compOptsHtml = state.components.map(c => `
    <option value="${c.name}" data-price="${c.price}">${c.name} (${c.category}) — ₹${c.price}</option>
  `).join('');

  $('#modal-title').textContent = `Update Claim Status & Repair Services — ${claim.claim}`;
  $('#modal-fields').innerHTML = `
    <div style="background:#f7fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <strong style="font-size:14px;color:#1a202c;">${claim.claim}</strong> · Pack: <strong>${claim.pack}</strong>
        <div style="font-size:12px;color:#718096;margin-top:2px;">Customer: ${claim.customer} | Opened: ${claim.opened}</div>
      </div>
      <div>
        ${badge(claim.status)}
      </div>
    </div>

    <div class="form-grid">
      <input type="hidden" name="claimIdx" value="${claimIdx}" />
      
      <div class="field"><label style="font-weight:700;">Claim Status *</label>
        <select name="status" style="font-weight:700;">
          <option ${claim.status === 'Open' ? 'selected' : ''}>Open</option>
          <option ${claim.status === 'Inspection' || claim.status === 'Under Inspection' ? 'selected' : ''}>Inspection</option>
          <option ${claim.status === 'In Repair' ? 'selected' : ''}>In Repair</option>
          <option ${claim.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
          <option ${claim.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
        </select>
      </div>

      <div class="field"><label style="font-weight:700;">Resolution Outcome *</label>
        <select name="outcome" style="font-weight:700;">
          <option ${claim.outcome === '—' || claim.outcome === 'Inspection' ? 'selected' : ''}>Inspection</option>
          <option ${claim.outcome === 'Repair' ? 'selected' : ''}>Repair</option>
          <option ${String(claim.outcome ?? '').includes('Replacement') ? 'selected' : ''}>Replacement</option>
          <option ${claim.outcome === 'Rejection' || claim.outcome === 'Rejected' ? 'selected' : ''}>Rejection</option>
        </select>
      </div>

      <!-- Repair & Replaced Component Details -->
      <div class="field full" style="background:#f8fafc;padding:14px;border-radius:8px;border:1px solid #cbd5e1;margin-top:6px;">
        <h4 style="margin:0 0 10px 0;font-size:13px;font-weight:800;color:#2b6cb0;">🔧 Battery Repair &amp; Component Replacement Billing</h4>
        
        <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:10px;margin-bottom:10px;">
          <div>
            <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Replaced Component (From Master Inventory Stock)</label>
            <select name="replaced_comp" style="width:100%;padding:7px;font-size:11px;font-weight:700;border:1px solid #cbd5e1;border-radius:6px;background:#fff;">
              <option value="None">None / No Component Replaced</option>
              ${compOptsHtml}
            </select>
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Component Cost (₹)</label>
            <input name="comp_price" type="number" step="0.01" value="0" style="padding:7px;font-size:12px;font-weight:700;border:1px solid #cbd5e1;border-radius:6px;width:100%;" />
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div>
            <label style="font-size:11px;font-weight:700;color:#2b6cb0;display:block;margin-bottom:4px;">Repair Labour / Service Fee (₹)</label>
            <input name="repair_labor" type="number" step="0.01" value="1200" style="padding:7px;font-size:12px;font-weight:800;border:1px solid #3182ce;border-radius:6px;width:100%;background:#f0f9ff;" />
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:#2b6cb0;display:block;margin-bottom:4px;">Electricity &amp; Testing Fee (₹)</label>
            <input name="repair_elec" type="number" step="0.01" value="300" style="padding:7px;font-size:12px;font-weight:800;border:1px solid #3182ce;border-radius:6px;width:100%;background:#f0f9ff;" />
          </div>
        </div>

        <div style="margin-top:12px;display:flex;align-items:center;gap:8px;">
          <input type="checkbox" name="sync_sales_invoice" id="chk_sync_sales" checked style="width:16px;height:16px;cursor:pointer;" />
          <label for="chk_sync_sales" style="font-size:12px;font-weight:800;color:#1e293b;cursor:pointer;">Synchronize with Sales: Auto-Generate Tax Invoice &amp; Post to Customer Party Ledger</label>
        </div>
      </div>

      <div class="field full"><label style="font-weight:700;">Reported Issue *</label><input name="issue" value="${claim.issue}" required /></div>
      <div class="field full"><label style="font-weight:700;">Technician Diagnostic &amp; Repair Notes</label><textarea name="notes" placeholder="Enter diagnostic findings, replaced components, or testing details...">${claim.notes || ''}</textarea></div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'update-claim';
  setTimeout(() => $('#modal-fields select')?.focus(), 30);
}

function runQcModal(prodIdx) {
  const prod = state.production[prodIdx];
  if (!prod) return;

  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(560px, 95%)';

  const generatedSerial = prod.serial !== '—' ? prod.serial : 'BAT-2026-' + String(state.production.length + 48).padStart(6, '0');

  $('#modal-title').textContent = `Quality Check & Release — ${prod.id}`;
  $('#modal-fields').innerHTML = `
    <div style="background:#f7fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;margin-bottom:14px;">
      <strong style="font-size:14px;color:#1a202c;">${prod.model}</strong> (Build: ${prod.id})
      <div style="font-size:12px;color:#718096;margin-top:2px;">Operator: ${prod.operator} | Assembly Built: ${prod.built}</div>
    </div>

    <div class="form-grid">
      <input type="hidden" name="prodIdx" value="${prodIdx}" />
      
      <div class="field"><label>Measured Pack Voltage (V)</label><input name="voltage" value="53.2V" required /></div>
      <div class="field"><label>Measured Capacity (Ah)</label><input name="measured_cap" value="101.5Ah" required /></div>

      <div class="field"><label>QC Inspection Result</label>
        <select name="qc">
          <option value="Passed" ${prod.qc === 'Passed' ? 'selected' : ''}>Passed (Release to Finished Stock)</option>
          <option value="Failed" ${prod.qc === 'Failed' ? 'selected' : ''}>Failed (Reject & Quarantine)</option>
        </select>
      </div>

      <div class="field"><label>Assigned Pack Serial Number</label><input name="serial" value="${generatedSerial}" required /></div>
      <div class="field full"><label>Quality Inspector Remarks</label><textarea name="notes">All cell banks balanced within 5mV. BMS UART communication passed. Insulation resistance > 500MΩ.</textarea></div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'run-qc';
  setTimeout(() => $('#modal-fields select, #modal-fields input')?.focus(), 30);
}

function drawQRCodeCanvas(canvasEl, text) {
  if (!canvasEl) return;
  try {
    if (typeof QRCode !== 'undefined' && QRCode.drawCanvas) {
      QRCode.drawCanvas(canvasEl, String(text || ''), 120);
      return;
    }
  } catch (e) {
    console.warn('QRCode library draw failed:', e);
  }
}

function renderQrLabelPreview(packSerial) {
  const container = $('#qr-label-preview-container');
  if (!container) return;

  const warranty = state.warranties.find(w => w.pack === packSerial) || state.warranties[0];
  const pack = warranty ? warranty.pack : 'BAT-2026-000046';
  const customer = warranty ? warranty.customer : 'Bharat S Gadhvi';
  const end = warranty ? warranty.end : '23 July 2028';
  const targetUrl = `${window.location.origin}${window.location.pathname}?token=${pack}`;

  container.innerHTML = `
    <div class="qr-sticker-card" style="background:#fff;border:2px solid #1a202c;border-radius:10px;padding:16px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #e2e8f0;padding-bottom:10px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <img src="lithynova_logo.png" alt="Lithynova" style="width:48px;height:48px;object-fit:contain;border-radius:6px;background:#fff;padding:2px;border:1px solid #cbd5e0;" />
          <div>
            <div style="font-weight:900;font-size:16px;letter-spacing:1px;color:#1a202c;">LITHYNOVA BATTERY SYSTEM</div>
            <div style="font-size:10px;color:#718096;text-transform:uppercase;font-weight:700;">Official Warranty Verification Sticker</div>
          </div>
        </div>
        <div style="background:#f0fff4;color:#2f855a;font-weight:800;font-size:10px;padding:3px 8px;border-radius:4px;border:1px solid #c6f6d5;">WARRANTY ACTIVE</div>
      </div>

      <div style="display:flex;gap:16px;align-items:center;">
        <!-- Canvas 2D QR Barcode -->
        <div style="background:#fff;border:2px solid #cbd5e0;border-radius:8px;padding:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <canvas id="qr-barcode-canvas" style="width:110px;height:110px;display:block;"></canvas>
          <div style="font-size:8px;font-weight:800;color:#4a5568;margin-top:4px;font-family:monospace;">${pack}</div>
        </div>

        <div style="flex:1;font-size:12px;">
          <div style="margin-bottom:6px;">
            <span style="font-size:10px;color:#718096;display:block;">PACK SERIAL NUMBER</span>
            <strong style="font-size:17px;color:#1a202c;font-family:monospace;">${pack}</strong>
          </div>

          <div style="margin-bottom:6px;">
            <span style="font-size:10px;color:#718096;display:block;">REGISTERED OWNER / CUSTOMER</span>
            <strong style="color:#2b6cb0;">${customer}</strong>
          </div>

          <div>
            <span style="font-size:10px;color:#718096;display:block;">WARRANTY EXPIRY DATE</span>
            <strong style="color:#2f855a;font-size:14px;">${end}</strong>
          </div>
        </div>
      </div>

      <div style="margin-top:14px;border-top:1px dashed #cbd5e0;padding-top:10px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:9px;color:#a0aec0;">Scan with smartphone camera to verify authenticity.</span>
        <button class="primary-btn" id="btn-print-qr-sticker" style="padding:6px 14px;font-size:11px;background:#1a202c;">🖨️ Print Label Sticker</button>
      </div>
    </div>
  `;

  // Draw 2D QR Canvas barcode
  setTimeout(() => {
    const canvas = $('#qr-barcode-canvas');
    if (canvas) {
      drawQRCodeCanvas(canvas, targetUrl);
    }
  }, 20);

  $('#btn-print-qr-sticker')?.addEventListener('click', () => {
    window.print();
    toast(`Sent QR Label for ${pack} to printer`);
  });
}

function activateWarrantyModal(targetSerial = null) {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(580px, 95%)';

  const unregisteredPacks = state.production.filter(p => p.serial !== '—');
  const packOptions = unregisteredPacks.length > 0
    ? unregisteredPacks.map(p => `<option value="${p.serial}" ${targetSerial === p.serial ? 'selected' : ''}>${p.serial} — (${p.model})</option>`).join('')
    : '<option value="BAT-2026-000050">BAT-2026-000050 — (LFP City 3.2kWh)</option><option value="BAT-2026-000051">BAT-2026-000051 — (LFP Cargo 5.1kWh)</option>';

  const todayStr = new Date().toISOString().split('T')[0];
  const defaultEnd = new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0];

  $('#modal-title').textContent = 'Activate Battery Pack Warranty';
  $('#modal-fields').innerHTML = `
    <div style="background:#f7fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;margin-bottom:14px;">
      <strong style="font-size:13px;color:#1a202c;">Manual Warranty Registration &amp; Activation</strong>
      <div style="font-size:11px;color:#718096;margin-top:2px;">Manually record installation dates, customer details, and custom warranty expiry dates.</div>
    </div>

    <div class="form-grid">
      <div class="field full">
        <label style="font-weight:700;">Pack Serial Number</label>
        <div style="display:flex;gap:8px;">
          <select id="warranty-pack-select" name="pack_select" style="flex:1;padding:10px;font-weight:700;">
            ${packOptions}
            <option value="CUSTOM">＋ Enter Custom Serial Number...</option>
          </select>
          <input id="warranty-custom-serial" name="custom_serial" placeholder="e.g. BAT-2026-000099" style="flex:1;display:none;" />
        </div>
      </div>

      <div class="field"><label>Customer / Owner Name</label><input name="customer" placeholder="e.g. Rahul Sharma" required /></div>
      <div class="field"><label>Dealer / Seller Name</label><input name="dealer" placeholder="e.g. Apex EV Motors" /></div>

      <div class="field"><label>Registration / Sale Date (Manual Date)</label><input type="date" name="registered_date" value="${todayStr}" required /></div>
      <div class="field"><label>Warranty Expiry Date (Manual Date)</label><input type="date" name="end_date" value="${defaultEnd}" required /></div>

      <div class="field"><label>Vehicle / Equipment Reg. No.</label><input name="vehicle" placeholder="e.g. MH-12-EV-9921" /></div>
      <div class="field"><label>Coverage Status</label>
        <select name="status">
          <option value="Active">Active</option>
          <option value="Expiring soon">Expiring soon</option>
          <option value="Extended">Extended Warranty</option>
        </select>
      </div>

      <div class="field full"><label>Invoice / Activation Notes</label><textarea name="notes" placeholder="Invoice number, dealer stamp, or warranty terms reference..."></textarea></div>
    </div>
  `;

  const sel = $('#warranty-pack-select');
  const custInp = $('#warranty-custom-serial');
  if (sel && custInp) {
    sel.addEventListener('change', () => {
      if (sel.value === 'CUSTOM') {
        custInp.style.display = 'block';
        custInp.focus();
      } else {
        custInp.style.display = 'none';
      }
    });
  }

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'activate-warranty';
  setTimeout(() => $('#modal-fields input[name="customer"]')?.focus(), 30);
}

const modalSchemas = {
  model: {
    title: 'Add battery model with BOM components',
    fields: [
      ['name', 'Model name', 'text', 'LFP City 3.2kWh'],
      ['chemistry', 'Chemistry', 'select', ['LFP', 'NMC']],
      ['config', 'Series / parallel', 'text', '16S 1P'],
      ['capacity', 'Rated capacity', 'text', '100Ah · 51.2V'],
      ['warranty', 'Warranty', 'text', '24 months'],
      ['status', 'Status', 'select', ['Active', 'Draft']]
    ]
  },
  component: {
    title: 'Add new component to master catalog',
    fields: [
      ['name', 'Component name', 'text', 'DALY 16S 100A Smart BMS'],
      ['category', 'Category / Type (e.g. BMS, Switch, Wire, SOC)', 'text', 'BMS'],
      ['price', 'Unit price (₹)', 'number', '3400'],
      ['spec', 'Specifications', 'text', '16S 48V 100A UART/CAN'],
      ['supplier', 'Default supplier', 'text', 'Daly Electronics']
    ]
  },
  stock: {
    title: 'Receive stock batch',
    fields: [
      ['batch', 'Supplier batch', 'text', 'CATL-LFP-280-08'],
      ['material', 'Material', 'text', 'LFP 280Ah prismatic cells'],
      ['supplier', 'Supplier', 'text', 'EVE China'],
      ['quantity', 'Quantity', 'number', '52'],
      ['location', 'Location', 'text', 'Main workshop'],
      ['document', 'Document reference', 'text', 'PO-2026-031']
    ]
  },
  production: {
    title: 'Create production record',
    fields: [
      ['model', 'Battery model', 'select', ['LFP City 3.2kWh', 'LFP Cargo 5.1kWh', 'NMC Sprint 2.8kWh']],
      ['operator', 'Operator', 'text', 'Advit Pandey'],
      ['batch', 'Cell batch', 'select', ['CATL-LFP-280-07', 'NMC-21700-06']],
      ['quantity', 'Packs to build', 'number', '1'],
      ['notes', 'Assembly notes', 'textarea', '']
    ]
  },
  sale: {
    title: 'Record sale / dispatch',
    fields: [
      ['pack', 'Pack serial', 'text', 'BAT-2026-000048'],
      ['type', 'Sale path', 'select', ['Direct retail', 'Dealer stock']],
      ['party', 'Customer or dealer', 'text', ''],
      ['date', 'Sale / dispatch date', 'date', '2026-07-25'],
      ['vehicle', 'Vehicle number', 'text', ''],
      ['notes', 'Remarks', 'textarea', '']
    ]
  },
  dealer: {
    title: 'Register New Dealer Master Account',
    fields: [
      ['title', 'Title / Salutation', 'select', ['M/s.', 'Mr.', 'Messrs.']],
      ['name', 'Dealer / Ledger Firm Name *', 'text', 'DELTA AUTOCORP LIMITED'],
      ['contactPerson', 'Contact Person (S/o, D/o, W/o)', 'text', 'S/o Shri Baijnath Prasad'],
      ['gstType', 'GST Dealer Type *', 'select', ['Registered Dealer', 'Unregistered Dealer', 'Composition']],
      ['gstin', 'Dealer GSTIN Number *', 'text', '09ABACD5678G1Z9'],
      ['pan', 'PAN Number', 'text', 'ABACD5678G'],
      ['phone', 'Mobile Number / WhatsApp *', 'text', '9812345678'],
      ['address', 'Full Address', 'text', 'Transport Nagar, Rustampur'],
      ['city', 'City / District', 'text', 'GORAKHPUR'],
      ['state', 'State', 'text', 'UTTAR PRADESH'],
      ['pin', 'PIN Code', 'text', '273001'],
      ['creditLimit', 'Credit Limit (INR)', 'number', '1000000'],
      ['creditDays', 'Credit Days', 'number', '30'],
      ['openingBalance', 'Opening Balance (INR)', 'number', '0']
    ]
  }
};

function getCurrentUserRole() {
  return localStorage.getItem('tejas_user_role') || 'Admin';
}

function setUserRole(role) {
  localStorage.setItem('tejas_user_role', role);
  updateUserRoleUI();
  try { render(); } catch (e) {}
}

function updateUserRoleUI() {
  const role = getCurrentUserRole();
  const isAdmin = role === 'Admin';

  const nameEl = $('#sidebar-username');
  const roleEl = $('#sidebar-userrole');
  const avatarEl = $('#sidebar-avatar');
  const topAvatarEl = $('#topbar-avatar');
  const switchBtnEl = $('#btn-switch-user-role');
  const resetBtnEl = $('#reset-app-btn');

  if (nameEl) nameEl.textContent = isAdmin ? 'Advit Pandey' : 'Reception Staff';
  if (roleEl) roleEl.textContent = isAdmin ? '👨‍💼 Administrator' : '👤 Reception Staff';
  if (avatarEl) avatarEl.textContent = isAdmin ? 'AP' : 'RS';
  if (topAvatarEl) topAvatarEl.textContent = isAdmin ? 'AP' : 'RS';
  if (switchBtnEl) switchBtnEl.textContent = isAdmin ? '👨‍💼 Admin' : '👤 Reception Staff';

  $$('.nav-item').forEach(item => {
    const view = item.dataset.view;
    if (view === 'settings') {
      item.style.display = isAdmin ? 'flex' : 'none';
    }
  });

  if (resetBtnEl) {
    resetBtnEl.style.display = isAdmin ? 'inline-block' : 'none';
  }
}

function openRoleModal() {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const currentRole = getCurrentUserRole();

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(540px, 95%)';

  $('#modal-title').textContent = 'Switch User Profile / System Role';
  $('#modal-fields').innerHTML = `
    <div style="background:#f8fafc;padding:14px;border-radius:8px;border:1px solid #cbd5e1;margin-bottom:16px;">
      <div style="font-size:12px;color:#64748b;">Current Active Profile:</div>
      <div style="font-size:16px;font-weight:800;color:#1e293b;margin-top:2px;">
        ${currentRole === 'Admin' ? '👨‍💼 Administrator (Full System Control)' : '👤 Reception Staff (Daily Sales & Warranty Ops)'}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="background:#fff;border:2px solid ${currentRole === 'Admin' ? '#2b6cb0' : '#cbd5e1'};padding:14px;border-radius:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong style="font-size:14px;color:#1a202c;display:block;">👨‍💼 Administrator Profile</strong>
            <small style="color:#64748b;font-size:11px;display:block;margin-top:2px;">Full unrestricted access to System Settings, BOM prices, Stock, Reports &amp; Reset Data.</small>
          </div>
          <button type="button" class="primary-btn btn-switch-role" data-role="Admin" style="padding:8px 14px;font-size:12px;background:#2b6cb0;">
            ${currentRole === 'Admin' ? '● Active' : 'Switch to Admin 🔑'}
          </button>
        </div>
        ${currentRole === 'Staff' ? `
          <div style="margin-top:12px;padding-top:10px;border-top:1px solid #e2e8f0;">
            <label style="font-size:11px;font-weight:800;color:#c05621;display:block;margin-bottom:4px;">🔑 ENTER ADMIN PASSWORD TO UNLOCK ADMINISTRATOR ROLE:</label>
            <input type="password" id="role-admin-pass-input" placeholder="Admin Password (Default: ChangeMe123!)" style="width:100%;padding:8px;font-size:13px;border:1px solid #cbd5e1;border-radius:6px;box-sizing:border-box;font-weight:700;" />
          </div>
        ` : ''}
      </div>

      <div style="background:#fff;border:2px solid ${currentRole === 'Staff' ? '#319795' : '#cbd5e1'};padding:14px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="font-size:14px;color:#1a202c;display:block;">👤 Reception Staff Profile</strong>
          <small style="color:#64748b;font-size:11px;display:block;margin-top:2px;">Daily reception use: Record Sales, Customer Ledger, Warranty Registrations &amp; QR Labels.</small>
        </div>
        <button type="button" class="primary-btn btn-switch-role" data-role="Staff" style="padding:8px 14px;font-size:12px;background:#319795;">
          ${currentRole === 'Staff' ? '● Active' : 'Lock to Staff'}
        </button>
      </div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'flex';
  backdrop.style.alignItems = 'center';
  backdrop.style.justifyContent = 'center';
  backdrop.dataset.kind = 'switch-role';

  $$('.btn-switch-role').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetRole = btn.dataset.role;
      if (targetRole === 'Admin' && currentRole !== 'Admin') {
        const inputPass = ($('#role-admin-pass-input')?.value || '').trim();
        const settings = getSystemSettings();
        const correctPass = String(settings.adminPassword || 'ChangeMe123!').trim();
        if (!inputPass || inputPass !== correctPass) {
          toast('❌ Invalid Administrator Password. Access Denied.');
          return;
        }
      }
      setUserRole(targetRole);
      closeModal();
      toast(`Switched profile to ${targetRole === 'Admin' ? '👨‍💼 Administrator (Full Access)' : '👤 Reception Staff (Restricted Access)'}`);
    });
  });
}

function openCompGstModal(idx) {
  const comp = (state.inventory || [])[idx];
  if (!comp) return;

  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(520px, 95%)';

  $('#modal-title').textContent = `Set HSN Code & GST Rate: ${comp.material}`;
  $('#modal-fields').innerHTML = `
    <div style="background:#f8fafc;padding:12px;border-radius:8px;border:1px solid #cbd5e1;margin-bottom:14px;font-size:12px;">
      <div><strong>Batch Code:</strong> ${comp.batch}</div>
      <div><strong>Material / Component Name:</strong> ${comp.material}</div>
      <div><strong>Category:</strong> ${comp.category || 'Raw Component'}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <input type="hidden" name="compIdx" value="${idx}" />
      <div class="field"><label style="font-weight:700;">HSN Code *</label><input name="hsn" value="${comp.hsn || '85044090'}" placeholder="e.g. 85044090 or 85079090" required /></div>
      <div class="field"><label style="font-weight:700;">GST Tax Rate (%) *</label>
        <select name="gstRate" style="font-weight:700;">
          <option value="5" ${Number(comp.gstRate) === 5 ? 'selected' : ''}>5% GST (Battery Cells / Packs)</option>
          <option value="12" ${Number(comp.gstRate) === 12 ? 'selected' : ''}>12% GST (Electronics / Chargers)</option>
          <option value="18" ${Number(comp.gstRate) === 18 || !comp.gstRate ? 'selected' : ''}>18% GST (Standard Parts / Spares)</option>
          <option value="28" ${Number(comp.gstRate) === 28 ? 'selected' : ''}>28% GST (High Tax Parts)</option>
        </select>
      </div>
      <div class="field full"><label style="font-weight:700;">Standard Unit Price (₹)</label><input name="unitPrice" type="number" step="0.01" value="${comp.unitPrice || comp.price || 0}" placeholder="Default unit selling price" /></div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'flex';
  backdrop.style.alignItems = 'center';
  backdrop.style.justifyContent = 'center';
  backdrop.dataset.kind = 'edit-comp-gst';
}

function openRepairInvoiceModal(claimIdx) {
  const claim = (state.claims || [])[claimIdx];
  if (!claim) return;

  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const warranty = (state.warranties || []).find(w => w.pack === claim.pack);
  const partyName = claim.customer || (warranty ? warranty.customer : '');

  const dealer = (state.dealers || []).find(d => normalizeText(d.name) === normalizeText(partyName));
  const prevInv = (state.invoices || []).find(i => normalizeText(i.party) === normalizeText(partyName));

  const fatherName = dealer ? dealer.contactPerson : (prevInv ? prevInv.fatherName : '');
  const phone = dealer ? dealer.phone : (prevInv ? prevInv.phone : '');
  const address = dealer ? `${dealer.address || ''}, ${dealer.city || ''}`.replace(/^,\s*/, '') : (prevInv ? prevInv.address : '');
  const customerState = dealer ? (dealer.state || 'UTTAR PRADESH') : (prevInv ? (prevInv.partyState || 'UTTAR PRADESH') : 'UTTAR PRADESH');

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(780px, 95%)';

  const registeredDealers = state.dealers || [];
  const existingPartiesList = Array.from(new Set([
    ...registeredDealers.map(d => d.name),
    ...(state.invoices || []).map(i => i.party),
    ...(state.sales || []).map(s => s.party),
    ...(state.ledger || []).map(l => l.party),
    ...(state.warranties || []).map(w => w.customer)
  ])).filter(Boolean);

  const partyDatalistHtml = existingPartiesList.map(p => `<option value="${p}">`).join('');

  $('#modal-title').textContent = `Create Repair Invoice: Claim ${claim.claim} (${claim.pack})`;
  $('#modal-fields').innerHTML = `
    <input type="hidden" name="claimIdx" value="${claimIdx}" />
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;background:#f8fafc;padding:14px;border-radius:8px;border:1px solid #e2e8f0;">
      <div class="field" style="grid-column: span 2;">
        <label style="font-weight:800;color:#2b6cb0;">Customer / Dealer Name * (Database Autocomplete)</label>
        <input name="party" id="repair-party-input" list="repair-parties-datalist" value="${partyName}" placeholder="🔍 Search customer or dealer name..." required style="font-weight:700;font-size:13px;padding:9px;border:1px solid #2b6cb0;background:#ebf8ff;" />
        <datalist id="repair-parties-datalist">${partyDatalistHtml}</datalist>
        <small style="color:#2b6cb0;display:block;margin-top:4px;">💡 Auto-filled from Warranty Claim database (${claim.pack}).</small>
      </div>
      <div class="field"><label>Contact / Father's Name</label><input name="fatherName" id="repair-father-input" value="${fatherName}" placeholder="Contact Person" /></div>
      <div class="field"><label>Mobile Number</label><input name="phone" id="repair-phone-input" value="${phone}" placeholder="Phone Number" /></div>
      <div class="field"><label>Address</label><input name="address" id="repair-address-input" value="${address}" placeholder="Full Address" /></div>
      <div class="field"><label>Customer State / Place of Supply</label><input name="customerState" id="repair-state-input" value="${customerState}" placeholder="e.g. UTTAR PRADESH" /></div>
      <div class="field" style="grid-column: span 2;"><label style="font-weight:700;">Claim Context / Repair Reason</label><input name="issue" value="Warranty Service Repair for ${claim.pack} (${claim.issue})" readonly style="background:#edf2f7;" /></div>
    </div>

    <div style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <h3 style="font-size:14px;font-weight:800;margin:0;">Repair Billing Line Items &amp; Services</h3>
        <button type="button" class="secondary-btn" id="btn-add-repair-item" style="padding:5px 12px;font-size:12px;background:#edf2f7;color:#2b6cb0;font-weight:700;">＋ Add Replacement Part / Service</button>
      </div>
      <div id="repair-items-container" style="display:flex;flex-direction:column;gap:10px;"></div>
    </div>

    <div style="background:#f1f5f9;padding:14px;border-radius:8px;border:1px solid #cbd5e1;display:grid;grid-template-columns: 1fr 1fr;gap:14px;font-size:12px;">
      <div>
        <div><strong>Tax &amp; Cost Breakdown Summary</strong></div>
        <div style="display:flex;justify-content:space-between;margin-top:4px;"><span>Taxable Value:</span><strong id="repair-taxable">₹ 0.00</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Total GST:</span><span id="repair-total-gst">₹ 0.00</span></div>
        <div style="display:flex;justify-content:space-between;font-weight:800;font-size:15px;border-top:1px solid #cbd5e1;padding-top:4px;margin-top:4px;">
          <span>Grand Total Bill:</span><span id="repair-grand-total" style="color:#1769AA;">₹ 0.00</span>
        </div>
      </div>
      <div>
        <div class="field"><label style="font-weight:700;">Upfront Payment Received (₹)</label><input name="paid_amount" id="repair-paid-amount" type="number" step="0.01" value="0" style="font-weight:700;" /></div>
        <small style="color:#64748b;display:block;margin-top:4px;">Enter 0 to post as <strong>Pending Repair Invoice (Unpaid Debit)</strong> on Party Ledger.</small>
      </div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'flex';
  backdrop.style.alignItems = 'center';
  backdrop.style.justifyContent = 'center';
  backdrop.dataset.kind = 'repair-invoice';

  addRepairItemRow('Cell Balancing & Inspection Service', '85044090', 18, 500, 1);

  $('#repair-party-input')?.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (!val) return;
    const d = (state.dealers || []).find(deal => normalizeText(deal.name) === normalizeText(val));
    if (d) {
      if ($('#repair-father-input')) $('#repair-father-input').value = d.contactPerson || '';
      if ($('#repair-phone-input')) $('#repair-phone-input').value = d.phone || '';
      if ($('#repair-address-input')) $('#repair-address-input').value = `${d.address || ''}, ${d.city || ''}`.replace(/^,\s*/, '');
      if ($('#repair-state-input')) $('#repair-state-input').value = d.state || 'UTTAR PRADESH';
    }
  });

  $('#btn-add-repair-item')?.addEventListener('click', () => addRepairItemRow('', '85044090', 18, 0, 1));
}

function addRepairItemRow(name = '', hsn = '85044090', gst = 18, price = 0, qty = 1) {
  const container = $('#repair-items-container');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'repair-item-row';
  row.style.cssText = 'background:#fff;border:1px solid #cbd5e1;padding:10px;border-radius:8px;display:grid;grid-template-columns: 2fr 1fr 1fr 1fr 1fr 30px;gap:8px;align-items:center;';

  const inventoryOptions = (state.inventory || []).map(comp => {
    const compRate = comp.gstRate || defaultGstRateForItem(comp);
    const compHsn = comp.hsn || '85044090';
    return `<option value="${comp.material}" data-hsn="${compHsn}" data-gst="${compRate}" data-price="${comp.unitPrice || comp.price || 0}">${comp.material} (HSN ${compHsn} · ${compRate}% GST)</option>`;
  }).join('');

  row.innerHTML = `
    <div>
      <label style="font-size:10px;color:#64748b;display:block;">Part / Service Name</label>
      <input name="item_desc[]" class="repair-desc-input" value="${name}" placeholder="Type part or select..." list="inventory-parts-list" style="width:100%;font-size:12px;padding:6px;font-weight:700;" />
      <datalist id="inventory-parts-list">${inventoryOptions}</datalist>
    </div>
    <div>
      <label style="font-size:10px;color:#64748b;display:block;">HSN Code</label>
      <input name="item_hsn[]" class="repair-hsn-input" value="${hsn}" style="width:100%;font-size:12px;padding:6px;" />
    </div>
    <div>
      <label style="font-size:10px;color:#64748b;display:block;">GST Rate (%)</label>
      <input name="item_gst[]" type="number" class="repair-gst-input" value="${gst}" style="width:100%;font-size:12px;padding:6px;font-weight:700;" />
    </div>
    <div>
      <label style="font-size:10px;color:#64748b;display:block;">Unit Price (₹)</label>
      <input name="item_price[]" type="number" step="0.01" class="repair-price-input" value="${price}" style="width:100%;font-size:12px;padding:6px;font-weight:700;" />
    </div>
    <div>
      <label style="font-size:10px;color:#64748b;display:block;">Qty</label>
      <input name="item_qty[]" type="number" step="1" class="repair-qty-input" value="${qty}" style="width:100%;font-size:12px;padding:6px;font-weight:700;" />
    </div>
    <button type="button" class="btn-remove-repair-item" style="background:#fff5f5;color:#e53e3e;border:1px solid #fed7d7;border-radius:4px;cursor:pointer;padding:6px;margin-top:14px;font-weight:800;">✕</button>
  `;

  container.appendChild(row);

  const descInput = row.querySelector('.repair-desc-input');
  descInput?.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    const comp = (state.inventory || []).find(i => normalizeText(i.material) === normalizeText(val));
    if (comp) {
      if (row.querySelector('.repair-hsn-input')) row.querySelector('.repair-hsn-input').value = comp.hsn || '85044090';
      if (row.querySelector('.repair-gst-input')) row.querySelector('.repair-gst-input').value = comp.gstRate || defaultGstRateForItem(comp);
      if (row.querySelector('.repair-price-input') && (!row.querySelector('.repair-price-input').value || row.querySelector('.repair-price-input').value == 0)) {
        row.querySelector('.repair-price-input').value = comp.unitPrice || comp.price || 0;
      }
    }
    recalculateRepairTotals();
  });

  row.querySelectorAll('input').forEach(inp => inp.addEventListener('input', recalculateRepairTotals));
  row.querySelector('.btn-remove-repair-item')?.addEventListener('click', () => {
    row.remove();
    recalculateRepairTotals();
  });

  recalculateRepairTotals();
}

function recalculateRepairTotals() {
  let taxable = 0;
  let totalGst = 0;

  $$('.repair-item-row').forEach(row => {
    const price = Number(row.querySelector('.repair-price-input')?.value || 0);
    const qty = Number(row.querySelector('.repair-qty-input')?.value || 1);
    const gstRate = Number(row.querySelector('.repair-gst-input')?.value || 18);

    const rowTaxable = price * qty;
    const rowGst = rowTaxable * gstRate / 100;

    taxable += rowTaxable;
    totalGst += rowGst;
  });

  const grandTotal = Math.round(taxable + totalGst);

  if ($('#repair-taxable')) $('#repair-taxable').textContent = `₹ ${taxable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  if ($('#repair-total-gst')) $('#repair-total-gst').textContent = `₹ ${totalGst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  if ($('#repair-grand-total')) $('#repair-grand-total').textContent = `₹ ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

const CLIENT_APPS_SCRIPT_CODE = `// =========================================================================
// LITHYNOVA BATTERY MANAGEMENT SYSTEM - GOOGLE SHEETS SYNC SCRIPT
// Paste into Client Google Sheet: Extensions -> Apps Script -> Save -> Deploy Web App (Anyone)
// =========================================================================
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var payload = JSON.parse(e.postData.contents);
    if (payload.action === 'ping') {
      return ContentService.createTextOutput(JSON.stringify({ status: 'SUCCESS', message: 'Connected to Client Google Sheet!', sheetTitle: ss.getName() })).setMimeType(ContentService.MimeType.JSON);
    }
    if (payload.inventory) {
      var invSheet = getOrCreateSheet(ss, "Master_Inventory_Stock", ["Batch Code", "Material / Component", "Category", "Supplier", "Received Date", "Available Qty", "Location", "Health"]);
      updateSheetData(invSheet, payload.inventory.map(i => [i.batch, i.material, i.category, i.supplier, i.received, i.available, i.location, i.health]));
    }
    if (payload.production) {
      var prodSheet = getOrCreateSheet(ss, "Production_QC_Builds", ["Build ID", "Model Name", "Operator", "Assembly Date", "QC Status", "Pack Serial", "Status"]);
      updateSheetData(prodSheet, payload.production.map(p => [p.id, p.model, p.operator, p.built, p.qc, p.serial, p.status]));
    }
    if (payload.invoices) {
      var salesSheet = getOrCreateSheet(ss, "Sales_Commercial_Dispatches", ["Invoice No", "Customer / Party Name", "Phone", "Sale Type", "Date", "Taxable Value (INR)", "Grand Total (INR)", "Warranty Status"]);
      updateSheetData(salesSheet, payload.invoices.map(inv => [inv.invoice, inv.party, inv.phone || '', inv.type, inv.date, inv.taxableValue, inv.grandTotal, inv.warrantyStatus || 'Active']));
    }
    if (payload.warranties) {
      var warrSheet = getOrCreateSheet(ss, "Warranty_Coverage_Claims", ["Pack Serial", "Customer Name", "Registration Date", "Expiry Date", "Warranty Status"]);
      updateSheetData(warrSheet, payload.warranties.map(w => [w.pack, w.customer, w.registered, w.end, w.status]));
    }
    return ContentService.createTextOutput(JSON.stringify({ status: 'SUCCESS', message: 'All Records Synced to Client Google Sheet' })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'ERROR', error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#2b6cb0").setFontColor("#ffffff");
  }
  return sheet;
}

function updateSheetData(sheet, dataRows) {
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  }
  if (dataRows && dataRows.length > 0) {
    sheet.getRange(2, 1, dataRows.length, dataRows[0].length).setValues(dataRows);
  }
}`;

function openGoogleSheetsModal() {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(680px, 95%)';

  const sheetId = localStorage.getItem('tejas_sheet_id') || '';
  const webhookUrl = localStorage.getItem('tejas_appscript_url') || '';
  const clientName = localStorage.getItem('tejas_client_account_name') || 'Client Account';
  const isConnected = !!webhookUrl || !!sheetId;

  $('#modal-title').textContent = 'Client Google Sheet Cloud Synchronization Setup';
  $('#modal-fields').innerHTML = `
    <div style="background:${isConnected ? '#f0fff4' : '#fffaf0'};border:1px solid ${isConnected ? '#c6f6d5' : '#fbd38d'};padding:14px;border-radius:8px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <strong style="font-size:14px;color:${isConnected ? '#22543d' : '#9c4221'};">
          ${isConnected ? '🟢 Client Google Sheet Connected & Active' : '🟡 No Client Google Sheet Connected'}
        </strong>
        <div style="font-size:11px;color:${isConnected ? '#2f855a' : '#c05621'};margin-top:2px;">
          ${isConnected ? `Connected Account: <strong>${clientName}</strong> (${sheetId ? 'ID: ' + sheetId.slice(0, 12) + '...' : 'Web App Active'})` : 'Follow the 3-step wizard below to connect any client\'s Google account & sheet on this laptop.'}
        </div>
      </div>
      ${isConnected ? `<button type="button" id="btn-disconnect-client-sheet" style="background:#fff5f5;border:1px solid #feb2b2;color:#e53e3e;padding:6px 12px;font-size:11px;border-radius:6px;font-weight:700;cursor:pointer;">🔴 Disconnect / Switch Account</button>` : ''}
    </div>

    <!-- Step 1 -->
    <div style="background:#fff;border:1px solid #cbd5e1;padding:14px;border-radius:8px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <h4 style="margin:0;font-size:13px;font-weight:800;color:#2b6cb0;">Step 1: Open Client's Google Sheet &amp; Get Sheet URL / ID</h4>
        <a href="https://sheets.google.com/create" target="_blank" class="secondary-btn" style="padding:4px 10px;font-size:11px;background:#ebf8ff;color:#2b6cb0;text-decoration:none;font-weight:700;">1. ↗ Create Sheet in Client's Account</a>
      </div>
      <div class="field">
        <label style="font-weight:700;font-size:11px;">Client Google Sheet URL or Spreadsheet ID *</label>
        <input id="input-client-sheet-url" name="sheetId" value="${sheetId}" placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit" style="font-weight:600;" />
        <small style="color:#64748b;font-size:10px;margin-top:3px;display:block;">Paste the full URL from the client's browser bar. The app will extract the Spreadsheet ID automatically.</small>
      </div>
    </div>

    <!-- Step 2 -->
    <div style="background:#fff;border:1px solid #cbd5e1;padding:14px;border-radius:8px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <h4 style="margin:0;font-size:13px;font-weight:800;color:#2b6cb0;">Step 2: Copy Apps Script Code for Client's Sheet</h4>
        <button type="button" id="btn-copy-script-code" class="primary-btn" style="padding:5px 12px;font-size:11px;background:#2b6cb0;">📋 Copy Apps Script Code</button>
      </div>
      <small style="color:#64748b;font-size:11px;display:block;line-height:1.5;">
        This script auto-creates 4 tab sheets (<code>Master_Inventory_Stock</code>, <code>Production_QC_Builds</code>, <code>Sales_Commercial_Dispatches</code>, <code>Warranty_Coverage_Claims</code>) in the client's Google Sheet.
      </small>
    </div>

    <!-- Step 3 -->
    <div style="background:#fff;border:1px solid #cbd5e1;padding:14px;border-radius:8px;margin-bottom:12px;">
      <h4 style="margin:0 0 8px 0;font-size:13px;font-weight:800;color:#2b6cb0;">Step 3: Deploy as Web App under Client's Google Account</h4>
      <div style="font-size:11px;color:#4a5568;line-height:1.6;background:#f8fafc;padding:10px;border-radius:6px;border:1px solid #e2e8f0;margin-bottom:10px;">
        <strong>Deployment Instructions:</strong><br>
        1. In Client's Google Sheet, click <strong>Extensions ➔ Apps Script</strong>.<br>
        2. Delete existing code, paste the copied code, and click <strong>Save (Ctrl+S)</strong>.<br>
        3. Click <strong>Deploy ➔ New Deployment</strong>.<br>
        4. Click Gear Icon ⚙ ➔ Select <strong>Web app</strong>.<br>
        5. Set <em>Execute as:</em> <strong>Me (client@gmail.com)</strong> &amp; <em>Who has access:</em> <strong>Anyone</strong>.<br>
        6. Click <strong>Deploy</strong>, complete Google authorization, and copy the generated <strong>Web app URL</strong> below:
      </div>
      <div class="field">
        <label style="font-weight:700;font-size:11px;">Client Google Apps Script Web App URL *</label>
        <input id="input-client-webapp-url" name="appScriptUrl" value="${webhookUrl}" placeholder="https://script.google.com/macros/s/AKfycb.../exec" style="font-weight:700;" />
      </div>
    </div>

    <!-- Step 4 -->
    <div style="background:#f1f5f9;padding:12px;border-radius:8px;border:1px solid #cbd5e1;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <label style="font-weight:700;font-size:11px;display:block;">Client Account Name / Note</label>
        <input id="input-client-account-name" name="clientAccountName" value="${clientName}" placeholder="e.g. HK Motors Gorakhpur Branch" style="padding:6px;font-size:11px;width:220px;border:1px solid #cbd5e1;border-radius:4px;" />
      </div>
      <div style="display:flex;gap:8px;">
        <button type="button" id="btn-test-client-sync" class="secondary-btn" style="padding:8px 14px;font-size:12px;background:#ebf8ff;color:#2b6cb0;font-weight:700;border:1px solid #bee3f8;">⚡ Test Connection</button>
      </div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'google-sheets';

  // Event handlers inside modal
  $('#btn-copy-script-code')?.addEventListener('click', () => {
    navigator.clipboard.writeText(CLIENT_APPS_SCRIPT_CODE).then(() => {
      toast('Copied Google Apps Script code to clipboard! Now paste in Client\'s Apps Script window.');
    }).catch(() => {
      toast('Failed to copy automatically. Copy manually from settings.');
    });
  });

  $('#input-client-sheet-url')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const match = val.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      toast(`Extracted Spreadsheet ID: ${match[1]}`);
    }
  });

  $('#btn-test-client-sync')?.addEventListener('click', () => {
    testAndSyncClientGoogleSheet();
  });

  $('#btn-disconnect-client-sheet')?.addEventListener('click', () => {
    if (confirm('Disconnect current client Google Sheet account on this machine?')) {
      localStorage.removeItem('tejas_sheet_id');
      localStorage.removeItem('tejas_appscript_url');
      localStorage.removeItem('tejas_client_account_name');
      toast('Disconnected client Google Sheet. You can now setup a new account.');
      openGoogleSheetsModal();
    }
  });

  setTimeout(() => $('#input-client-sheet-url')?.focus(), 30);
}

function testAndSyncClientGoogleSheet() {
  const rawSheetInput = $('#input-client-sheet-url')?.value || '';
  const webappUrl = $('#input-client-webapp-url')?.value || '';
  const clientName = $('#input-client-account-name')?.value || 'Client Account';

  let sheetId = rawSheetInput;
  const match = rawSheetInput.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) sheetId = match[1];

  if (!webappUrl && !sheetId) {
    toast('Please provide a Client Google Sheet URL or Web App URL first.');
    return;
  }

  localStorage.setItem('tejas_sheet_id', sheetId);
  localStorage.setItem('tejas_appscript_url', webappUrl);
  localStorage.setItem('tejas_client_account_name', clientName);

  toast(`Saved ${clientName} Google Sheet configuration! Live sync active.`);
  closeModal();
  syncToGoogleSheets(true);
}

function openModal(kind) {
  if (kind === 'google-sheets' || kind === 'sheets') {
    openGoogleSheetsModal();
    return;
  }

  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  if (kind === 'activate-warranty' || kind === 'activate-warranty-modal') {
    activateWarrantyModal();
    return;
  }

  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = (kind === 'model' || kind === 'bom-view') ? 'min(680px, 95%)' : 'min(510px, 100%)';

  if (kind === 'component') {
    const schema = modalSchemas.component;
    $('#modal-title').textContent = schema.title;
    $('#modal-fields').innerHTML = `
      <div class="form-grid">
        ${schema.fields.map(f => {
          const [name, label, type, def] = f;
          if (type === 'select') return `<div class="field"><label for="field-${name}">${label}</label><select id="field-${name}" name="${name}">${def.map(v => `<option>${v}</option>`).join('')}</select></div>`;
          return `<div class="field ${type === 'textarea' ? 'full' : ''}"><label for="field-${name}">${label}</label>${type === 'textarea' ? `<textarea id="field-${name}" name="${name}">${def}</textarea>` : `<input id="field-${name}" name="${name}" type="${type}" value="${def}" />`}</div>`;
        }).join('')}
      </div>
    `;
    backdrop.removeAttribute('hidden');
    backdrop.style.display = 'grid';
    backdrop.dataset.kind = 'component';
    setTimeout(() => $('#modal-fields input')?.focus(), 30);
    return;
  }

  if (kind === 'model') {
    const schema = modalSchemas.model;
    $('#modal-title').textContent = schema.title;

    const compRows = state.components.map((c, idx) => `
      <div class="bom-select-row" style="display:grid;grid-template-columns: auto 1fr auto auto;gap:12px;align-items:center;padding:10px 12px;background:#fff;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:6px;">
        <input type="checkbox" name="comp_select" value="${c.id}" id="chk_comp_${idx}" checked style="width:16px;height:16px;cursor:pointer;" />
        <label for="chk_comp_${idx}" style="cursor:pointer;min-width:0;">
          <div style="font-weight:700;font-size:12px;color:#1a202c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.name}</div>
          <div style="font-size:10px;color:#718096;display:flex;gap:6px;align-items:center;margin-top:2px;">
            ${categoryBadge(c.category)}
            <span>${c.spec}</span>
          </div>
        </label>
        <div style="font-weight:700;font-size:12px;color:#2f855a;white-space:nowrap;">${formatINR(c.price)}</div>
        <div style="display:flex;align-items:center;gap:4px;">
          <span style="font-size:10px;color:#718096;">Qty:</span>
          <input type="number" name="comp_qty_${c.id}" value="${c.category === 'Cell' ? 16 : 1}" min="1" class="bom-qty-input" data-price="${c.price}" data-id="${c.id}" style="width:55px;padding:4px 6px;font-size:11px;border:1px solid #cbd5e0;border-radius:4px;" />
        </div>
      </div>
    `).join('');

    $('#modal-fields').innerHTML = `
      <div class="form-grid">
        ${schema.fields.map(f => {
          const [name, label, type, def] = f;
          if (type === 'select') return `<div class="field"><label for="field-${name}">${label}</label><select id="field-${name}" name="${name}">${def.map(v => `<option>${v}</option>`).join('')}</select></div>`;
          return `<div class="field ${type === 'textarea' ? 'full' : ''}"><label for="field-${name}">${label}</label>${type === 'textarea' ? `<textarea id="field-${name}" name="${name}">${def}</textarea>` : `<input id="field-${name}" name="${name}" type="${type}" value="${def}" />`}</div>`;
        }).join('')}
        
        <div class="field">
          <label style="font-weight:700;color:#2b6cb0;">Labour &amp; Making Charges (₹) *</label>
          <input name="making_charges" id="field-making_charges" type="number" step="0.01" value="1500" class="calc-overhead-input" required style="font-weight:700;" />
        </div>

        <div class="field">
          <label style="font-weight:700;color:#2b6cb0;">Electricity &amp; Testing Overheads (₹) *</label>
          <input name="electricity_charges" id="field-electricity_charges" type="number" step="0.01" value="500" class="calc-overhead-input" required style="font-weight:700;" />
        </div>

        <div class="field full" style="margin-top:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <label style="font-weight:800;color:#2d3748;font-size:12px;">Bill of Materials (Attach Master Components)</label>
            <div id="live-bom-cost" style="font-size:11px;font-weight:800;color:#2f855a;background:#f0fff4;padding:4px 10px;border-radius:6px;border:1px solid #c6f6d5;">Estimated Cost: ₹0</div>
          </div>
          <div style="max-height:180px;overflow-y:auto;border:1px solid #cbd5e0;border-radius:8px;padding:8px;background:#f7fafc;">
            ${compRows}
          </div>
        </div>
      </div>
    `;

    backdrop.removeAttribute('hidden');
    backdrop.style.display = 'grid';
    backdrop.dataset.kind = 'model';

    // Live cost calculator function
    const updateLiveCost = () => {
      let total = 0;
      $$('input[name="comp_select"]:checked').forEach(chk => {
        const id = chk.value;
        const qtyEl = $(`input[name="comp_qty_${id}"]`);
        const qty = qtyEl ? Number(qtyEl.value) : 1;
        const price = Number(qtyEl?.dataset.price || 0);
        total += (price * qty);
      });
      const making = Number($('#field-making_charges')?.value || 0);
      const elec = Number($('#field-electricity_charges')?.value || 0);
      const grandUnitCost = total + making + elec;
      const el = $('#live-bom-cost');
      if (el) el.textContent = `Total Unit Cost: ${formatINR(grandUnitCost)} (BOM: ${formatINR(total)} + Labour: ${formatINR(making)} + Elec: ${formatINR(elec)})`;
    };

    updateLiveCost();

    $$('.bom-qty-input, .calc-overhead-input').forEach(inp => inp.addEventListener('input', updateLiveCost));
    $$('input[name="comp_select"]').forEach(chk => chk.addEventListener('change', updateLiveCost));
    return;
  }

  if (kind === 'stock') {
    $('#modal-title').textContent = 'Receive stock batch (Components & Extras)';

    const compOptions = (state.components || []).map(c => `
      <option value="${c.id}">${c.name} (${c.category})</option>
    `).join('');

    const registeredPartyOptions = `
      <optgroup label="Registered Dealers (Master Database)">
        ${(state.dealers || []).map(d => `<option value="${d.name}">${d.name} (${d.gstin || 'Dealer'})</option>`).join('')}
      </optgroup>
      <optgroup label="Registered Suppliers">
        ${(state.suppliers || []).map(s => `<option value="${s.name}">${s.name} (${s.category || 'Supplier'})</option>`).join('')}
      </optgroup>
    `;

    $('#modal-fields').innerHTML = `
      <div class="form-grid">
        <div class="field full">
          <label style="font-weight:700;">Select Item Source</label>
          <select id="stock-item-select" name="item_source" style="padding:10px;font-weight:600;">
            <optgroup label="Master Battery Components (Used in Battery Models)">
              ${compOptions}
            </optgroup>
            <optgroup label="Other / Extra Accessories">
              <option value="CUSTOM">＋ Other / Extra (Charger, Custom Wire, External Display, etc.)</option>
            </optgroup>
          </select>
        </div>
        <div class="field"><label style="font-weight:700;">Supplier Batch Code</label><input name="batch" value="REC-2026-${Date.now().toString().slice(-4)}" required /></div>
        <div class="field"><label style="font-weight:700;">Material / Item Name</label><input id="stock-material-name" name="material" value="${state.components[0]?.name || ''}" required /></div>
        <div class="field"><label style="font-weight:700;">Category / Type</label><input id="stock-category-name" name="category" value="${state.components[0]?.category || 'BMS'}" required /></div>

        <div class="field full" style="background:#f0f9ff;padding:10px;border-radius:6px;border:1px solid #bae6fd;">
          <label style="font-weight:800;color:#0369a1;">Select Registered Dealer or Supplier (Auto Party Ledger Update) *</label>
          <input id="stock-supplier-name" name="supplier" list="stock-party-datalist" placeholder="Type or select Registered Dealer / Supplier..." value="${state.components[0]?.supplier || ((state.dealers || [])[0]?.name || 'Daly Electronics')}" style="font-weight:700;width:100%;padding:7px;border:1px solid #0284c7;border-radius:4px;" required />
          <datalist id="stock-party-datalist">
            ${registeredPartyOptions}
          </datalist>
        </div>

        <div class="field"><label style="font-weight:700;">Quantity Received</label><input name="quantity" type="number" value="50" min="1" required /></div>
        <div class="field"><label style="font-weight:700;">Unit Cost (₹)</label><input id="stock-unit-cost" name="unit_cost" type="number" value="${state.components[0]?.price || 0}" /></div>

        <div class="field"><label style="font-weight:700;">Payment Status / Mode</label>
          <select name="payment_status" style="font-weight:700;">
            <option value="Unpaid">On Credit Ledger (Unpaid)</option>
            <option value="Paid">Paid via Bank A/C</option>
          </select>
        </div>

        <div class="field"><label style="font-weight:700;">Paying Bank Account</label>
          <select name="bankAccount" style="font-weight:700;">
            <option value="HDFC Bank Current A/C (50200012345678)">HDFC Bank — Current A/C (50200012345678)</option>
            <option value="ICICI Bank Business A/C (001105001234)">ICICI Bank — Business A/C (001105001234)</option>
            <option value="SBI Corporate A/C (30981234567)">SBI — Corporate A/C (30981234567)</option>
            <option value="UPI / PhonePe / GPay">UPI / PhonePe / GPay</option>
            <option value="Cash in Hand">Cash in Hand</option>
          </select>
        </div>

        <div class="field"><label style="font-weight:700;">Storage Location</label><input name="location" value="Main workshop" required /></div>
        <div class="field full"><label style="font-weight:700;">Document Reference / PO</label><input name="document" value="PO-2026-042" /></div>
      </div>
    `;

    backdrop.removeAttribute('hidden');
    backdrop.style.display = 'grid';
    backdrop.dataset.kind = 'stock';

    const itemSelect = $('#stock-item-select');
    itemSelect?.addEventListener('change', () => {
      if (itemSelect.value === 'CUSTOM') {
        $('#stock-material-name').value = '58.4V 10A Fast Battery Charger';
        $('#stock-category-name').value = 'Charger / Extra';
        $('#stock-supplier-name').value = 'PowerTech India';
        $('#stock-unit-cost').value = '2500';
      } else {
        const comp = state.components.find(c => c.id === itemSelect.value);
        if (comp) {
          $('#stock-material-name').value = comp.name;
          $('#stock-category-name').value = comp.category;
          $('#stock-supplier-name').value = comp.supplier;
          $('#stock-unit-cost').value = comp.price;
        }
      }
    });

    setTimeout(() => $('#modal-fields input')?.focus(), 30);
    return;
  }

  if (kind === 'sale') {
    $('#modal-title').textContent = 'Create Tax Invoice & Record Sale (Multi-Item & Price Customization)';
    const modalEl = $('.modal');
    if (modalEl) {
      modalEl.style.width = 'min(860px, 94vw)';
      modalEl.style.height = '82vh';
      modalEl.style.maxHeight = '720px';
      modalEl.style.display = 'flex';
      modalEl.style.flexDirection = 'column';
    }

    const modalForm = $('#modal-form');
    if (modalForm) {
      modalForm.style.display = 'flex';
      modalForm.style.flexDirection = 'column';
      modalForm.style.height = 'calc(100% - 50px)';
      modalForm.style.overflow = 'hidden';
    }

    const modalFields = $('#modal-fields');
    if (modalFields) {
      modalFields.style.flex = '1 1 auto';
      modalFields.style.overflowY = 'scroll';
      modalFields.style.padding = '16px 20px';
      modalFields.style.maxHeight = 'calc(82vh - 120px)';
    }

    const readyBatteryPacks = state.production.filter(p => 
      (p.status === 'Saleable' || p.status === 'Dealer stock' || p.qc === 'Passed') &&
      !state.sales.some(s => s.pack === p.serial || s.pack === p.id)
    );

    const packOptsHtml = readyBatteryPacks.length > 0
      ? readyBatteryPacks.map(p => {
          const serial = p.serial === '—' ? p.id : p.serial;
          return `<option value="${serial}" data-model="${p.model}" data-hsn="87116020" data-price="65000">${p.model} (${serial})</option>`;
        }).join('')
      : '<option value="">No ready battery packs available in stock</option>';

    const chargerStock = state.inventory.filter(i => 
      String(i.material || '').toLowerCase().includes('charger') || String(i.category || '').toLowerCase().includes('charger')
    );
    const chargerOptsHtml = chargerStock.length > 0
      ? chargerStock.map(c => `<option value="${c.material}" data-hsn="85044090" data-price="2500">${c.material} (${c.available})</option>`).join('')
      : '<option value="58.4V 10A Fast Battery Charger" data-hsn="85044090" data-price="2500">58.4V 10A Fast Battery Charger</option>';

    const registeredDealers = state.dealers || [];
    const existingPartiesList = Array.from(new Set([
      ...registeredDealers.map(d => d.name),
      ...(state.invoices || []).map(i => i.party),
      ...(state.sales || []).map(s => s.party),
      ...(state.ledger || []).map(l => l.party)
    ])).filter(Boolean);

    const partyDatalistHtml = existingPartiesList.map(p => `<option value="${p}">`).join('');

    $('#modal-fields').innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;background:#f8fafc;padding:14px;border-radius:8px;border:1px solid #e2e8f0;">
        <div class="field" style="grid-column: span 2;">
          <label style="font-weight:800;color:#2b6cb0;">Customer / Dealer Name * (Searchable Combobox)</label>
          <input name="party" id="sale-party-name-input" list="dealer-parties-datalist" placeholder="🔍 Type to search registered dealer or customer name..." required style="font-weight:700;font-size:13px;padding:9px;border:1px solid #2b6cb0;background:#ebf8ff;" />
          <datalist id="dealer-parties-datalist">
            ${partyDatalistHtml}
          </datalist>
          <small style="color:#2b6cb0;display:block;margin-top:4px;">💡 Search registered dealers &amp; past parties — contact, state &amp; address auto-fill to prevent duplicate ledgers.</small>
        </div>
        <div class="field"><label>S/o (Father's / Contact Name)</label><input name="fatherName" id="sale-father-input" placeholder="e.g. Contact Person / Father's Name" /></div>
        <div class="field"><label>Mobile Number</label><input name="phone" id="sale-phone-input" placeholder="e.g. 9876543210" /></div>
        <div class="field"><label>Address</label><input name="address" id="sale-address-input" placeholder="Full Address" /></div>
        <div class="field"><label>Customer State / Place of Supply</label><input name="customerState" id="sale-state-input" placeholder="e.g. UTTAR PRADESH" /></div>
        <div class="field"><label>Vehicle / Ref Number (Optional)</label><input name="vehicle" placeholder="e.g. UP-53-EV-1024" /></div>
        <div class="field" style="grid-column: span 2;"><label style="font-weight:700;">Sale Path &amp; Auto Warranty Rule *</label>
          <select name="type" id="sale-type-select" style="font-weight:700;">
            <option value="Retail">Direct Retail (Same Day Auto Warranty Activation)</option>
            <option value="Dealer">Dealer Stock (1 Month Auto Warranty Activation)</option>
          </select>
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <h3 style="font-size:14px;font-weight:800;margin:0;">Invoice Line Items (Batteries, Chargers, Accessories)</h3>
          <button type="button" class="secondary-btn" id="btn-add-invoice-item" style="padding:5px 12px;font-size:12px;background:#edf2f7;color:#2b6cb0;font-weight:700;">＋ Add Item to Invoice</button>
        </div>
        <div id="invoice-items-container" style="display:flex;flex-direction:column;gap:10px;">
          <!-- Item rows inserted dynamically -->
        </div>
      </div>

      <div style="background:#f1f5f9;padding:14px;border-radius:8px;border:1px solid #cbd5e1;display:grid;grid-template-columns: 1fr 1fr;gap:14px;font-size:12px;">
        <div>
          <div><strong>Tax Calculation Summary (Item-wise GST)</strong></div>
          <div style="display:flex;justify-content:space-between;margin-top:4px;"><span>Taxable Value:</span><strong id="live-taxable">₹ 0.00</strong></div>
          <div style="display:flex;justify-content:space-between;"><span>Total GST:</span><span id="live-total-gst">₹ 0.00</span></div>
          <div style="display:flex;justify-content:space-between;"><span>CGST:</span><span id="live-cgst">₹ 0.00</span></div>
          <div style="display:flex;justify-content:space-between;"><span>SGST:</span><span id="live-sgst">₹ 0.00</span></div>
          <div style="display:flex;justify-content:space-between;"><span>IGST:</span><span id="live-igst">₹ 0.00</span></div>
          <div style="display:flex;justify-content:space-between;font-weight:800;font-size:15px;border-top:1px solid #cbd5e1;padding-top:4px;margin-top:4px;">
            <span>Grand Total:</span><span id="live-grand-total" style="color:#1769AA;">₹ 0.00</span>
          </div>
          <div style="font-size:10px;color:#64748b;margin-top:4px;" id="live-amount-words">ZERO ONLY</div>
        </div>
        <div>
          <div class="field"><label style="font-weight:700;">Upfront Payment Received (₹)</label><input name="paid_amount" id="input-paid-amount" type="number" step="0.01" value="0" style="font-weight:700;" /></div>
          <small style="color:#64748b;display:block;margin-top:4px;">Unpaid balance will post as outstanding debit on Party Ledger.</small>
        </div>
      </div>
    `;

    backdrop.removeAttribute('hidden');
    backdrop.style.display = 'flex';
    backdrop.style.alignItems = 'center';
    backdrop.style.justifyContent = 'center';
    backdrop.dataset.kind = 'sale';

    $('#sale-party-name-input')?.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (!val) return;

      const fatherInput = $('#sale-father-input');
      const phoneInput = $('#sale-phone-input');
      const addressInput = $('#sale-address-input');
      const stateInput = $('#sale-state-input');
      const typeSelect = $('#sale-type-select');

      const dealer = (state.dealers || []).find(d => normalizeText(d.name) === normalizeText(val));
      if (dealer) {
        if (fatherInput) fatherInput.value = dealer.contactPerson || '';
        if (phoneInput) phoneInput.value = dealer.phone || '';
        if (addressInput) addressInput.value = `${dealer.address || ''}, ${dealer.city || ''}`.replace(/^,\s*/, '');
        if (stateInput) stateInput.value = dealer.state || 'UTTAR PRADESH';
        if (typeSelect) typeSelect.value = 'Dealer';
      } else {
        const prevInv = (state.invoices || []).find(i => normalizeText(i.party) === normalizeText(val));
        if (prevInv) {
          if (fatherInput && !fatherInput.value) fatherInput.value = prevInv.fatherName || '';
          if (phoneInput && !phoneInput.value) phoneInput.value = prevInv.phone || '';
          if (addressInput && !addressInput.value) addressInput.value = prevInv.address || '';
          if (stateInput && !stateInput.value) stateInput.value = prevInv.partyState || 'UTTAR PRADESH';
        }
      }

      recalculateTotals();
    });

    let itemCount = 0;
    const salePartyInput = () => $('#modal-fields input[name="party"]');
    const saleStateInput = () => $('#modal-fields input[name="customerState"]');
    const saleTypeSelect = () => $('#sale-type-select');

    function syncPlaceOfSupplyField() {
      const partyName = salePartyInput()?.value || '';
      const stateInput = saleStateInput();
      if (!stateInput) return;
      const derivedState = getInvoicePartyState(partyName, stateInput.value, saleTypeSelect()?.value || 'Retail');
      const currentState = normalizeText(stateInput.value);
      const companyState = normalizeText(getCompanyJurisdiction());
      const dealerState = normalizeText(getPartyStateByName(partyName));
      if (!currentState || currentState === companyState || (dealerState && currentState === dealerState)) {
        stateInput.value = derivedState;
      }
    }

      function renderItemRowHtml(index) {
      const settings = getSystemSettings();
      const batteryHsn = String(settings.hsnBattery || '87116020').trim();
      const batteryRate = Number(settings.gstRate || 5);
      return `
        <div class="invoice-item-row" data-row-idx="${index}" style="background:#fff;border:1px solid #cbd5e1;padding:10px 12px;border-radius:8px;box-sizing:border-box;width:100%;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #e2e8f0;">
            <span style="font-size:11px;font-weight:800;color:#2b6cb0;">Line Item #${index + 1}</span>
            ${index > 0 ? `<button type="button" class="btn-remove-item-row" data-row="${index}" style="background:#fff0f0;border:1px solid #feb2b2;color:#e53e3e;border-radius:4px;padding:2px 8px;font-size:11px;cursor:pointer;font-weight:700;">✕ Remove Item</button>` : ''}
          </div>

          <div style="display:grid;grid-template-columns: 1.2fr 1.6fr 1fr 0.65fr 1.1fr;gap:8px;margin-bottom:8px;align-items:end;width:100%;box-sizing:border-box;">
            <div style="min-width:0;">
              <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Item Category *</label>
              <select name="item_cat_${index}" class="item-cat-select" data-row="${index}" style="width:100%;box-sizing:border-box;padding:6px;font-size:11px;font-weight:700;">
                <option value="battery">Ready Battery Pack (From Stock)</option>
                <option value="charger">Battery Charger (From Stock)</option>
                <option value="accessory">Accessory / Component</option>
                <option value="custom">Custom / Manual Item</option>
              </select>
            </div>

            <div id="item-picker-wrap-${index}" style="min-width:0;">
              <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Select Ready Pack from Stock *</label>
              <select name="item_select_${index}" class="item-stock-select" data-row="${index}" style="width:100%;box-sizing:border-box;padding:6px;font-size:11px;font-weight:700;">
                <option value="">-- Select Ready Battery Pack --</option>
                ${packOptsHtml}
              </select>
            </div>

            <div style="min-width:0;">
              <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">HSN Code</label>
              <input name="item_hsn_${index}" value="${batteryHsn}" class="item-hsn-input" id="item_hsn_${index}" style="width:100%;box-sizing:border-box;padding:6px;font-size:11px;margin-bottom:6px;" />
              <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">GST %</label>
              <input name="item_gst_${index}" type="number" step="0.01" value="${batteryRate}" class="calc-gst-input" data-row="${index}" style="width:100%;box-sizing:border-box;padding:6px;font-size:11px;font-weight:700;text-align:center;border:1px solid #cbd5e1;border-radius:4px;background:#fff7ed;" />
            </div>

            <div id="qty-wrap-${index}" style="min-width:0;">
              <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;" title="Unique battery packs have Qty fixed to 1">Qty <small style="font-size:9px;color:#718096;">(Fixed 1)</small></label>
              <input name="item_qty_${index}" type="number" value="1" readonly class="calc-qty-input" data-row="${index}" style="width:100%;box-sizing:border-box;padding:6px;font-size:12px;font-weight:700;text-align:center;background:#edf2f7;color:#4a5568;border:1px solid #cbd5e1;cursor:not-allowed;" title="Each battery pack has a unique serial number so Quantity is fixed to 1." />
            </div>

            <div style="min-width:0;">
              <label style="font-size:11px;font-weight:700;color:#2b6cb0;display:block;margin-bottom:4px;">Unit Price (Editable) ₹ *</label>
              <input name="item_price_${index}" type="number" step="0.01" value="0" class="calc-price-input" data-row="${index}" required style="width:100%;box-sizing:border-box;padding:6px;font-size:12px;font-weight:800;border:1px solid #3182ce;background:#f0f9ff;" />
            </div>
          </div>

          <div style="display:grid;grid-template-columns: 2fr 1fr;gap:8px;width:100%;box-sizing:border-box;">
            <div style="min-width:0;">
              <input name="item_desc_${index}" id="item_desc_${index}" placeholder="Item Description / Model Name *" required style="width:100%;box-sizing:border-box;padding:6px;font-size:11px;" />
            </div>
            <div style="min-width:0;">
              <input name="item_serial_${index}" id="item_serial_${index}" placeholder="Serial No. / Notes (Optional)" style="width:100%;box-sizing:border-box;padding:6px;font-size:11px;" />
            </div>
          </div>
        </div>
      `;
    }

    function addInvoiceItemRow() {
      const idx = itemCount++;
      const container = $('#invoice-items-container');
      const div = document.createElement('div');
      div.innerHTML = renderItemRowHtml(idx);
      container.appendChild(div.firstElementChild);

      const rowEl = container.querySelector(`[data-row-idx="${idx}"]`);
      if (!rowEl) return;

      // Event listener for Category change
      const catSelect = rowEl.querySelector('.item-cat-select');
      const pickerWrap = rowEl.querySelector(`#item-picker-wrap-${idx}`);
      const qtyWrap = rowEl.querySelector(`#qty-wrap-${idx}`);
      const gstInput = rowEl.querySelector(`[name="item_gst_${idx}"]`);

      catSelect?.addEventListener('change', (e) => {
        const cat = e.target.value;
        if (cat === 'battery') {
          pickerWrap.innerHTML = `
            <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Select Ready Pack from Stock *</label>
            <select name="item_select_${idx}" class="item-stock-select" data-row="${idx}" style="width:100%;box-sizing:border-box;padding:6px;font-size:11px;font-weight:700;">
              <option value="">-- Select Ready Battery Pack --</option>
              ${packOptsHtml}
            </select>
          `;
          rowEl.querySelector(`#item_hsn_${idx}`).value = String(getSystemSettings().hsnBattery || '87116020').trim();
          if (gstInput) gstInput.value = String(Number(getSystemSettings().gstRate || 5));
          qtyWrap.innerHTML = `
            <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Qty <small style="font-size:9px;color:#718096;">(Fixed 1)</small></label>
            <input name="item_qty_${idx}" type="number" value="1" readonly class="calc-qty-input" data-row="${idx}" style="width:100%;box-sizing:border-box;padding:6px;font-size:12px;font-weight:700;text-align:center;background:#edf2f7;color:#4a5568;border:1px solid #cbd5e1;cursor:not-allowed;" title="Unique battery pack: Qty locked to 1 per row" />
          `;
        } else if (cat === 'charger') {
          pickerWrap.innerHTML = `
            <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Select Charger from Stock *</label>
            <select name="item_select_${idx}" class="item-charger-select" data-row="${idx}" style="width:100%;box-sizing:border-box;padding:6px;font-size:11px;font-weight:700;">
              <option value="">-- Select Battery Charger --</option>
              ${chargerOptsHtml}
            </select>
          `;
          rowEl.querySelector(`#item_hsn_${idx}`).value = String(getSystemSettings().hsnCharger || '85044090').trim();
          if (gstInput) gstInput.value = '18';
          qtyWrap.innerHTML = `
            <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Qty *</label>
            <input name="item_qty_${idx}" type="number" value="1" min="1" class="calc-qty-input" data-row="${idx}" style="width:100%;box-sizing:border-box;padding:6px;font-size:12px;font-weight:700;text-align:center;border:1px solid #cbd5e1;" />
          `;
        } else {
          pickerWrap.innerHTML = `<label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Category Type</label><div style="font-size:11px;color:#64748b;padding:6px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:4px;">${cat === 'accessory' ? 'Accessory Item' : 'Custom Object'}</div>`;
          rowEl.querySelector(`#item_hsn_${idx}`).value = cat === 'accessory'
            ? String(getSystemSettings().hsnCharger || '85044090').trim()
            : '9987';
          if (gstInput) gstInput.value = '18';
          qtyWrap.innerHTML = `
            <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px;">Qty *</label>
            <input name="item_qty_${idx}" type="number" value="1" min="1" class="calc-qty-input" data-row="${idx}" style="width:100%;box-sizing:border-box;padding:6px;font-size:12px;font-weight:700;text-align:center;border:1px solid #cbd5e1;" />
          `;
        }
        bindRowSelectEvents(rowEl, idx);
        recalculateTotals();
      });

      bindRowSelectEvents(rowEl, idx);

      rowEl.querySelector('.btn-remove-item-row')?.addEventListener('click', () => {
        rowEl.remove();
        recalculateTotals();
      });
    }

    function bindRowSelectEvents(rowEl, idx) {
      const stockSelect = rowEl.querySelector('.item-stock-select');
      stockSelect?.addEventListener('change', (e) => {
        const serial = e.target.value;
        const pack = readyBatteryPacks.find(p => p.serial === serial || p.id === serial);
        if (pack) {
          rowEl.querySelector(`#item_desc_${idx}`).value = pack.model;
          rowEl.querySelector(`#item_serial_${idx}`).value = serial;
          rowEl.querySelector(`#item_hsn_${idx}`).value = '87116020';
          const priceInput = rowEl.querySelector(`[name="item_price_${idx}"]`);
          if (priceInput) priceInput.value = '65000.00';
          if (gstInput) gstInput.value = String(Number(getSystemSettings().gstRate || 5));
          recalculateTotals();
        }
      });

      const chargerSelect = rowEl.querySelector('.item-charger-select');
      chargerSelect?.addEventListener('change', (e) => {
        const mat = e.target.value;
        if (mat) {
          rowEl.querySelector(`#item_desc_${idx}`).value = mat;
          rowEl.querySelector(`#item_serial_${idx}`).value = 'CHG-' + Date.now().toString().slice(-4);
          rowEl.querySelector(`#item_hsn_${idx}`).value = String(getSystemSettings().hsnCharger || '85044090').trim();
          const priceInput = rowEl.querySelector(`[name="item_price_${idx}"]`);
          if (priceInput) priceInput.value = '2500.00';
          if (gstInput) gstInput.value = '18';
          recalculateTotals();
        }
      });
    }

    function recalculateTotals() {
      syncPlaceOfSupplyField();
      let taxable = 0;
      let totalGst = 0;
      const partyName = salePartyInput()?.value || '';
      const partyState = saleStateInput()?.value || '';
      const taxMode = isInterstateSupply(partyName, partyState) ? 'IGST' : 'INTRA';
      $$('.calc-price-input').forEach(inp => {
        const row = inp.dataset.row;
        const qtyInp = $(`[name="item_qty_${row}"]`);
        const gstInp = $(`[name="item_gst_${row}"]`);
        const qty = Number(qtyInp?.value || 1);
        const price = Number(inp.value || 0);
        const lineTaxable = roundMoney(qty * price);
        const gstRate = Number(gstInp?.value || defaultGstRateForItem({ hsn: $(`[name="item_hsn_${row}"]`)?.value, desc: $(`#item_desc_${row}`)?.value }, $('#sale-type-select')?.value));
        taxable += lineTaxable;
        totalGst += roundMoney(lineTaxable * gstRate / 100);
      });

      const cgst = taxMode === 'IGST' ? 0 : roundMoney(totalGst / 2);
      const sgst = taxMode === 'IGST' ? 0 : roundMoney(totalGst - cgst);
      const igst = taxMode === 'IGST' ? totalGst : 0;
      const grandTotal = roundMoney(taxable + totalGst);

      if ($('#live-taxable')) $('#live-taxable').textContent = `₹ ${taxable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
      if ($('#live-total-gst')) $('#live-total-gst').textContent = `₹ ${totalGst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
      if ($('#live-cgst')) $('#live-cgst').textContent = `₹ ${cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
      if ($('#live-sgst')) $('#live-sgst').textContent = `₹ ${sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
      if ($('#live-igst')) $('#live-igst').textContent = `₹ ${igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
      if ($('#live-grand-total')) $('#live-grand-total').textContent = `₹ ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
      if ($('#live-amount-words')) $('#live-amount-words').textContent = numberToWords(grandTotal);

      const paidInput = $('#input-paid-amount');
      if (paidInput && Number(paidInput.value) === 0) {
        paidInput.value = grandTotal;
      }
    }

    $('#modal-fields').addEventListener('input', (e) => {
      if (e.target.classList.contains('calc-price-input') || e.target.classList.contains('calc-qty-input') || e.target.classList.contains('calc-gst-input')) {
        recalculateTotals();
      }
    });

    salePartyInput()?.addEventListener('input', syncPlaceOfSupplyField);
    salePartyInput()?.addEventListener('change', syncPlaceOfSupplyField);
    saleStateInput()?.addEventListener('input', recalculateTotals);
    saleStateInput()?.addEventListener('change', recalculateTotals);
    saleTypeSelect()?.addEventListener('change', () => {
      syncPlaceOfSupplyField();
      recalculateTotals();
    });

    $('#btn-add-invoice-item')?.addEventListener('click', addInvoiceItemRow);

    // Add first clean item row
    syncPlaceOfSupplyField();
    addInvoiceItemRow();
    setTimeout(() => $('#modal-fields input[name="party"]')?.focus(), 30);
    return;
  }

  const schema = modalSchemas[kind];
  if (!schema) return;
  $('#modal-title').textContent = schema.title;
  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      ${schema.fields.map(f => {
        const [name, label, type, def] = f;
        if (type === 'select') return `<div class="field"><label for="field-${name}">${label}</label><select id="field-${name}" name="${name}">${def.map(v => `<option>${v}</option>`).join('')}</select></div>`;
        return `<div class="field ${type === 'textarea' ? 'full' : ''}"><label for="field-${name}">${label}</label>${type === 'textarea' ? `<textarea id="field-${name}" name="${name}">${def}</textarea>` : `<input id="field-${name}" name="${name}" type="${type}" value="${def}" />`}</div>`;
      }).join('')}
    </div>
  `;
  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = kind;
  setTimeout(() => $('#modal-fields input, #modal-fields select, #modal-fields textarea')?.focus(), 30);
}

function closeModal() {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;
  backdrop.setAttribute('hidden', 'true');
  backdrop.style.display = 'none';
  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(510px, 100%)';
}

function submitModal(e) {
  e.preventDefault();
  const kind = $('#modal-backdrop').dataset.kind;

  if (kind === 'bom-view') {
    closeModal();
    return;
  }

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  if (kind === 'edit-comp-gst') {
    const idx = Number(data.compIdx);
    if (state.inventory[idx]) {
      state.inventory[idx].hsn = data.hsn;
      state.inventory[idx].gstRate = Number(data.gstRate);
      state.inventory[idx].unitPrice = Number(data.unitPrice || 0);
      render();
      toast(`🏷️ Updated HSN (${data.hsn}) & GST Rate (${data.gstRate}%) for ${state.inventory[idx].material}`);
      closeModal();
    }
    return;
  }

  if (kind === 'repair-invoice') {
    const claimIdx = Number(data.claimIdx);
    const claim = (state.claims || [])[claimIdx];
    const party = data.party || 'Walk-in Repair Customer';
    const paidAmount = Number(data.paid_amount || 0);
    const customerState = data.customerState || 'UTTAR PRADESH';

    const itemDescs = formData.getAll('item_desc[]');
    const itemHsns = formData.getAll('item_hsn[]');
    const itemGsts = formData.getAll('item_gst[]');
    const itemPrices = formData.getAll('item_price[]');
    const itemQtys = formData.getAll('item_qty[]');

    let taxableValue = 0;
    let totalGst = 0;

    const items = itemDescs.map((desc, i) => {
      const price = Number(itemPrices[i] || 0);
      const qty = Number(itemQtys[i] || 1);
      const gstRate = Number(itemGsts[i] || 18);
      const amount = price * qty;
      const gstAmount = amount * gstRate / 100;

      taxableValue += amount;
      totalGst += gstAmount;

      return {
        description: desc || 'Repair Component',
        hsn: itemHsns[i] || '85044090',
        qty,
        unitPrice: price,
        amount,
        gstRate,
        gstAmount
      };
    });

    const grandTotal = Math.round(taxableValue + totalGst);
    const invNo = nextInvoiceNumber();

    const newInvoice = {
      invoice: invNo,
      party,
      fatherName: data.fatherName || '',
      phone: data.phone || '',
      address: data.address || '',
      partyState: customerState,
      type: (state.dealers || []).some(d => normalizeText(d.name) === normalizeText(party)) ? 'Dealer' : 'Retail',
      date: new Date().toISOString().split('T')[0],
      items,
      taxableValue,
      cgstRate: 9,
      cgstAmount: totalGst / 2,
      sgstRate: 9,
      sgstAmount: totalGst / 2,
      grandTotal,
      amountInWords: numberToWords(grandTotal),
      paidAmount,
      balanceAmount: grandTotal - paidAmount,
      warrantyStatus: 'Warranty Repair Service'
    };

    state.invoices.unshift(newInvoice);

    // Ledger posting
    state.ledger.push({
      id: 'LEDG-' + String(state.ledger.length + 1).padStart(3, '0'),
      date: new Date().toISOString().split('T')[0],
      party,
      partyType: newInvoice.type,
      ref: invNo,
      desc: `Repair Tax Invoice ${invNo} (${claim ? claim.pack : 'Battery Pack Repair'})`,
      debit: grandTotal,
      credit: 0,
      balance: grandTotal
    });

    if (paidAmount > 0) {
      state.ledger.push({
        id: 'LEDG-' + String(state.ledger.length + 1).padStart(3, '0'),
        date: new Date().toISOString().split('T')[0],
        party,
        partyType: newInvoice.type,
        ref: 'PAY-' + invNo,
        desc: `Upfront Repair Payment Received`,
        debit: 0,
        credit: paidAmount,
        balance: grandTotal - paidAmount
      });
    }

    if (claim) {
      claim.repairInvoice = invNo;
      claim.status = 'Resolved';
      claim.outcome = 'Repaired & Billed (' + invNo + ')';
    }

    render();
    closeModal();
    toast(`🧾 Generated Repair Invoice ${invNo} (${paidAmount >= grandTotal ? 'Paid' : 'Posted to Ledger'})`);
    return;
  }

  // RBAC Permission Guard for Catalog & System Config changes
  if (['component', 'edit-component', 'model', 'edit-model'].includes(kind)) {
    if (!isUserAdmin()) {
      toast('Access Denied: Catalog modifications require Administrator role.');
      closeModal();
      return;
    }
  }

  if (kind === 'component') {
    const newId = 'CMP-' + String(state.components.length + 1).padStart(3, '0');
    state.components.unshift({
      id: newId,
      name: data.name,
      category: data.category,
      spec: data.spec,
      price: Number(data.price),
      supplier: data.supplier
    });
    render();
    toast(`Added ${data.name} to Master Component Catalog`);
  }

  if (kind === 'edit-component') {
    const idx = Number(data.compIdx);
    if (state.components[idx]) {
      state.components[idx].name = data.name;
      state.components[idx].category = data.category;
      state.components[idx].price = Number(data.price);
      state.components[idx].spec = data.spec;
      state.components[idx].supplier = data.supplier;
      render();
      toast(`Updated component: ${data.name}`);
    }
  }

  if (kind === 'edit-model') {
    const idx = Number(data.modelIdx);
    if (state.models[idx]) {
      const selectedCompIds = formData.getAll('comp_select');
      const bomItems = selectedCompIds.map(id => {
        const comp = state.components.find(c => c.id === id);
        const qty = Number(data[`comp_qty_${id}`] || 1);
        return comp ? { componentId: comp.id, name: comp.name, category: comp.category, qty, unitPrice: comp.price } : null;
      }).filter(Boolean);

      state.models[idx].name = data.name;
      state.models[idx].chemistry = data.chemistry;
      state.models[idx].config = data.config;
      state.models[idx].capacity = data.capacity;
      state.models[idx].warranty = data.warranty;
      state.models[idx].status = data.status;
      state.models[idx].bom = bomItems;

      render();
      showView('models');
      toast(`Updated battery model: ${data.name}`);
    }
  }

  if (kind === 'model') {
    const selectedCompIds = formData.getAll('comp_select');
    const bomItems = selectedCompIds.map(id => {
      const comp = state.components.find(c => c.id === id);
      const qty = Number(data[`comp_qty_${id}`] || 1);
      return comp ? { componentId: comp.id, name: comp.name, category: comp.category, qty, unitPrice: comp.price } : null;
    }).filter(Boolean);

    state.models.unshift({
      name: data.name,
      chemistry: data.chemistry,
      config: data.config,
      capacity: data.capacity,
      warranty: data.warranty,
      status: data.status,
      bom: bomItems
    });
    render();
    showView('models');
    toast(`Battery model ${data.name} created with ${bomItems.length} BOM components`);
  }

  if (kind === 'stock') {
    const todayStr = new Date().toISOString().split('T')[0];
    const qty = Number(data.quantity || 1);
    const unitPrice = Number(data.unit_cost || 0);
    const totalPurchaseAmt = qty * unitPrice;
    const suppName = data.supplier || 'General Vendor';
    const bankAccount = data.bankAccount || 'HDFC Bank Current A/C (50200012345678)';
    const isPaid = data.payment_status === 'Paid';

    state.inventory.unshift({
      batch: data.batch,
      material: data.material,
      category: data.category || 'Component',
      supplier: suppName,
      received: todayStr,
      available: `${qty} / ${qty}`,
      location: data.location,
      health: 'Good',
      unitPrice
    });

    if (totalPurchaseAmt > 0) {
      // 1. Post to Supplier Purchase Ledger
      if (!state.supplierLedger) state.supplierLedger = [];
      let suppCredit = 0;
      let suppDebit = 0;
      state.supplierLedger.filter(l => normalizeText(l.supplier) === normalizeText(suppName)).forEach(l => {
        suppCredit += (l.credit || 0);
        suppDebit += (l.debit || 0);
      });
      const currentSuppBal = suppCredit - suppDebit;

      state.supplierLedger.unshift({
        id: 'SLEDG-' + Date.now().toString().slice(-4),
        date: todayStr,
        supplier: suppName,
        ref: data.batch || ('BILL-' + Date.now().toString().slice(-4)),
        desc: `Stock Purchase Bill: ${data.material} (Qty: ${qty} @ ₹${unitPrice})`,
        debit: 0,
        credit: totalPurchaseAmt,
        balance: currentSuppBal + totalPurchaseAmt,
        bankAccount
      });

      if (isPaid) {
        state.supplierLedger.unshift({
          id: 'SLEDG-PAY-' + Date.now().toString().slice(-4),
          date: todayStr,
          supplier: suppName,
          ref: 'PAY-' + (data.batch || Date.now().toString().slice(-4)),
          desc: `Stock Receipt Payment via ${bankAccount}`,
          debit: totalPurchaseAmt,
          credit: 0,
          balance: currentSuppBal,
          bankAccount
        });
      }

      // 2. Post to Main Party / Dealer Ledger (state.ledger) so Dealer / Customer Statement is updated automatically!
      if (!state.ledger) state.ledger = [];
      const isDealer = (state.dealers || []).some(d => normalizeText(d.name) === normalizeText(suppName));

      let partyDebit = 0;
      let partyCredit = 0;
      state.ledger.filter(l => normalizeText(l.party) === normalizeText(suppName)).forEach(l => {
        partyDebit += (l.debit || 0);
        partyCredit += (l.credit || 0);
      });

      // Stock purchase from party creates credit entry in party ledger
      state.ledger.push({
        id: 'LEDG-STK-' + Date.now().toString().slice(-4),
        date: todayStr,
        party: suppName,
        partyType: isDealer ? 'Dealer' : 'Supplier/Vendor',
        ref: data.batch || ('REC-' + Date.now().toString().slice(-4)),
        desc: `Stock Received: ${data.material} (${qty} units @ ₹${unitPrice})`,
        debit: 0,
        credit: totalPurchaseAmt,
        balance: (partyDebit - partyCredit) - totalPurchaseAmt,
        bankAccount
      });

      if (isPaid) {
        state.ledger.push({
          id: 'LEDG-STK-PAY-' + Date.now().toString().slice(-4),
          date: todayStr,
          party: suppName,
          partyType: isDealer ? 'Dealer' : 'Supplier/Vendor',
          ref: 'PAY-' + (data.batch || Date.now().toString().slice(-4)),
          desc: `Stock Receipt Payment Made via ${bankAccount}`,
          debit: totalPurchaseAmt,
          credit: 0,
          balance: (partyDebit - partyCredit),
          bankAccount
        });
      }
    }

    saveState();
    render();
    showView('inventory');
    toast(`Stock receipt ${data.batch} logged (${formatINR(totalPurchaseAmt)} automatically posted to ${suppName} Party Ledger)`);
  }

  if (kind === 'supplier') {
    const newSupp = {
      id: `SUPP-00${(state.suppliers || []).length + 1}`,
      name: data.name,
      contactPerson: data.contactPerson || '',
      phone: data.phone || '',
      gstin: data.gstin || '',
      address: data.address || '',
      state: data.state || 'UTTAR PRADESH',
      category: data.category || 'General Component Supplier'
    };
    if (!state.suppliers) state.suppliers = [];
    state.suppliers.unshift(newSupp);
    saveState();
    render();
    showView('purchase-ledger');
    toast(`Registered new Supplier Master Account: ${newSupp.name}`);
  }

  if (kind === 'supplier-pay') {
    const suppName = data.supplier;
    const amount = Number(data.amount || 0);
    const bankAcc = data.bankAccount || 'HDFC Bank Current A/C (50200012345678)';
    const dateStr = data.date || new Date().toISOString().split('T')[0];

    if (!state.supplierLedger) state.supplierLedger = [];

    let totalCredit = 0;
    let totalDebit = 0;
    state.supplierLedger.filter(l => normalizeText(l.supplier) === normalizeText(suppName)).forEach(l => {
      totalCredit += (l.credit || 0);
      totalDebit += (l.debit || 0);
    });
    const currentBal = totalCredit - totalDebit;
    const newBal = currentBal - amount;

    state.supplierLedger.unshift({
      id: 'SLEDG-PAY-' + Date.now().toString().slice(-4),
      date: dateStr,
      supplier: suppName,
      ref: data.ref || ('PAY-SUPP-' + Date.now().toString().slice(-4)),
      desc: data.notes || `Bank Payment to ${suppName} via ${bankAcc}`,
      debit: amount,
      credit: 0,
      balance: newBal,
      bankAccount: bankAcc
    });

    saveState();
    render();
    showView('purchase-ledger');
    toast(`💳 Recorded ${formatINR(amount)} Supplier Payment to ${suppName} via ${bankAcc}`);
  }

  if (kind === 'vehicle-model') {
    const newVm = {
      id: `VM-00${(state.vehicleModels || []).length + 1}`,
      name: data.name,
      type: data.type || 'Passenger 3W E-Rickshaw',
      motor: data.motor || '1200W BLDC Heavy Duty',
      batterySpec: data.batterySpec || 'LFP 51.2V 100Ah',
      hsn: data.hsn || '87116010',
      gstRate: Number(data.gstRate || 5),
      price: Number(data.price || 145000)
    };
    if (!state.vehicleModels) state.vehicleModels = [];
    state.vehicleModels.unshift(newVm);
    saveState();
    render();
    showView('models');
    toast(`🛺 Added EV Vehicle Model: ${newVm.name} (${formatINR(newVm.price)})`);
  }

  if (kind === 'vehicle-stock') {
    const newVeh = {
      chassisNo: data.chassisNo,
      model: data.model,
      motorNo: data.motorNo || 'MTR-BLDC-001',
      batterySerial: data.batterySerial || 'LFP 51.2V 100Ah',
      color: data.color || 'Royal Blue',
      price: Number(data.price || 145000),
      status: 'Available in Showroom'
    };
    if (!state.vehicles) state.vehicles = [];
    state.vehicles.unshift(newVeh);
    saveState();
    render();
    showView('vehicles');
    toast(`🛺 Added Vehicle ${newVeh.chassisNo} to Showroom Inventory`);
  }

  if (kind === 'vehicle-sale') {
    const invNo = 'VINV-2026-' + String((state.vehicleInvoices || []).length + 1).padStart(4, '0');
    const party = data.party || 'EV Retail Buyer';
    const totalAmt = Number(data.grandTotal || 145000);
    const paidAmt = Number(data.paidAmount || totalAmt);
    const bankAcc = data.bankAccount || 'HDFC Bank Current A/C (50200012345678)';
    const chassisNo = data.chassisNo;

    const vehInvoice = {
      invoice: invNo,
      party,
      fatherName: data.fatherName || '',
      phone: data.phone || '',
      address: data.address || '',
      partyState: data.partyState || 'UTTAR PRADESH',
      type: (state.dealers || []).some(d => normalizeText(d.name) === normalizeText(party)) ? 'Dealer' : 'Retail',
      date: new Date().toISOString().split('T')[0],
      model: data.model,
      chassisNo,
      motorNo: data.motorNo || '',
      batterySerial: data.batterySerial || '',
      color: data.color || '',
      hsn: data.hsn || '87116010',
      taxableValue: Math.round(totalAmt / 1.05),
      totalGst: Math.round(totalAmt - (totalAmt / 1.05)),
      grandTotal: totalAmt,
      bankAccount: bankAcc,
      paidAmount: paidAmt,
      balanceAmount: totalAmt - paidAmt,
      status: 'Paid & Dispatched'
    };

    if (!state.vehicleInvoices) state.vehicleInvoices = [];
    state.vehicleInvoices.unshift(vehInvoice);

    const vehObj = (state.vehicles || []).find(v => v.chassisNo === chassisNo);
    if (vehObj) {
      vehObj.status = 'Sold & Dispatched';
    }

    state.ledger.push({
      id: 'LEDG-VEH-' + Date.now().toString().slice(-4),
      date: new Date().toISOString().split('T')[0],
      party,
      partyType: vehInvoice.type,
      ref: invNo,
      desc: `EV Vehicle Tax Invoice ${invNo} (${vehInvoice.model} · Chassis ${chassisNo})`,
      debit: totalAmt,
      credit: 0,
      balance: totalAmt,
      bankAccount: bankAcc
    });

    if (paidAmt > 0) {
      state.ledger.push({
        id: 'LEDG-VEH-PAY-' + Date.now().toString().slice(-4),
        date: new Date().toISOString().split('T')[0],
        party,
        partyType: vehInvoice.type,
        ref: 'PAY-' + invNo,
        desc: `Vehicle Payment Received via ${bankAcc}`,
        debit: 0,
        credit: paidAmt,
        balance: totalAmt - paidAmt,
        bankAccount: bankAcc
      });
    }

    saveState();
    render();
    showView('vehicles');
    toast(`🛺 EV Vehicle Invoice ${invNo} Issued for ${party} (${chassisNo})`);
  }

  if (kind === 'dealer') {
    const newDealer = {
      id: `DLR-00${(state.dealers || []).length + 1}`,
      name: data.name,
      title: data.title || 'M/s.',
      contactPerson: data.contactPerson || '',
      gstType: data.gstType || 'Registered Dealer',
      gstin: data.gstin || '',
      pan: data.pan || '',
      phone: data.phone || '',
      address: data.address || '',
      city: data.city || 'GORAKHPUR',
      state: data.state || 'UTTAR PRADESH',
      pin: data.pin || '273001',
      creditLimit: Number(data.creditLimit || 0),
      creditDays: Number(data.creditDays || 30),
      openingBalance: Number(data.openingBalance || 0)
    };

    if (!state.dealers) state.dealers = [];
    state.dealers.unshift(newDealer);

    if (newDealer.openingBalance > 0) {
      state.ledger.unshift({
        id: 'LEDG-DLR-' + Date.now().toString().slice(-4),
        date: new Date().toISOString().split('T')[0],
        party: newDealer.name,
        partyType: 'Dealer',
        ref: 'OPENING-BAL',
        desc: 'Opening Ledger Debit Balance',
        debit: newDealer.openingBalance,
        credit: 0,
        balance: newDealer.openingBalance
      });
    }

    saveState();
    render();
    toast(`Registered new Dealer Master Account: ${newDealer.name} (GSTIN: ${newDealer.gstin})`);
  }

  if (kind === 'production') {
    const currentRole = getCurrentUserRole();
    if (!isUserAdmin() && !String(currentRole || '').toLowerCase().includes('operator') && !String(currentRole || '').toLowerCase().includes('quality')) {
      toast('Access Denied: Creating production builds requires Administrator or Workshop Operator role.');
      closeModal();
      return;
    }

    const newProdId = nextProductionId();
    const todayStr = new Date().toISOString().split('T')[0];
    state.production.unshift({
      id: newProdId,
      model: data.model,
      operator: data.operator,
      built: todayStr,
      qc: 'Awaiting',
      serial: '—',
      status: 'In QC'
    });

    // Auto-deduct BOM components from inventory stock
    const modelObj = (state.models || []).find(m => m.name === data.model);
    if (modelObj && Array.isArray(modelObj.bom)) {
      modelObj.bom.forEach(bomItem => {
        const invItem = (state.inventory || []).find(inv => 
          inv.material === bomItem.name || 
          (inv.category && inv.category.toLowerCase() === bomItem.category.toLowerCase()) ||
          (inv.material && inv.material.toLowerCase().includes(bomItem.name.toLowerCase()))
        );
        if (invItem && invItem.available) {
          const parts = invItem.available.split('/').map(s => s.trim().replace(/,/g, ''));
          if (parts.length === 2) {
            let curAvail = Number(parts[0]) || 0;
            const totalQty = Number(parts[1]) || curAvail;
            curAvail = Math.max(0, curAvail - (Number(bomItem.qty) || 1));
            invItem.available = `${curAvail.toLocaleString()} / ${totalQty.toLocaleString()}`;
            invItem.health = (curAvail / totalQty < 0.25) ? 'Low' : 'Good';
          }
        }
      });
    }

    saveState();
    render();
    showView('production');
    toast(`Production record ${newProdId} created & BOM stock deducted — QC required`);
  }

  if (kind === 'sale') {
    const invNo = nextInvoiceNumber();
    const isRetail = data.type === 'Retail';

    // Parse all line items by discovered row index so deleted rows don't stop later rows from being saved
    const items = [];
    const rowIndices = Array.from(new Set(
      Array.from(formData.keys())
        .map(key => {
          const match = key.match(/^item_(?:cat|select|hsn|qty|price|desc|serial)_(\d+)$/);
          return match ? Number(match[1]) : null;
        })
        .filter(idx => idx !== null)
    )).sort((a, b) => a - b);

    for (const idx of rowIndices) {
      const desc = data[`item_desc_${idx}`] || 'Battery / Accessory Item';
      const serial = data[`item_serial_${idx}`] || data[`item_select_${idx}`] || '';
      const hsn = data[`item_hsn_${idx}`] || '87116020';
      const qty = Number(data[`item_qty_${idx}`] || 1);
      const price = Number(data[`item_price_${idx}`] || 0);

      items.push({
        sr: idx + 1,
        desc: desc,
        packSerial: serial,
        hsn: hsn,
        qty: qty,
        price: price,
        amount: qty * price
      });
    }

    if (items.length === 0) {
      toast('Please add at least one line item to the sales invoice.');
      return;
    }

    const batterySerials = items.filter(item => item.packSerial).map(item => item.packSerial);
    const duplicatePack = batterySerials.find((serial, serialIdx) => batterySerials.indexOf(serial) !== serialIdx);
    if (duplicatePack) {
      toast(`Pack ${duplicatePack} is duplicated within the same invoice.`);
      return;
    }

    const partyState = getInvoicePartyState(data.party, data.customerState || '', data.type);
    const taxMode = isInterstateSupply(data.party, partyState) ? 'IGST' : 'INTRA';
    const invoiceTotals = calculateInvoiceTotals(items, data.type, { party: data.party, partyState, taxMode });
    const taxableValue = invoiceTotals.taxableValue;
    const totalGst = invoiceTotals.totalGst;
    const cgstAmount = invoiceTotals.cgstAmount;
    const sgstAmount = invoiceTotals.sgstAmount;
    const igstAmount = invoiceTotals.igstAmount;
    const cessAmount = invoiceTotals.cessAmount;
    const grandTotal = invoiceTotals.grandTotal;
    const paidAmount = Number(data.paid_amount || 0);
    const balanceAmount = grandTotal - paidAmount;
    const todayStr = new Date().toISOString().split('T')[0];

    const warrantyRuleText = isRetail ? 'Active (Same Day Auto)' : 'Dealer Auto (+1 Month)';

    // 1. Add to state.invoices
    state.invoices.unshift({
      invoice: invNo,
      date: todayStr,
      party: data.party,
      fatherName: data.fatherName,
      phone: data.phone,
      address: data.address,
      vehicle: data.vehicle,
      type: isRetail ? 'Retail' : 'Dealer',
      partyState: partyState || '',
      taxMode: taxMode,
      items: invoiceTotals.items,
      taxableValue: taxableValue,
      totalGst: totalGst,
      cgstRate: 0,
      cgstAmount: cgstAmount,
      sgstRate: 0,
      sgstAmount: sgstAmount,
      igstRate: 0,
      igstAmount: igstAmount,
      cessAmount: cessAmount,
      grandTotal: grandTotal,
      amountInWords: numberToWords(grandTotal),
      paidAmount: paidAmount,
      balanceAmount: balanceAmount,
      warrantyStatus: warrantyRuleText
    });

    // 2. Register battery dispatches so sales history and stock filters stay aligned
    invoiceTotals.items.filter(item => item.packSerial).forEach(item => {
      state.sales.unshift({
        invoice: invNo,
        pack: item.packSerial,
        party: data.party,
        type: isRetail ? 'Retail' : 'Dealer',
        warranty: warrantyRuleText,
        date: todayStr,
        amount: item.amount,
        desc: item.desc
      });
    });

    // 3. Post Debit to Party Ledger
    state.ledger.unshift({
      id: 'LEDG-' + Date.now().toString().slice(-4),
      date: todayStr,
      party: data.party,
      partyType: isRetail ? 'Retail' : 'Dealer',
      ref: invNo,
      desc: `Tax Invoice ${invNo} (${items.length} items)`,
      debit: grandTotal,
      credit: 0.00,
      balance: grandTotal
    });

    // 4. If paid upfront, post Credit to Party Ledger
    if (paidAmount > 0) {
      state.ledger.unshift({
        id: 'LEDG-P-' + Date.now().toString().slice(-4),
        date: todayStr,
        party: data.party,
        partyType: isRetail ? 'Retail' : 'Dealer',
        ref: 'PAY-' + Date.now().toString().slice(-4),
        desc: `Upfront Payment Received for ${invNo}`,
        debit: 0.00,
        credit: paidAmount,
        balance: balanceAmount
      });
    }

    // 5. Auto Warranty Activation for each battery pack in the sale!
    invoiceTotals.items.forEach(item => {
      if (item.packSerial) {
        // Update production status
        const prodItem = state.production.find(p => p.serial === item.packSerial);
        if (prodItem) {
          prodItem.status = isRetail ? 'Sold (Retail)' : 'Dispatched (Dealer)';
        }

        const startDateObj = new Date();
        if (!isRetail) {
          // Dealer warranty auto-activates after 1 month (30 days)
          startDateObj.setMonth(startDateObj.getMonth() + 1);
        }
        const endDateObj = new Date(startDateObj);
        endDateObj.setFullYear(endDateObj.getFullYear() + 2);

        const startStr = startDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const endStr = endDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

        state.warranties.unshift({
          pack: item.packSerial,
          customer: isRetail ? data.party : `${data.party} (Dealer Auto)`,
          registered: startStr,
          end: endStr,
          status: isRetail ? 'Active (Same Day Auto)' : 'Dealer Auto (+1 Month)'
        });
      }
    });

    render();
    closeModal();
    showView('sales');
    toast(`Sales Invoice ${invNo} saved! HK Motors tax invoice ready & party ledger updated.`);
  }

  if (kind === 'payment-credit') {
    const party = data.credit_party;
    const amount = Number(data.credit_amount || 0);
    if (!party || amount <= 0) {
      toast('Please select a party and enter a valid positive payment amount.');
      return;
    }

    state.ledger.unshift({
      id: 'LEDG-P-' + Date.now().toString().slice(-4),
      date: data.credit_date || new Date().toISOString().split('T')[0],
      party: party,
      partyType: 'Credit',
      ref: data.credit_ref || ('PAY-' + Date.now().toString().slice(-4)),
      desc: `Payment Received via ${data.credit_mode || 'Cash/Bank'} (${data.credit_notes || 'Credit'})`,
      debit: 0.00,
      credit: amount,
      balance: 0.00
    });

    render();
    closeModal();
    showView('sales');
    toast(`Recorded payment credit of ₹${amount.toLocaleString('en-IN')} for ${party}`);
  }

  if (kind === 'run-qc') {
    const idx = Number(data.prodIdx);
    if (state.production[idx]) {
      const isPassed = data.qc === 'Passed';
      state.production[idx].qc = data.qc;
      state.production[idx].serial = data.serial;
      state.production[idx].status = isPassed ? 'Saleable' : 'QC failed';

      render();
      showView('production');
      toast(isPassed ? `QC Passed! Pack ${data.serial} released to Finished Stock Inventory.` : `Production ${state.production[idx].id} marked QC Failed.`);
    }
  }

  if (kind === 'activate-warranty') {
    const serial = data.pack_select === 'CUSTOM' ? data.custom_serial : data.pack_select;
    if (!serial) {
      toast('Please provide a valid pack serial number');
      return;
    }

    const regDateObj = new Date(data.registered_date);
    const endDateObj = new Date(data.end_date);

    const regStr = isNaN(regDateObj) ? '26 Jul 2026' : regDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const endStr = isNaN(endDateObj) ? '26 Jul 2028' : endDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Remove existing warranty if re-registering
    state.warranties = state.warranties.filter(w => w.pack !== serial);

    state.warranties.unshift({
      pack: serial,
      customer: data.customer || 'Unassigned',
      registered: regStr,
      end: endStr,
      status: data.status || 'Active'
    });

    render();
    showView('warranty');
    toast(`Activated warranty for ${serial} until ${endStr}`);
  }

  if (kind === 'issue-replacement') {
    const claimIdx = Number(data.claimIdx);
    const replacementPack = data.replacementPack;
    const defectivePack = data.defectivePack;
    const customer = data.customer;
    const inheritedEndDate = data.inheritedEndDate;

    if (state.claims[claimIdx]) {
      state.claims[claimIdx].status = 'Resolved';
      state.claims[claimIdx].outcome = `Replacement (${replacementPack})`;
      state.claims[claimIdx].replacedWith = replacementPack;

      const oldWarranty = state.warranties.find(w => w.pack === defectivePack);
      if (oldWarranty) {
        oldWarranty.status = 'Replaced';
      }

      state.warranties.unshift({
        pack: replacementPack,
        customer: customer,
        registered: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        end: inheritedEndDate,
        status: 'Active'
      });

      render();
      showView('warranty');
      toast(`Issued replacement pack ${replacementPack} to ${customer}. Inherited warranty ends ${inheritedEndDate}.`);
    }
  }

  if (kind === 'update-claim') {
    const idx = Number(data.claimIdx);
    if (state.claims[idx]) {
      const claim = state.claims[idx];
      claim.status = data.status;
      claim.outcome = data.outcome;
      claim.issue = data.issue;
      claim.notes = data.notes;

      const compName = data.replaced_comp || 'None';
      const compPrice = Number(data.comp_price || 0);
      const repairLabor = Number(data.repair_labor || 0);
      const repairElec = Number(data.repair_elec || 0);
      const syncSales = data.sync_sales_invoice === 'on';

      claim.replacedComp = compName;
      claim.repairLabor = repairLabor;
      claim.repairElec = repairElec;

      // Auto-generate Sales Invoice & Post to Ledger if sync is checked or outcome is Repair
      if (syncSales || data.outcome === 'Repair') {
        const repairInvoiceNo = `INV-2026-R00${state.invoices.length + 1}`;
        const items = [];
        let sr = 1;

        if (compName !== 'None') {
          items.push({
            sr: sr++,
            desc: `Replaced Component: ${compName} (${claim.pack})`,
            hsn: '85044090',
            qty: 1,
            price: compPrice,
            amount: compPrice,
            packSerial: claim.pack
          });
        }

        if (repairLabor > 0) {
          items.push({
            sr: sr++,
            desc: `Battery Pack Repair Labour & Assembly Service (${claim.pack})`,
            hsn: '9987',
            qty: 1,
            price: repairLabor,
            amount: repairLabor,
            packSerial: claim.pack
          });
        }

        if (repairElec > 0) {
          items.push({
            sr: sr++,
            desc: `Electricity, HV Testing & Capacity Calibration Fee (${claim.pack})`,
            hsn: '9987',
            qty: 1,
            price: repairElec,
            amount: repairElec,
            packSerial: claim.pack
          });
        }

        const partyState = getPartyStateByName(claim.customer || '');
        const taxMode = isInterstateSupply(claim.customer || '', partyState) ? 'IGST' : 'INTRA';
        const invoiceTotals = calculateInvoiceTotals(items, 'Repair Service', { party: claim.customer || '', partyState, taxMode });
        const taxable = invoiceTotals.taxableValue;
        const totalGst = invoiceTotals.totalGst;
        const cgst = invoiceTotals.cgstAmount;
        const sgst = invoiceTotals.sgstAmount;
        const grandTotal = invoiceTotals.grandTotal;

        if (taxable > 0) {
          const todayStr = new Date().toISOString().split('T')[0];
          const newInvoice = {
            invoice: repairInvoiceNo,
            party: claim.customer || 'Retail Customer',
            fatherName: '',
            phone: '',
            address: 'Gorakhpur, UP',
            type: 'Repair Service',
            date: todayStr,
            partyState: partyState || '',
            taxMode: taxMode,
            items: invoiceTotals.items,
            taxableValue: taxable,
            totalGst: totalGst,
            cgstRate: 0,
            cgstAmount: cgst,
            sgstRate: 0,
            sgstAmount: sgst,
            igstRate: 0,
            igstAmount: 0,
            cessAmount: 0,
            grandTotal: grandTotal,
            paidAmount: grandTotal,
            balanceAmount: 0,
            amountInWords: numberToWords(grandTotal),
            warrantyStatus: 'Repair Service Invoice'
          };

          state.invoices.unshift(newInvoice);
          state.sales.unshift({
            invoice: repairInvoiceNo,
            pack: claim.pack,
            party: claim.customer || 'Retail Customer',
            type: 'Repair Service',
            warranty: 'Repair Service'
          });

          // Post Debit Entry to Party Ledger
          state.ledger.unshift({
            id: `LEDG-R${Date.now().toString().slice(-4)}`,
            date: todayStr,
            party: claim.customer || 'Retail Customer',
            partyType: 'Customer',
            ref: repairInvoiceNo,
            desc: `Tax Invoice ${repairInvoiceNo} (Battery Repair & Replaced Components)`,
            debit: grandTotal,
            credit: 0,
            balance: grandTotal
          });

          claim.repairInvoiceNo = repairInvoiceNo;
          toast(`Generated Repair Tax Invoice ${repairInvoiceNo} (₹${grandTotal.toLocaleString('en-IN')}) and posted to Party Ledger!`);
        }
      }

      render();
      showView('warranty');
      toast(`Updated claim ${claim.claim} status to ${data.status}`);
    }
  }

  if (kind === 'claim') {
    state.claims.unshift({ claim: 'CLM-2026-0010', pack: data.pack, customer: data.customer || 'Unregistered', issue: data.issue, opened: '25 Jul 2026', outcome: data.outcome === 'Inspection' ? '—' : data.outcome, status: 'Open' });
    render();
    showView('warranty');
    toast('Warranty claim opened');
  }

  if (kind === 'google-sheets') {
    if (data.sheetId) localStorage.setItem('tejas_sheet_id', data.sheetId);
    if (data.appScriptUrl) localStorage.setItem('tejas_appscript_url', data.appScriptUrl);
    toast('Google Sheets Cloud connection updated!');
    syncToGoogleSheets(true);
  }

  if (kind === 'company-bank') {
    const bankIdxStr = data.bankIdx;
    const isPrimary = formData.get('isPrimary') === 'on';

    if (isPrimary && Array.isArray(state.bankAccounts)) {
      state.bankAccounts.forEach(b => b.isPrimary = false);
    }

    const newBank = {
      id: 'BANK-' + String((state.bankAccounts || []).length + 1).padStart(2, '0'),
      bankName: data.bankName,
      accType: data.accType,
      accNo: data.accNo,
      ifsc: data.ifsc,
      branch: data.branch || '',
      isPrimary
    };

    if (!state.bankAccounts) state.bankAccounts = [];

    if (bankIdxStr !== '' && bankIdxStr !== null && bankIdxStr !== undefined) {
      const idx = Number(bankIdxStr);
      state.bankAccounts[idx] = newBank;
      toast(`Updated Bank Account: ${newBank.bankName} (${newBank.accNo})`);
    } else {
      state.bankAccounts.push(newBank);
      toast(`Added Bank Account: ${newBank.bankName} (${newBank.accNo})`);
    }

    saveState();
    renderBankAccountsSettings();
    closeModal();
    return;
  }

  closeModal();
}

function lookup(token) {
  if (!token) return;

  const warranty = state.warranties.find(w => normalizeText(w.pack) === normalizeText(token));
  const prod = state.production.find(p => p.serial === token || p.id === token);

  const targetResult = $('#lookup-result');
  if (!targetResult) return;

  if (warranty) {
    const packSerial = warranty ? warranty.pack : (prod ? prod.serial : 'BAT-2026-000046');
    const modelName = prod ? prod.model : 'LFP City 3.2kWh (16S 1P · 51.2V 100Ah)';
    const customerName = warranty ? warranty.customer : 'Bharat S Gadhvi';
    const regDate = warranty ? warranty.registered : '23 Jul 2026';
    const endDate = warranty ? warranty.end : '23 Jul 2028';
    const statusStr = warranty ? warranty.status : 'Active';

    targetResult.innerHTML = `
      <div class="result-card" style="background:#fff;border:2px solid #2b6cb0;border-radius:12px;padding:20px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        <div class="result-banner" style="background:#f0fff4;color:#2f855a;padding:12px 16px;border-radius:8px;font-size:14px;font-weight:800;display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <img src="lithynova_logo.png" alt="Lithynova Logo" style="width:42px;height:42px;object-fit:contain;border-radius:6px;background:#fff;padding:2px;border:1px solid #c6f6d5;" />
          <span>● VERIFIED GENUINE LITHYNOVA BATTERY PACK</span>
        </div>
        <div class="result-body">
          <div style="font-size:11px;color:#718096;text-transform:uppercase;letter-spacing:0.5px;font-weight:700;">PACK SERIAL NUMBER</div>
          <h2 style="font-size:22px;color:#1a202c;margin:2px 0 10px 0;font-family:monospace;letter-spacing:0.5px;">${packSerial}</h2>
          
          <div style="background:#f7fafc;padding:10px 12px;border-radius:8px;margin-bottom:14px;border:1px solid #e2e8f0;">
            <div style="font-size:11px;color:#718096;font-weight:700;">BATTERY MODEL &amp; SPECIFICATIONS</div>
            <div style="font-size:14px;font-weight:800;color:#2b6cb0;">${modelName}</div>
          </div>

          <div class="result-fields" style="display:grid;grid-template-columns: 1fr 1fr;gap:10px;margin-bottom:14px;">
            <div class="result-field"><span>Registered Owner</span><strong>${customerName}</strong></div>
            <div class="result-field"><span>Warranty Status</span><strong>${badge(statusStr)}</strong></div>
            <div class="result-field"><span>Registration Date</span><strong>${regDate}</strong></div>
            <div class="result-field"><span>Warranty Expiry Date</span><strong style="color:#2f855a;">${endDate}</strong></div>
          </div>
        </div>
        <div class="result-foot" style="border-top:1px solid #e2e8f0;padding-top:12px;font-size:11px;color:#718096;display:flex;justify-content:space-between;align-items:center;">
          <span>Need help? Contact Lithynova Support</span>
          <strong style="color:#1a202c;">📞 +91 90019 87052</strong>
        </div>
      </div>
    `;
    toast(`Verified genuine pack: ${packSerial}`);
  } else {
    targetResult.innerHTML = `
      <div class="result-card" style="background:#fff;border:2px solid #e53e3e;border-radius:12px;padding:20px;">
        <div class="result-banner unknown" style="background:#fff5f5;color:#c53030;padding:8px 12px;border-radius:6px;font-size:12px;font-weight:800;display:flex;align-items:center;gap:6px;margin-bottom:14px;">
          <span>!</span> UNRECOGNIZED TOKEN OR SERIAL
        </div>
        <div class="result-body">
          <h2 style="font-size:18px;color:#1a202c;margin-bottom:6px;">No official record found</h2>
          <div style="font-size:12px;color:#718096;margin-bottom:14px;">This QR barcode token may be mistyped, altered, or not yet registered under warranty.</div>
        </div>
        <div class="result-foot" style="border-top:1px solid #e2e8f0;padding-top:12px;font-size:11px;color:#718096;display:flex;justify-content:space-between;align-items:center;">
          <span>Report potential counterfeit to Lithynova</span>
          <strong style="color:#c53030;">📞 +91 90019 87052</strong>
        </div>
      </div>
    `;
    toast('No public verification record found');
  }
}

function normalizeInvoiceForPrint(inv) {
  const normalized = calculateInvoiceTotals(Array.isArray(inv.items) ? inv.items : [], inv.type, {
    party: inv.party || '',
    partyState: inv.partyState || '',
    taxMode: inv.taxMode || ''
  });
  const items = normalized.items;
  let taxableValue = Number(inv.taxableValue ?? inv.taxable ?? normalized.taxableValue);
  let cgstAmount = Number(inv.cgstAmount ?? inv.cgst ?? normalized.cgstAmount);
  let sgstAmount = Number(inv.sgstAmount ?? inv.sgst ?? normalized.sgstAmount);
  let igstAmount = Number(inv.igstAmount ?? inv.igst ?? normalized.igstAmount);
  let cessAmount = Number(inv.cessAmount ?? normalized.cessAmount);
  let grandTotal = Number(inv.grandTotal ?? normalized.grandTotal);

  if (!items.length && (inv.taxableValue != null || inv.grandTotal != null)) {
    taxableValue = Number(inv.taxableValue ?? inv.taxable ?? 0);
    cgstAmount = Number(inv.cgstAmount ?? inv.cgst ?? 0);
    sgstAmount = Number(inv.sgstAmount ?? inv.sgst ?? 0);
    igstAmount = Number(inv.igstAmount ?? inv.igst ?? 0);
    cessAmount = Number(inv.cessAmount ?? 0);
    grandTotal = Number(inv.grandTotal ?? taxableValue + cgstAmount + sgstAmount + igstAmount + cessAmount);
  }

  return {
    ...inv,
    date: inv.date || new Date().toISOString().split('T')[0],
    party: inv.party || 'Retail Customer',
    items,
    taxableValue,
    cgstAmount,
    sgstAmount,
    igstAmount,
    cessAmount,
    grandTotal,
    totalGst: Number(inv.totalGst ?? normalized.totalGst ?? (cgstAmount + sgstAmount + igstAmount)),
    amountInWords: inv.amountInWords || numberToWords(grandTotal)
  };
}

function printHkMotorsInvoice(invNo) {
  const sourceInv = state.invoices.find(i => i.invoice === invNo);
  if (!sourceInv) return;
  const inv = normalizeInvoiceForPrint(sourceInv);
  const settings = getSystemSettings();
  const companyName = settings.companyName || 'HK MOTORS';
  const companyTagline = settings.tagline || 'AUTHORISED OF DELTIC';
  const companyAddress = settings.address || 'SENDULI BENDULI, GAIGHAT, RUSTAMPUR, GORAKHPUR-273016';
  const companyPhone = settings.phone || '6393539066';
  const companyEmail = settings.email || 'hkmotorsofficial@gmail.com';
  const companyGstin = settings.gstin || '09ANLPY7318P1ZT';
  const jurisdictionText = settings.jurisdiction || 'GORAKHPUR';

  const modalBackdrop = $('#modal-backdrop');
  if (!modalBackdrop) return;

  $('#modal-title').textContent = `${companyName} Tax Invoice — ${inv.invoice}`;
  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(840px, 98%)';

  $('#modal-fields').innerHTML = `
    <div class="hk-invoice-printable" style="font-family:'Segoe UI',sans-serif;color:#000;background:#fff;padding:20px;border:1px solid #000;border-radius:4px;margin-bottom:14px;">
      <div style="text-align:center;font-size:11px;font-weight:800;text-transform:uppercase;border-bottom:1px solid #000;padding-bottom:4px;letter-spacing:0.5px;">
        SUBJECT TO ${jurisdictionText} JURISDICTION
      </div>
      <div style="text-align:center;padding:10px 0;border-bottom:1px solid #000;">
        <h1 style="font-size:24px;font-weight:900;margin:0;letter-spacing:1px;color:#000;">${companyName}</h1>
        <div style="font-size:12px;font-weight:800;margin-top:2px;">${companyTagline}</div>
        <div style="font-size:11px;margin-top:4px;">${companyAddress}</div>
        <div style="font-size:11px;">Phone: ${companyPhone} | Email: ${companyEmail}</div>
        <div style="font-size:11px;font-weight:800;margin-top:2px;">GSTIN - ${companyGstin}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #000;padding:6px 12px;background:#f8fafc;">
        <div style="font-weight:900;font-size:15px;letter-spacing:0.5px;">TAX INVOICE</div>
        <div style="text-align:right;font-size:12px;font-weight:700;">
          <div>Invoice No. : <span style="font-weight:900;">${inv.invoice}</span></div>
          <div>Date : <span>${inv.date}</span></div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns: 2fr 1fr;border-bottom:1px solid #000;padding:8px 12px;font-size:12px;line-height:1.6;">
        <div>
          <div><strong>Customer / Dealer :</strong> ${inv.party}</div>
          ${inv.fatherName ? `<div><strong>S/o (Father/Contact) :</strong> ${inv.fatherName}</div>` : ''}
          ${inv.address ? `<div><strong>Address :</strong> ${inv.address}</div>` : ''}
        </div>
        <div>
          ${inv.phone ? `<div><strong>Mobile No :</strong> ${inv.phone}</div>` : ''}
          ${inv.vehicle ? `<div><strong>Vehicle / Ref No :</strong> ${inv.vehicle}</div>` : ''}
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:11px;border-bottom:1px solid #000;">
        <thead>
          <tr style="border-bottom:1px solid #000;background:#f1f5f9;">
            <th style="border-right:1px solid #000;padding:6px;width:40px;text-align:center;">Sr.NO.</th>
            <th style="border-right:1px solid #000;padding:6px;text-align:left;">DESCRIPTION &amp; DETAILS</th>
            <th style="border-right:1px solid #000;padding:6px;width:80px;text-align:center;">HSN</th>
            <th style="border-right:1px solid #000;padding:6px;width:50px;text-align:center;">QTY</th>
            <th style="border-right:1px solid #000;padding:6px;width:90px;text-align:right;">RATE (₹)</th>
            <th style="border-right:1px solid #000;padding:6px;width:70px;text-align:center;">GST %</th>
            <th style="border-right:1px solid #000;padding:6px;width:90px;text-align:right;">GST Amt (₹)</th>
            <th style="padding:6px;width:100px;text-align:right;">AMOUNT (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${inv.items.map(item => `
            <tr style="border-bottom:1px solid #ddd;">
              <td style="border-right:1px solid #000;padding:6px;text-align:center;vertical-align:top;font-weight:700;">${item.sr}</td>
              <td style="border-right:1px solid #000;padding:6px;vertical-align:top;line-height:1.5;">
                <div style="font-weight:900;font-size:13px;">${item.desc}</div>
                ${item.packSerial ? `<div style="font-size:11px;color:#2b6cb0;">Serial No: <strong>${item.packSerial}</strong></div>` : ''}
              </td>
              <td style="border-right:1px solid #000;padding:6px;text-align:center;vertical-align:top;font-weight:700;">${item.hsn || '87116020'}</td>
              <td style="border-right:1px solid #000;padding:6px;text-align:center;vertical-align:top;font-weight:700;">${item.qty || 1}</td>
              <td style="border-right:1px solid #000;padding:6px;text-align:right;vertical-align:top;font-weight:700;">${(item.price || 0).toFixed(2)}</td>
              <td style="border-right:1px solid #000;padding:6px;text-align:center;vertical-align:top;font-weight:800;">${Number(item.gstRate || 0).toFixed(2)}%</td>
              <td style="border-right:1px solid #000;padding:6px;text-align:right;vertical-align:top;font-weight:800;">${Number(item.gstAmount || 0).toFixed(2)}</td>
              <td style="padding:6px;text-align:right;vertical-align:top;font-weight:800;">${(item.amount || (item.qty * item.price)).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns: 1.8fr 1.2fr;border-bottom:1px solid #000;font-size:11px;">
        <div style="padding:8px 12px;border-right:1px solid #000;font-weight:800;line-height:1.5;">
          <div style="margin-bottom:4px;">2 YEAR SERVICE FREE</div>
          <div>1 YEAR WARRANTY ON MOTOR CONTROLLER CHARGER AND 2+1 YEAR ON BATTERY</div>
        </div>
        <div style="font-size:11px;">
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #ccc;padding:4px 8px;">
            <span>TAXABLE VALUE</span><span style="font-weight:800;">${inv.taxableValue.toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #ccc;padding:4px 8px;">
            <span>TOTAL GST</span><span>${Number(inv.totalGst || (inv.cgstAmount + inv.sgstAmount)).toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #ccc;padding:4px 8px;">
            <span>CGST</span><span>${inv.cgstAmount.toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #ccc;padding:4px 8px;">
            <span>SGST</span><span>${inv.sgstAmount.toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #ccc;padding:4px 8px;">
            <span>IGST</span><span>${inv.igstAmount.toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #000;padding:4px 8px;">
            <span>Cess@0.00%</span><span>${inv.cessAmount.toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:6px 8px;font-weight:900;font-size:13px;background:#f1f5f9;">
            <span>GRAND TOTAL</span><span>₹ ${inv.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div style="border-bottom:1px solid #000;padding:6px 12px;font-size:11px;font-weight:900;background:#fafafa;">
        AMOUNT IN WORD : ${inv.amountInWords}
      </div>
      <div style="padding:8px 12px;font-size:10px;line-height:1.4;border-bottom:1px solid #000;background:#fff;">
        <div style="font-weight:900;margin-bottom:2px;">नियम और शर्तें:</div>
        <div>1. यह प्रमाणित करता है कि हमारे पास वैध जीएसटी पंजीकरण है और उपरोक्त सभी जानकारी सत्य और सही है।</div>
        <div>2. बेचे गए माल को वापस न ही लिया जाएगा और न ही बदला जाएगा।</div>
        <div>3. वारंटी क्लेम का कूरियर शुल्क ग्राहक को देना होगा।</div>
        <div>4. टूटने-फूटने अथवा पार्टस में पानी जाने की स्थिति में वारंटी क्लेम मान्य नहीं होगा।</div>
        <div>5. आरटीओ - बीमा शुल्क अतिरिक्त होंगे।</div>
        <div>6. भुगतान 15 दिनों के भीतर करना अनिवार्य है, अन्यथा 18% ब्याज लिया जाएगा।</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;padding:20px 12px 6px;font-size:11px;font-weight:800;">
        <div>Customer Signature</div>
        <div style="text-align:right;">
          <div style="margin-bottom:24px;">For ${companyName}</div>
          <div>Authorised Signature</div>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:10px;">
      <button type="button" class="primary-btn" onclick="window.print()" style="padding:8px 18px;font-weight:700;">🖨️ Print Tax Invoice</button>
    </div>
  `;

  modalBackdrop.removeAttribute('hidden');
  modalBackdrop.style.display = 'grid';
  modalBackdrop.dataset.kind = 'bom-view';
}

function openPaymentCreditModal(preferredParty = '') {
  const partySet = new Set();
  state.invoices.forEach(inv => partySet.add(inv.party));
  state.ledger.forEach(l => partySet.add(l.party));
  const partyList = Array.from(partySet);
  if (preferredParty && !partyList.includes(preferredParty)) {
    partyList.unshift(preferredParty);
  }

  const modalBackdrop = $('#modal-backdrop');
  if (!modalBackdrop) return;

  $('#modal-title').textContent = 'Record Customer / Dealer Payment Credit';
  const modalEl = $('.modal');
  if (modalEl) modalEl.style.width = 'min(520px, 98%)';

  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      <div class="field full"><label style="font-weight:700;">Select Party (Customer / Dealer) *</label>
        <select name="credit_party" style="padding:10px;font-weight:700;">
          ${partyList.map(p => `<option value="${p}" ${p === preferredParty ? 'selected' : ''}>${p}</option>`).join('')}
        </select>
      </div>
      <div class="field"><label>Payment Date</label><input name="credit_date" type="date" value="${new Date().toISOString().split('T')[0]}" required /></div>
      <div class="field"><label>Payment Reference / Txn ID</label><input name="credit_ref" value="PAY-2026-${Date.now().toString().slice(-4)}" required /></div>
      <div class="field"><label>Payment Mode</label>
        <select name="credit_mode">
          <option>Cash</option>
          <option>UPI / PhonePe / GPay</option>
          <option>NEFT / Bank Transfer</option>
          <option>Cheque</option>
        </select>
      </div>
      <div class="field"><label style="font-weight:700;color:#16a34a;">Amount Received (₹) *</label><input name="credit_amount" type="number" step="0.01" value="10000" required style="font-weight:700;" /></div>
      <div class="field full"><label>Notes / Remarks</label><input name="credit_notes" value="Payment credit received" /></div>
    </div>
  `;

  modalBackdrop.removeAttribute('hidden');
  modalBackdrop.style.display = 'grid';
  modalBackdrop.dataset.kind = 'payment-credit';
}

function renderDealersMaster() {
  const dealers = state.dealers || [];
  const table = $('#dealers-master-table');
  const select = $('#dealer-statement-select');

  if (table) {
    table.innerHTML = dealers.length ? dealers.map(d => {
      const dealerKey = normalizeText(d.name);
      const entries = (state.ledger || []).filter(l => normalizeText(l.party) === dealerKey);
      const balance = entries.reduce((sum, entry) => sum + (entry.debit || 0) - (entry.credit || 0), 0);
      return `
        <tr>
          <td><strong>${d.id || 'DLR'}</strong></td>
          <td><strong>${d.title || ''} ${d.name || ''}</strong></td>
          <td>${d.gstin || '—'}</td>
          <td>${badge(d.gstType || 'Dealer')}</td>
          <td>${d.contactPerson || '—'}</td>
          <td>${[d.city, d.state].filter(Boolean).join(', ') || '—'}</td>
          <td>${d.phone || '—'}</td>
          <td style="text-align:right;">${formatINR(d.creditLimit || 0)}</td>
          <td style="text-align:right;font-weight:800;color:${balance > 0 ? '#dc2626' : '#16a34a'};">${formatINR(balance)}</td>
          <td><button class="secondary-btn btn-view-dealer-statement" data-dealer="${d.name}" style="padding:4px 8px;font-size:11px;">View statement</button></td>
        </tr>
      `;
    }).join('') : '<tr><td colspan="10" style="text-align:center;color:#94a3b8;padding:18px;">No dealer accounts registered.</td></tr>';
  }

  if (select) {
    const selected = select.value || dealers[0]?.name || '';
    select.innerHTML = dealers.map(d => `<option value="${d.name}" ${d.name === selected ? 'selected' : ''}>${d.name}</option>`).join('');
  }

  renderDealerStatement();
}

function renderSuppliers() {
  if ($('#supp-count-badge')) $('#supp-count-badge').textContent = (state.suppliers || []).length;

  if ($('#supplier-master-table')) {
    $('#supplier-master-table').innerHTML = (state.suppliers || []).map((s, idx) => {
      let totalCredit = 0;
      let totalDebit = 0;
      (state.supplierLedger || []).filter(l => normalizeText(l.supplier) === normalizeText(s.name)).forEach(l => {
        totalCredit += (l.credit || 0);
        totalDebit += (l.debit || 0);
      });
      const netPayable = totalCredit - totalDebit;

      return `
        <tr>
          <td><strong>${s.id}</strong></td>
          <td><strong>${s.name}</strong></td>
          <td>${s.contactPerson || '—'}</td>
          <td><span style="font-family:monospace;font-weight:700;">${s.gstin || '—'}</span></td>
          <td>${s.state || s.address || '—'}</td>
          <td>${badge(s.category || 'Supplier')}</td>
          <td><strong style="color:${netPayable > 0 ? '#dc2626' : '#16a34a'};">${formatINR(netPayable)}</strong></td>
          <td>
            <button class="secondary-btn btn-view-supp-statement" data-supp="${s.name}" style="padding:4px 8px;font-size:11px;">View statement</button>
          </td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="8" style="text-align:center;color:#a0aec0;padding:14px;">No suppliers registered yet.</td></tr>';
  }

  const select = $('#supplier-statement-select');
  if (select) {
    const currentVal = select.value;
    const suppList = (state.suppliers || []).map(s => s.name);
    if (suppList.length === 0) suppList.push('EVE Energy Co., Ltd.', 'Daly Electronics Co.');
    const selectedSupp = currentVal || suppList[0];
    select.innerHTML = suppList.map(name => `<option value="${name}" ${name === selectedSupp ? 'selected' : ''}>${name}</option>`).join('');
  }
}

function renderSupplierStatement() {
  const select = $('#supplier-statement-select');
  const selectedSuppName = select?.value || (state.suppliers || [])[0]?.name || '';
  const suppKey = normalizeText(selectedSuppName);
  const supp = (state.suppliers || []).find(s => normalizeText(s.name) === suppKey);

  const entries = [...(state.supplierLedger || []).filter(l => normalizeText(l.supplier) === suppKey)].reverse();
  let totalDebit = 0;
  let totalCredit = 0;
  let runningBalance = 0;

  if ($('#supp-summary-name')) $('#supp-summary-name').textContent = selectedSuppName || 'Select Supplier';
  if ($('#supp-summary-contact')) $('#supp-summary-contact').textContent = [supp?.contactPerson, supp?.phone, supp?.gstin].filter(Boolean).join(' · ') || '—';
  if ($('#supp-ledger-table-title')) $('#supp-ledger-table-title').textContent = selectedSuppName ? `Supplier Statement of Account — ${selectedSuppName}` : 'Supplier Statement of Account';

  const rows = entries.map(entry => {
    totalDebit += entry.debit || 0;
    totalCredit += entry.credit || 0;
    runningBalance += (entry.credit || 0) - (entry.debit || 0);
    const bankAcc = entry.bankAccount || 'HDFC Bank Current A/C (50200012345678)';

    return `
      <tr>
        <td>${entry.date}</td>
        <td><strong>${entry.ref}</strong></td>
        <td>${entry.desc}</td>
        <td style="text-align:right;color:#2f855a;font-weight:700;">${entry.debit ? formatINR(entry.debit) : '—'}</td>
        <td style="text-align:right;color:#1e293b;">${entry.credit ? formatINR(entry.credit) : '—'}</td>
        <td style="text-align:right;font-weight:800;color:${runningBalance > 0 ? '#dc2626' : '#2f855a'};">${formatINR(runningBalance)}</td>
        <td><span style="font-size:11px;color:#4a5568;font-weight:600;">${bankAcc}</span></td>
      </tr>
    `;
  }).join('');

  if ($('#supp-total-purchases')) $('#supp-total-purchases').textContent = formatINR(totalCredit);
  if ($('#supp-total-payments')) $('#supp-total-payments').textContent = formatINR(totalDebit);
  if ($('#supp-net-balance')) $('#supp-net-balance').textContent = formatINR(runningBalance);

  if ($('#supplier-statement-table')) {
    $('#supplier-statement-table').innerHTML = rows || `<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:18px;">No purchase ledger transactions found for ${selectedSuppName || 'this supplier'}.</td></tr>`;
  }
}

function renderVehicleModels() {
  if ($('#vehicle-model-count-badge')) $('#vehicle-model-count-badge').textContent = (state.vehicleModels || []).length;

  if ($('#vehicle-models-table')) {
    $('#vehicle-models-table').innerHTML = (state.vehicleModels || []).map((vm, idx) => `
      <tr>
        <td><strong>${vm.name}</strong></td>
        <td>${categoryBadge(vm.type || 'E-Rickshaw')}</td>
        <td>${vm.motor || '1200W BLDC'}</td>
        <td>${vm.batterySpec || 'LFP 51.2V 100Ah'}</td>
        <td><span style="font-family:monospace;font-weight:700;">${vm.hsn || '87116010'}</span></td>
        <td><strong>${vm.gstRate || 5}%</strong></td>
        <td><strong style="color:#2f855a;">${formatINR(vm.price)}</strong></td>
        <td>
          <button class="secondary-btn btn-sell-vehicle-model-direct" data-idx="${idx}" style="padding:4px 8px;font-size:11px;background:#ebf8ff;color:#2b6cb0;font-weight:700;">↗ Sell Model</button>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="8" style="text-align:center;color:#a0aec0;padding:14px;">No EV vehicle models added yet.</td></tr>';
  }
}

function renderVehicles() {
  const availableVehicles = (state.vehicles || []).filter(v => v.status === 'Available in Showroom');
  if ($('#finished-vehicle-count')) $('#finished-vehicle-count').textContent = availableVehicles.length;
  if ($('#inv-vehicle-count')) $('#inv-vehicle-count').textContent = availableVehicles.length;

  const vehicleRowsHtml = (state.vehicles || []).map((v, idx) => `
    <tr>
      <td><strong style="font-family:monospace;color:#2b6cb0;">${v.chassisNo}</strong></td>
      <td><strong>${v.model}</strong></td>
      <td>${v.motorNo || '1200W BLDC'}</td>
      <td><span style="font-family:monospace;">${v.batterySerial || 'LFP 51.2V 100Ah'}</span></td>
      <td>${v.color || 'Standard'}</td>
      <td><strong style="color:#2f855a;">${formatINR(v.price)}</strong></td>
      <td>${badge(v.status || 'Available in Showroom')}</td>
      <td>
        ${v.status === 'Available in Showroom' 
          ? `<button class="primary-btn btn-sell-vehicle-direct" data-idx="${idx}" style="padding:4px 9px;font-size:11px;background:#2b6cb0;">↗ Sell Vehicle</button>`
          : `<span style="font-size:11px;color:#2f855a;font-weight:700;">Sold &amp; Dispatched</span>`}
      </td>
    </tr>
  `).join('') || '<tr><td colspan="8" style="text-align:center;color:#a0aec0;padding:16px;">No vehicles in showroom stock yet. Click "+ Add Vehicle to Stock" above.</td></tr>';

  if ($('#inventory-vehicles-table')) $('#inventory-vehicles-table').innerHTML = vehicleRowsHtml;
  if ($('#vehicle-stock-table')) $('#vehicle-stock-table').innerHTML = vehicleRowsHtml;

  if ($('#vehicle-sales-table')) {
    $('#vehicle-sales-table').innerHTML = (state.vehicleInvoices || []).map(vinv => `
      <tr>
        <td><strong>${vinv.invoice}</strong></td>
        <td><strong>${vinv.party}</strong><br><small style="color:#64748b;">${vinv.phone || ''}</small></td>
        <td>${vinv.model}</td>
        <td><span style="font-family:monospace;font-weight:700;color:#2b6cb0;">${vinv.chassisNo}</span></td>
        <td><span style="font-family:monospace;">${vinv.motorNo || '—'}</span></td>
        <td><strong style="color:#1e293b;">${formatINR(vinv.grandTotal)}</strong></td>
        <td><span style="font-size:11px;color:#4a5568;font-weight:600;">${vinv.bankAccount || 'HDFC Bank Current A/C'}</span></td>
        <td>${vinv.date}</td>
        <td>${badge('Sold & Dispatched')}</td>
      </tr>
    `).join('') || '<tr><td colspan="9" style="text-align:center;color:#a0aec0;padding:16px;">No EV vehicle sales recorded yet.</td></tr>';
  }
}

function renderDealerStatement() {
  const select = $('#dealer-statement-select');
  const selectedDealer = select?.value || (state.dealers || [])[0]?.name || '';
  const dealerKey = normalizeText(selectedDealer);
  const dealer = (state.dealers || []).find(d => normalizeText(d.name) === dealerKey);
  const entries = [...(state.ledger || []).filter(l => normalizeText(l.party) === dealerKey)].reverse();
  let totalDebit = 0;
  let totalCredit = 0;
  let runningBalance = 0;

  if ($('#dlr-stat-gstin')) $('#dlr-stat-gstin').textContent = dealer?.gstin || '—';
  if ($('#dlr-stat-contact')) $('#dlr-stat-contact').textContent = [dealer?.contactPerson, dealer?.phone].filter(Boolean).join(' · ') || '—';
  if ($('#dealer-statement-title')) $('#dealer-statement-title').textContent = selectedDealer ? `Dealer B2B Statement — ${selectedDealer}` : 'Dealer B2B Statement of Account';

  const rows = entries.map(entry => {
    totalDebit += entry.debit || 0;
    totalCredit += entry.credit || 0;
    runningBalance += (entry.debit || 0) - (entry.credit || 0);
    const bankAcc = entry.bankAccount || (entry.credit > 0 ? 'HDFC Bank Current A/C (50200012345678)' : 'Dealer Invoice Debit');
    return `
      <tr>
        <td>${entry.date}</td>
        <td><strong>${entry.ref}</strong></td>
        <td>${entry.desc}</td>
        <td style="text-align:right;">${entry.debit ? formatINR(entry.debit) : '—'}</td>
        <td style="text-align:right;color:#16a34a;">${entry.credit ? formatINR(entry.credit) : '—'}</td>
        <td style="text-align:right;font-weight:800;color:${runningBalance > 0 ? '#dc2626' : '#16a34a'};">${formatINR(runningBalance)}</td>
        <td><span style="font-size:11px;color:#4a5568;font-weight:600;">${bankAcc}</span></td>
      </tr>
    `;
  }).join('');

  if ($('#dlr-stat-debit')) $('#dlr-stat-debit').textContent = formatINR(totalDebit);
  if ($('#dlr-stat-credit')) $('#dlr-stat-credit').textContent = formatINR(totalCredit);
  if ($('#dlr-stat-balance')) $('#dlr-stat-balance').textContent = formatINR(runningBalance);
  if ($('#dealer-statement-sub')) $('#dealer-statement-sub').textContent = `Debits ${formatINR(totalDebit)} · Credits ${formatINR(totalCredit)} · Balance ${formatINR(runningBalance)}`;
  if ($('#dealer-statement-table')) {
    $('#dealer-statement-table').innerHTML = rows || `<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:18px;">No B2B ledger entries found for ${selectedDealer || 'this dealer'}.</td></tr>`;
  }
}

function renderLedger() {
  const partySelect = $('#ledger-party-select');
  if (!partySelect) return;

  const partySet = new Set();
  state.invoices.forEach(inv => partySet.add(inv.party));
  state.ledger.forEach(l => partySet.add(l.party));
  
  const partyList = Array.from(partySet);
  if (partyList.length === 0) partyList.push('RANJEET KUMAR', 'Rahul EV Hub');

  let selectedParty = partySelect.value || partyList[0];
  partySelect.innerHTML = partyList.map(p => `<option value="${p}" ${p === selectedParty ? 'selected' : ''}>${p}</option>`).join('');
  selectedParty = partySelect.value || partyList[0];

  const partyKey = normalizeText(selectedParty);
  const partyEntries = [...state.ledger.filter(l => normalizeText(l.party) === partyKey)].reverse();

  let totalDebit = 0;
  let totalCredit = 0;
  let runningBalance = 0;

  const statementRowsHtml = partyEntries.map(e => {
    totalDebit += (e.debit || 0);
    totalCredit += (e.credit || 0);
    runningBalance += ((e.debit || 0) - (e.credit || 0));
    const bankAcc = e.bankAccount || (e.credit > 0 ? 'HDFC Bank Current A/C (50200012345678)' : 'Sales Invoice Debit');

    return `
      <tr>
        <td>${e.date}</td>
        <td><strong>${e.ref}</strong></td>
        <td>${e.desc}</td>
        <td style="text-align:right;color:#1e293b;">${e.debit ? '₹ ' + e.debit.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '—'}</td>
        <td style="text-align:right;color:#16a34a;">${e.credit ? '₹ ' + e.credit.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '—'}</td>
        <td style="text-align:right;font-weight:700;color:${runningBalance > 0 ? '#dc2626' : '#16a34a'};">₹ ${runningBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        <td><span style="font-size:11px;color:#4a5568;font-weight:600;">${bankAcc}</span></td>
      </tr>
    `;
  }).join('');

  if ($('#ledger-total-debit')) $('#ledger-total-debit').textContent = `₹ ${totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  if ($('#ledger-total-credit')) $('#ledger-total-credit').textContent = `₹ ${totalCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  if ($('#ledger-total-balance')) $('#ledger-total-balance').textContent = `₹ ${runningBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  if ($('#ledger-title-party')) $('#ledger-title-party').textContent = `Statement of Account — ${selectedParty}`;
  if ($('#ledger-sub-party')) $('#ledger-sub-party').textContent = `Total Debits: ₹${totalDebit.toFixed(2)} | Credits: ₹${totalCredit.toFixed(2)} | Balance: ₹${runningBalance.toFixed(2)}`;

  if ($('#ledger-statement-table')) {
    $('#ledger-statement-table').innerHTML = statementRowsHtml || `<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:18px;">No ledger entries found for ${selectedParty}.</td></tr>`;
  }
}

function openSupplierModal() {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  $('#modal-title').textContent = 'Register New Raw Material & Component Supplier';
  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      <div class="field full"><label style="font-weight:700;">Supplier / Vendor Firm Name *</label><input name="name" placeholder="E.g. EVE Energy Co., Ltd." required /></div>
      <div class="field"><label style="font-weight:700;">Contact Person Name</label><input name="contactPerson" placeholder="E.g. Mr. Rajesh Sharma" /></div>
      <div class="field"><label style="font-weight:700;">Phone / Mobile</label><input name="phone" placeholder="9876501234" /></div>
      <div class="field"><label style="font-weight:700;">GSTIN / Tax ID Number</label><input name="gstin" placeholder="09AAACE1234F1Z1" /></div>
      <div class="field"><label style="font-weight:700;">Supplier Category</label><select name="category"><option>Cell Manufacturer</option><option>BMS Supplier</option><option>Chargers &amp; Enclosures</option><option>General Component Distributor</option></select></div>
      <div class="field"><label style="font-weight:700;">State / Location</label><input name="state" value="UTTAR PRADESH" /></div>
      <div class="field full"><label style="font-weight:700;">Full Address / City</label><input name="address" placeholder="Noida Sector 63, UP" /></div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'supplier';
  setTimeout(() => $('#modal-fields input[name="name"]')?.focus(), 30);
}

function openSupplierPaymentModal(suppName = '') {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const suppOptions = (state.suppliers || []).map(s => `<option value="${s.name}" ${s.name === suppName ? 'selected' : ''}>${s.name}</option>`).join('') || '<option value="EVE Energy Co., Ltd.">EVE Energy Co., Ltd.</option>';

  $('#modal-title').textContent = 'Record Supplier Payment Debit (Bank A/C / Transfer)';
  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      <div class="field full"><label style="font-weight:700;">Select Supplier *</label><select name="supplier">${suppOptions}</select></div>
      <div class="field"><label style="font-weight:700;">Payment Amount (₹) *</label><input name="amount" type="number" step="0.01" value="50000" required /></div>
      <div class="field"><label style="font-weight:700;">Paying Bank Account / Mode *</label>
        <select name="bankAccount" style="font-weight:700;">
          <option value="HDFC Bank Current A/C (50200012345678)">HDFC Bank — Current A/C (50200012345678)</option>
          <option value="ICICI Bank Business A/C (001105001234)">ICICI Bank — Business A/C (001105001234)</option>
          <option value="SBI Corporate A/C (30981234567)">SBI — Corporate A/C (30981234567)</option>
          <option value="UPI / PhonePe / GPay">UPI / PhonePe / GPay</option>
          <option value="Cash in Hand">Cash in Hand</option>
          <option value="Cheque / DD">Cheque / Demand Draft</option>
        </select>
      </div>
      <div class="field"><label style="font-weight:700;">Payment Date *</label><input name="date" type="date" value="${new Date().toISOString().split('T')[0]}" required /></div>
      <div class="field"><label style="font-weight:700;">Reference / UTR / Cheque No</label><input name="ref" value="UTR-${Date.now().toString().slice(-6)}" /></div>
      <div class="field full"><label style="font-weight:700;">Remarks / Notes</label><input name="notes" placeholder="NEFT Bank Transfer for Cell Batch Invoice" /></div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'supplier-pay';
}

function openVehicleModelModal() {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  $('#modal-title').textContent = 'Add EV Vehicle Model to Catalog';
  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      <div class="field full"><label style="font-weight:700;">Vehicle Model Name *</label><input name="name" value="Deltic Star E-Rickshaw (L5)" required /></div>
      <div class="field"><label style="font-weight:700;">Vehicle Category / Type *</label><select name="type"><option>Passenger 3W E-Rickshaw</option><option>Commercial 3W Cargo Loader</option><option>Heavy Duty 3W E-Loader</option><option>2W High-Speed EV Scooter</option></select></div>
      <div class="field"><label style="font-weight:700;">Motor Specifications</label><input name="motor" value="1200W BLDC Heavy Duty" /></div>
      <div class="field"><label style="font-weight:700;">Recommended Battery Pack</label><input name="batterySpec" value="LFP 51.2V 100Ah" /></div>
      <div class="field"><label style="font-weight:700;">Vehicle HSN Code</label><input name="hsn" value="87116010" /></div>
      <div class="field"><label style="font-weight:700;">GST Rate (%)</label><input name="gstRate" type="number" value="5" /></div>
      <div class="field full"><label style="font-weight:700;">Retail Ex-Showroom Price (₹) *</label><input name="price" type="number" value="145000" style="font-weight:800;" required /></div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'vehicle-model';
}

function openAddVehicleStockModal() {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const modelOptions = (state.vehicleModels || []).map(vm => `<option value="${vm.name}">${vm.name} (${vm.type})</option>`).join('') || '<option value="Deltic Star E-Rickshaw (L5)">Deltic Star E-Rickshaw (L5)</option>';

  const batteryOptions = (state.production || []).filter(p => p.qc === 'Passed' || p.status === 'Saleable').map(p => `<option value="${p.serial}">${p.serial} (${p.model})</option>`).join('') || '<option value="LFP 51.2V 100Ah">LFP 51.2V 100Ah Pack</option>';

  $('#modal-title').textContent = 'Add EV Vehicle to Showroom Inventory';
  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      <div class="field full"><label style="font-weight:700;">Select Vehicle Model *</label><select name="model" id="veh-stock-model-select">${modelOptions}</select></div>
      <div class="field"><label style="font-weight:700;">Chassis / VIN Number *</label><input name="chassisNo" value="CHASSIS-DELTIC-2026-${Date.now().toString().slice(-4)}" required /></div>
      <div class="field"><label style="font-weight:700;">Motor Serial Number *</label><input name="motorNo" value="MTR-1200W-${Date.now().toString().slice(-4)}" required /></div>
      <div class="field"><label style="font-weight:700;">Battery Serial Installed</label><select name="batterySerial">${batteryOptions}</select></div>
      <div class="field"><label style="font-weight:700;">Vehicle Color</label><input name="color" value="Glossy Royal Blue" /></div>
      <div class="field full"><label style="font-weight:700;">Retail Ex-Showroom Price (₹) *</label><input name="price" id="veh-stock-price" type="number" value="145000" style="font-weight:800;" required /></div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'vehicle-stock';
}

function openVehicleSaleModal(chassisIdx = null) {
  const backdrop = $('#modal-backdrop');
  if (!backdrop) return;

  const targetVeh = chassisIdx !== null ? (state.vehicles || [])[chassisIdx] : null;

  const vehStockOptions = (state.vehicles || []).filter(v => v.status === 'Available in Showroom' || (targetVeh && v.chassisNo === targetVeh.chassisNo)).map(v => `<option value="${v.chassisNo}" ${targetVeh && v.chassisNo === targetVeh.chassisNo ? 'selected' : ''}>${v.chassisNo} — ${v.model} (${formatINR(v.price)})</option>`).join('') || '<option value="CHASSIS-DELTIC-2026-0089">CHASSIS-DELTIC-2026-0089 — Deltic Star E-Rickshaw</option>';

  const initialVeh = targetVeh || (state.vehicles || [])[0] || { model: 'Deltic Star E-Rickshaw (L5)', motorNo: 'MTR-1200W-8891', batterySerial: 'BAT-2026-000048', color: 'Glossy Royal Blue', price: 145000 };

  $('#modal-title').textContent = 'Record EV Vehicle Sale & Issue Tax Invoice';
  $('#modal-fields').innerHTML = `
    <div class="form-grid">
      <div class="field full" style="background:#ebf8ff;padding:10px;border-radius:6px;border:1px solid #bee3f8;">
        <label style="font-weight:800;color:#2b6cb0;">Select Vehicle from Showroom Stock *</label>
        <select name="chassisNo" id="veh-sale-chassis-select" style="font-weight:700;width:100%;padding:6px;">${vehStockOptions}</select>
      </div>

      <div class="field"><label style="font-weight:700;">Vehicle Model Name</label><input name="model" id="veh-sale-model" value="${initialVeh.model}" readonly style="background:#edf2f7;" /></div>
      <div class="field"><label style="font-weight:700;">Motor Number</label><input name="motorNo" id="veh-sale-motor" value="${initialVeh.motorNo || ''}" readonly style="background:#edf2f7;" /></div>
      <div class="field"><label style="font-weight:700;">Battery Serial Installed</label><input name="batterySerial" id="veh-sale-battery" value="${initialVeh.batterySerial || ''}" readonly style="background:#edf2f7;" /></div>
      <div class="field"><label style="font-weight:700;">Vehicle Color</label><input name="color" id="veh-sale-color" value="${initialVeh.color || ''}" readonly style="background:#edf2f7;" /></div>

      <div class="field full"><label style="font-weight:800;color:#2b6cb0;">Customer / Dealer Name (Auto-Suggest Database) *</label>
        <input name="party" id="veh-sale-party-input" list="dealers-datalist" placeholder="Type or select Customer/Dealer..." value="RANJEET KUMAR" required style="font-weight:700;" />
        <datalist id="dealers-datalist">
          ${(state.dealers || []).map(d => `<option value="${d.name}">${d.name} (${d.gstin || 'Dealer'})</option>`).join('')}
          ${(state.invoices || []).map(i => `<option value="${i.party}">${i.party}</option>`).join('')}
        </datalist>
      </div>

      <div class="field"><label style="font-weight:700;">Phone / Mobile</label><input name="phone" id="veh-sale-phone" value="9876543210" /></div>
      <div class="field"><label style="font-weight:700;">Customer / Dealer State</label><input name="partyState" id="veh-sale-state" value="UTTAR PRADESH" /></div>
      <div class="field full"><label style="font-weight:700;">Full Address / City</label><input name="address" id="veh-sale-address" value="Gaighat, Gorakhpur" /></div>

      <div class="field"><label style="font-weight:700;">Receiving Bank Account / Payment Mode *</label>
        <select name="bankAccount" style="font-weight:700;">
          <option value="HDFC Bank Current A/C (50200012345678)">HDFC Bank — Current A/C (50200012345678)</option>
          <option value="ICICI Bank Business A/C (001105001234)">ICICI Bank — Business A/C (001105001234)</option>
          <option value="SBI Corporate A/C (30981234567)">SBI — Corporate A/C (30981234567)</option>
          <option value="UPI / PhonePe / GPay">UPI / PhonePe / GPay</option>
          <option value="Cash in Hand">Cash in Hand</option>
          <option value="Cheque / DD">Cheque / Demand Draft</option>
        </select>
      </div>

      <div class="field"><label style="font-weight:700;">Vehicle HSN Code</label><input name="hsn" value="87116010" /></div>

      <div class="field"><label style="font-weight:800;color:#2f855a;">Grand Total Sale Price (₹) *</label><input name="grandTotal" id="veh-sale-total" type="number" value="${initialVeh.price || 145000}" style="font-weight:800;font-size:15px;color:#2f855a;" required /></div>
      <div class="field"><label style="font-weight:800;color:#2b6cb0;">Upfront Payment Received (₹) *</label><input name="paidAmount" id="veh-sale-paid" type="number" value="${initialVeh.price || 145000}" style="font-weight:800;font-size:15px;" required /></div>
    </div>
  `;

  backdrop.removeAttribute('hidden');
  backdrop.style.display = 'grid';
  backdrop.dataset.kind = 'vehicle-sale';

  $('#veh-sale-chassis-select')?.addEventListener('change', (e) => {
    const chassis = e.target.value;
    const veh = (state.vehicles || []).find(v => v.chassisNo === chassis);
    if (veh) {
      $('#veh-sale-model').value = veh.model;
      $('#veh-sale-motor').value = veh.motorNo || '';
      $('#veh-sale-battery').value = veh.batterySerial || '';
      $('#veh-sale-color').value = veh.color || '';
      $('#veh-sale-total').value = veh.price || 145000;
      $('#veh-sale-paid').value = veh.price || 145000;
    }
  });

  $('#veh-sale-party-input')?.addEventListener('change', (e) => {
    const name = e.target.value;
    const dealer = (state.dealers || []).find(d => normalizeText(d.name) === normalizeText(name));
    if (dealer) {
      if ($('#veh-sale-phone')) $('#veh-sale-phone').value = dealer.phone || '';
      if ($('#veh-sale-state')) $('#veh-sale-state').value = dealer.state || 'UTTAR PRADESH';
      if ($('#veh-sale-address')) $('#veh-sale-address').value = [dealer.address, dealer.city].filter(Boolean).join(', ');
    } else {
      const inv = (state.invoices || []).find(i => normalizeText(i.party) === normalizeText(name));
      if (inv) {
        if ($('#veh-sale-phone')) $('#veh-sale-phone').value = inv.phone || '';
        if ($('#veh-sale-state')) $('#veh-sale-state').value = inv.partyState || 'UTTAR PRADESH';
        if ($('#veh-sale-address')) $('#veh-sale-address').value = inv.address || '';
      }
    }
  });
}

function bind() {
  closeModal();
  try {
    loadState();
  } catch (e) {
    console.warn('loadState notice:', e);
  }

  // Document-level event delegation for modals, navigation & actions (BOUND FIRST)
  document.addEventListener('click', (e) => {
    // 1. Navigation items (Sidebar & any [data-view] element)
    const navBtn = e.target.closest('[data-view]');
    if (navBtn) {
      e.preventDefault();
      const targetView = navBtn.dataset.view;
      if (targetView) {
        const currentRole = getCurrentUserRole();
        if (targetView === 'settings' && currentRole !== 'Admin') {
          toast('🔒 System Settings are restricted to Administrator profile.');
          return;
        }
        showView(targetView);
      }
      return;
    }

    // 2. Action buttons (data-action)
    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      e.preventDefault();
      const a = actionBtn.dataset.action;
      if (a) {
        showView(a === 'sale' ? 'sales' : a);
        if (a === 'production') openModal('production');
        if (a === 'inventory') openModal('stock');
        if (a === 'sale') openModal('sale');
      }
      return;
    }

    // 3. Dealer B2B Ledger view button
    const viewDlrBtn = e.target.closest('.btn-view-dealer-statement');
    if (viewDlrBtn) {
      e.preventDefault();
      const dlrName = viewDlrBtn.dataset.dealer;
      const dlrSelect = $('#dealer-statement-select');
      if (dlrSelect) {
        dlrSelect.value = dlrName;
        renderDealerStatement();
      }
      return;
    }

    // 4. Add Dealer Payment Credit
    if (e.target.id === 'btn-dealer-add-credit') {
      e.preventDefault();
      const dlrSelect = $('#dealer-statement-select');
      openPaymentCreditModal(dlrSelect ? dlrSelect.value : '');
      return;
    }

    // 5. Register New Dealer Modal
    if (e.target.id === 'btn-open-new-dealer-modal') {
      e.preventDefault();
      openModal('dealer');
      return;
    }

    const printInvBtn = e.target.closest('.btn-print-hk-invoice');
    if (printInvBtn) {
      e.preventDefault();
      printHkMotorsInvoice(printInvBtn.dataset.invoice);
      return;
    }

    if (e.target.id === 'btn-print-ledger') {
      e.preventDefault();
      renderLedger();
      setTimeout(() => window.print(), 0);
      return;
    }

    if (e.target.id === 'btn-print-dealer-statement') {
      e.preventDefault();
      renderDealerStatement();
      setTimeout(() => window.print(), 0);
      return;
    }

    if (e.target.id === 'btn-open-payment-modal' || e.target.id === 'btn-add-ledger-credit') {
      e.preventDefault();
      openPaymentCreditModal();
      return;
    }

    const activatePackBtn = e.target.closest('.btn-activate-pack-warranty');
    if (activatePackBtn) {
      e.preventDefault();
      activateWarrantyModal(activatePackBtn.dataset.serial);
      return;
    }

    const editClaimBtn = e.target.closest('.btn-edit-claim');
    if (editClaimBtn) {
      e.preventDefault();
      updateClaimModal(editClaimBtn.dataset.idx);
      return;
    }

    const runQcBtn = e.target.closest('.btn-run-qc');
    if (runQcBtn) {
      e.preventDefault();
      runQcModal(runQcBtn.dataset.idx);
      return;
    }

    const issueBtn = e.target.closest('.btn-issue-replacement');
    if (issueBtn) {
      e.preventDefault();
      issueReplacementModal(issueBtn.dataset.idx);
      return;
    }

    const editModelBtn = e.target.closest('.btn-edit-model');
    if (editModelBtn) {
      e.preventDefault();
      editModelModal(editModelBtn.dataset.idx);
      return;
    }

    const editGstBtn = e.target.closest('.btn-edit-comp-gst');
    if (editGstBtn) {
      const idx = Number(editGstBtn.dataset.idx);
      openCompGstModal(idx);
      return;
    }

    const repairInvBtn = e.target.closest('.btn-create-repair-inv');
    if (repairInvBtn) {
      const idx = Number(repairInvBtn.dataset.idx);
      openRepairInvoiceModal(idx);
      return;
    }

    const invFilterBtn = e.target.closest('.btn-inv-filter');
    if (invFilterBtn) {
      const filterKind = invFilterBtn.dataset.filterKind || 'all';
      window.__currentInvGstFilter = filterKind;
      $$('.btn-inv-filter').forEach(b => b.classList.toggle('active', b.dataset.filterKind === filterKind));
      render();
      return;
    }

    // EV Vehicle & Supplier button handlers
    if (e.target.id === 'btn-open-vehicle-sale-modal' || e.target.closest('.btn-sell-vehicle-model-direct')) {
      e.preventDefault();
      openVehicleSaleModal();
      return;
    }

    const sellVehDirectBtn = e.target.closest('.btn-sell-vehicle-direct');
    if (sellVehDirectBtn) {
      e.preventDefault();
      const idx = Number(sellVehDirectBtn.dataset.idx);
      openVehicleSaleModal(idx);
      return;
    }

    if (e.target.id === 'btn-open-vehicle-stock-modal' || e.target.id === 'btn-add-vehicle-stock-trigger') {
      e.preventDefault();
      openAddVehicleStockModal();
      return;
    }

    if (e.target.id === 'btn-add-vehicle-model-trigger') {
      e.preventDefault();
      openVehicleModelModal();
      return;
    }

    if (e.target.id === 'btn-open-supplier-pay-modal' || e.target.id === 'btn-record-supp-payment-direct') {
      e.preventDefault();
      const suppSelect = $('#supplier-statement-select');
      openSupplierPaymentModal(suppSelect ? suppSelect.value : '');
      return;
    }

    const viewSuppBtn = e.target.closest('.btn-view-supp-statement');
    if (viewSuppBtn) {
      e.preventDefault();
      const suppName = viewSuppBtn.dataset.supp;
      const suppSelect = $('#supplier-statement-select');
      if (suppSelect) {
        suppSelect.value = suppName;
        renderSupplierStatement();
      }
      showView('purchase-ledger');
      return;
    }

    const modalBtn = e.target.closest('[data-modal]');
    if (modalBtn) {
      e.preventDefault();
      const kind = modalBtn.dataset.modal.replace('-modal', '');
      if (kind === 'supplier') openSupplierModal();
      else openModal(kind);
      return;
    }

    const tabBtn = e.target.closest('.tab');
    if (tabBtn) {
      e.preventDefault();
      const row = tabBtn.closest('.tab-row');
      if (row) {
        $$('.tab', row).forEach(x => x.classList.remove('active'));
        tabBtn.classList.add('active');
        const targetId = tabBtn.dataset.tab;
        if (targetId) {
          const parentView = tabBtn.closest('.view');
          if (parentView) {
            $$('.tab-content', parentView).forEach(c => c.classList.remove('active'));
            const targetEl = $(`#${targetId}`);
            if (targetEl) targetEl.classList.add('active');
          }
        }
      }
      return;
    }
  });

  // Ledger party selector change handler
  $('#ledger-party-select')?.addEventListener('change', () => {
    renderLedger();
  });
  $('#dealer-statement-select')?.addEventListener('change', () => {
    renderDealerStatement();
  });
  $('#supplier-statement-select')?.addEventListener('change', () => {
    renderSupplierStatement();
  });

  // Modal controls
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-cancel').addEventListener('click', closeModal);
  $('#modal-form').addEventListener('submit', submitModal);
  $('#modal-backdrop').addEventListener('click', e => {
    if (e.target.id === 'modal-backdrop') closeModal();
  });

  // QR Label Generator Controls
  $('#btn-generate-label')?.addEventListener('click', () => {
    const sel = $('#qr-pack-select')?.value;
    if (sel) {
      renderQrLabelPreview(sel);
      toast(`Generated physical QR Label for ${sel}`);
    }
  });

  $('#qr-pack-select')?.addEventListener('change', (e) => {
    renderQrLabelPreview(e.target.value);
  });

  // QR Lookup
  $('#lookup-btn').addEventListener('click', () => lookup($('#lookup-token').value.trim()));
  $('#unknown-token').addEventListener('click', () => {
    $('#lookup-token').value = 'vf-unknown-0000';
    lookup('vf-unknown-0000');
  });

  // Report Card selection & CSV export
  $$('.report-card').forEach(c => {
    c.addEventListener('click', (e) => {
      e.preventDefault();
      const rType = c.dataset.report;
      if (rType) renderReport(rType);
    });
  });

  $('#btn-export-csv')?.addEventListener('click', downloadCSV);
  $('#btn-export-inventory-csv')?.addEventListener('click', downloadInventoryCSV);
  $('#btn-export-sales-csv')?.addEventListener('click', downloadSalesCSV);
  $('#btn-table-export-csv')?.addEventListener('click', downloadCSV);
  $('#btn-export-production-csv')?.addEventListener('click', downloadProductionCSV);
  $('#btn-export-warranty-csv')?.addEventListener('click', downloadWarrantyCSV);
  $('#btn-export-claims-csv')?.addEventListener('click', downloadClaimsCSV);
  $('#btn-refresh-production')?.addEventListener('click', render);
  $('#export-report')?.addEventListener('click', downloadCSV);

  // Role Profile Switcher Handlers
  $('#btn-switch-user-role')?.addEventListener('click', openRoleModal);
  $('#sidebar-profile-card')?.addEventListener('click', openRoleModal);
  $('#topbar-avatar')?.addEventListener('click', openRoleModal);

  // Google Sheets Cloud Sync Handlers
  $('#btn-sync-sheets')?.addEventListener('click', () => syncToGoogleSheets(true));
  $('#btn-push-sheets')?.addEventListener('click', () => syncToGoogleSheets(true));
  $('#btn-config-sheets')?.addEventListener('click', openGoogleSheetsModal);
  $('#cloud-sync-status-bar')?.addEventListener('click', openGoogleSheetsModal);

  // Search filters & Sales/Warranty Filter Handlers
  $('#sales-timeframe-filter')?.addEventListener('change', (e) => {
    const customContainer = $('#sales-custom-date-container');
    if (customContainer) {
      customContainer.style.display = e.target.value === 'custom' ? 'flex' : 'none';
    }
    render();
  });
  $('#sales-type-filter')?.addEventListener('change', render);
  $('#sales-search-input')?.addEventListener('input', render);
  $('#sales-date-from')?.addEventListener('change', render);
  $('#sales-date-to')?.addEventListener('change', render);

  $('#warranty-status-filter')?.addEventListener('change', render);
  $('#warranty-search-input')?.addEventListener('input', render);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-quick-record-payment');
    if (btn) {
      const party = btn.dataset.party;
      openPaymentCreditModal(party);
    }
  });

  const searchModels = $('[data-filter="models-table"]');
  searchModels?.addEventListener('input', () => {
    $$('#models-table tr').forEach(r => r.style.display = r.textContent.toLowerCase().includes(searchModels.value.toLowerCase()) ? '' : 'none');
  });

  const searchComps = $('[data-filter="components-table"]');
  searchComps?.addEventListener('input', () => {
    $$('#components-table tr').forEach(r => r.style.display = r.textContent.toLowerCase().includes(searchComps.value.toLowerCase()) ? '' : 'none');
  });

  const searchInventory = $('[data-filter="inventory-table"]');
  searchInventory?.addEventListener('input', () => {
    $$('#inventory-table tr, #battery-inventory-table tr').forEach(r => r.style.display = r.textContent.toLowerCase().includes(searchInventory.value.toLowerCase()) ? '' : 'none');
  });

  const searchProduction = $('[data-filter="production-table"]');
  searchProduction?.addEventListener('input', () => {
    $$('#production-table tr').forEach(r => r.style.display = r.textContent.toLowerCase().includes(searchProduction.value.toLowerCase()) ? '' : 'none');
  });

  // Settings Save & Backup Handlers
  $('#btn-save-all-settings')?.addEventListener('click', () => {
    const settings = {
      companyName: $('#set-company-name')?.value || 'HK MOTORS',
      tagline: $('#set-company-tagline')?.value || '',
      gstin: $('#set-company-gstin')?.value || '',
      jurisdiction: $('#set-company-jurisdiction')?.value || '',
      address: $('#set-company-address')?.value || '',
      phone: $('#set-company-phone')?.value || '',
      email: $('#set-company-email')?.value || '',
      gstRate: Number($('#set-gst-rate-battery')?.value || 5),
      gstRateBattery: Number($('#set-gst-rate-battery')?.value || 5),
      gstRateCharger: Number($('#set-gst-rate-charger')?.value || 18),
      gstRateAccessory: Number($('#set-gst-rate-accessory')?.value || 18),
      gstRateService: Number($('#set-gst-rate-service')?.value || 18),
      hsnBattery: $('#set-hsn-battery')?.value || '87116020',
      hsnCharger: $('#set-hsn-charger')?.value || '85044090',
      adminPassword: $('#set-admin-password')?.value || 'ChangeMe123!'
    };
    localStorage.setItem('tejas_system_settings', JSON.stringify(settings));
    toast('💾 Saved System Settings & Category Tax Rates successfully!');
  });

  $('#btn-open-cloud-wizard')?.addEventListener('click', openGoogleSheetsModal);

  // Backup Export
  $('#btn-export-backup-json')?.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    const dateStr = new Date().toISOString().split('T')[0];
    dlAnchorElem.setAttribute("download", `lithynova_battery_system_backup_${dateStr}.json`);
    dlAnchorElem.click();
    toast('📥 System Data Backup JSON downloaded successfully!');
  });

  // Backup Restore
  $('#btn-trigger-restore')?.addEventListener('click', () => {
    $('#input-restore-file')?.click();
  });

  $('#input-restore-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && typeof parsed === 'object') {
          Object.keys(parsed).forEach(k => {
            if (Array.isArray(parsed[k])) state[k] = parsed[k];
          });
          saveState();
          render();
          toast('✅ Restored System Data from JSON Backup file!');
        }
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  });

  $('#btn-trigger-restore')?.addEventListener('click', () => {
    if (!isUserAdmin()) {
      toast('Access Denied: Only Administrators can restore backup data.');
      return;
    }
    $('#input-restore-file')?.click();
  });

  $('#btn-reset-factory-data')?.addEventListener('click', () => {
    if (!isUserAdmin()) {
      toast('Access Denied: Only Administrators can reset factory data.');
      return;
    }
    if (confirm('Are you sure you want to reset all local data to factory defaults?')) {
      localStorage.removeItem('voltforge_state_v3');
      window.location.reload();
    }
  });

  // Reset App Data
  $('#reset-app-btn')?.addEventListener('click', () => {
    if (!isUserAdmin()) {
      toast('Access Denied: Only Administrators can reset application data.');
      return;
    }
    if (confirm('Are you sure you want to reset all local data to clean default factory state?')) {
      localStorage.removeItem('voltforge_state_v3');
      window.location.reload();
    }
  });

  // Handle URL token parameter for direct smartphone camera QR scan
  const urlParams = new URLSearchParams(window.location.search);
  const scannedToken = urlParams.get('token');
  if (scannedToken) {
    showView('lookup');
    if ($('#lookup-token')) $('#lookup-token').value = scannedToken;
    lookup(scannedToken);
  }
}

bind();
