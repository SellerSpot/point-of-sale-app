import { API_ROUTES } from 'config/apiRoutes';
import services from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetCategory } from 'typings/components/category.types';

interface ICategoryApiResponse {
    status: boolean;
    data?: IGetCategory[];
    error?: IApiServiceErrorResponse[];
}

export const getCategories = async (): Promise<ICategoryApiResponse> => {
    // Sending API request
    const response = await services.ApiService.get(API_ROUTES.CATEGORY);
    // Parsing response
    if (response.status) {
        return {
            status: true,
            data: response.data as IGetCategory[],
        };
    } else {
        return {
            status: false,
            error: response.error as IApiServiceErrorResponse[],
        };
    }
};
