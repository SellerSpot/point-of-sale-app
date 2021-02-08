import * as Yup from 'yup';

/**
 * Interface for the AddStockUnit form
 */
export interface IAddStockUnitFormSchema {
    id?: string;
    name: string;
}

/**
 * Yup schema for the AddStockUnit form
 */
export const AddStockUnitFormSchema = Yup.object().shape({
    name: Yup.string().required('StockUnit name is a required field'),
});
