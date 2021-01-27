export type TPrimitiveType = string | number;

export interface IApiServiceErrorResponse {
    fieldName: string;
    message: string;
}

export interface IApiServiceResponse {
    status: boolean;
    statusCode?: number;
    data?: unknown;
    error?: unknown;
}
