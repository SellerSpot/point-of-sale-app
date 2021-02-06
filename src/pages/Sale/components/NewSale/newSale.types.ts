import { TCallBackStateTrack } from 'layouts/Dashboard/components/Sliders/Sliders';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface INewSaleProps {
    callBackStateTrack: [
        TCallBackStateTrack,
        React.Dispatch<React.SetStateAction<TCallBackStateTrack>>,
    ];
}

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
        itemDiscountPercent: number;
        itemPrice: number;
        itemQuantity: number;
        itemTotal: number;
        itemSubTotal: number;
        itemTotalTax: number;
        itemTotalDiscount: number;
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
