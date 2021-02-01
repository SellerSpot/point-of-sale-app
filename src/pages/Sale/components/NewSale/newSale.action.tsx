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
} from './newSale.types';

//# TABLE FUNCTIONS

/**
 * * Gets the column definition for the newSale products table
 */
export const getNewSaleProductsTableColDef = (): ColDef[] => {
    return [
        {
            headerName: 'Item Name',
            field: 'itemName' as keyof INewSaleProductsTableColumns,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
        },
        {
            headerName: `Price ( ${COMMON_SYMBOLS.RUPEE_SYMBOL} )`,
            field: 'itemPrice' as keyof INewSaleProductsTableColumns,
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
            field: 'itemName' as keyof INewSaleCartTableColumns,
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
            field: 'itemQuantity' as keyof INewSaleCartTableColumns,
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
            field: 'itemPrice' as keyof INewSaleCartTableColumns,
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
            field: 'itemDiscountPercent' as keyof INewSaleCartTableColumns,
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
            field: 'itemTotal' as keyof INewSaleCartTableColumns,
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
                    itemDiscountPercent: cartProduct.itemDiscountPercent,
                    itemPrice: cartProduct.itemPrice,
                    itemQuantity: cartProduct.itemQuantity,
                    itemTotal: cartProduct.itemTotal,
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
): void => {
    // getting current item details
    const currentProduct = cartData.products[rowIndex];
    const currentCartInformation = cartData.productCartInformation[rowIndex];
    // fetching required values
    currentCartInformation.itemSubTotal = computeItemSubtotal({
        itemPrice: currentProduct.sellingPrice,
        itemQuantity: currentCartInformation.itemQuantity,
    });
    currentCartInformation.itemTotalTax = computeItemTotalTax({
        itemPrice: currentProduct.sellingPrice,
        itemQuantity: currentCartInformation.itemQuantity,
        itemTaxPercents: currentProduct.taxBracket.map((taxBracket) =>
            parseInt(taxBracket.taxPercent),
        ),
    });
    currentCartInformation.itemTotalDiscount = computeItemTotalDicount({
        itemDiscountPercent: currentCartInformation.itemDiscountPercent,
        itemPrice: currentProduct.sellingPrice,
        itemQuantity: currentCartInformation.itemQuantity,
    });
    currentCartInformation.itemTotal = computeItemTotal({
        itemPrice: currentProduct.sellingPrice,
        itemTotalDiscount: currentCartInformation.itemTotalDiscount,
        itemQuantity: currentCartInformation.itemQuantity,
        itemTotalTax: currentCartInformation.itemTotalTax,
    });
    // updating the object with new values
    cartData.productCartInformation[rowIndex] = currentCartInformation;
    // updating totals
    cartData.totals.grandTotal = computeGrandTotal({
        itemTotals: [...cartData.productCartInformation.map((product) => product.itemTotal)],
    });
    cartData.totals.grandTotalDiscount = computeGrandTotalDiscount({
        itemTotalDiscounts: [
            ...cartData.productCartInformation.map((product) => product.itemTotalDiscount),
        ],
    });
    cartData.totals.grandTotalTax = computeGrandTotalTax({
        itemTotalTaxes: [...cartData.productCartInformation.map((product) => product.itemTotalTax)],
    });
    // updating state
    store.dispatch(setCartData(cartData));
};

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
    // updating the required value
    switch (event.column.getColId() as keyof INewSaleCartTableColumns) {
        case 'itemName':
            cartData.productCartInformation[event.rowIndex]['itemName'] = event.data;
            break;
        case 'itemPrice':
            cartData.productCartInformation[event.rowIndex]['itemPrice'] = event.data;
            break;
        case 'itemDiscountPercent':
            cartData.productCartInformation[event.rowIndex]['itemDiscountPercent'] = event.data;
            break;
        case 'itemQuantity':
            cartData.productCartInformation[event.rowIndex]['itemQuantity'] = event.data;
            break;
        case 'itemTotal':
            cartData.productCartInformation[event.rowIndex]['itemTotal'] = event.data;
            break;
    }
    recomputeCartValues(cartData, event.rowIndex);
};
