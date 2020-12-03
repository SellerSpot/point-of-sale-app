import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from './config/routes';
import './styles/core.css';
import { Dashboard } from './layouts/Dashboard/Dashboard';

export const App: FC = (): JSX.Element => {
    return (
        <div>
            <Switch>
                {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                <Route path={ROUTES.DASHBOARD}>
                    <Dashboard />
                </Route>
            </Switch>
        </div>
    );
};
