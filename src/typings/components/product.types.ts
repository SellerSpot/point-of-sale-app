import { IGetBrandFromServer } from './brand.types';
import { IGetCategoryFromServer } from './category.types';
import { IGetStockUnit } from './stockUnit.types';
import { IGetTaxBracket } from './taxBracket.types';
import * as Yup from 'yup';

/**
 * Response interface for GET request to fetch all products in server
 */
export interface IGetProductFromServer {
    _id: string;
    name: string;
    category: IGetCategoryFromServer;
    brand: IGetBrandFromServer;
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
 * Request body interface for POST request to create product in server
 */
export interface IPostCreateProductInServer {
    name: string;
    category: string;
    brand: string;
    gtinNumber: string;
    mrpPrice: number;
    landingPrice: number;
    sellingPrice: number;
    stockInformation: {
        availableStock: number;
        stockUnit: string;
    };
    profitPercent: number;
    taxBracket: string[];
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

/**
 * Interface for the addProduct form formik initial values const
 */
export interface IAddProductFormSchema {
    name: string;
    gtinNumber: string;
    category: IGetCategoryFromServer;
    brand: IGetBrandFromServer;
    landingPrice: number;
    profitPercent: number;
    sellingPrice: number;
    mrpPrice: number;
    availableStock: number;
    stockUnit: IGetStockUnit;
    taxBracket: IGetTaxBracket[];
}

/**
 * Interface for the AddProduct page state object containing all the values for the dropdown fields fetched from the server
 */
export interface IAddProductDropDownValuesData {
    categories?: IGetCategoryFromServer[];
    brands?: IGetBrandFromServer[];
    stockUnits?: IGetStockUnit[];
    taxBrackets?: IGetTaxBracket[];
}
