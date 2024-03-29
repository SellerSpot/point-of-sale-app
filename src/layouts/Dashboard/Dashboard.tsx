import React, { ReactElement, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Inventory } from 'pages/Inventory/Inventory';
import { LeftNav } from './components/LeftNav/LeftNav';
import { ROUTES } from 'config/routes';
import { Sales } from 'pages/Sale/Sale';
import styles from './dashboard.module.scss';

const SlidersComponent = lazy(() => import('./components/Sliders/Sliders'));

export const Dashboard = (): ReactElement => {
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.leftNavWrapper}>
                <LeftNav />
            </div>
            <div className={styles.mainBodyWrapper}>
                <Switch>
                    <Route path={ROUTES.INVENTORY}>
                        <Inventory />
                    </Route>

                    {/* <Route path={ROUTES.CASH_REGISTER}>
                        <CashRegister />
                    </Route> */}
                    {/* <Route path={ROUTES.BILLING_SETUP}>
                        <BillingSetup />
                    </Route> */}
                    {/* This is '/' route hence should be placed atlast */}
                    <Route path={ROUTES.SALES}>
                        <Sales />
                    </Route>
                </Switch>
            </div>
            {/* Full view sliders should be placed down here */}
            <Suspense fallback={<div>Loading...</div>}>
                <SlidersComponent />
            </Suspense>
        </div>
    );
};
