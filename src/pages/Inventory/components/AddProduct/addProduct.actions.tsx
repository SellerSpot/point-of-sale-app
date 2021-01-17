import requests from 'requests/requests';
import { IGetBrand } from 'typings/components/brand.types';
import { IGetCategory } from 'typings/components/category.types';
import { IGetStockUnit } from 'typings/components/stockUnit.types';
import { IGetTaxBracket } from 'typings/components/taxBracket.types';
import {
    IAddProductDropDownValuesData,
    IAddProductFormSchema,
    IPostCreateProductInServer,
} from 'typings/components/product.types';

/**
 * Used to fetch the values from database and prepare the AddProduct page
 * @param setDropDownValues Setter for dropDownValues state values
 * @param setDropDownInitialValues Callback function to set the initial values in the form
 */
export const fetchAddProductDropDownData = async (
    setDropDownValues: React.Dispatch<React.SetStateAction<IAddProductDropDownValuesData>>,
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
 * Used to check if a taxBracket is selected or not
 * @param taxBrackets List of all taxBrackets stored in the formik store (those in store are selected)
 * @param taxBracket The current taxBracket to check if it exists in the formik store
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
export const handleAddProductFormOnSubmit = (values: IAddProductFormSchema): void => {
    // // converting to format required at server site - IPostCreateProductInServer
    // const dataToSend: IPostCreateProductInServer = {
    //     brand: values.brand._id,
    //     category: values.category._id.,
    //     gtinNumber: values.gtinNumber,
    //     landingPrice: values.landingPrice,
    //     mrpPrice: values.
    // };
    console.log('FUCK');
};
