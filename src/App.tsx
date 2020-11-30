import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from './config/routes';
import './styles/core.css';
import { Dashboard } from './layouts/Dashboard/Dashboard';
import { NewSale } from './pages/NewSale/NewSale';

export const App: FC = (): JSX.Element => {
    return (
        <div>
            <Switch>
                <Route path={ROUTES.NEW_SALE}>
                    <NewSale />
                </Route>
                {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                <Route path={ROUTES.DASHBOARD}>
                    <Dashboard />
                </Route>
            </Switch>
        </div>
    );
};
