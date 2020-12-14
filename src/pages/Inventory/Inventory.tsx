import React, { useState } from 'react';
import { ITabBarProps, TabBar } from '../../components/TabBar/TabBar';
import { Brands } from './components/Brands/Brands';
import { Categories } from './components/Categories/Categories';
import { Products } from './components/Products/Products';
import { TaxBrackets } from './components/TaxBrackets/TaxBrackets';
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
        return tabIndex >= 0 ? tabIndex : 0;
    };

    const [currentTab, setCurrentTab] = useState(getCurrentTabIndex(history.location.pathname));

    return (
        <div className={styles.inventoryWrapper}>
            <div className={styles.tabBarWrapper}>
                <TabBar
                    tabs={tabs}
                    onSelect={setCurrentTab}
                    selectedColor={'--inventory-color'}
                    selectedTab={currentTab}
                    style={{ borderRadius: '0' }}
                />
            </div>

            <div className={styles.overallPageWrapper}>
                <Switch>
                    <Route path={ROUTES.INVENTORY_CATEGORIES}>
                        <Categories />
                    </Route>

                    <Route path={ROUTES.INVENTORY_BRANDS}>
                        <Brands />
                    </Route>

                    <Route path={ROUTES.INVENTORY_TAX_BRACKETS}>
                        <TaxBrackets />
                    </Route>
                    {/* '/' route hence should be placed atlast */}
                    <Route path={ROUTES.INVENTORY_PRODUCTS}>
                        <Products />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
