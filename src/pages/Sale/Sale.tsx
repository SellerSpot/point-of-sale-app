import React, { useState } from 'react';
import { ITabBarProps, TabBar } from 'components/TabBar/TabBar';
import { ROUTES } from '../../config/routes';
import lodash from 'lodash';
import { Route, Switch, useHistory } from 'react-router-dom';
import { SaleHistory } from './components/SaleHistory/SaleHistory';
import { getSaleStyles } from './sale.styles';

export const Sales = (): JSX.Element => {
    const history = useHistory();

    const tabs: ITabBarProps['tabs'] = [
        {
            name: 'Sales History',
            route: ROUTES.SALES_HISTORY,
        },
    ];

    const getCurrentTabIndex = (pathname: string): number => {
        return lodash.findIndex(tabs, { route: pathname });
    };

    const [currentTab, setCurrentTab] = useState(getCurrentTabIndex(history.location.pathname));

    const styles = getSaleStyles();

    return (
        <div className={styles.salesWrapper}>
            <div className={styles.tabBarWrapper}>
                <TabBar tabs={tabs} onSelect={setCurrentTab} selectedIndex={currentTab} />
            </div>

            <div className={styles.overallPageWrapper}>
                <Switch>
                    {/* '/' route hence should be placed atlast */}
                    <Route path={ROUTES.SALES_HISTORY}>
                        <SaleHistory />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
