import { apiService } from 'services';
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
        const response = await apiService.post(pointOfSaleTypes.ROUTES.AUTHORIZE, <
            pointOfSaleTypes.authRequestTypes.IAuthorizeTenantRequest
        >{ domainName });
        const responseData = response.data as pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse;

        if (responseData.status && responseData.data) {
            resultResponse = responseData;
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

export const authenticateUser = async ({
    email,
    password,
}: pointOfSaleTypes.authRequestTypes.IAuthenticateUserRequest): Promise<pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse> => {
    let resultResponse: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse = {
        status: false,
        statusCode: STATUS_CODES.BAD_REQUEST,
        error: 'Bad Request',
    };
    try {
        const response = await apiService.post(pointOfSaleTypes.ROUTES.AUTHENTICATE, <
            pointOfSaleTypes.authRequestTypes.IAuthenticateUserRequest
        >{ email, password });
        const responseData = response.data as pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse;

        if (responseData.status && responseData.data) {
            resultResponse = responseData;
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
