import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { MetaCard } from '../../components/MetaCard/MetaCard';
import { TabBar } from '../../components/TabBar/TabBar';
import { Table } from '../../components/Table/Table';
import { toggleSliderModal } from '../../store/models/sliderModal';
import styles from './inventory.module.css';

export const Inventory = (): JSX.Element => {
    // to manage which tab is selected
    const dispatch = useDispatch();
    const [currTab, setcurrTab] = useState(0);

    return (
        <div className={styles.inventoryPage}>
            <div className={styles.tabBarWrapper}>
                <TabBar tabs={['All Products', 'Other Tabs']} onClick={setcurrTab} selectedTab={currTab} />
            </div>
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
