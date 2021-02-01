import { RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import cn from 'classnames';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { productRequests } from 'requests/requests';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { generalUtilities } from 'utilities/utilities';
import { Button, InputField } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    compileNewSaleCartTableRowData,
    compileNewSaleProductsTableRowData,
    getNewSaleCartTableColDef,
    getNewSaleProductsTableColDef,
} from './newSale.action';
import styles from './newSale.module.scss';
import { INewSaleCart, INewSaleProps } from './newSale.types';

export const NewSale = (props: INewSaleProps): JSX.Element => {
    const [searchResults, setSearchResults] = useState<
        pointOfSaleTypes.productResponseTypes.ISearchProduct['data']
    >({
        queryType: 'name',
        results: [],
    });
    const [cartData, setCartData] = useState<INewSaleCart>({
        products: [],
        productCartInformation: [],
    });
    const [searchQuery, setSearchQuery] = useState('');

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

    // used to handle the closing operations of the sliderModel
    useEffect(() => {
        if (props.callBackStateTrack[0]) {
            handleCloseSlider();
        }
    }, [props.callBackStateTrack[0]]);

    // used to push product into cart
    const pushProductIntoCart = (
        product: pointOfSaleTypes.productResponseTypes.ISearchProduct['data']['results'][0],
    ): void => {
        // pushing item to cart
        setCartData(
            (oldCartData): INewSaleCart => {
                return {
                    products: [...oldCartData.products, product],
                    productCartInformation: [
                        ...oldCartData.productCartInformation,
                        {
                            discount: 0,
                            quantity: 1,
                        },
                    ],
                };
            },
        );
        setSearchQuery('');
        setSearchResults({
            queryType: 'name',
            results: [],
        });
    };

    // listening to the search result to push the barcode products directory to the cart
    useEffect(() => {
        console.log('Search Updated - ' + searchResults.queryType);
        if (searchResults.queryType === 'barcode') {
            pushProductIntoCart(searchResults.results[0]);
        }
    }, [searchResults]);

    // used to query the server to fetch product suggestions
    const queryServer = useCallback(
        debounce(async (query: string) => {
            if (query.length > 0) {
                setSearchResults(await productRequests.searchProduct(query));
            }
        }, 400),
        [],
    );

    /**
     * Used to handle the user typing in the New Sale page
     * @param query Query typed by the user in the search bar
     */
    const handleProductNameSearch = async (query: string): Promise<void> => {
        if (query.length === 0) {
            setSearchResults({
                queryType: 'name',
                results: [],
            });
        }
        setSearchQuery(query);
        queryServer(query);
    };

    // handles clicking of row in new sale products table
    const handleNewSaleProductTableRowClick = (event: RowClickedEvent) => {
        // pushing item to cart
        pushProductIntoCart(searchResults.results[event.rowIndex]);
    };

    useHotkeys(generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE, (event) => {
        event.preventDefault();
        store.dispatch(
            toggleSliderModal({
                sliderName: 'newSaleSlider',
                active: true,
            }),
        );
    });

    return (
        <div className={styles.newSaleWrapper}>
            <div className={styles.leftPanel}>
                <InputField
                    placeHolder="Product Name / Code"
                    value={searchQuery}
                    onChange={(event) => handleProductNameSearch(event.target.value)}
                />
                <div className={cn('ag-theme-alpine')}>
                    <AgGridReact
                        rowSelection={'single'}
                        onRowClicked={handleNewSaleProductTableRowClick}
                        suppressCellSelection={true}
                        columnDefs={getNewSaleProductsTableColDef()}
                        rowData={compileNewSaleProductsTableRowData(searchResults)}
                        overlayNoRowsTemplate={
                            '<span className="ag-overlay-loading-center">Please search for products using the search box above</span>'
                        }
                    />
                </div>
                <div className={styles.extraControlsCard}>
                    <Button
                        type="button"
                        label="Return to Dashboard"
                        onClick={() =>
                            store.dispatch(
                                toggleSliderModal({ sliderName: 'newSaleSlider', active: false }),
                            )
                        }
                    />
                    <Button label="Calculator" />
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={'ag-theme-alpine'}>
                    <AgGridReact
                        columnDefs={getNewSaleCartTableColDef()}
                        rowData={compileNewSaleCartTableRowData(cartData)}
                        overlayNoRowsTemplate={
                            '<span className="ag-overlay-loading-center">Empty Cart</span>'
                        }
                    />
                </div>
                <div className={styles.calculationCard}>
                    <div className={styles.calculationEntry}>
                        <span>{'Sub-Total'}</span>
                        <span>{'₹ 200.00'}</span>
                    </div>
                    <div className={styles.calculationEntry}>
                        <span>{'Add Taxes'}</span>
                        <span>{'₹ 50.00'}</span>
                    </div>
                    <div className={styles.calculationEntry}>
                        <span>{'Total Discount'}</span>
                        <span>{'- ₹ 20.00'}</span>
                    </div>
                    <div className={styles.calculationEntry}>
                        <span>{'Order Total'}</span>
                        <span className={styles.orderTotalText}>{'₹ 250.00'}</span>
                    </div>
                    <Button
                        label="CHECKOUT"
                        // onClick={() =>
                        //     store.dispatch(
                        //         toggleSliderModal({ sliderName: 'checkoutSlider', active: true }),
                        //     )
                        // }
                    />
                </div>
            </div>
        </div>
    );
};
