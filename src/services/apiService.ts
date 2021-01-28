import { STATUS_CODES } from '@sellerspot/universal-types';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IApiServiceResponse } from 'typings/common.types';
import { CONFIG } from '../config/config';

export default class ApiService {
    private onlineAxios: AxiosInstance;
    private onlineServerUrl: string;
    // Response status codes
    constructor() {
        this.onlineAxios = null;
        this.onlineServerUrl = CONFIG.ONLINE_SERVER_API_URL;
    }

    // connection utils - initialize/re-establish and more related to connectivity
    public initiateService = async (token?: string): Promise<void> => {
        /**
         * 1. token will be provided by initiators set auth token if available
         * 2. if not wait for the user to authenticate once user authenticated call from that particular action block and update the socket creds
         * 3. don't forget to close the socket connection and recreate the socket connection while setting auth token on the flow
         * 4. make sure that only auth routes are  unprotected
         */
        this.onlineAxios = null;

        this.onlineAxios = Axios.create({
            baseURL: this.onlineServerUrl,
            headers: {
                authorization: `Bearer ${token?.trim()}`,
            },
        });
    };

    // Main request handlers
    public async get(route: string): Promise<IApiServiceResponse> {
        try {
            const requestUrl = `/${route}`;
            const response = await this.onlineAxios.get(requestUrl);
            // eslint-disable-next-line no-magic-numbers
            if (response.status === 200) {
                if (response.data.status) {
                    switch (response.data.statusCode) {
                        case STATUS_CODES.OK:
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
            const requestUrl = `/${route}`;
            const response = await this.onlineAxios.post(requestUrl, data);
            if (response.status === 200) {
                return response.data;
            } else {
                throw 'error';
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
}
