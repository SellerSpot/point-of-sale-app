import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from './config/routes';
import './styles/core.module.css';
import { Dashboard } from './layouts/Dashboard/Dashboard';

export const App: FC = (): JSX.Element => {
    return (
        <div>
            <Switch>
                <Route path={ROUTES.DASHBOARD}>
                    <Dashboard />
                </Route>
            </Switch>
        </div>
    );
};
