import { ITabBarProps, TabBar } from 'components/TabBar/TabBar';
import { ROUTES } from 'config/routes';
import { findIndex } from 'lodash';
import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { BrandsHistory } from './components/BrandsHistory/BrandsHistory';
import { CategoriesHistory } from './components/CategoriesHistory/CategoriesHistory';
import { ProductsHistory } from './components/ProductsHistory/ProductsHistory';
import { StockUnitsHistory } from './components/StockUnitsHistory/StockUnitsHistory';
import { TaxBracketsHistory } from './components/TaxBracketsHistory/TaxBracketsHistory';
import styles from './inventory.module.scss';

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
            name: 'Tax Brackets',
            route: ROUTES.INVENTORY_TAX_BRACKETS,
        },
        {
            name: 'Stock Units',
            route: ROUTES.INVENTORY_STOCK_UNITS,
        },
    ];

    const getCurrentTabIndex = (pathname: string): number => {
        return findIndex(tabs, { route: pathname });
    };

    const [currentTab, setCurrentTab] = useState(getCurrentTabIndex(history.location.pathname));

    return (
        <div className={styles.inventoryWrapper}>
            <div className={styles.tabBarWrapper}>
                <TabBar tabs={tabs} onSelect={setCurrentTab} selectedIndex={currentTab} />
            </div>

            <div className={styles.overallPageWrapper}>
                <Switch>
                    <Route path={ROUTES.INVENTORY_STOCK_UNITS}>
                        <StockUnitsHistory />
                    </Route>
                    <Route path={ROUTES.INVENTORY_CATEGORIES}>
                        <CategoriesHistory />
                    </Route>
                    <Route path={ROUTES.INVENTORY_TAX_BRACKETS}>
                        <TaxBracketsHistory />
                    </Route>
                    {/* '/' route hence should be placed atlast */}
                    <Route path={ROUTES.INVENTORY_PRODUCTS}>
                        <ProductsHistory />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
