import React from 'react';
import styles from './sales.module.css';
import { TabBar } from '../../components/TabBar/TabBar';

// used to handle the click on the different tabs
const tabSelectedCallback = () => {
    // eslint-disable-next-line no-console
    // console.log(selectedTab);
};

export const Sales = (): JSX.Element => {
    return (
        <div>
            <div className={styles.tabBarHolder}>
                <TabBar tabs={['Current Sales']} onClickHandler={tabSelectedCallback} selectedTab={0} />
            </div>
        </div>
    );
};
