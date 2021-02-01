export interface INewSaleProductsTableColumns {
    itemName: string;
    gtinNumber: string;
    brand: string;
    category: string;
    price: string;
}
// holds the table columns for NewSale Products table
export enum NEW_SALE_PRODUCTS_TABLE_COLUMNS {
    ITEM_NAME = 'itemName',
    GTIN_NUMBER = 'gtinNumber',
    BRAND = 'brand',
    CATEGORY = 'category',
    PRICE = 'price',
}

export interface INewSaleCartTableColumns {
    itemName: string;
    quantity: number;
    subTotal: number;
    discount: number;
}

// holds the table columns for NewSale Products table
export enum NEW_SALE_CART_TABLE_COLUMNS {
    ITEM_NAME = 'itemName',
    QUANTITY = 'quantity',
    SUB_TOTAL = 'subTotal',
    DISCOUNT = 'discount',
}
