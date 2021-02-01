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
import { computeItemSubtotal, computeItemTotal } from 'utilities/businessCalculations';
import { COMMON_REGEXPS, COMMON_SYMBOLS } from 'utilities/general';
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
                    price: cartData.productCartInformation[index].price,
                    quantity: cartData.productCartInformation[index].quantity,
                    total: cartData.productCartInformation[index].total,
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
 * Compute total subTotal to add items in cart
 * @param cartData Current state of cart store
 */
export const computeTotalSubTotalNewSale = (cartData: IInitialStateNewSale['cartData']): string => {
    let totalSubTotal = 0;
    for (let index = 0; index < cartData.productCartInformation.length; index++) {
        totalSubTotal += cartData.productCartInformation[index].subTotal;
    }
    return totalSubTotal.toString();
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
                    price: product.sellingPrice,
                    subTotal: computeItemSubtotal({
                        itemPrice: product.sellingPrice,
                        quantity: 1,
                    }),
                    total: computeItemTotal({
                        itemPrice: product.sellingPrice,
                        discount: {
                            percent: 0,
                        },
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
    // creating a clone to work with
    const productCartInformation: INewSaleCart['productCartInformation'] = merge(
        [],
        oldCartData.productCartInformation,
    );
    switch (event.column.getColId()) {
        case NEW_SALE_CART_TABLE_COLUMNS.ITEM_NAME:
            productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.ITEM_NAME] =
                event.newValue;
            break;

        case NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT:
            productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT] =
                event.newValue;
            // computing the new total
            productCartInformation[event.rowIndex]['total'] = computeItemTotal({
                itemPrice: oldCartData.products[event.rowIndex].sellingPrice,
                discount: {
                    percent:
                        productCartInformation[event.rowIndex][
                            NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT
                        ],
                },
                quantity:
                    productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.QUANTITY],
                taxPercents: oldCartData.products[event.rowIndex].taxBracket.map((taxBracket) =>
                    parseInt(taxBracket.taxPercent),
                ),
            });
            break;

        case NEW_SALE_CART_TABLE_COLUMNS.PRICE:
            productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.PRICE] =
                event.newValue;
            // computing the new total
            productCartInformation[event.rowIndex]['total'] = computeItemTotal({
                itemPrice: oldCartData.products[event.rowIndex].sellingPrice,
                discount: {
                    percent:
                        productCartInformation[event.rowIndex][
                            NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT
                        ],
                },
                quantity:
                    productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.QUANTITY],
                taxPercents: oldCartData.products[event.rowIndex].taxBracket.map((taxBracket) =>
                    parseInt(taxBracket.taxPercent),
                ),
            });
            break;

        case NEW_SALE_CART_TABLE_COLUMNS.QUANTITY:
            productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.QUANTITY] =
                event.newValue;
            // computing the new total
            productCartInformation[event.rowIndex]['total'] = computeItemTotal({
                itemPrice: oldCartData.products[event.rowIndex].sellingPrice,
                discount: {
                    percent:
                        productCartInformation[event.rowIndex][
                            NEW_SALE_CART_TABLE_COLUMNS.DISCOUNT
                        ],
                },
                quantity:
                    productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.QUANTITY],
                taxPercents: oldCartData.products[event.rowIndex].taxBracket.map((taxBracket) =>
                    parseInt(taxBracket.taxPercent),
                ),
            });
            // computing the new subtotal
            productCartInformation[event.rowIndex]['subTotal'] = computeItemSubtotal({
                itemPrice: oldCartData.products[event.rowIndex].sellingPrice,
                quantity:
                    productCartInformation[event.rowIndex][NEW_SALE_CART_TABLE_COLUMNS.QUANTITY],
            });
            break;
    }
    store.dispatch(
        setCartData({
            products: oldCartData.products,
            productCartInformation: productCartInformation,
        }),
    );
};
