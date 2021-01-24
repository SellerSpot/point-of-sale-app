import * as Yup from 'yup';

// Response type for GET request to fetch all Categories
export interface IGetCategoryFromServer {
    _id: string;
    name: string;
}

/**
 * Interface for the AddCategory form
 */
export interface IAddCategoryFormSchema {
    name: string;
}

/**
 * Yup schema for the AddCategory form
 */
export const AddCategoryFormSchema = Yup.object().shape({
    name: Yup.string().required('Category name is a required field'),
});
