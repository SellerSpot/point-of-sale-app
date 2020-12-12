import React, { useRef, useState } from 'react';
import { TabBar } from '../../components/TabBar/TabBar';
import { CategoriesPage } from './components/CategoriesPage/CategoriesPage';
import { ProductsPage } from './components/ProductsPage/ProductsPage';
import styles from './inventory.module.css';

export const Inventory = (): JSX.Element => {
    // to manage which tab is selected
    const [currTab, setcurrTab] = useState(0);
    const productsPageRef = useRef<HTMLDivElement>(null);
    const categoriesPageRef = useRef<HTMLDivElement>(null);

    // used to change the tabs
    const changeTabs = (tabIndex: number): void => {
        // eslint-disable-next-line no-console
        console.log(tabIndex);
        setcurrTab(tabIndex);
        switch (tabIndex) {
            case 0:
                productsPageRef?.current?.scrollIntoView();
                break;
            case 1:
                // eslint-disable-next-line no-console
                console.log('Pressed');
                categoriesPageRef?.current?.scrollIntoView();
                break;
        }
    };

    return (
        <div className={styles.inventoryPage}>
            <div className={styles.tabBarWrapper}>
                <TabBar
                    tabs={['All Products', 'Other Tabs']}
                    onSelect={(index) => changeTabs(index)}
                    selectedTab={currTab}
                    style={{ borderRadius: '0' }}
                />
            </div>
            <div className={styles.pageWrapper} ref={productsPageRef}>
                <ProductsPage />
            </div>
            <div className={styles.pageWrapper} ref={categoriesPageRef}>
                <CategoriesPage />
            </div>
        </div>
    );
};
