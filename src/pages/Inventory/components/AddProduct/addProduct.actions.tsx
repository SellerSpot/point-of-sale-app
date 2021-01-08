import requests from 'requests/requests';
import { IAddProductDropDownValues } from './AddProduct';

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

    console.log(allCategories, allBrands, allStockUnits, allTaxBrackets);

    // setting state values
    setDropDownValues({
        categories: {
            options: allCategories.data ?? [],
            selectedIndex: 0,
        },
        brands: {
            options: allBrands.data ?? [],
            selectedIndex: 0,
        },
        stockUnits: {
            options: allStockUnits.data ?? [],
            selectedIndex: 0,
        },
        taxBrackets: {
            options: allTaxBrackets.data ?? [],
            selectedIndex: 0,
        },
    });
};
