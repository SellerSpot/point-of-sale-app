import { IGetBrand } from 'typings/components/brand.types';
import { IGetCategory } from 'typings/components/category.types';
import { IGetStockUnit } from 'typings/components/stockUnit.types';
import { IGetTaxBracket } from 'typings/components/taxBracket.types';
import * as Yup from 'yup';

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

export interface IFormInitialValues {
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

export interface IAddProductDropDownValues {
    categories?: IGetCategory[];
    brands?: IGetBrand[];
    stockUnits?: IGetStockUnit[];
    taxBrackets?: IGetTaxBracket[];
}
