import { ColDef } from 'ag-grid-community';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IStockUnitsHistoryTableColumns } from './stockUnitsHistory.types';

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

/**
 * * Used to compile the rows for the stockUnitsHistory table
 */
export const compileStockUnitsHistoryTableBodyData = (
    stockUnitData: pointOfSaleTypes.stockUnitResponseTypes.IGetAllStockUnits['data'],
): IStockUnitsHistoryTableColumns[] => {
    if (stockUnitData?.length > 0) {
        return stockUnitData.map(
            (stockUnit, index): IStockUnitsHistoryTableColumns => {
                return {
                    sno: index + 1,
                    stockUnitName: stockUnit.name,
                };
            },
        );
    } else {
        [];
    }
};
