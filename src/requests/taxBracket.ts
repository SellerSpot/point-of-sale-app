import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Fetches all taxBrackets from the database
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
