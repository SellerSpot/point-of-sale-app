import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Fetches all stockUnit from the database
 */
export const getAllStockUnits = async (): Promise<
    pointOfSaleTypes.stockUnitResponseTypes.IGetStockUnit['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.STOCK_UNIT}/${pointOfSaleTypes.ROUTES.STOCKUNIT_GET_ALL_STOCKUNITS}`,
    );
    const responseData = response.data as pointOfSaleTypes.stockUnitResponseTypes.IGetAllStockUnits;
    if (responseData.status) {
        return responseData.data;
    }
    return [];
};
