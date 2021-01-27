import { API_ROUTES } from 'config/apiRoutes';
import { apiService } from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetCategoryFromServer } from 'typings/components/category.types';

interface ICategoryApiResponse {
    status: boolean;
    data?: IGetCategoryFromServer[];
    error?: IApiServiceErrorResponse[];
}

export const getCategories = async (): Promise<ICategoryApiResponse> => {
    // Sending API request
    const response = await apiService.get(API_ROUTES.CATEGORY);
    // Parsing response
    if (response.status) {
        return {
            status: true,
            data: response.data as IGetCategoryFromServer[],
        };
    } else {
        return {
            status: false,
            error: response.error as IApiServiceErrorResponse[],
        };
    }
};
