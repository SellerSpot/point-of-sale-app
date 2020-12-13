/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import { ITabBarProps, TabBar } from '../../components/TabBar/TabBar';
import { BrandsPage } from './components/BrandsPage/BrandsPage';
import { CategoriesPage } from './components/CategoriesPage/CategoriesPage';
import { ProductsPage } from './components/ProductsPage/ProductsPage';
import { TaxBracketsPage } from './components/TaxBracketsPage/TaxBracketsPage';
import styles from './inventory.module.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import lodash from 'lodash';

export const Inventory = (): JSX.Element => {
    const history = useHistory();

    const tabs: ITabBarProps['tabs'] = [
        {
            name: 'Products',
            route: ROUTES.INVENTORY_PRODUCTS,
        },
        {
            name: 'Categories',
            route: ROUTES.INVENTORY_CATEGORIES,
        },
        {
            name: 'Brands',
            route: ROUTES.INVENTORY_BRANDS,
        },
        {
            name: 'Tax Brackets',
            route: ROUTES.INVENTORY_TAX_BRACKETS,
        },
    ];

    const getCurrentTabIndex = (pathname: string): number => {
        const tabIndex = lodash.findIndex(tabs, { route: pathname });
        return tabIndex >= 0 ? tabIndex : currentTab;
    };

    const [currentTab, setCurrentTab] = useState(getCurrentTabIndex(history.location.pathname));

    const productsPageRef = useRef<HTMLDivElement>(null);
    const categoriesPageRef = useRef<HTMLDivElement>(null);
    const brandsPageRef = useRef<HTMLDivElement>(null);
    const taxBracketsPageRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.inventoryPage}>
            <div className={styles.tabBarWrapper}>
                <TabBar
                    tabs={tabs}
                    onSelect={(index) => setCurrentTab(index)}
                    selectedColor={'--inventory-color'}
                    selectedTab={currentTab}
                    style={{ borderRadius: '0' }}
                />
            </div>

            <div className={styles.overallPageWrapper}>
                <Switch>
                    <Route path={ROUTES.INVENTORY_CATEGORIES}>
                        <div className={styles.pageWrapper} ref={categoriesPageRef}>
                            <CategoriesPage />
                        </div>
                    </Route>

                    <Route path={ROUTES.INVENTORY_BRANDS}>
                        <div className={styles.pageWrapper} ref={brandsPageRef}>
                            <BrandsPage />
                        </div>
                    </Route>

                    <Route path={ROUTES.INVENTORY_TAX_BRACKETS}>
                        <div className={styles.pageWrapper} ref={taxBracketsPageRef}>
                            <TaxBracketsPage />
                        </div>
                    </Route>
                    {/* / route hence should be placed atlast */}
                    <Route path={ROUTES.INVENTORY_PRODUCTS}>
                        <div className={styles.pageWrapper} ref={productsPageRef}>
                            <ProductsPage />
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
