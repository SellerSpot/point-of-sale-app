import { ColDef } from 'ag-grid-community';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { ICategoriesHistoryTableColumns } from './categoriesHistory.types';

/**
 * Gets the column definition for the categories history ag-grid table
 */
export const getCategoriesHistoryTableColDef = (): ColDef[] => {
    return [
        {
            headerName: 'S.No',
            field: 'sno' as keyof ICategoriesHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Category Name',
            field: 'categoryName' as keyof ICategoriesHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
    ];
};

/**
 * * Used to comile the rows for the categoriesHistory table
 */
export const compileCategoriesHistoryTableBodyData = (
    categoryData: pointOfSaleTypes.categoryResponseTypes.IGetAllCategories['data'],
): ICategoriesHistoryTableColumns[] => {
    if (categoryData.length > 0) {
        return categoryData.map(
            (category, index): ICategoriesHistoryTableColumns => {
                return {
                    sno: index + 1,
                    categoryName: category.name,
                };
            },
        );
    } else {
        [];
    }
};
