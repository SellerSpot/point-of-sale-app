import { API_ROUTES } from 'config/apiRoutes';
import services from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetProductFromServer } from 'typings/components/product.types';

interface IProductApiResponse {
    status: boolean;
    data?: IGetProductFromServer[];
    error?: IApiServiceErrorResponse[];
}

/**
 * Gets all the products stored in the database
 * @type GET
 */
export const getProducts = async (): Promise<IProductApiResponse> => {
    // Sending API request
    const response = await services.ApiService.get(API_ROUTES.PRODUCT);
    // Parsing response
    if (response.status) {
        return {
            status: true,
            data: response.data as IGetProductFromServer[],
        };
    } else {
        return {
            status: false,
            error: response.error as IApiServiceErrorResponse[],
        };
    }
};

export const createProduct = async (): Promise<void> => {
    // Sending API request
    const response = await services.ApiService.get(API_ROUTES.PRODUCT);
};
