import { apiService } from 'services/services';
import { pointOfSaleTypes, STATUS_CODES } from '@sellerspot/universal-types';

export const authorizeTenant = async (
    domainName: string,
): Promise<pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse> => {
    let resultResponse: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse = {
        status: false,
        statusCode: STATUS_CODES.BAD_REQUEST,
        error: 'Bad Request',
    };
    try {
        const response = <pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse>(
            await apiService.post('AUTHORIZE', <
                pointOfSaleTypes.authRequestTypes.IAuthorizeTenantRequest
            >{ domainName })
        );

        if (response.status && response.data) {
            resultResponse = response;
        } else {
            throw response;
        }
    } catch (error) {
        if (error.status && error.error) {
            resultResponse = error;
        } else {
            resultResponse.error = error.message ?? error;
        }
    } finally {
        return Promise.resolve(resultResponse);
    }
};
