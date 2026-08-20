const DEFAULT_TAX_RATES = Object.freeze({ battery: 5, vehicle: 5, charger: 18, accessory: 18, service: 18 });
const STATE_CODES = Object.freeze({ 'JAMMU AND KASHMIR': '01', 'HIMACHAL PRADESH': '02', 'PUNJAB': '03', 'CHANDIGARH': '04', 'UTTARAKHAND': '05', 'HARYANA': '06', 'DELHI': '07', 'RAJASTHAN': '08', 'UTTAR PRADESH': '09', 'BIHAR': '10', 'SIKKIM': '11', 'ARUNACHAL PRADESH': '12', 'NAGALAND': '13', 'MANIPUR': '14', 'MIZORAM': '15', 'TRIPURA': '16', 'MEGHALAYA': '17', 'ASSAM': '18', 'WEST BENGAL': '19', 'JHARKHAND': '20', 'ODISHA': '21', 'CHHATTISGARH': '22', 'MADHYA PRADESH': '23', 'GUJARAT': '24', 'DAMAN AND DIU': '25', 'DADRA AND NAGAR HAVELI': '26', 'MAHARASHTRA': '27', 'ANDHRA PRADESH': '37', 'KARNATAKA': '29', 'GOA': '30', 'LAKSHADWEEP': '31', 'KERALA': '32', 'TAMIL NADU': '33', 'PUDUCHERRY': '34', 'ANDAMAN AND NICOBAR': '35', 'TELANGANA': '36' });

const money = value => Math.round((Number(value) || 0) * 100) / 100;
const badRequest = message => Object.assign(new Error(message), { statusCode: 400 });

function finiteNumber(value, label, { min = -Infinity, max = Infinity } = {}) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < min || number > max) throw badRequest(`${label} must be between ${min} and ${max}`);
    return number;
}

function configuredTaxRate(item = {}, settings = {}) {
    const text = `${item.category || ''} ${item.desc || ''} ${item.description || ''}`.toLowerCase();
    const hsn = String(item.hsn || '').trim();
    let key = 'accessory';
    if (item.category === 'vehicle' || hsn === String(settings.hsnVehicle || '87116010').trim() || /vehicle|e-rickshaw|cargo loader/.test(text)) key = 'vehicle';
    else if (item.category === 'battery' || /battery|pack|lfp|nmc/.test(text)) key = 'battery';
    else if (item.category === 'charger' || /charger|power unit/.test(text)) key = 'charger';
    else if (item.category === 'service' || /repair|labour|service|electricity|testing/.test(text)) key = 'service';
    const settingKey = `gstRate${key[0].toUpperCase()}${key.slice(1)}`;
    const configured = Number(settings[settingKey]);
    if (Number.isFinite(configured)) return finiteNumber(configured, `${settingKey}`, { min: 0, max: 100 });
    const legacy = Number(settings.gstRate);
    if (Number.isFinite(legacy)) return finiteNumber(legacy, 'gstRate', { min: 0, max: 100 });
    const supplied = Number(item.gstRate ?? item.taxRate);
    if (Number.isFinite(supplied)) return finiteNumber(supplied, 'GST rate', { min: 0, max: 100 });
    return DEFAULT_TAX_RATES[key];
}

function resolveTaxMode(invoice = {}, settings = {}) {
    const companyGstin = String(settings.gstin || '').trim().toUpperCase();
    const partyGstin = String(invoice.partyGstin || invoice.gstin || '').trim().toUpperCase();
    if (/^\d{2}[A-Z0-9]{13}$/.test(companyGstin) && /^\d{2}[A-Z0-9]{13}$/.test(partyGstin)) return companyGstin.slice(0, 2) === partyGstin.slice(0, 2) ? 'INTRA' : 'IGST';
    const stateCode = value => {
        const text = String(value || '').trim().toUpperCase();
        if (/^\d{2}$/.test(text)) return text;
        const match = Object.keys(STATE_CODES).find(name => text.includes(name));
        return match ? STATE_CODES[match] : '';
    };
    const companyStateCode = stateCode(companyGstin.slice(0, 2)) || stateCode(settings.jurisdiction);
    const partyStateCode = stateCode(invoice.partyState);
    if (companyStateCode && partyStateCode) return companyStateCode === partyStateCode ? 'INTRA' : 'IGST';
    const companyState = String(settings.jurisdiction || '').trim().toLowerCase();
    const partyState = String(invoice.partyState || '').trim().toLowerCase();
    if (companyState && partyState) return companyState === partyState ? 'INTRA' : 'IGST';
    const taxMode = String(invoice.taxMode || 'INTRA').trim().toUpperCase();
    if (!['INTRA', 'IGST'].includes(taxMode)) throw badRequest('Tax mode must be INTRA or IGST');
    return taxMode;
}

function calculateSaleTax(items, invoice, settings = {}) {
    if (!Array.isArray(items) || !items.length) throw badRequest('At least one invoice item is required');
    const taxMode = resolveTaxMode(invoice, settings);
    const isIgst = taxMode === 'IGST';
    const normalizedItems = items.map((item, index) => {
        const qty = finiteNumber(item.qty ?? item.quantity ?? 1, `Item ${index + 1} quantity`, { min: 0.0001, max: 1000000 });
        const price = finiteNumber(item.price ?? item.unitPrice ?? 0, `Item ${index + 1} price`, { min: 0, max: 1000000000 });
        const taxableAmount = money(qty * price);
        const gstRate = configuredTaxRate(item, settings);
        const gstAmount = money(taxableAmount * gstRate / 100);
        const cgstAmount = isIgst ? 0 : money(gstAmount / 2);
        const sgstAmount = isIgst ? 0 : money(gstAmount - cgstAmount);
        const igstAmount = isIgst ? gstAmount : 0;
        const cessAmount = finiteNumber(item.cessAmount ?? 0, `Item ${index + 1} cess`, { min: 0, max: 1000000000 });
        return { ...item, sr: item.sr ?? index + 1, qty, price, amount: taxableAmount, gstRate, gstAmount, cgstAmount, sgstAmount, igstAmount, cessAmount };
    });
    const taxableValue = money(normalizedItems.reduce((sum, item) => sum + item.amount, 0));
    const totalGst = money(normalizedItems.reduce((sum, item) => sum + item.gstAmount, 0));
    const cgstAmount = money(normalizedItems.reduce((sum, item) => sum + item.cgstAmount, 0));
    const sgstAmount = money(normalizedItems.reduce((sum, item) => sum + item.sgstAmount, 0));
    const igstAmount = money(normalizedItems.reduce((sum, item) => sum + item.igstAmount, 0));
    const cessAmount = money(normalizedItems.reduce((sum, item) => sum + item.cessAmount, 0));
    return { items: normalizedItems, taxableValue, totalGst, cgstAmount, sgstAmount, igstAmount, cessAmount, taxMode, grandTotal: money(taxableValue + totalGst + cessAmount) };
}

module.exports = { DEFAULT_TAX_RATES, money, finiteNumber, resolveTaxMode, calculateSaleTax };
