import { API_ROUTES } from 'config/apiRoutes';
import services from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetBrand } from 'typings/components/brand.types';

interface IBrandApiResponse {
    status: boolean;
    data?: IGetBrand[];
    error?: IApiServiceErrorResponse[];
}

export const getBrands = async (): Promise<IBrandApiResponse> => {
    // Sending API request
    const response = await services.ApiService.get(API_ROUTES.BRAND);
    // Parsing response
    if (response.status) {
        return {
            status: true,
            data: response.data as IGetBrand[],
        };
    } else {
        return {
            status: false,
            error: response.error as IApiServiceErrorResponse[],
        };
    }
};
