import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Fetches all categories from the database
 */
export const getAllCategories = async (): Promise<
    pointOfSaleTypes.categoryResponseTypes.IGetAllCategories['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.CATEGORY}/${pointOfSaleTypes.ROUTES.CATEGORY_GET_ALL_CATEGORIES}`,
    );
    const responseData = response.data as pointOfSaleTypes.categoryResponseTypes.IGetAllCategories;
    if (responseData.status) {
        return responseData.data;
    }
    return [];
};
