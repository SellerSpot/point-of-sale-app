import { ColDef } from 'ag-grid-community';
import { COMMON_SYMBOLS } from 'utilities/general';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IProductsHistoryTableColumns } from './productsHistory.types';

//# TABLE FUNCTIONS

/**
 * * Gets the column definition for the products history ag-grid table
 */
export const getProductsHistoryTableColDef = (): ColDef[] => {
    return [
        {
            headerName: 'Item Name',
            field: 'itemName' as keyof IProductsHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'GTIN Number',
            field: 'itemGTINNumber' as keyof IProductsHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Brand',
            field: 'itemBrand' as keyof IProductsHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Category',
            field: 'itemCategory' as keyof IProductsHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Price',
            field: 'itemPrice' as keyof IProductsHistoryTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
            valueFormatter: (value) => `${COMMON_SYMBOLS.RUPEE_SYMBOL} ${value.value}`,
        },
    ];
};

/**
 * * Used to comile the rows for the productsHistory table
 */
export const compileProductsHistoryTableBodyData = (
    productsData: pointOfSaleTypes.productResponseTypes.IGetAllProducts['data'],
): IProductsHistoryTableColumns[] => {
    if (productsData.length > 0) {
        return productsData.map(
            (product): IProductsHistoryTableColumns => {
                // typecasting
                const currentCategory = product.category as pointOfSaleTypes.categoryResponseTypes.IGetCategory['data'];
                const currentBrand = product.category as pointOfSaleTypes.brandResponseTypes.IGetBrand['data'];
                return {
                    itemName: product.name,
                    itemGTINNumber: product.gtinNumber,
                    itemPrice: product.sellingPrice.toString(),
                    itemCategory: currentCategory.name,
                    itemBrand: currentBrand.name,
                };
            },
        );
    } else {
        [];
    }
};
