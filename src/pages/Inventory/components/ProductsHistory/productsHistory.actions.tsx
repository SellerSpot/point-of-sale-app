import { ColDef } from 'ag-grid-community';

/**
 * Gets the column definition for the products history ag-grid table
 */
export const getProductsHistoryTableColDef = (): ColDef[] => {
    return [
        {
            headerName: 'Item Name',
            field: 'itemName',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'GTIN Number',
            field: 'gtinNumber',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Brand',
            field: 'brand',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Category',
            field: 'category',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Price',
            field: 'price',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
    ];
};
