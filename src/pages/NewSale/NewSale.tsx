import React from 'react';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/InputField/InputField';
import { Table } from '../../components/Table/Table';
import styles from './newsale.module.css';

export const NewSale = (): JSX.Element => {
    return (
        <div className={styles.newSalePage}>
            <div className={styles.leftPanel}>
                <div className={styles.searchFieldWrapper}>
                    <InputField borderStyle="shadow" placeHolder="Product Name / Code" onChange={() => void 0} />
                </div>
                <div className={styles.productViewWrapper}>
                    <Table
                        headers={['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5']}
                        rowData={[
                            ['Data 00', 'Data 01', 'Data 02', 'Data 03', 'Data 04'],
                            ['Data 00', 'Data 01', 'Data 02', 'Data 03', 'Data 04'],
                            ['Data 00', 'Data 01', 'Data 02', 'Data 03', 'Data 04'],
                            ['Data 00', 'Data 01', 'Data 02', 'Data 03', 'Data 04'],
                            ['Data 00', 'Data 01', 'Data 02', 'Data 03', 'Data 04'],
                        ]}
                    />
                </div>
                <div className={styles.extraControlsWrapper}>
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
            </div>
            <div className={styles.rightPanel}></div>
        </div>
    );
};
