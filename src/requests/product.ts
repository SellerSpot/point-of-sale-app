import { API_ROUTES } from 'config/apiRoutes';
import services from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetProduct } from 'typings/components/product.types';

interface IProductApiResponse {
    status: boolean;
    data?: IGetProduct[];
    error?: IApiServiceErrorResponse[];
}

/**
 * Gets all the products stored in the database
 */
export const getProducts = async (): Promise<IProductApiResponse> => {
    // Sending API request
    const response = await services.ApiService.get(API_ROUTES.PRODUCT);
    // Parsing response
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
