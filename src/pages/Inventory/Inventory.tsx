import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { MetaCard } from '../../components/MetaCard/MetaCard';
import { TabBar } from '../../components/TabBar/TabBar';
import { Table } from '../../components/Table/Table';
import styles from './inventory.module.css';

export const Inventory = (): JSX.Element => {
    // to manage which tab is selected
    const [currTab, setcurrTab] = useState(0);

    return (
        <div className={styles.salesPage}>
            <div className={styles.tabBarWrapper}>
                <TabBar tabs={['All Products', 'Other Tabs']} onClick={setcurrTab} selectedTab={currTab} />
            </div>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={nanoid()}
                        label="Add Product (F4)"
                        labelColor="--inventory-color"
                        variant="outline"
                        backgroundColor="--inventory-color"
                    />,
                ]}
            />
            <div className={styles.tableWrapper}>
                <Table
                    headers={['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4']}
                    rowData={[
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                    ]}
                />
            </div>
        </div>
    );
};
