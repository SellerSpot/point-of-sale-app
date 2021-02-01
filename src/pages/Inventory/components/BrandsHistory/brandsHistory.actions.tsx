import { ColDef } from 'ag-grid-community';

/**
 * Gets the column definition for the brands history ag-grid table
 */
export const getBrandsHistoryTableColDef = (): ColDef[] => {
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
            headerName: 'Brand Name',
            field: 'brandName',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
    ];
};
