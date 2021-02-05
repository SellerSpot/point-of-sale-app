import { ColDef } from 'ag-grid-community';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { ITaxBracketsHistoryTableColumns } from './taxBracketsHistory.types';

/**
 * Gets the column definition for the tax brackets history ag-grid table
 */
export const getTaxBracketsHistoryTableColDef = (): ColDef[] => {
    return [
        {
            headerName: 'S.No',
            field: 'sno' as keyof ITaxBracketsHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Tax-Bracket Name',
            field: 'taxBracketName' as keyof ITaxBracketsHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 4,
        },
        {
            headerName: 'Tax-Bracket Percent',
            field: 'taxBracketPercent' as keyof ITaxBracketsHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 4,
        },
    ];
};

/**
 * * Used to comile the rows for the taxBracketsHistory table
 */
export const compileTaxBracketsHistoryTableBodyData = (
    taxBracketData: pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets['data'],
): ITaxBracketsHistoryTableColumns[] => {
    if (taxBracketData?.length > 0) {
        return taxBracketData.map(
            (taxBracket, index): ITaxBracketsHistoryTableColumns => {
                return {
                    sno: index + 1,
                    taxBracketName: taxBracket.name,
                    taxBracketPercent: taxBracket.taxPercent,
                };
            },
        );
    } else {
        [];
    }
};
