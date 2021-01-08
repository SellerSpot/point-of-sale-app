import { IGetBrand } from './brand.types';
import { IGetCategory } from './category.types';
import { IGetStockUnit } from './stockUnit.types';
import { IGetTaxBracket } from './taxBracket.types';

// Response type for GET request to fetch all products
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
