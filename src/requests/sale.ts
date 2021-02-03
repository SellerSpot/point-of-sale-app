import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

export const fetchAllSales = async (): Promise<
    pointOfSaleTypes.saleResponseTypes.IGetAllSales['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.SALE}/${pointOfSaleTypes.ROUTES.SALE_GET_ALL_SALES}`,
    );
    if (response.status) {
        return response.data as pointOfSaleTypes.saleResponseTypes.IGetAllSales['data'];
    }
    return null;
};
