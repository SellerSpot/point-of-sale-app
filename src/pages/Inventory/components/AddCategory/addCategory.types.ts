import * as Yup from 'yup';

/**
 * Interface for the AddCategory form
 */
export interface IAddCategoryFormSchema {
    // for update functionality
    id?: string;
    name: string;
}

/**
 * Yup schema for the AddCategory form
 */
export const AddCategoryFormSchema = Yup.object().shape({
    name: Yup.string().required('Category name is a required field'),
});
