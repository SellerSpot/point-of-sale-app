import React, { useState } from 'react';
import styles from './sales.module.css';
import { TabBar } from '../../components/TabBar/TabBar';
import { MetaCard } from '../../components/MetaCard/MetaCard';
import { Table } from '../../components/Table/Table';

export const Sales = (): JSX.Element => {
    // to manage which tab is selected
    const [currTab, setcurrTab] = useState(0);

    return (
        <div className={styles.salesPage}>
            <TabBar tabs={['Current Sales', 'Other Tabs']} onClickHandler={setcurrTab} selectedTab={currTab} />
            <MetaCard
                pageDescription="Sample Description"
                shortcuts={[
                    {
                        name: 'Open Sales',
                        keys: 'F4',
                    },
                ]}
            />
            <Table
                headings={['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4']}
                values={[
                    ['value 1', 'value 2', 'value 3', 'value 4'],
                    ['value 1', 'value 2', 'value 3', 'value 4'],
                ]}
            />
        </div>
    );
};
