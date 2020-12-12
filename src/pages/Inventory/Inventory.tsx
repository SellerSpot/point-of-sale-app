import React, { useRef, useState } from 'react';
import { TabBar } from '../../components/TabBar/TabBar';
import { BrandsPage } from './components/BrandsPage/BrandsPage';
import { CategoriesPage } from './components/CategoriesPage/CategoriesPage';
import { ProductsPage } from './components/ProductsPage/ProductsPage';
import { TaxBracketsPage } from './components/TaxBracketsPage/TaxBracketsPage';
import styles from './inventory.module.css';

export const Inventory = (): JSX.Element => {
    // to manage which tab is selected
    const [currTab, setcurrTab] = useState(0);
    const productsPageRef = useRef<HTMLDivElement>(null);
    const categoriesPageRef = useRef<HTMLDivElement>(null);
    const brandsPageRef = useRef<HTMLDivElement>(null);
    const taxBracketsPageRef = useRef<HTMLDivElement>(null);

    // used to change the tabs
    const changeTabs = (tabIndex: number): void => {
        setcurrTab(tabIndex);
        switch (tabIndex) {
            case 0:
                productsPageRef?.current?.scrollIntoView();
                break;
            case 1:
                categoriesPageRef?.current?.scrollIntoView();
                break;
            case 2:
                brandsPageRef?.current?.scrollIntoView();
                break;
            case 3:
                taxBracketsPageRef?.current?.scrollIntoView();
                break;
        }
    };

    return (
        <div className={styles.inventoryPage}>
            <div className={styles.tabBarWrapper}>
                <TabBar
                    tabs={['Products', 'Categories', 'Brands', 'Tax Brackets']}
                    onSelect={(index) => changeTabs(index)}
                    selectedColor={'--inventory-color'}
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
            <div className={styles.pageWrapper} ref={brandsPageRef}>
                <BrandsPage />
            </div>
            <div className={styles.pageWrapper} ref={taxBracketsPageRef}>
                <TaxBracketsPage />
            </div>
        </div>
    );
};
