import { ColDef } from 'ag-grid-community';

/**
 * Gets the column definition for the categories history ag-grid table
 */
export const getCategoriesHistoryTableColDef = (): ColDef[] => {
    return [
        {
            headerName: 'S.No',
            field: 'sno',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Category Name',
            field: 'categoriesName',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
    ];
};
