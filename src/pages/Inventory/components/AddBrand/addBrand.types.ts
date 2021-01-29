import * as Yup from 'yup';

/**
 * Interface for the AddBrand form
 */
export interface IAddBrandFormSchema {
    name: string;
}

/**
 * Yup schema for the AddBrand form
 */
export const AddBrandFormSchema = Yup.object().shape({
    name: Yup.string().required('Brand name is a required field'),
});
