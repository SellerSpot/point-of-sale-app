import { apiService } from 'services/services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Used to get all products from database
 */
export const getAllProducts = async (): Promise<
    pointOfSaleTypes.productResponseTypes.IGetProducts['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.PROUDCT}/${pointOfSaleTypes.ROUTES.PRODUCT_GET_ALL_PRODUCTS}`,
    );
    if (response.status) {
        return response.data as pointOfSaleTypes.productResponseTypes.IGetProducts['data'];
    }
    return null;
};

/**
 * Used to search the database for products
 */
export const searchProduct = async (
    query: string,
): Promise<pointOfSaleTypes.productResponseTypes.IGetProducts['data']> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.PROUDCT}/${pointOfSaleTypes.ROUTES.PRODUCT_SEARCH_PRODUCT}`,
        {
            query,
        },
    );
    console.log(response.data);

    if (response.status) {
        return response.data as pointOfSaleTypes.productResponseTypes.IGetProducts['data'];
    }
    return null;
};
