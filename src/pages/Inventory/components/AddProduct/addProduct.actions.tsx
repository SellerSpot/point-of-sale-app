import requests from 'requests/requests';
import { IGetTaxBracket } from 'typings/components/taxBracket.types';
import { IAddProductDropDownValues } from './addProduct.types';

export const fetchAddProductDropDownData = async (
    setDropDownValues: React.Dispatch<React.SetStateAction<IAddProductDropDownValues>>,
): Promise<void> => {
    // getting all categories
    const allCategories = await requests.category.getCategories();
    // getting all brands
    const allBrands = await requests.brand.getBrands();
    // getting all stock units
    const allStockUnits = await requests.stockUnit.getStockUnits();
    // getting all tax brackets
    const allTaxBrackets = await requests.taxBracket.getTaxBrackets();

    // setting state values
    setDropDownValues({
        categories: allCategories.data ?? [],
        brands: allBrands.data ?? [],
        stockUnits: allStockUnits.data ?? [],
        taxBrackets: allTaxBrackets.data ?? [],
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
