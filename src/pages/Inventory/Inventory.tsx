import React, { useRef, useState } from 'react';
import { TabBar } from '../../components/TabBar/TabBar';
import { BrandsPage } from './components/BrandsPage/BrandsPage';
import { CategoriesPage } from './components/CategoriesPage/CategoriesPage';
import { ProductsPage } from './components/ProductsPage/ProductsPage';
import { TaxBracketsPage } from './components/TaxBracketsPage/TaxBracketsPage';
import styles from './inventory.module.css';
// import lodash from 'lodash';

export const Inventory = (): JSX.Element => {
    // to manage which tab is selected
    const [currTab, setcurrTab] = useState(0);
    const productsPageRef = useRef<HTMLDivElement>(null);
    const categoriesPageRef = useRef<HTMLDivElement>(null);
    const brandsPageRef = useRef<HTMLDivElement>(null);
    const taxBracketsPageRef = useRef<HTMLDivElement>(null);

    // used to change the tabs
    const changeTabs = (tabIndex: number): void => {
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
        setcurrTab(tabIndex);
    };

    const pageWrapperScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop = e.currentTarget.scrollTop ?? 0;
        const categoriesPageOffsetTop = categoriesPageRef.current?.offsetTop ?? 0;
        const brandsPageOffsetTop = brandsPageRef.current?.offsetTop ?? 0;
        const taxBracketsPageOffsetTop = taxBracketsPageRef.current?.offsetTop ?? 0;
        if (scrollTop < categoriesPageOffsetTop - 100) {
            // 100 added for offset from top which includes the header div (50px + safety fallback 50px)
            setcurrTab(0);
        } else if (scrollTop < brandsPageOffsetTop - 100) {
            setcurrTab(1);
        } else if (scrollTop < taxBracketsPageOffsetTop - 100) {
            setcurrTab(2);
        } else {
            setcurrTab(3);
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

            <div className={styles.overallPageWrapper} onScroll={pageWrapperScrollHandler}>
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
        </div>
    );
};
