import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_ROUTES, TApiRoute } from '../config/apiRoutes';
import { CONFIG } from '../config/config';

export default class ApiService {
    private axios: AxiosInstance;
    private onlineServerUrl: string;

    constructor() {
        this.axios = Axios.create();
        this.onlineServerUrl = '';
        this.setAxiosHeader();
        this.setServerUrl();
    }

    // helper methods (it is public because we would change both the settings (method) at runtime *(may be from store))
    public setAxiosHeader(): void {
        this.axios = Axios.create({});
    }

    public setServerUrl(): void {
        this.onlineServerUrl = CONFIG.ONLINE_SERVER_URL;
    }

    // main request handlers
    public async get(route: TApiRoute): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${API_ROUTES[route]}`;
        return await this.axios.get(requestUrl);
    }

    public async post(route: TApiRoute, data: unknown): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${API_ROUTES[route]}`;
        return await this.axios.post(requestUrl, data);
    }

    public async put(route: TApiRoute, data: unknown): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${API_ROUTES[route]}`;
        return await this.axios.put(requestUrl, data);
    }

    public async patch(route: TApiRoute, data: unknown): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${API_ROUTES[route]}`;
        return await this.axios.patch(requestUrl, data);
    }

    public async delete(route: TApiRoute): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${route}`;
        return await this.axios.delete(requestUrl);
    }
}
