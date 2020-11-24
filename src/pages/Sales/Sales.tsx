import React, { useState } from 'react';
import styles from './sales.module.css';
import { TabBar } from '../../components/TabBar/TabBar';

export const Sales = (): JSX.Element => {
    // to manage which tab is selected
    const [currTab, setcurrTab] = useState(0);

    return (
        <div>
            <div className={styles.tabBarHolder}>
                <TabBar
                    tabs={['Current Sales', 'More Tabs', 'Even More']}
                    onClickHandler={setcurrTab}
                    selectedTab={currTab}
                />
            </div>
        </div>
    );
};
