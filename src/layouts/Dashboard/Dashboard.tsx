import React, { ReactElement, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { CashRegister } from 'pages/CashRegister/CashRegister';
import { Inventory } from 'pages/Inventory/Inventory';
import { Sales } from 'pages/Sales/Sales';
import { LeftNav } from './components/LeftNav/LeftNav';
import { BillingSetup } from 'pages/BillingSetup/BillingSetup';
import { getDashboardStyles } from './dashboard.styles';

const SlidersComponent = lazy(() => import('./components/Sliders/Sliders'));

export const Dashboard = (): ReactElement => {
    const styles = getDashboardStyles();

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
                    <Route path={ROUTES.CASH_REGISTER}>
                        <CashRegister />
                    </Route>
                    <Route path={ROUTES.BILLING_SETUP}>
                        <BillingSetup />
                    </Route>
                    {/* this is '/' route hence should be placed atlast */}
                    <Route path={ROUTES.SALES}>
                        <Sales />
                    </Route>
                </Switch>
            </div>
            {/* full view sliders should be placed down here */}
            <Suspense fallback={<div>Loading...</div>}>
                <SlidersComponent />
            </Suspense>
        </div>
    );
};
