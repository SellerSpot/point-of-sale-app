import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { merge } from 'lodash';
import {
    IInitialStateNewSale,
    initialStateNewSale,
    setCartData,
    setSearchQuery,
    setSearchResults,
} from 'store/models/newSale';
import { store } from 'store/store';
import {
    computeGrandTotal,
    computeGrandTotalDiscount,
    computeGrandTotalTax,
    computeItemSubtotal,
    computeItemTotal,
    computeItemTotalDicount,
    computeItemTotalTax,
} from 'utilities/businessCalculations';
import { COMMON_REGEXPS, COMMON_SYMBOLS } from 'utilities/general';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    INewSaleCart,
    INewSaleCartTableColumns,
    INewSaleProductsTableColumns,
    NEW_SALE_CART_TABLE_COLUMNS,
    NEW_SALE_PRODUCTS_TABLE_COLUMNS,
} from './newSale.types';

//# TABLE FUNCTIONS

/**
 * * Gets the column definition for the newSale products table
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
            headerName: `Price ( ${COMMON_SYMBOLS.RUPEE_SYMBOL} )`,
            field: NEW_SALE_PRODUCTS_TABLE_COLUMNS.PRICE,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
            valueFormatter: (value) => `${COMMON_SYMBOLS.RUPEE_SYMBOL} ${value.value}`,
        },
    ];
};

/**
 * * Used to compile the row data for New Sale Products Table
 */
