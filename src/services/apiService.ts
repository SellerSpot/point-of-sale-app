import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IApiServiceResponse } from 'typings/common.types';
import { CONFIG } from '../config/config';

export default class ApiService {
    private axios: AxiosInstance;
    private onlineServerUrl: string;
    // Response status codes
    private responseStatusCodes = {
        // Validation errors in the request
        BADREQUEST: 400,
        // Requested resource has been createe successfully
        CREATED: 201,
        // A duplicate of the data to be created already exists in database
        CONFLICT: 409,
        // Unknown server errors
        INTERNALSERVERERROR: 500,
        // Operation successfully completed
        OK: 200,
        // For denoting that the required resource has not been found in database
        NOTFOUND: 404,
        // For denoting that no content is being sent in the response
        NOCONTENT: 204,
    };

    constructor() {
        this.axios = Axios.create();
        this.onlineServerUrl = '';
        this.setAxiosHeader();
        this.setServerUrl();
    }

    // Helper methods (it is public because we would change both the settings (method) at runtime *(may be from store))
    public setAxiosHeader(): void {
        this.axios = Axios.create({});
    }

    public setServerUrl(): void {
        this.onlineServerUrl = CONFIG.ONLINE_SERVER_URL;
    }

    // Main request handlers
    public async get(route: string): Promise<IApiServiceResponse> {
        try {
            const requestUrl = `${this.onlineServerUrl}/${route}`;
            const response = await this.axios.get(requestUrl);
            if (response.status === 200) {
                if (response.data.status) {
                    switch (response.data.statusCode) {
                        case this.responseStatusCodes.OK:
                            return {
                                status: true,
                                data: response.data.data,
                            };
                        default:
                            //! This is only if the server really messes up
                            return {
                                status: false,
                                error: [
                                    {
                                        fieldName: 'commonMessage',
                                        message: 'Unknown error recieved from server',
                                    },
                                ],
                            };
                    }
                } else {
                    return {
                        status: false,
                        error: response.data.error,
                    };
                }
            } else {
                return {
                    status: false,
                    error: [
                        {
                            fieldName: 'commonMessage',
                            message: 'Unable to connect to the server',
                        },
                    ],
                };
            }
        } catch (e) {
            return {
                status: false,
                error: [
                    {
                        fieldName: 'commonMessage',
                        message: e.message,
                    },
                ],
            };
        }
    }

    public async post(route: string, data: unknown): Promise<IApiServiceResponse> {
        try {
            const requestUrl = `${this.onlineServerUrl}/${route}`;
            const response = await this.axios.post(requestUrl, data);
            if (response.status === 200) {
                if (response.data.status) {
                    switch (response.data.statusCode) {
                        case this.responseStatusCodes.CREATED:
                            return {
                                status: true,
                                data: response.data,
                            };
                        default:
                            return {
                                status: false,
                                error: [
                                    {
                                        fieldName: 'commonMessage',
                                        message: 'Unknown error recieved from server',
                                    },
                                ],
                            };
                    }
                } else {
                    return {
                        status: false,
                        error: response.data.error,
                    };
                }
            } else {
                return {
                    status: false,
                    error: [
                        {
                            fieldName: 'commonMessage',
                            message: 'Unable to connect to the server',
                        },
                    ],
                };
            }
        } catch (e) {
            return {
                status: false,
                error: [
                    {
                        fieldName: 'commonMessage',
                        message: e.message,
                    },
                ],
            };
        }
    }

    public async put(route: string, data: unknown): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${route}`;
        return await this.axios.put(requestUrl, data);
    }

    public async patch(route: string, data: unknown): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${route}`;
        return await this.axios.patch(requestUrl, data);
    }

    public async delete(route: string): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${route}`;
        return await this.axios.delete(requestUrl);
    }

    public async head(route: string): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${route}`;
        return await this.axios.head(requestUrl);
    }
}
