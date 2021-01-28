import { API_ROUTES } from 'config/apiRoutes';
import { apiService } from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetBrandFromServer } from 'typings/components/brand.types';

interface IBrandApiResponse {
    status: boolean;
    data?: IGetBrandFromServer[];
    error?: IApiServiceErrorResponse[];
}

export const getBrands = async (): Promise<IBrandApiResponse> => {
    // // Sending API request
    // const response = await apiService.get(API_ROUTES.BRAND);
    // // Parsing response
    // if (response.status) {
    //     return {
    //         status: true,
    //         data: response.data as IGetBrandFromServer[],
    //     };
    // } else {
    //     return {
    //         status: false,
    //         error: response.error as IApiServiceErrorResponse[],
    //     };
    // }
    return null;
};
