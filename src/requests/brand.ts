import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Fetches all brands from the database
 */
export const getAllBrands = async (): Promise<
    pointOfSaleTypes.brandResponseTypes.IGetAllBrands['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.BRAND}/${pointOfSaleTypes.ROUTES.BRAND_GET_ALL_BRANDS}`,
    );
    const responseData = response.data as pointOfSaleTypes.brandResponseTypes.IGetAllBrands;
    if (responseData.status) {
        return responseData.data;
    }
    return [];
};
