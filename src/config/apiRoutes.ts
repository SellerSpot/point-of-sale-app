export const API_ROUTES = {
    BASE: '/',
    AUTH_AUTHORIZE_TENANT: '/authorize',
    BRAND: 'brand',
    CATEGORY: 'category',
    TAXBRACKET: 'taxbracket',
    PRODUCT: 'product',
    STOCKUNIT: 'stockunit',
    SALES: 'sale',
};

export type TApiRoute = keyof typeof API_ROUTES;
