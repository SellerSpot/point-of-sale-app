import * as Yup from 'yup';

/**
 * Interface for the AddTaxBracket form
 */
export interface IAddTaxBracketFormSchema {
    name: string;
    taxPercent: string;
}

/**
 * Yup schema for the AddTaxBracket form
 */
export const AddTaxBracketFormSchema = Yup.object().shape({
    name: Yup.string().required('TaxBracket name is a required field'),
});
