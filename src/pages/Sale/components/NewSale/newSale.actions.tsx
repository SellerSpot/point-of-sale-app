import { CellValueChangedEvent, ColDef, GridApi, ICellRendererParams } from 'ag-grid-community';
import { find, isNull, isUndefined, merge } from 'lodash';
import React from 'react';
import { MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';
import {
    IInitialStateNewSale,
    initialStateNewSale,
    setCartData,
    setSearchQuery,
    setSearchResults,
} from 'store/models/newSale';
import { SLIDERS, openSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import {
    computeCartData,
    computeGrandTotal,
    computeGrandTotalDiscount,
    computeGrandTotalTax,
    computeItemPrice,
    computeItemSubtotal,
    computeItemTotal,
    computeItemTotalDiscount,
    computeItemTotalTax,
} from 'utilities/businessCalculations';
import { COMMON_REGEXPS, COMMON_SYMBOLS } from 'utilities/general';
import { Button } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import styles from './newSale.module.scss';
import {
    INewSaleCart,
    INewSaleCartTableColumns,
    INewSaleProductsTableColumns,
} from './newSale.types';

//# TABLE FUNCTIONS

// Compile data to show in table
export const compileProductsTableBodyData = (
    productsData: pointOfSaleTypes.productResponseTypes.ISearchProduct['data'],
): JSX.Element[][] => {
    if (!isNull(productsData) && productsData.results?.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        productsData.results.map((product, index) => {
            // typecasting
            const currentBrand = product.brand as pointOfSaleTypes.brandResponseTypes.IGetBrand['data'];
            const currentCategory = product.category as pointOfSaleTypes.categoryResponseTypes.IGetCategory['data'];
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={product.name}>{product.name}</p>,
                <p key={product.gtinNumber}>{product.gtinNumber}</p>,
                <p key={currentBrand._id}>{currentBrand.name}</p>, // change types
                <p key={currentCategory._id}>{currentCategory.name}</p>, // change types
                <p key={product.stockInformation.availableStock}>
                    {product.stockInformation.availableStock}
                </p>,
                <p key={product.sellingPrice}>{product.sellingPrice}</p>,
            ]);
        });
        return compiledData;
    } else {
        return [];
    }
};

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
                    itemPrice: product.sellingPrice.toString(),
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
            headerComponentParams: {
                template:
                    '<div class="ag-cell-label-container" role="presentation">' +
                    '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                    '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                    '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
                    '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
                    '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
                    '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
                    '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>&nbsp*' +
                    '    <i ref="eFilter" class="ag-header-icon ag-filter-icon"></i>' +
                    '  </div>' +
                    '</div>',
            },
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
            headerComponentParams: {
                template:
                    '<div class="ag-cell-label-container" role="presentation">' +
                    '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                    '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                    '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
                    '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
                    '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
                    '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
                    '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>&nbsp*' +
                    '    <i ref="eFilter" class="ag-header-icon ag-filter-icon"></i>' +
                    '  </div>' +
                    '</div>',
            },
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
            headerComponentParams: {
                template:
                    '<div class="ag-cell-label-container" role="presentation">' +
                    '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                    '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                    '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
                    '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
                    '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
                    '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
                    '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>&nbsp*' +
                    '    <i ref="eFilter" class="ag-header-icon ag-filter-icon"></i>' +
                    '  </div>' +
                    '</div>',
            },
            valueFormatter: (formatterParams) =>
                `${COMMON_SYMBOLS.RUPEE_SYMBOL} ${parseInt(
                    formatterParams.value.toString(),
                ).toLocaleString()}`,
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
            headerComponentParams: {
                template:
                    '<div class="ag-cell-label-container" role="presentation">' +
                    '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                    '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                    '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
                    '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
                    '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
                    '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
                    '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>&nbsp*' +
                    '    <i ref="eFilter" class="ag-header-icon ag-filter-icon"></i>' +
                    '  </div>' +
                    '</div>',
            },
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
                `${COMMON_SYMBOLS.RUPEE_SYMBOL} ${parseInt(
                    formatterParams.value.toString(),
                ).toLocaleString()}`,
        },
        {
            headerName: `Actions`,
            field: 'itemActions' as keyof INewSaleCartTableColumns,
            width: 120,
            cellRendererFramework: function customCellRenderer(params: ICellRendererParams) {
                return (
                    <div className={styles.cartActionButtonWrapper}>
                        <Button
                            className={styles.cartActionButton}
                            key={params.rowIndex + 'edit'}
                            label={<MdMoreVert size={20} />}
                            onClick={(_) =>
                                store.dispatch(
                                    openSliderModal({
                                        sliderName: SLIDERS.itemDetailSlider,
                                        autoFillData: {
                                            cartItemSelectedRowIndex: params.rowIndex,
                                        },
                                    }),
                                )
                            }
                        />
                        <Button
                            className={styles.cartActionButton}
                            key={params.rowIndex + 'delete'}
                            label={<MdDelete size={20} />}
                            onClick={(_) => alert('Delete ' + params.rowIndex)}
                        />
                    </div>
                );
            },
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

/**
 * * To prevent duplicate entries in the cart
 */
export const checkIfProductAlreadyExistsInCart = (props: {
    currentCartData: IInitialStateNewSale['cartData'];
    product: pointOfSaleTypes.productResponseTypes.ISearchProduct['data']['results'][0];
}): number => {
    for (let i = 0; i < props.currentCartData.products.length; i++) {
        if (props.currentCartData.products[i].name === props.product.name) {
            return i;
        }
    }
    return -1;
};

//# STATE UPDATE FUNCTIONS

/**
 * * Used to push product into cart
 */
export const pushProductIntoCart = (
    currentCartData: IInitialStateNewSale['cartData'],
    product: pointOfSaleTypes.productResponseTypes.ISearchProduct['data']['results'][0],
    cartTableGridApi: GridApi,
): void => {
    const indexIfProductAlreadyExistsInCart = checkIfProductAlreadyExistsInCart({
        currentCartData,
        product,
    });
    // if the product already exists
    if (indexIfProductAlreadyExistsInCart !== -1) {
        handleReAddProductToCart({
            currentCartData,
            rowIndex: indexIfProductAlreadyExistsInCart,
        });
    } else {
        // creating localcopy of currentCartData
        let currentCartDataLocal = merge({}, currentCartData);
        // adding product into object
        currentCartDataLocal.products.push(product);
        currentCartDataLocal.productCartInformation.push({
            itemName: product.name,
            itemPrice: product.sellingPrice,
            itemQuantity: 1,
            itemDiscountPercent: 0,
            itemDiscountValue: 0,
            itemSubTotalAfterDiscounts: 0,
            itemSubTotalBeforeDiscounts: 0,
            itemTotal: 0,
            taxSum: 0,
            taxes: [],
            totalDiscountValue: 0,
            totalTax: 0,
            grandTotal: 0,
        });

        // getting computed values
        currentCartDataLocal = computeCartData({
            cartData: currentCartDataLocal,
        });

        // pushing item to cart
        store.dispatch(setCartData(currentCartDataLocal));
    }

    // resetting the other fields
    store.dispatch(setSearchQuery(initialStateNewSale.searchQuery));
    store.dispatch(setSearchResults(initialStateNewSale.searchResults));
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
    let cartData: INewSaleCart = merge({}, currentCartData);
    // updating the required value
    switch (event.column.getColId() as keyof INewSaleCartTableColumns) {
        case 'itemName':
            cartData.productCartInformation[event.rowIndex]['itemName'] = event.newValue;
            break;
        case 'itemPrice':
            cartData.productCartInformation[event.rowIndex]['itemPrice'] = event.newValue;
            break;
        case 'itemDiscountPercent':
            cartData.productCartInformation[event.rowIndex]['itemDiscountPercent'] = event.newValue;
            break;
        case 'itemQuantity':
            cartData.productCartInformation[event.rowIndex]['itemQuantity'] = event.newValue;
            break;
        case 'itemTotal':
            cartData.productCartInformation[event.rowIndex]['itemTotal'] = event.newValue;
            break;
    }
    // getting computed values
    cartData = computeCartData({
        cartData,
    });

    // pushing item to cart
    store.dispatch(setCartData(cartData));
};

/**
 * Handle reAdding a product to cart
 */
export const handleReAddProductToCart = (props: {
    currentCartData: IInitialStateNewSale['cartData'];
    rowIndex: number;
}): void => {
    // creating a clone to work with
    let cartData: INewSaleCart = merge({}, props.currentCartData);
    const currentProductQuantityInCart =
        cartData.productCartInformation[props.rowIndex].itemQuantity;
    cartData.productCartInformation[props.rowIndex].itemQuantity = currentProductQuantityInCart + 1;
    // getting computed values
    cartData = computeCartData({
        cartData,
    });

    // pushing item to cart
    store.dispatch(setCartData(cartData));
};
