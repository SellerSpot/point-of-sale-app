import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Used to get all products from database
 */
export const getAllProducts = async (): Promise<
    pointOfSaleTypes.productResponseTypes.IGetAllProducts['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.PROUDCT}/${pointOfSaleTypes.ROUTES.PRODUCT_GET_ALL_PRODUCTS}`,
    );
    const responseData = response.data as pointOfSaleTypes.productResponseTypes.IGetAllProducts;
    if (responseData.status) {
        return responseData.data;
    }
    return null;
};

/**
 * Used to search the database for products
 */
export const searchProduct = async (
    query: string,
): Promise<pointOfSaleTypes.productResponseTypes.ISearchProduct['data']> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.PROUDCT}/${pointOfSaleTypes.ROUTES.PRODUCT_SEARCH_PRODUCT}`,
        {
            query,
        },
    );
    const responseData = response.data as pointOfSaleTypes.productResponseTypes.ISearchProduct;
    if (responseData.status) {
        return responseData.data;
    }
    return {
        queryType: 'name',
        results: [],
    };
};
