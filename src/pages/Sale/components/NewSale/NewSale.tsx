import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@sellerspot/universal-components';
import { InputField } from '@sellerspot/universal-components';
import { Table } from '@sellerspot/universal-components';
import { cssColors, cssVariables } from 'config/cssVariables';
import { toggleSliderModal } from 'store/models/sliderModal';
import { getNewSaleStyles } from './NewSale.styles';
import { IGetProductFromServer } from 'typings/components/product.types';
import { ISaleCartItem } from 'typings/components/sale.types';
import { getProducts } from 'requests/product';
import { compileProductsTableBodyData, getCartItems } from './newSale.actions';
import { GLOBAL_KEYBOARD_SHORTCUTS } from 'utils/keyboardShortcuts';
import { useHotkeys } from 'react-hotkeys-hook';
import { store } from 'store/store';

export const NewSale = (): JSX.Element => {
    const dispatch = useDispatch();
    const styles = getNewSaleStyles();
    const [productsData, setproductsData] = useState<IGetProductFromServer[]>(null);
    const [cartData, setCartData] = useState<ISaleCartItem[]>(null);

    useEffect(() => {
        (async () => {
            const productsData = await getProducts();
            setproductsData(productsData.data as IGetProductFromServer[]);
        }).call(null);
    }, []);

    useHotkeys(GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE, (event) => {
        event.preventDefault();
        store.dispatch(
            toggleSliderModal({
                sliderName: 'newSaleSlider',
                active: true,
                autoFillData: null,
            }),
        );
    });

    return (
        <div className={styles.newSaleWrapper}>
            <div className={styles.leftPanel}>
                <InputField placeHolder="Product Name / Code" onChange={(): void => void 0} />
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
                    rowData={compileProductsTableBodyData(productsData)}
                />
                <div className={styles.extraControlsCard}>
                    <Button
                        type="button"
                        label="Return to Dashboard"
                        style={{
                            marginRight: 'auto',
                            width: 'auto',
                            backgroundColor: cssColors['--danger-color'],
                            color: cssColors['--light-font-color'],
                        }}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({ sliderName: 'newSaleSlider', active: false }),
                            )
                        }
                    />
                    <Button
                        label="Calculator"
                        style={{
                            width: 'auto',
                            color: cssColors['--sales-color'],
                            backgroundColor: 'transparent',
                            borderColor: cssColors['--sales-color'],
                        }}
                    />
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
                    rowData={getCartItems(cartData)}
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
                        <span style={{ fontSize: cssVariables['--font-size-extra-large'] }}>
                            {'₹ 250.00'}
                        </span>
                    </div>
                    <Button
                        label="CHECKOUT"
                        style={{
                            height: '50px',
                            color: cssColors['--light-font-color'],
                            backgroundColor: cssColors['--sales-color'],
                        }}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({ sliderName: 'checkoutSlider', active: true }),
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
};
