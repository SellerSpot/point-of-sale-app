import { ColDef } from 'ag-grid-community';

/**
 * Gets the column definition for the stockUnits history ag-grid table
 */
export const getStockUnitsHistoryTableColDef = (): ColDef[] => {
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
            headerName: 'Stock-Unit Name',
            field: 'stockUnitName',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
    ];
};
