export const API_ROUTES = {
    BASE: '/',
    BRAND: 'brand',
    CATEGORY: 'category',
    TAXBRACKET: 'taxbracket',
    PRODUCT: 'product',
    STOCKUNIT: 'stockunit',
};

export type TApiRoute = keyof typeof API_ROUTES;
