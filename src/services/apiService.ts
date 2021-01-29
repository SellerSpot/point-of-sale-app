import Axios, { AxiosInstance } from 'axios';
import { CONFIG } from 'config/config';
import { IApiServiceResponse } from 'typings/common.types';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

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

    public async post(route: string, data?: unknown): Promise<IApiServiceResponse> {
        let returnData: IApiServiceResponse = null;
        try {
            const requestUrl = `/${route}`;
            const response = await this.onlineAxios.post(requestUrl, data);
            if (response.status === 200) {
                returnData = {
                    status: true,
                    data: response.data,
                };
            } else {
                returnData = {
                    status: false,
                    error: 'Could not connect with server',
                };
            }
        } catch (error) {
            returnData = {
                status: false,
                error: error.message,
            };
        } finally {
            return returnData;
        }
    }
}
