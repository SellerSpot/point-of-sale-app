import { API_ROUTES } from 'config/apiRoutes';
import { apiService } from 'services/services';
import { IApiServiceErrorResponse } from 'typings/common.types';
import {
    IAddProductFormSchema,
    IGetProductFromServer,
    IPostCreateProductInServer,
} from 'typings/components/product.types';

/**
 * Interface for the data sent back to calling functions from these requests
 */
interface IProductApiResponse {
    status: boolean;
    data?: IGetProductFromServer[] | string;
    error?: IApiServiceErrorResponse[];
}

/**
 * Gets all the products stored in the database
 * @type GET
 */
export const getProducts = async (): Promise<IProductApiResponse> => {
    // // Sending API request
    // const response = await apiService.get(API_ROUTES.PRODUCT);
    // // Parsing response
    // if (response.status) {
    //     console.log(response.data);

    //     return {
    //         status: true,
    //         data: response.data as IGetProductFromServer[],
    //     };
    // } else {
    //     return {
    //         status: false,
    //         error: response.error as IApiServiceErrorResponse[],
    //     };
    // }
    return null;
};

/**
 * Used to create a new product in database from addProduct form
 * @param values submitted using the addProduct form
 */
export const createProduct = async (
    values: IAddProductFormSchema,
): Promise<IProductApiResponse> => {
    // converting to format required at server site - IPostCreateProductInServer
    const dataToSend: IPostCreateProductInServer = {
        brand: values.brand._id,
        category: values.category._id,
        gtinNumber: values.gtinNumber,
        landingPrice: values.landingPrice,
        mrpPrice: values.mrpPrice,
        name: values.name,
        profitPercent: values.profitPercent,
        sellingPrice: values.sellingPrice,
        stockInformation: {
            availableStock: values.availableStock,
            stockUnit: values.stockUnit._id,
        },
        taxBracket: values.taxBracket.map((taxBracket) => taxBracket._id),
    };
    // Sending API request
    const response = await apiService.post(API_ROUTES.PRODUCT, dataToSend);
    if (response.status) {
        return {
            status: response.status,
            data: response.data as string,
        };
    }
    return {
        status: false,
        error: response.error as IApiServiceErrorResponse[],
    };
};
