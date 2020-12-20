import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { loadCSSValues } from 'config/cssVariables';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import { ConfirmDialog } from 'components/ConfirmDialog/ConfirmDialog';
import { Notify } from 'components/Notify/Notify';
import './styles/core.css';

// used to load css variables in ts object into the :root context
loadCSSValues();

export const App = (): ReactElement => {
    return (
        <div>
            <Switch>
                {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                <Route path={ROUTES.DASHBOARD}>
                    <Dashboard />
                </Route>
            </Switch>
            {/* all globally available components (via store) should be nested below  */}
            <ConfirmDialog />
            <Notify />
        </div>
    );
};
