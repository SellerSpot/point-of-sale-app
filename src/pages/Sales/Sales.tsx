import React, { useState } from 'react';
import styles from './sales.module.css';
import { TabBar } from '../../components/TabBar/TabBar';
import { MetaCard } from '../../components/MetaCard/MetaCard';
import { Table } from '../../components/Table/Table';
import { InputField } from '../../components/InputField/InputField';

export const Sales = (): JSX.Element => {
    // to manage which tab is selected
    const [currTab, setcurrTab] = useState(0);

    return (
        <div className={styles.salesPage}>
            <div className={styles.tabBarWrapper}>
                <TabBar tabs={['Current Sales', 'Other Tabs']} onClick={setcurrTab} selectedTab={currTab} />
            </div>
            <MetaCard title="Sample Description" secondaryText={'Sample Data'} />
            <div className={styles.searchBarWrapper}>
                <InputField placeHolder="Search" onChange={() => void 0} />
            </div>
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
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
                        ['value 1', 'value 2', 'value 3', 'value 4'],
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
