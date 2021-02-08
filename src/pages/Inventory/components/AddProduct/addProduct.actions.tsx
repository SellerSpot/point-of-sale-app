import { brandRequests, categoryRequests, stockUnitRequests, taxBracketRequests } from 'requests';
import { xPercentOfY } from 'utilities/businessCalculations';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IProductMetaDataOptions } from './addProduct.types';

/**
 * * Compile the object containing the available special options for a product
 */
export const compileProductSpecialOptions = async (): Promise<IProductMetaDataOptions> => {
    return {
        brands: await brandRequests.getAllBrands(),
        categories: await categoryRequests.getAllCategories(),
        stockUnits: await stockUnitRequests.getAllStockUnits(),
        taxBrackets: await taxBracketRequests.getAllTaxBrackets(),
    };
};

/**
 * * Used to check if a taxBracket is selected or not
 * @param taxBrackets List of all taxBrackets stored in the formik store (those in store are selected)
 * @param taxBracket The current taxBracket to check if it exists in the formik store
 */
export const checkIfTaxItemIsSelected = (
    taxBrackets: pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets['data'],
    taxBracket: pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBracket['data'],
): boolean => {
    for (let i = 0; i < taxBrackets.length; i++) {
        if (taxBrackets[i]._id === taxBracket._id) return true;
    }
    return false;
};

/**
 * * Computes selling price given the landing price and profit percentage
 */
export const computeSellingPriceAddProductPage = (props: {
    landingPrice: number;
    profitPercentage: number;
}): number => {
    return (
        props.landingPrice +
        xPercentOfY({
            x: props.profitPercentage,
            y: props.landingPrice,
        })
    );
};

/**
 * * Computes the profit percentage given the selling price and landing price
 */
export const computeProfitPercentageAddProductPage = (props: {
    sellingPrice: number;
    landingPrice: number;
}): number => {
    return ((props.sellingPrice - props.landingPrice) / props.landingPrice) * 100;
};
