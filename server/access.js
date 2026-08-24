const ROLES = Object.freeze({
    ADMIN: 'Admin',
    SALES: 'SalesProcurement',
    BATTERY: 'BatteryOperator'
});

const ROLE_LABELS = Object.freeze({
    [ROLES.ADMIN]: 'Administrator',
    [ROLES.SALES]: 'Sales & Procurement',
    [ROLES.BATTERY]: 'Battery Operator'
});

const ROLE_PERMISSIONS = Object.freeze({
    [ROLES.ADMIN]: ['*'],
    [ROLES.SALES]: [
        'dashboard.read', 'lookup.read', 'reports.read',
        'sales.read', 'sales.write', 'finance.read', 'finance.write',
        'purchase.read', 'purchase.write', 'suppliers.read', 'suppliers.write',
        'dealers.read', 'dealers.write', 'inventory.read', 'inventory.write',
        'models.read', 'components.read', 'production.read',
        'warranty.read', 'warranty.write'
    ],
    [ROLES.BATTERY]: [
        'dashboard.read', 'lookup.read', 'reports.read',
        'inventory.read', 'inventory.write', 'components.read', 'components.write',
        'models.read', 'models.write', 'production.read', 'production.write', 'production.qc',
        'warranty.read', 'warranty.write'
    ]
});

const ROLE_WRITABLE_TABLES = Object.freeze({
    [ROLES.SALES]: [
        'dealers', 'suppliers', 'supplier_ledger', 'purchase_bills', 'inventory',
        'sales', 'ledger', 'warranties', 'claims', 'invoices', 'vehicles', 'vehicle_invoices'
    ],
    [ROLES.BATTERY]: [
        'components', 'models', 'inventory', 'production', 'warranties', 'claims'
    ]
});

const ROLE_READ_TABLES = Object.freeze({
    [ROLES.SALES]: [
        'components', 'models', 'inventory', 'production', 'dealers', 'sales', 'invoices',
        'ledger', 'warranties', 'claims', 'suppliers', 'supplier_ledger', 'purchase_bills',
        'vehicle_models', 'vehicles', 'vehicle_invoices', 'bank_accounts'
    ],
    [ROLES.BATTERY]: [
        'components', 'models', 'inventory', 'production', 'sales', 'invoices', 'warranties',
        'claims', 'vehicle_models', 'vehicles'
    ]
});

function normalizeRole(role) {
    const value = String(role || '').trim();
    if (value === ROLES.ADMIN) return ROLES.ADMIN;
    if ([ROLES.SALES, 'Staff', 'Sales', 'SalesPerson', 'SalesPersonProcurement'].includes(value)) return ROLES.SALES;
    if ([ROLES.BATTERY, 'Operator', 'Quality', 'WorkshopOperator'].includes(value)) return ROLES.BATTERY;
    return value || ROLES.SALES;
}

function hasPermission(role, permission) {
    const permissions = ROLE_PERMISSIONS[normalizeRole(role)] || [];
    return permissions.includes('*') || permissions.includes(permission);
}

function assertKnownRole(role) {
    const normalized = normalizeRole(role);
    if (!ROLE_PERMISSIONS[normalized]) throw new Error(`Unknown role: ${role}`);
    return normalized;
}

function permissionsForRole(role) {
    const normalized = normalizeRole(role);
    return [...(ROLE_PERMISSIONS[normalized] || [])];
}

function writableTablesForRole(role) {
    return [...(ROLE_WRITABLE_TABLES[normalizeRole(role)] || [])];
}

function readTablesForRole(role) {
    return [...(ROLE_READ_TABLES[normalizeRole(role)] || [])];
}

module.exports = {
    ROLES,
    ROLE_LABELS,
    ROLE_PERMISSIONS,
    ROLE_WRITABLE_TABLES,
    ROLE_READ_TABLES,
    normalizeRole,
    assertKnownRole,
    hasPermission,
    permissionsForRole,
    writableTablesForRole,
    readTablesForRole
};
