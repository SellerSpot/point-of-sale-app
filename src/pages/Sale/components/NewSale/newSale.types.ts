import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface INewSaleProps {
    callBackStateTrack: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

/**
 * Interface for the cart in the New Sale Page
 */
export interface INewSaleCart {
    products: pointOfSaleTypes.productResponseTypes.ISearchProduct['data']['results'];
    /**
     * Holds the cart related information for the products in the same index position
     */
    productCartInformation: {
        itemName: string;
        discount: number;
        price: number;
        quantity: number;
        subTotal?: number;
        totalTaxes?: number;
        total?: number;
    }[];
}

/**
 * Interface for the products table in New Sale Page
 */
export interface INewSaleProductsTableColumns {
    itemName: string;
    price: string;
}

/**
 * Holds the table columns for NewSale Products table
 */
export enum NEW_SALE_PRODUCTS_TABLE_COLUMNS {
    ITEM_NAME = 'itemName',
    PRICE = 'price',
}

/**
 * Interface for the cart table in New Sale Page
 */
export interface INewSaleCartTableColumns {
    itemName: string;
    quantity: number;
    price: number;
    discount: number;
    total: number;
}

// Holds the table columns for NewSale Products table
export enum NEW_SALE_CART_TABLE_COLUMNS {
    ITEM_NAME = 'itemName',
    QUANTITY = 'quantity',
    PRICE = 'price',
    DISCOUNT = 'discount',
    TOTAL = 'total',
}
