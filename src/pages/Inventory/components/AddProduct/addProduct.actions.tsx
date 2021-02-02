import { brandRequests, categoryRequests, stockUnitRequests, taxBracketRequests } from 'requests';
import { IProductMetaDataOptions } from './addProduct.types';

/**
 * * Compile the object containing the available metadata options for a product
 */
export const compileProductMetaDataOptions = async (): Promise<IProductMetaDataOptions> => {
    return {
        brands: await brandRequests.getAllBrands(),
        categories: await categoryRequests.getAllCategories(),
        stockUnits: await stockUnitRequests.getAllStockUnits(),
        taxBrackets: await taxBracketRequests.getAllTaxBrackets(),
    };
};
