import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { productRequests } from 'requests/requests';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { generalUtilities } from 'utilities/utilities';
import { Button, InputField, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { compileProductsTableBodyData, handleCloseSlider } from './newSale.action';
import styles from './newSale.module.scss';

/**
 * Interface for props to recieve the state values which are operated by the callbacks from the slider modal
 * Callbacks operating the props state - onEscClick & onBackdropClick
 */
export interface INewSaleProps {
    callBackStateTrack: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const NewSale = (props: INewSaleProps): JSX.Element => {
    const [searchResults, setSearchResults] = useState<
        pointOfSaleTypes.productResponseTypes.ISearchProduct['data']
    >(null);
    const [searchQuery, setSearchQuery] = useState('');
    // const [cartData, setCartData] = useState<ISaleCartItem[]>(null);`

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
        setSearchQuery(query);
        // const searchedProducts = await productRequests.searchProduct(query);
        queryServer(query);
        // console.log(searchedProducts);
    };

    useEffect(() => {
        if (props.callBackStateTrack[0]) {
            handleCloseSlider(props.callBackStateTrack[1]);
        }
    }, [props.callBackStateTrack[0]]);

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
                <Table
                    headers={[
                        <p key={'S.No'}>{'S.No'}</p>,
                        <p key={'Item Name'}>{'Item Name'}</p>,
                        <p key={'Code'}>{'Code'}</p>,
                        <p key={'Brand'}>{'Brand'}</p>,
                        <p key={'Category'}>{'Category'}</p>,
                        <p key={'Available Stock'}>{'Available Stock'}</p>,
                        <p key={'Price'}>{'Price'}</p>,
                    ]}
                    rowData={compileProductsTableBodyData(searchResults)}
                />
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
                <Table
                    headers={[
                        <p key={'S.No'}>{'S.No'}</p>,
                        <p key={'Item Name'}>{'Item Name'}</p>,
                        <p key={'Quantity'}>{'Quantity'}</p>,
                        <p key={'Sub-Total'}>{'Sub-Total'}</p>,
                        <p key={'Discount'}>{'Discount'}</p>,
                    ]}
                    // rowData={getCartItems(cartData)}
                    rowData={[]}
                />
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
