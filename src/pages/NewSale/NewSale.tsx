import React from 'react';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/InputField/InputField';
import { Table } from '../../components/Table/Table';
import { cssVariables } from '../../config/cssVariables';
import styles from './newsale.module.css';

export const NewSale = (): JSX.Element => {
    return (
        <div className={styles.newSalePage}>
            <div className={styles.leftPanel}>
                <InputField borderStyle="shadow" placeHolder="Product Name / Code" onChange={() => void 0} />
                <Table
                    headers={['Item Name', 'Code', 'Brand', 'Category', 'Available Stock', 'Price']}
                    rowData={[['Data 00', 'Data 01', 'Data 02', 'Data 03', 'Data 04', 'Data 05']]}
                />
                <div className={styles.extraControlsCard}>
                    <Button
                        label="Calculator"
                        size="small"
                        variant="outline"
                        labelColor="--sales-color"
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
                        <span style={{ fontSize: cssVariables['--font-size-extra-large'] }}>{'₹ 250.00'}</span>
                    </div>
                    <Button
                        style={{ width: '100%', height: '50px' }}
                        label="CHECKOUT"
                        labelColor="--light-font-color"
                        backgroundColor="--sales-color"
                    />
                </div>
            </div>
        </div>
    );
};
