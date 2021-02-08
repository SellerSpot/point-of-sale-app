import { apiService } from 'services';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';

export const authorizeTenant = async (
    domainName: string,
): Promise<pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse> => {
    let resultResponse: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse = {
        status: false,
        statusCode: STATUS_CODES.BAD_REQUEST,
        error: 'Bad Request',
    };
    try {
        const response = await apiService.post(pointOfSaleTypes.ROUTES.AUTHORIZE, {
            domainName,
        } as pointOfSaleTypes.authRequestTypes.IAuthorizeTenantRequest);
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
        const response = await apiService.post(pointOfSaleTypes.ROUTES.AUTHENTICATE, {
            email,
            password,
        } as pointOfSaleTypes.authRequestTypes.IAuthenticateUserRequest);
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

export const verifyToken = async (): Promise<boolean> => {
    let resultResponse: boolean;
    try {
        const response = await apiService.post(pointOfSaleTypes.ROUTES.VERIFY_TOKEN);
        const responseData = response.data as pointOfSaleTypes.authResponseTypes.IVerifyTokenResponse;

        if (responseData.status && responseData.data) {
            resultResponse = true;
        } else {
            throw response;
        }
    } catch (error) {
        resultResponse = false;
        console.error(error);
    } finally {
        return Promise.resolve(resultResponse);
    }
};
