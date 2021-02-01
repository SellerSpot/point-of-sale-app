import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { isNull } from 'lodash';
import React from 'react';
import {
    IInitialStateNewSale,
    initialStateNewSale,
    setCartData,
    setSearchQuery,
    setSearchResults,
} from 'store/models/newSale';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { computeSubtotal } from 'utilities/businessCalculations';
import { COMMON_SYMBOLS } from 'utilities/general';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    INewSaleCart,
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
    cartData: INewSaleCart,
): INewSaleCartTableColumns[] => {
    if (cartData.products.length > 0) {
        return cartData.products.map(
            (product, index): INewSaleCartTableColumns => {
                return {
                    itemName: cartData.productCartInformation[index].itemName,
                    discount: cartData.productCartInformation[index].discount,
                    quantity: cartData.productCartInformation[index].quantity,
                    subTotal: cartData.productCartInformation[index].subTotal,
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
            headerName: `Price ( ${COMMON_SYMBOLS.RUPEE_SYMBOL} )`,
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
            headerName: `Sub-Total ( ${COMMON_SYMBOLS.RUPEE_SYMBOL} )`,
            field: NEW_SALE_CART_TABLE_COLUMNS.SUB_TOTAL,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            flex: 1,
        },
        {
            headerName: `Discount ( ${COMMON_SYMBOLS.PERCENTAGE_SYMBOL} )`,
            field: NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            flex: 1,
        },
    ];
};

/**
 * STATE UPDATE ACTIONS
 */

/**
 * Used to push product into cart
 * @param oldCartData The latest cart information from the store
 * @param product The single product to push into cart
 */
export const pushProductIntoCart = (
    oldCartData: IInitialStateNewSale['cartData'],
    product: pointOfSaleTypes.productResponseTypes.ISearchProduct['data']['results'][0],
): void => {
    // pushing item to cart
    store.dispatch(
        setCartData({
            products: [...oldCartData.products, product],
            productCartInformation: [
                ...oldCartData.productCartInformation,
                {
                    itemName: product.name,
                    discount: 0,
                    quantity: 1,
                    subTotal: computeSubtotal({
                        itemPrice: product.sellingPrice,
                        taxPercents: product.taxBracket.map((taxBracket) =>
                            parseInt(taxBracket.taxPercent),
                        ),
                    }),
                },
            ],
        }),
    );
    // resetting the other fields
    store.dispatch(setSearchQuery(initialStateNewSale.searchQuery));
    store.dispatch(setSearchResults(initialStateNewSale.searchResults));
};

/**
 * Handles the inline cell value change in the cart table
 * @param oldCartData Latest cart state of the new sale page
 * @param event event from ag-grid
 */
export const handleNewSaleCartTableCellValueChange = (
    oldCartData: IInitialStateNewSale['cartData'],
    event: CellValueChangedEvent,
): void => {
    const productCartInformation = oldCartData.productCartInformation;
    switch (event.column.getColId()) {
        case 'itemName':
            productCartInformation[event.rowIndex]['itemName'] = event.newValue;
            break;
        case 'discount':
            productCartInformation[event.rowIndex]['discount'] = event.newValue;
            break;
        case 'quantity':
            productCartInformation[event.rowIndex]['quantity'] = event.newValue;
            break;
        case 'subTotal':
            productCartInformation[event.rowIndex]['subTotal'] = event.newValue;
            break;
    }
    store.dispatch(
        setCartData({
            products: oldCartData.products,
            productCartInformation: productCartInformation,
        }),
    );
};
