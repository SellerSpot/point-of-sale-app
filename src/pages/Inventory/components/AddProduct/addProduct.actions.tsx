import requests from 'requests/requests';
import { IGetBrand } from 'typings/components/brand.types';
import { IGetCategory } from 'typings/components/category.types';
import { IGetStockUnit } from 'typings/components/stockUnit.types';
import { IGetTaxBracket } from 'typings/components/taxBracket.types';
import { IAddProductDropDownValues, IFormInitialValues } from './addProduct.types';

export const fetchAddProductDropDownData = async (
    setDropDownValues: React.Dispatch<React.SetStateAction<IAddProductDropDownValues>>,
    setDropDownInitialValues: (
        category: IGetCategory,
        brand: IGetBrand,
        stockUnit: IGetStockUnit,
    ) => void,
): Promise<void> => {
    // getting all categories
    const allCategories = await requests.category.getCategories();
    // getting all brands
    const allBrands = await requests.brand.getBrands();
    // getting all stock units
    const allStockUnits = await requests.stockUnit.getStockUnits();
    // getting all tax brackets
    const allTaxBrackets = await requests.taxBracket.getTaxBrackets();

    // consolidating data into variables
    const categoryData = allCategories.data ?? [];
    const brandData = allBrands.data ?? [];
    const stockUnitData = allStockUnits.data ?? [];
    const taxBracketData = allTaxBrackets.data ?? [];

    // setting initial values
    setDropDownInitialValues(categoryData[0], brandData[0], stockUnitData[0]);
    // setting state values
    setDropDownValues({
        categories: categoryData,
        brands: brandData,
        stockUnits: stockUnitData,
        taxBrackets: taxBracketData,
    });
};

/**
 * Checks if the taxItem is already in the list
 */
export const checkIfTaxItemIsSelected = (
    taxBrackets: IGetTaxBracket[],
    taxBracket: IGetTaxBracket,
): boolean => {
    for (let i = 0; i < taxBrackets.length; i++) {
        if (taxBrackets[i]._id === taxBracket._id) return true;
    }
    return false;
};

/**
 * Handles onSubmit for the addProduct form
 */
export const handleAddProductFormOnSubmit = (values: IFormInitialValues): void => {
    console.log(values);
};
