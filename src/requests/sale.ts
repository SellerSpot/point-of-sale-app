import { API_ROUTES } from 'config/apiRoutes';
import services from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetSale } from 'typings/components/sale.types';

interface ISaleApiResponse {
    status: boolean;
    data?: IGetSale[];
    error?: IApiServiceErrorResponse[];
}

export const getSales = async (): Promise<ISaleApiResponse> => {
    // sending API request
    const response = await services.ApiService.get(API_ROUTES.SALES);
    // parsing response
    if (response.status) {
        return {
            status: true,
            data: response.data as IGetSale[],
        };
    } else {
        return {
            status: false,
            error: response.error as IApiServiceErrorResponse[],
        };
    }
};
