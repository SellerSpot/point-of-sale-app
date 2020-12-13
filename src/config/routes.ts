const inferRouteTypes = <T extends { [key: string]: string }>(arg: T): T => arg; // infering types from Route object with autocomplete support.

export const ROUTES = inferRouteTypes({
    DASHBOARD: '/',
    SALES: '/',
    INVENTORY: '/inventory',
    CASH_REGISTER: '/cashregister',
    BILLING_SETUP: '/billingsetup',
    // inventory routes
    INVENTORY_PRODUCTS: '/inventory',
    INVENTORY_CATEGORIES: '/inventory/categories',
    INVENTORY_BRANDS: '/inventory/brands',
    INVENTORY_TAX_BRACKETS: '/inventory/taxbrackets',
});
