import { ColDef } from 'ag-grid-community';

/**
 * Gets the column definition for the tax brackets history ag-grid table
 */
export const getTaxBracketsHistoryTableColDef = (): ColDef[] => {
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
            headerName: 'Tax-Bracket Name',
            field: 'taxbracketName',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 4,
        },
        {
            headerName: 'Tax-Bracket Percent',
            field: 'taxbracketPercent',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 4,
        },
    ];
};
