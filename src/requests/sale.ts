import { apiService } from 'services/services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

export const fetchAllSales = async (): Promise<
    pointOfSaleTypes.saleResponseTypes.IGetSales['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.SALE}/${pointOfSaleTypes.ROUTES.SALE_GET_ALL_SALES}`,
    );
    if (response.status) {
        return response.data as pointOfSaleTypes.saleResponseTypes.IGetSales['data'];
    }
    return null;
};
