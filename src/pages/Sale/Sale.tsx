import { ITabBarProps, TabBar } from 'components/TabBar/TabBar';
import { ROUTES } from 'config/routes';
import { findIndex } from 'lodash';
import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { SalesHistory } from './components/SalesHistory/SalesHistory';
import styles from './sale.module.scss';

export const Sales = (): JSX.Element => {
    const history = useHistory();

    const tabs: ITabBarProps['tabs'] = [
        {
            name: 'Sales History',
            route: ROUTES.SALES_HISTORY,
        },
    ];

    const getCurrentTabIndex = (pathname: string): number => {
        return findIndex(tabs, { route: pathname });
    };

    const [currentTab, setCurrentTab] = useState(getCurrentTabIndex(history.location.pathname));

    return (
        <div className={styles.salesWrapper}>
            <div className={styles.tabBarWrapper}>
                <TabBar tabs={tabs} onSelect={setCurrentTab} selectedIndex={currentTab} />
            </div>

            <div className={styles.overallPageWrapper}>
                <Switch>
                    {/* '/' route hence should be placed atlast */}
                    <Route path={ROUTES.SALES_HISTORY}>
                        <SalesHistory />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
