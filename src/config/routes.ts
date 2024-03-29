const inferRouteTypes = <T extends { [key: string]: string }>(arg: T): T => arg; // Infering types from Route object with autocomplete support.

export const ROUTES = inferRouteTypes({
    // Auth routes
    Auth: '/auth',
    AUTH_SIGN_IN: '/auth/signin', // no signup fo pos app - users will be added by owner
    AUTH_FORGOT: '/auth/forgot',
    // Base routes
    DASHBOARD: '/',
    SALES: '/',
    INVENTORY: '/inventory',
    CASH_REGISTER: '/cashregister',
    BILLING_SETUP: '/billingsetup',
    // Sales routes
    SALES_HISTORY: '/',
    // Inventory routes
    INVENTORY_PRODUCTS: '/inventory',
    INVENTORY_CATEGORIES: '/inventory/categories',
    INVENTORY_BRANDS: '/inventory/brands',
    INVENTORY_TAX_BRACKETS: '/inventory/taxbrackets',
    INVENTORY_STOCK_UNITS: '/inventory/stockunits',
});
