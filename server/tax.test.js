const assert = require('node:assert/strict');
const { calculateSaleTax } = require('./tax');

const settings = {
    gstin: '09ANLPY7318P1ZT',
    jurisdiction: 'GORAKHPUR JURISDICTION',
    gstRateBattery: 5,
    gstRateVehicle: 12,
    gstRateCharger: 18,
    gstRateAccessory: 18,
    gstRateService: 18,
    hsnVehicle: '87116010'
};

const intra = calculateSaleTax([{ category: 'vehicle', hsn: '87116010', qty: 1, price: 100000 }], { partyState: 'UTTAR PRADESH' }, settings);
assert.equal(intra.taxMode, 'INTRA');
assert.equal(intra.taxableValue, 100000);
assert.equal(intra.totalGst, 12000);
assert.equal(intra.cgstAmount, 6000);
assert.equal(intra.sgstAmount, 6000);
assert.equal(intra.grandTotal, 112000);

const interstate = calculateSaleTax([{ category: 'battery', qty: 2, price: 50000 }], { partyState: 'MAHARASHTRA' }, settings);
assert.equal(interstate.taxMode, 'IGST');
assert.equal(interstate.totalGst, 5000);
assert.equal(interstate.igstAmount, 5000);
assert.equal(interstate.cgstAmount, 0);
assert.equal(interstate.grandTotal, 105000);

assert.throws(() => calculateSaleTax([{ category: 'battery', qty: 0, price: 100 }], {}, settings), /quantity/);
assert.throws(() => calculateSaleTax([{ category: 'battery', qty: 1, price: -1 }], {}, settings), /price/);

console.log('tax.test.js passed');
