import React, { useState } from 'react';
import { ITabBarProps, TabBar } from 'components/TabBar/TabBar';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import lodash from 'lodash';
import { ProductsHistory } from './components/ProductsHistory/ProductsHistory';
// import { cssColors } from 'config/cssVariables';
import { CategoriesHistory } from './components/CategoriesHistory/CategoriesHistory';
import styles from './inventory.module.scss';
import { BrandsHistory } from './components/BrandsHistory/BrandsHistory';
import { TaxBracketsHistory } from './components/TaxBracketsHistory/TaxBracketsHistory';
import { StockUnitsHistory } from './components/StockUnits/StockUnits';

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
        {
            name: 'Stock Units',
            route: ROUTES.INVENTORY_STOCK_UNITS,
        },
    ];

    const getCurrentTabIndex = (pathname: string): number => {
        return lodash.findIndex(tabs, { route: pathname });
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
                    <Route path={ROUTES.INVENTORY_BRANDS}>
                        <BrandsHistory />
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
