import { API_ROUTES } from 'config/apiRoutes';
import services from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetProduct } from 'typings/components/product.types';

interface IProductApiResponse {
    status: boolean;
    data?: IGetProduct[];
    error?: IApiServiceErrorResponse[];
}

export const getProducts = async (): Promise<IProductApiResponse> => {
    // sending API request
    const response = await services.ApiService.get(API_ROUTES.PRODUCT);
    // parsing response
    if (response.status) {
        return {
            status: true,
            data: response.data as IGetProduct[],
        };
    } else {
        return {
            status: false,
            error: response.error as IApiServiceErrorResponse[],
        };
    }
};
