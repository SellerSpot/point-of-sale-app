import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/InputField/InputField';
import { Table } from '../../../../components/Table/Table';
import { cssVariables } from '../../../../config/cssVariables';
import { toggleSliderModal } from '../../../../store/models/sliderModal';
import styles from './newsale.module.css';

export const NewSale = (): JSX.Element => {
    const dispatch = useDispatch();
    return (
        <div className={styles.newSaleWrapper}>
            <div className={styles.leftPanel}>
                <InputField
                    borderStyle="shadow"
                    placeHolder="Product Name / Code"
                    onChange={() => void 0}
                />
                <Table
                    headers={['Item Name', 'Code', 'Brand', 'Category', 'Available Stock', 'Price']}
                    rowData={[['Data 00', 'Data 01', 'Data 02', 'Data 03', 'Data 04', 'Data 05']]}
                />
                <div className={styles.extraControlsCard}>
                    <Button
                        type="button"
                        shape="rectangle"
                        label="Return to Dashboard"
                        variant="solid"
                        backgroundColor="--danger-color"
                        labelColor="--light-font-color"
                        style={{ marginRight: 'auto', width: 'auto' }}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({ sliderName: 'newSaleSlider', active: false }),
                            )
                        }
                    />
                    <Button
                        label="Calculator"
                        size="small"
                        variant="outline"
                        labelColor="--sales-color"
                        style={{ width: 'auto' }}
                        backgroundColor="--sales-color"
                    />
                </div>
            </div>
            <div className={styles.rightPanel}>
                <Table
                    headers={['Item Name', 'Quantity', 'Sub-Total', 'Discount']}
                    rowData={[
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                        ['Data 00', 'Data 01', 'Data 02', 'Data 03'],
                    ]}
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
                        style={{ width: '100%', height: '50px' }}
                        label="CHECKOUT"
                        labelColor="--light-font-color"
                        backgroundColor="--sales-color"
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
