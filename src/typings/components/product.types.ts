import { IGetBrand } from './brand.types';
import { IGetCategory } from './category.types';
import { IGetStockUnit } from './stockUnit.types';
import { IGetTaxBracket } from './taxBracket.types';
import * as Yup from 'yup';

/**
 * Response type for GET request to fetch all products
 */
export interface IGetProduct {
    _id: string;
    name: string;
    category: IGetCategory;
    brand: IGetBrand;
    gtinNumber: string;
    mrpPrice: number;
    landingPrice: number;
    sellingPrice: number;
    stockInformation: {
        availableStock: number;
        stockUnit: IGetStockUnit;
    };
    profitPercent: number;
    taxBracket: IGetTaxBracket[];
}

/**
 * YUP schema for the AddProduct form
 */
export const addProductFormSchema = Yup.object().shape({
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

/**
 * Interface for the addProduct form formik initial values const
 */
export interface AddProductFormInitialValues {
    name: string;
    gtinNumber: string;
    category: IGetCategory;
    brand: IGetBrand;
    landingPrice: number;
    profitPercent: number;
    sellingPrice: number;
    availableStock: number;
    stockUnit: IGetStockUnit;
    taxBracket: IGetTaxBracket[];
}
/**
 * Interface for the AddProduct page state object containing all the values for the dropdown fields fetched from the server
 */
export interface IAddProductDropDownValues {
    categories?: IGetCategory[];
    brands?: IGetBrand[];
    stockUnits?: IGetStockUnit[];
    taxBrackets?: IGetTaxBracket[];
}
