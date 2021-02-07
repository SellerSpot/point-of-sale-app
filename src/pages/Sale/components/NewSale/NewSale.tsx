import { GridApi, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import cn from 'classnames';
import { debounce, last } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productRequests } from 'requests';
import { newSaleSelector, setSearchQuery, setSearchResults } from 'store/models/newSale';
import { SLIDERS, closeSliderModal, openSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import {
    addSliderToCallBackStateTrack,
    handleCloseSlider,
    introduceDelay,
} from 'utilities/general';
import { generalUtilities } from 'utilities/utilities';
import { Button, InputField, SliderModal } from '@sellerspot/universal-components';
import { CartItemDetail } from './components/CartItemDetail/CartItemDetail';
import {
    compileNewSaleCartTableRowData,
    compileNewSaleProductsTableRowData,
    getNewSaleCartTableColDef,
    getNewSaleProductsTableColDef,
    handleNewSaleCartTableCellValueChange,
    pushProductIntoCart,
} from './newSale.actions';
import styles from './newSale.module.scss';

export const NewSale = (): JSX.Element => {
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
    // store dispatch
    const dispatch = useDispatch();

    //# CRITICAL FUNCTIONS

    //* handles ANYWHERE keydown event to focus it to inputField
    const handleKeydown = useCallback(
        async (event: KeyboardEvent) => {
            // checking if it is a key that produces a character and that it is not from an inputElement
            if (/^.$/u.test(event.key) && !(event.target instanceof HTMLInputElement)) {
                setSearchBarFocused(true);
                const newSearchQuery = searchQuery + event.key;
                dispatch(setSearchQuery(newSearchQuery));
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
                dispatch(setSearchResults(searchedProducts));
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
            dispatch(
                setSearchResults({
                    queryType: 'name',
                    results: [],
                }),
            );
        }
        dispatch(setSearchQuery(query));
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
        if (sliderState.openSliders.includes(SLIDERS.newSaleSlider)) {
            // setting focus towards the searchBar
            setSearchBarFocused(true);
            document.addEventListener('keydown', handleKeydown);
        } else {
            document.removeEventListener('keydown', handleKeydown);
        }
    }, [sliderState.openSliders]);

    //* used to handle the closing operations of the sliderModel
    useEffect(() => {
        if (sliderState.callBackStateTrack.includes(SLIDERS.newSaleSlider)) {
            // getting the topmost slider
            const topMostSlider = last(sliderState.openSliders);
            // only executing action if the top most slider is the current slider
            if (topMostSlider === SLIDERS.newSaleSlider) {
                handleCloseSlider({
                    callBackStateTrack: sliderState.callBackStateTrack,
                    sliderState,
                    topMostSlider,
                });
            }
        }
    }, [sliderState.callBackStateTrack]);

    //* listening to the search result to push the barcode products directory to the cart
    useEffect(() => {
        if (searchResults.queryType === 'barcode') {
            pushProductIntoCart(cartData, searchResults.results[0], cartTableGridApi);
        }
    }, [searchResults]);

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
                    <SliderModal
                        active={sliderState.openSliders.includes(SLIDERS.itemDetailSlider)}
                        sliderSize={'50%'}
                        zIndex={10}
                        onClickBackdrop={() =>
                            addSliderToCallBackStateTrack({
                                sliderName: SLIDERS.itemDetailSlider,
                                sliderState,
                            })
                        }
                        onClickEsc={() =>
                            addSliderToCallBackStateTrack({
                                sliderName: SLIDERS.itemDetailSlider,
                                sliderState,
                            })
                        }
                    >
                        <CartItemDetail cartData={cartData} />
                    </SliderModal>
                    <AgGridReact
                        suppressDragLeaveHidesColumns
                        suppressCellSelection
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
                            <span>{`₹ ${cartData.totals.grandTotalTax.toLocaleString()}`}</span>
                        </div>
                        <div className={styles.calculationEntry}>
                            <span>{'Total Discount'}</span>
                            <span>{`₹ ${cartData.totals.grandTotalDiscount.toLocaleString()}`}</span>
                        </div>
                        <div className={styles.calculationEntry}>
                            <span>{'Grand Total'}</span>
                            <span
                                className={styles.orderTotalText}
                            >{`₹ ${cartData.totals.grandTotal.toLocaleString()}`}</span>
                        </div>
                        <Button
                            label={`CHECKOUT (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.CHECKOUT})`}
                            status={cartData.products.length > 0 ? 'default' : 'disabled'}
                            onClick={() => {
                                if (
                                    sliderState.openSliders.includes(SLIDERS.newSaleSlider) &&
                                    cartData.products.length > 0
                                ) {
                                    dispatch(
                                        openSliderModal({
                                            autoFillData: null,
                                            sliderName: SLIDERS.checkoutSlider,
                                        }),
                                    );
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
