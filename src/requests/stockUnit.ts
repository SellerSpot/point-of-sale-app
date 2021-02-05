import { IAddStockUnitFormSchema } from 'pages/Inventory/components/AddStockUnit/addStockUnit.types';
import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * * Fetches all stockUnit from the database
 */
export const getAllStockUnits = async (): Promise<
    pointOfSaleTypes.stockUnitResponseTypes.IGetAllStockUnits['data']
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

/**
 * * Creates a new stockUnit in database
 */
export const createStockUnit = async (
    formData: IAddStockUnitFormSchema,
): Promise<pointOfSaleTypes.stockUnitResponseTypes.ICreateStockUnit> => {
    // compiling data to send to server
    const data: pointOfSaleTypes.stockUnitRequestTypes.ICreateStockUnit = {
        name: formData.name,
    };
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.STOCK_UNIT}/${pointOfSaleTypes.ROUTES.STOCKUNIT_CREATE_STOCKUNIT}`,
        data,
    );
    return response.data as pointOfSaleTypes.stockUnitResponseTypes.ICreateStockUnit;
};
