import { ColDef } from 'ag-grid-community';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IBrandsHistoryTableColumns } from './brandsHistory.types';

/**
 * Gets the column definition for the brands history ag-grid table
 */
export const getBrandsHistoryTableColDef = (): ColDef[] => {
    return [
        {
            headerName: 'S.No',
            field: 'sno' as keyof IBrandsHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Brand Name',
            field: 'brandName' as keyof IBrandsHistoryTableColumns,
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
    brandData: pointOfSaleTypes.brandResponseTypes.IGetAllBrands['data'],
): IBrandsHistoryTableColumns[] => {
    if (brandData?.length > 0) {
        return brandData.map(
            (brand, index): IBrandsHistoryTableColumns => {
                return {
                    sno: index + 1,
                    brandName: brand.name,
                };
            },
        );
    } else {
        [];
    }
};
