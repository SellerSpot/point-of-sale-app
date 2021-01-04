import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@sellerspot/universal-components';
import { InputField } from '@sellerspot/universal-components';
import { Table } from '@sellerspot/universal-components';
import { cssColors, cssVariables } from 'config/cssVariables';
import { toggleSliderModal } from 'store/models/sliderModal';
import { getNewSaleStyles } from './newSale.styles';

export const NewSale = (): JSX.Element => {
    const dispatch = useDispatch();

    const styles = getNewSaleStyles();

    return (
        <div className={styles.newSaleWrapper}>
            <div className={styles.leftPanel}>
                <InputField placeHolder="Product Name / Code" onChange={(): void => void 0} />
                {/* <Table
                    headers={['Item Name', 'Code', 'Brand', 'Category', 'Available Stock', 'Price']}
                    rowData={[['Data 00', 'Data 01', 'Data 02', 'Data 03', 'Data 04', 'Data 05']]}
                /> */}
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
                {/* <Table
                    headers={['Item Name', 'Quantity', 'Sub-Total', 'Discount']}
                    rowData={[
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                    ]}
                /> */}
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
