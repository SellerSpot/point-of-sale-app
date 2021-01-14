import { IGetBrand } from 'typings/components/brand.types';
import { IGetCategory } from 'typings/components/category.types';
import { IGetStockUnit } from 'typings/components/stockUnit.types';
import { IGetTaxBracket } from 'typings/components/taxBracket.types';

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
