import { RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import cn from 'classnames';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { productRequests } from 'requests';
import {
    appendToSearchQuery,
    newSaleSelector,
    setSearchQuery,
    setSearchResults,
} from 'store/models/newSale';
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
    // subscribing to state
    const { cartData, searchQuery, searchResults } = useSelector(newSaleSelector);
    // state to handle the focus state of the searchBar
    const [searchBarFocused, setSearchBarFocused] = useState(true);
    const [isFromHandleKeydown, setIsFromHandleKeyDown] = useState(false);
    // getting sliderState to listen to when the slider is invoked to autopopulate if needed
    const sliderState = useSelector((state: RootState) => state.sliderModal);

    // used to handle the closing of the sliderModal
    const handleCloseSlider = () => {
        store.dispatch(
            toggleSliderModal({
                sliderName: 'newSaleSlider',
                active: false,
            }),
        );
        props.callBackStateTrack[1](false);
    };

    // used to handle searchbar refocussing procedure
    useEffect(() => {
        // calling default focus
        if (sliderState.newSaleSlider.show) {
            setSearchBarFocused(true);
            document.addEventListener('keydown', handleKeydown);
        } else {
            document.removeEventListener('keydown', handleKeydown);
        }
    }, [sliderState.newSaleSlider.show]);

    // used to handle the closing operations of the sliderModel
    useEffect(() => {
        if (props.callBackStateTrack[0]) {
            handleCloseSlider();
        }
    }, [props.callBackStateTrack[0]]);

    // listening to the search result to push the barcode products directory to the cart
    useEffect(() => {
        if (searchResults.queryType === 'barcode') {
            pushProductIntoCart(cartData, searchResults.results[0]);
        }
    }, [searchResults]);

    // used to handle newSale page keydown event
    const handleKeydown = useCallback(
        async (event: KeyboardEvent) => {
            // checking if it is a key that produces a character
            if (/^.$/u.test(event.key) && !(event.target instanceof HTMLInputElement)) {
                setSearchBarFocused(true);
                const newSearchQuery = searchQuery + event.key;
                store.dispatch(setSearchQuery(newSearchQuery));
                setIsFromHandleKeyDown(true);
                // await introduceDelay(1);
                // call to send query to server to fetch suggestions
                queryServer(newSearchQuery);
            }
        },
        [searchQuery],
    );

    // used to query the server to fetch product suggestions
    const queryServer = useCallback(
        debounce(async (query: string) => {
            if (query.length > 0) {
                store.dispatch(setSearchResults(await productRequests.searchProduct(query)));
            }
        }, 400),
        [],
    );

    /**
     * Used to handle the user typing in the New Sale page
     * @param query Query typed by the user in the search bar
     */
    const handleProductNameSearch = async (query: string): Promise<void> => {
        if (isFromHandleKeydown) {
            setIsFromHandleKeyDown(false);
            return;
        }
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

    // handles clicking of row in new sale products table
    const handleNewSaleProductTableRowClick = (event: RowClickedEvent) => {
        // pushing item to cart
        pushProductIntoCart(cartData, searchResults.results[event.rowIndex]);
        setSearchBarFocused(true);
    };

    // listening for the new sale shortcut call
    useHotkeys(
        generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE,
        (event) => {
            event.preventDefault();
            store.dispatch(
                toggleSliderModal({
                    sliderName: 'newSaleSlider',
                    active: true,
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
                        onCellEditingStopped={(event) => {
                            setSearchBarFocused(true);
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
                            label="CHECKOUT"
                            onClick={() => {
                                console.log('setting to true');
                                setSearchBarFocused(true);
                            }}
                            // onClick={() =>
                            //     store.dispatch(
                            //         toggleSliderModal({ sliderName: 'checkoutSlider', active: true }),
                            //     )
                            // }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
