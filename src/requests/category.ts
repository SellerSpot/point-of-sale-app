import { IAddCategoryFormSchema } from 'pages/Inventory/components/AddCategory/addCategory.types';
import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * Fetches all categories from the database
 */
export const getAllCategories = async (): Promise<
    pointOfSaleTypes.categoryResponseTypes.IGetAllCategories['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.CATEGORY}/${pointOfSaleTypes.ROUTES.CATEGORY_GET_ALL_CATEGORIES}`,
    );
    const responseData = response.data as pointOfSaleTypes.categoryResponseTypes.IGetAllCategories;
    if (responseData.status) {
        return responseData.data;
    }
    return [];
};

/**
 * * Creates a new category in database
 */
export const createCategory = async (
    formData: IAddCategoryFormSchema,
): Promise<pointOfSaleTypes.categoryResponseTypes.ICreateCategory> => {
    // compiling data to send to server
    const data: pointOfSaleTypes.categoryRequestTypes.ICreateCategory = {
        name: formData.name,
    };
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.CATEGORY}/${pointOfSaleTypes.ROUTES.CATEGORY_CREATE_CATEGORY}`,
        data,
    );
    return response.data as pointOfSaleTypes.categoryResponseTypes.ICreateCategory;
};

/**
 * * Updates a category in database
 */
export const updateCategory = async (
    formData: IAddCategoryFormSchema,
): Promise<pointOfSaleTypes.categoryResponseTypes.IUpdateCategory> => {
    // compiling data to update
    const categoryToUpdate: pointOfSaleTypes.categoryRequestTypes.IUpdateCategory = {
        id: formData.id,
        categoryData: {
            name: formData.name,
        },
    };
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.CATEGORY}/${pointOfSaleTypes.ROUTES.CATEGORY_UPDATE_CATEGORY}`,
        categoryToUpdate,
    );
    return response.data as pointOfSaleTypes.categoryResponseTypes.IUpdateCategory;
};