export const compileNewSaleProductsTableRowData = (
    productsData: pointOfSaleTypes.productResponseTypes.ISearchProduct['data'],
): INewSaleProductsTableColumns[] => {
    if (productsData?.results.length > 0 && productsData?.queryType === 'name') {
        return productsData.results.map(
            (product): INewSaleProductsTableColumns => {
                return {
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
 * * Gets the column definition for the newSale cart ag-grid table
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
            flex: 1,
            valueParser: (parserParams) =>
                COMMON_REGEXPS.STRING_WITH_SPACE_BETWEEN.test(parserParams.newValue)
                    ? parserParams.newValue
                    : parserParams.oldValue,
        },
        {
            headerName: 'Quantity',
            field: NEW_SALE_CART_TABLE_COLUMNS.QUANTITY,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            flex: 1,
            valueParser: (parserParams) =>
                COMMON_REGEXPS.ONLY_NUMBERS.test(parserParams.newValue)
                    ? parserParams.newValue >= 0
                        ? parseInt(parserParams.newValue)
                        : parserParams.oldValue
                    : parserParams.oldValue,
        },
        {
            headerName: `Price ( ${COMMON_SYMBOLS.RUPEE_SYMBOL} )`,
            field: NEW_SALE_PRODUCTS_TABLE_COLUMNS.PRICE,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            flex: 1,
            valueFormatter: (value) => `${COMMON_SYMBOLS.RUPEE_SYMBOL} ${value.value}`,
            valueParser: (parserParams) =>
                COMMON_REGEXPS.ONLY_NUMBERS.test(parserParams.newValue)
                    ? parserParams.newValue >= 0
                        ? parseInt(parserParams.newValue)
                        : parserParams.oldValue
                    : parserParams.oldValue,
        },
        {
            headerName: `Discount ( ${COMMON_SYMBOLS.PERCENTAGE_SYMBOL} )`,
            field: NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            flex: 1,
            valueFormatter: (formatterParams) =>
                `${formatterParams.value} ${COMMON_SYMBOLS.PERCENTAGE_SYMBOL}`,
            valueParser: (parserParams) =>
                COMMON_REGEXPS.ONLY_NUMBERS.test(parserParams.newValue)
                    ? parserParams.newValue <= 100 && parserParams.newValue >= 0
                        ? parseInt(parserParams.newValue)
                        : parserParams.oldValue
                    : parserParams.oldValue,
        },
        {
            headerName: `Total ( ${COMMON_SYMBOLS.RUPEE_SYMBOL} )`,
            field: NEW_SALE_CART_TABLE_COLUMNS.TOTAL,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
            valueFormatter: (formatterParams) =>
                `${formatterParams.value} ${COMMON_SYMBOLS.PERCENTAGE_SYMBOL}`,
        },
    ];
};

/**
 * * Used to compile the row data for New Sale Cart Table
 */
export const compileNewSaleCartTableRowData = (
    cartData: INewSaleCart,
): INewSaleCartTableColumns[] => {
    if (cartData.productCartInformation.length > 0) {
        return cartData.productCartInformation.map(
            (cartProduct): INewSaleCartTableColumns => {
                return {
                    itemName: cartProduct.itemName,
                    discount: cartProduct.itemDiscountPercent,
                    price: cartProduct.itemPrice,
                    quantity: cartProduct.itemQuantity,
                    total: cartProduct.itemTotal,
                };
            },
        );
    } else {
        return [];
    }
};

//# STATE UPDATE FUNCTIONS

/**
 * * Used to push product into cart
 */
export const pushProductIntoCart = (
    currentCartData: IInitialStateNewSale['cartData'],
    product: pointOfSaleTypes.productResponseTypes.ISearchProduct['data']['results'][0],
): void => {
    const itemQuantity = 1;
    const itemDiscountPercent = 0;
    // fetching required values
    const itemSubTotal = computeItemSubtotal({
        itemPrice: product.sellingPrice,
        itemQuantity,
    });
    const itemTotalTax = computeItemTotalTax({
        itemPrice: product.sellingPrice,
        itemQuantity,
        itemTaxPercents: product.taxBracket.map((taxBracket) => parseInt(taxBracket.taxPercent)),
    });
    const itemTotalDiscount = computeItemTotalDicount({
        itemDiscountPercent,
        itemPrice: product.sellingPrice,
        itemQuantity,
    });
    const itemTotal = computeItemTotal({
        itemPrice: product.sellingPrice,
        itemTotalDiscount,
        itemQuantity,
        itemTotalTax,
    });
    const grandTotal = computeGrandTotal({
        itemTotals: [
            ...currentCartData.productCartInformation.map((product) => product.itemTotal),
            itemTotal,
        ],
    });
    const grandTotalDiscount = computeGrandTotalDiscount({
        itemTotalDiscounts: [
            ...currentCartData.productCartInformation.map((product) => product.itemTotalDiscount),
            itemTotalDiscount,
        ],
    });
    const grandTotalTax = computeGrandTotalTax({
        itemTotalTaxes: [
            ...currentCartData.productCartInformation.map((product) => product.itemTotalTax),
            itemTotalTax,
        ],
    });

    // pushing item to cart
    store.dispatch(
        setCartData({
            products: [...currentCartData.products, product],
            productCartInformation: [
                ...currentCartData.productCartInformation,
                {
                    itemName: product.name,
                    itemDiscountPercent,
                    itemQuantity,
                    itemPrice: product.sellingPrice,
                    itemSubTotal,
                    itemTotalTax,
                    itemTotalDiscount,
                    itemTotal,
                },
            ],
            totals: {
                grandTotal,
                grandTotalDiscount,
                grandTotalTax,
            },
        }),
    );
    // resetting the other fields
    store.dispatch(setSearchQuery(initialStateNewSale.searchQuery));
    store.dispatch(setSearchResults(initialStateNewSale.searchResults));
};

export const recomputeCartValues = (
    cartData: IInitialStateNewSale['cartData'],
    rowIndex: number,
): void => {};

/**
 * Handles the inline cell value change in the cart table
 * @param currentCartData Latest cart state of the new sale page
 * @param event event from ag-grid
 */
export const handleNewSaleCartTableCellValueChange = (
    currentCartData: IInitialStateNewSale['cartData'],
    event: CellValueChangedEvent,
): void => {
    // creating a clone to work with
    const cartData: INewSaleCart = merge({}, currentCartData);
    switch (event.column.getColId()) {
        case NEW_SALE_CART_TABLE_COLUMNS.ITEM_NAME:
            cartData.productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.ITEM_NAME] =
                event.newValue;
            break;

        case NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT:
            cartData.productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT] =
                event.newValue;
            recomputeCartValues(cartData, event.rowIndex);
            break;

        case NEW_SALE_CART_TABLE_COLUMNS.PRICE:
            cartData.productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.PRICE] =
                event.newValue;
            recomputeCartValues(cartData, event.rowIndex);
            break;

        case NEW_SALE_CART_TABLE_COLUMNS.QUANTITY:
            cartData.productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.QUANTITY] =
                event.newValue;
            recomputeCartValues(cartData, event.rowIndex);
            break;
    }
};
