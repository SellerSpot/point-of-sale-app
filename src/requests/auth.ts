import { API_ROUTES } from 'config/apiRoutes';
import { apiService } from 'services/services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

export const authorizeTenant = async (
    domainName: string,
): Promise<pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse['data'] | false> => {
    try {
        const response = <pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse>(
            await apiService.post(API_ROUTES.AUTH_AUTHORIZE_TENANT, <
                pointOfSaleTypes.authRequestTypes.IAuthorizeTenantRequest
            >{ domainName })
        );

        if (response.status && response.data) {
            return Promise.resolve(response.data);
        } else {
            throw 'Error';
        }
    } catch (error) {
        return Promise.resolve(false);
    }
};
