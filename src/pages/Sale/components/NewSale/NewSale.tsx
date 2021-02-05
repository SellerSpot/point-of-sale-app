import { GridApi, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import cn from 'classnames';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { productRequests } from 'requests';
import { newSaleSelector, setSearchQuery, setSearchResults } from 'store/models/newSale';
import { toggleSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import { introduceDelay } from 'utilities/general';
import { generalUtilities } from 'utilities/utilities';
import { Button, InputField } from '@sellerspot/universal-components';
import {
    compileNewSaleCartTableRowData,
    compileNewSaleProductsTableRowData,
    getNewSaleCartTableColDef,
    getNewSaleProductsTableColDef,
    handleNewSaleCartTableCellValueChange,
    pushProductIntoCart,
} from './newSale.actions';
import styles from './newSale.module.scss';
import { INewSaleProps } from './newSale.types';

export const NewSale = (props: INewSaleProps): JSX.Element => {
    //# VALUE HOOKS
    // subscribing to state
    const { cartData, searchQuery, searchResults } = useSelector(newSaleSelector);
    // state to handle the focus state of the searchBar
    const [searchBarFocused, setSearchBarFocused] = useState(true);
    // used to help identify if the input is from direct input or using eventListeners (to prevent double input bug)
    const [inputIsFromHandleKeydown, setInputIsFromHandleKeyDown] = useState(false);
    // getting sliderState to listen to when the slider is invoked to autopopulate if needed
    const sliderState = useSelector((state: RootState) => state.sliderModal);
    // holds the GridApi for the cart table
    const [cartTableGridApi, setCartTableGridApi] = useState<GridApi>(null);

    //# CRITICAL FUNCTIONS

    //* handles the closing of the sliderModal
    const handleCloseSlider = () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'newSaleSlider',
                active: false,
                autoFillData: null,
            }),
        );
        props.callBackStateTrack[1]({
            ...props.callBackStateTrack[0],
            newSaleSlider: false,
        });
    };

    //* handles ANYWHERE keydown event to focus it to inputField
    const handleKeydown = useCallback(
        async (event: KeyboardEvent) => {
            // checking if it is a key that produces a character and that it is not from an inputElement
            if (/^.$/u.test(event.key) && !(event.target instanceof HTMLInputElement)) {
                setSearchBarFocused(true);
                const newSearchQuery = searchQuery + event.key;
                store.dispatch(setSearchQuery(newSearchQuery));
                // setting flag to inform that the input if from the event listener
                setInputIsFromHandleKeyDown(true);
                // call to send query to server to fetch suggestions
                queryServer(newSearchQuery);
            }
        },
        [searchQuery],
    );

    //* query the server to fetch product suggestions on searchBar type
    const queryServer = useCallback(
        debounce(async (query: string) => {
            if (query.length > 0) {
                const searchedProducts = await productRequests.searchProduct(query);
                store.dispatch(setSearchResults(searchedProducts));
            }
        }, 400),
        [],
    );

    //* used to handle the user typing in the SearchField
    const handleProductNameSearch = async (query: string): Promise<void> => {
        // handling if the character is from the event listener (to prevent a double input bug)
        if (inputIsFromHandleKeydown) {
            // resetting the eventListener input
            setInputIsFromHandleKeyDown(false);
            return;
        }
        // if search field is empty, clear the search results
        if (query.length === 0) {
            store.dispatch(
                setSearchResults({
                    queryType: 'name',
                    results: [],
                }),
            );
        }
        store.dispatch(setSearchQuery(query));
        // call to send query to server to fetch suggestions
        queryServer(query);
    };

    //* push data from products table to cart
    const handleNewSaleProductTableRowClick = (event: RowClickedEvent) => {
        // pushing item to cart
        pushProductIntoCart(cartData, searchResults.results[event.rowIndex], cartTableGridApi);
        setSearchBarFocused(true);
    };

    //# HOOK CALLS

    //* used to handle searchbar refocussing procedure
    useEffect(() => {
        // calling default focus
        if (sliderState.newSaleSlider.show) {
            // setting focus towards the searchBar
            setSearchBarFocused(true);
            document.addEventListener('keydown', handleKeydown);
        } else {
            document.removeEventListener('keydown', handleKeydown);
        }
    }, [sliderState.newSaleSlider.show]);

    //* used to handle the closing operations of the sliderModel
    useEffect(() => {
        if (props.callBackStateTrack[0].newSaleSlider) {
            handleCloseSlider();
        }
    }, [props.callBackStateTrack[0].newSaleSlider]);

    //* listening to the search result to push the barcode products directory to the cart
    useEffect(() => {
        if (searchResults.queryType === 'barcode') {
            pushProductIntoCart(cartData, searchResults.results[0], cartTableGridApi);
        }
    }, [searchResults]);

    //* listening for the new sale shortcut call
    useHotkeys(
        generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE,
        (event) => {
            event.preventDefault();
            store.dispatch(
                toggleSliderModal({
                    sliderName: 'newSaleSlider',
                    active: true,
                    autoFillData: null,
                }),
            );
        },
        {
            enableOnTags: ['INPUT', 'SELECT', 'TEXTAREA'],
        },
    );

    return (
        <div className={styles.newSaleWrapper}>
            <div className={styles.leftPanel}>
                <InputField
                    label={'Code, Product Name or use the Barcode scanner'}
                    focus={searchBarFocused}
                    setFocus={setSearchBarFocused}
                    placeHolder=""
                    value={searchQuery}
                    onChange={(event) => handleProductNameSearch(event.target.value)}
                />
                <div className={cn('ag-theme-alpine')}>
                    <AgGridReact
                        suppressDragLeaveHidesColumns
                        rowSelection={'single'}
                        onRowClicked={handleNewSaleProductTableRowClick}
                        suppressCellSelection={true}
                        columnDefs={getNewSaleProductsTableColDef()}
                        rowData={compileNewSaleProductsTableRowData(searchResults)}
                        overlayNoRowsTemplate={
                            '<span className="ag-overlay-loading-center">Search for products using the<br>search box above</span>'
                        }
                    />
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={'ag-theme-alpine'}>
                    <AgGridReact
                        suppressDragLeaveHidesColumns
                        columnDefs={getNewSaleCartTableColDef()}
                        rowData={compileNewSaleCartTableRowData(cartData)}
                        overlayNoRowsTemplate={
                            '<span className="ag-overlay-loading-center">Empty Cart</span>'
                        }
                        onCellValueChanged={(event) =>
                            handleNewSaleCartTableCellValueChange(cartData, event)
                        }
                        onCellEditingStopped={(_) => {
                            setSearchBarFocused(true);
                        }}
                        onGridReady={(event) => {
                            setCartTableGridApi(event.api);
                        }}
                        defaultColDef={{
                            enableCellChangeFlash: true,
                        }}
                    />
                </div>
                <div className={styles.rightPanelBottom}>
                    <div className={styles.cartMetaCard}>
                        <Button
                            onClick={() => window.open('calculator:///', 'noopener,noreferrer')}
                            label={'Calculator'}
                        />
                    </div>
                    <div className={styles.calculationCard}>
                        <div className={styles.calculationEntry}>
                            <span>{'Total Taxes'}</span>
                            <span>{`₹ ${cartData.totals.grandTotalTax}`}</span>
                        </div>
                        <div className={styles.calculationEntry}>
                            <span>{'Total Discount'}</span>
                            <span>{`₹ ${cartData.totals.grandTotalDiscount}`}</span>
                        </div>
                        <div className={styles.calculationEntry}>
                            <span>{'Grand Total'}</span>
                            <span
                                className={styles.orderTotalText}
                            >{`₹ ${cartData.totals.grandTotal}`}</span>
                        </div>
                        <Button
                            label={`CHECKOUT (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.CHECKOUT})`}
                            onClick={() =>
                                store.dispatch(
                                    toggleSliderModal({
                                        sliderName: 'checkoutSlider',
                                        active: true,
                                        autoFillData: null,
                                    }),
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
