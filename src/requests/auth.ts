import { API_ROUTES } from 'config/apiRoutes';
import services from 'services/services';

interface IAuthorizeTenantRequest {
    domainName: string;
}

interface ITokenPayload {
    name?: string;
    _id?: string;
    email?: string;
}

interface IAuthorizeTenantResponse {
    status: boolean;
    statusCode?: number;
    data?: ITokenPayload & { tenantAppToken: string };
    error?: unknown;
}

export const authorizeTenant = async (
    domainName: string,
): Promise<IAuthorizeTenantResponse['data'] | false> => {
    try {
        const response = (await services.ApiService.post(API_ROUTES.AUTH_AUTHORIZE_TENANT, <
            IAuthorizeTenantRequest
        >{ domainName })) as IAuthorizeTenantResponse;

        if (response.status && response.data) {
            return Promise.resolve(response.data);
        } else {
            throw 'Error';
        }
    } catch (error) {
        return Promise.resolve(false);
    }
};
