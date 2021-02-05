import { IAddBrandFormSchema } from 'pages/Inventory/components/AddBrand/addBrand.types';
import { apiService } from 'services';
import { STATUS_CODES, pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Fetches all brands from the database
 */
export const getAllBrands = async (): Promise<
    pointOfSaleTypes.brandResponseTypes.IGetAllBrands['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.BRAND}/${pointOfSaleTypes.ROUTES.BRAND_GET_ALL_BRANDS}`,
    );
    const responseData = response.data as pointOfSaleTypes.brandResponseTypes.IGetAllBrands;
    if (responseData.status) {
        return responseData.data;
    }
    return [];
};

/**
 * Creates a new brand in database
 */
export const createBrand = async (
    formData: IAddBrandFormSchema,
): Promise<pointOfSaleTypes.brandResponseTypes.ICreateBrand> => {
    // compiling data to send to server
    const data: pointOfSaleTypes.brandRequestTypes.ICreateBrand = {
        name: formData.name,
    };
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.BRAND}/${pointOfSaleTypes.ROUTES.BRAND_CREATE_BRAND}`,
        data,
    );
    return response.data as pointOfSaleTypes.brandResponseTypes.ICreateBrand;
};
