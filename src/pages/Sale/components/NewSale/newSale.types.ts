import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Interface for the cartData redux store in the New Sale Page
 */
export interface INewSaleCart {
    products: pointOfSaleTypes.productResponseTypes.ISearchProduct['data']['results'];
    /**
     * Holds the cart related information for the products in the same index position
     */
    productCartInformation: {
        itemName: string;
        itemPrice: number;
        itemQuantity: number;
        itemSubTotalBeforeDiscounts: number;
        itemDiscountPercent: number;
        itemDiscountValue: number;
        totalDiscountValue: number;
        itemSubTotalAfterDiscounts: number;
        taxes: {
            taxBracketName: string;
            taxPercent: number;
            // computed tax amount for the current item
            taxValue: number;
        }[];
        // total tax for single instance of the item
        taxSum: number;
        totalTax: number;
        itemTotal: number;
        grandTotal: number;
    }[];
    totals: {
        grandTotal: number;
        grandTotalTax: number;
        grandTotalDiscount: number;
    };
}

/**
 * Interface for the products table in New Sale Page
 */
export interface INewSaleProductsTableColumns {
    itemName: string;
    itemPrice: string;
}

/**
 * Interface for the cart table in New Sale Page
 */
export interface INewSaleCartTableColumns {
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
    itemDiscountPercent: number;
    itemTotal: number;
}
