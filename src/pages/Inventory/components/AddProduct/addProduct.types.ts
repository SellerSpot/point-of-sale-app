import * as Yup from 'yup';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * * Interface for the object containing the available metadata options for a product
 */
export interface IProductMetaDataOptions {
    categories: pointOfSaleTypes.categoryResponseTypes.IGetAllCategories['data'];
    brands: pointOfSaleTypes.brandResponseTypes.IGetAllBrands['data'];
    taxBrackets: pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets['data'];
    stockUnits: pointOfSaleTypes.stockUnitResponseTypes.IGetAllStockUnits['data'];
}

/**
 * * Interface for the AddBrand form
 */
export interface IAddProductFormSchema {
    name: string;
    gtinNumber: string;
    category: pointOfSaleTypes.categoryResponseTypes.IGetCategory['data'];
    brand: pointOfSaleTypes.brandResponseTypes.IGetBrand['data'];
    landingPrice: number;
    profitPercent: number;
    sellingPrice: number;
    mrpPrice: number;
    availableStock: number;
    stockUnit: pointOfSaleTypes.stockUnitResponseTypes.IGetStockUnit['data'];
    taxBracket: pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets['data'];
}

/**
 * * Yup schema for the AddBrand form
 */
export const AddProductFormSchema = Yup.object().shape({
    name: Yup.string().required('Product name is a required field'),
    gtinNumber: Yup.string(),
    category: Yup.object().shape({
        name: Yup.string(),
        _id: Yup.string(),
    }),
    brand: Yup.object().shape({
        name: Yup.string(),
        _id: Yup.string(),
    }),
    landingPrice: Yup.number().required('Landing price is a required field'),
    profitPercent: Yup.number(),
    sellingPrice: Yup.number().required('Selling price is a required field'),
    mrpPrice: Yup.number(),
    availableStock: Yup.number(),
    stockUnit: Yup.object().shape({
        name: Yup.string(),
        _id: Yup.string(),
    }),
    taxBracket: Yup.array().of(
        Yup.object().shape({
            name: Yup.string(),
            _id: Yup.string(),
        }),
    ),
});
