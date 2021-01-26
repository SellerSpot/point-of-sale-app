import * as Yup from 'yup';

// Response type for GET request to fetch all Tax Brackets
export interface IGetTaxBracketFromServer {
    _id: string;
    name: string;
    taxPercent: string;
}

/**
 * Interface for the AddTaxBracket form
 */
export interface IAddTaxBracketFormSchema {
    name: string;
    taxPercent: number;
}

/**
 * Yup schema for the AddTaxBracket form
 */
export const AddTaxBracketFormSchema = Yup.object().shape({
    name: Yup.string().required('Tax-Bracket name is a required field'),
    taxPercent: Yup.number().required('Tax-Bracket Percent is a required field').max(100).min(0),
});
