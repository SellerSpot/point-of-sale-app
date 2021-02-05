import { IAddTaxBracketFormSchema } from 'pages/Inventory/components/AddTaxBracket/addTaxBracket.types';
import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * * Fetches all taxBrackets from the database
 */
export const getAllTaxBrackets = async (): Promise<
    pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.TAX_BRACKET}/${pointOfSaleTypes.ROUTES.TAXBRACKET_GET_ALL_TAXBRACKETS}`,
    );
    const responseData = response.data as pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets;
    if (responseData.status) {
        return responseData.data;
    }
    return [];
};

/**
 * * Creates a new taxBracket in database
 */
export const createTaxBracket = async (
    formData: IAddTaxBracketFormSchema,
): Promise<pointOfSaleTypes.taxBracketResponseTypes.ICreateTaxBracket> => {
    // compiling data to send to server
    const data: pointOfSaleTypes.taxBracketRequestTypes.ICreateTaxBracket = {
        name: formData.name,
        taxPercent: formData.taxPercent,
    };
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.TAX_BRACKET}/${pointOfSaleTypes.ROUTES.TAXBRACKET_CREATE_TAXBRACKET}`,
        data,
    );
    return response.data as pointOfSaleTypes.taxBracketResponseTypes.ICreateTaxBracket;
};
