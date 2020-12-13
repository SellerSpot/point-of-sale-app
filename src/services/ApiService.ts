import Axios, { AxiosInstance, AxiosResponse } from 'axios';
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
    public async get(route: string): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${route}`;
        return await this.axios.get(requestUrl);
    }

    public async post(route: string, data: unknown): Promise<AxiosResponse> {
        const requestUrl = `${this.onlineServerUrl}/${route}`;
        return await this.axios.post(requestUrl, data);
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
