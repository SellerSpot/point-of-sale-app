import { API_ROUTES } from 'config/apiRoutes';
import services from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import { IGetTaxBracketFromServer } from 'typings/components/taxBracket.types';

interface ITaxBracketApiResponse {
    status: boolean;
    data?: IGetTaxBracketFromServer[];
    error?: IApiServiceErrorResponse[];
}

export const getTaxBrackets = async (): Promise<ITaxBracketApiResponse> => {
    // Sending API request
    const response = await services.ApiService.get(API_ROUTES.TAXBRACKET);
    // Parsing response
    if (response.status) {
        return {
            status: true,
            data: response.data as IGetTaxBracketFromServer[],
        };
    } else {
        return {
            status: false,
            error: response.error as IApiServiceErrorResponse[],
        };
    }
};
