import { apiService } from 'services/services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

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
