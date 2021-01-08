import { API_ROUTES } from 'config/apiRoutes';
import services from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetStockUnit } from 'typings/components/stockUnit.types';

interface IStockUnitApiResponse {
    status: boolean;
    data?: IGetStockUnit[];
    error?: IApiServiceErrorResponse[];
}

export const getStockUnits = async (): Promise<IStockUnitApiResponse> => {
    // Sending API request
    const response = await services.ApiService.get(API_ROUTES.STOCKUNIT);
    // Parsing response
    if (response.status) {
        return {
            status: true,
            data: response.data as IGetStockUnit[],
        };
    } else {
        return {
            status: false,
            error: response.error as IApiServiceErrorResponse[],
        };
    }
};
