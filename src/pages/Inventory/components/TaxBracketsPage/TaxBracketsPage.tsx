import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../components/Button/Button';
import { MetaCard } from '../../../../components/MetaCard/MetaCard';
import { Table } from '../../../../components/Table/Table';
import { toggleSliderModal } from '../../../../store/models/sliderModal';

import styles from './taxbracketspage.module.css';

export const TaxBracketsPage = (): JSX.Element => {
    // to manage which tab is selected
    const dispatch = useDispatch();

    return (
        <div className={styles.taxBracketsPage}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addProduct'}
                        label="Add Product (F4)"
                        labelColor="--inventory-color"
                        variant="outline"
                        backgroundColor="--inventory-color"
                        onClick={() => dispatch(toggleSliderModal({ sliderName: 'addProductSlider', active: true }))}
                    />,
                ]}
            />
            <div className={styles.tableWrapper}>
                <Table
                    headers={['Item Name', 'Code', 'Brand', 'Category', 'Available Stock', 'Price']}
                    rowData={[
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                    ]}
                />
            </div>
        </div>
    );
};
