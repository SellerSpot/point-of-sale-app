import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';
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

    public async post(
        route: keyof typeof pointOfSaleTypes.ROUTES,
        data?: unknown,
    ): Promise<IApiServiceResponse> {
        try {
            const requestUrl = `/${pointOfSaleTypes.ROUTES[route]}`;
            console.log(requestUrl);
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
