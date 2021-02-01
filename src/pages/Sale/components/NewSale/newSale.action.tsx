import { ColDef } from 'ag-grid-community';
import { isNull } from 'lodash';
import React from 'react';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

interface INewSaleProductsTableColumns {
    itemName: string;
    gtinNumber: string;
    brand: string;
    category: string;
    price: string;
}
// holds the table columns for NewSale Products table
enum NEW_SALE_PRODUCTS_TABLE_COLUMNS {
    ITEM_NAME = 'itemName',
    GTIN_NUMBER = 'gtinNumber',
    BRAND = 'brand',
    CATEGORY = 'category',
    PRICE = 'price',
}

/**
 * Used to compile the row data for New Sale Products Table
 * @param productsData Products data returned from server
 */
export const compileNewSaleProductsTableRowData = (
    productsData: pointOfSaleTypes.productResponseTypes.ISearchProduct['data'],
): INewSaleProductsTableColumns[] => {
    if (productsData?.results.length > 0) {
        return productsData.results.map(
            (product): INewSaleProductsTableColumns => {
                return {
                    brand: product.brand.name,
                    category: product.category.name,
                    gtinNumber: product.gtinNumber,
                    itemName: product.name,
                    price: product.sellingPrice.toString(),
                };
            },
        );
    } else {
        return [];
    }
};

/**
 * Gets the column definition for the newSale products ag-grid table
 */
export const getNewSaleProductsTableColDef = (): ColDef[] => {
    return [
        {
            headerName: 'Item Name',
            field: NEW_SALE_PRODUCTS_TABLE_COLUMNS.ITEM_NAME,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'GTIN Number',
            field: NEW_SALE_PRODUCTS_TABLE_COLUMNS.GTIN_NUMBER,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Brand',
            field: NEW_SALE_PRODUCTS_TABLE_COLUMNS.BRAND,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Category',
            field: NEW_SALE_PRODUCTS_TABLE_COLUMNS.CATEGORY,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Price',
            field: NEW_SALE_PRODUCTS_TABLE_COLUMNS.PRICE,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
    ];
};

/**
 * Gets the column definition for the newSale cart ag-grid table
 */
export const getNewSaleCartTableColDef = (): ColDef[] => {
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
            headerName: 'Quantity',
            field: 'quantity',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Sub-Total',
            field: 'subtotal',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: 'Discount',
            field: 'discount',
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
    ];
};
