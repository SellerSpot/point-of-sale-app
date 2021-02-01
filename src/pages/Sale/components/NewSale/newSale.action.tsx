import { ColDef } from 'ag-grid-community';
import { isNull } from 'lodash';
import React from 'react';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    INewSaleCartTableColumns,
    INewSaleProductsTableColumns,
    NEW_SALE_CART_TABLE_COLUMNS,
    NEW_SALE_PRODUCTS_TABLE_COLUMNS,
} from './newSale.types';

/**
 * Used to compile the row data for New Sale Products Table
 * @param productsData Products data returned from server
 */
export const compileNewSaleProductsTableRowData = (
    productsData: pointOfSaleTypes.productResponseTypes.ISearchProduct['data'],
): INewSaleProductsTableColumns[] => {
    if (productsData?.results.length > 0 && productsData?.queryType === 'name') {
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
 * Used to compile the row data for New Sale Cart Table
 * @param cartData Products data returned from server
 */
export const compileNewSaleCartTableRowData = (
    cartData: pointOfSaleTypes.productResponseTypes.ISearchProduct['data']['results'],
): INewSaleCartTableColumns[] => {
    if (cartData.length > 0) {
        return cartData.map(
            (product): INewSaleCartTableColumns => {
                return {
                    itemName: product.name,
                    discount: 0,
                    quantity: 1,
                    subTotal: 0,
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
            flex: 2,
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
            field: NEW_SALE_CART_TABLE_COLUMNS.ITEM_NAME,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            flex: 2,
        },
        {
            headerName: 'Quantity',
            field: NEW_SALE_CART_TABLE_COLUMNS.QUANTITY,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            flex: 1,
        },
        {
            headerName: 'Sub-Total',
            field: NEW_SALE_CART_TABLE_COLUMNS.SUB_TOTAL,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            flex: 1,
        },
        {
            headerName: 'Discount',
            field: NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            flex: 1,
        },
    ];
};
