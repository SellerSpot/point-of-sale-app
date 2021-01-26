import { Notify } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { notifySelector } from 'store/models/notify';
import './styles/core.css';

export const App = (): ReactElement => {
    // Getting Notify selector
    const { notifyId, content, timeout, className, style } = useSelector(notifySelector);

    return (
        <div>
            <Switch>
                {/* All other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                <Route path={ROUTES.DASHBOARD}>
                    <Dashboard />
                </Route>
            </Switch>
            {/* All globally available components (via store) should be nested below  */}
            <Notify
                notifyId={notifyId}
                content={content}
                timeout={timeout}
                className={{
                    notifyWrapper: className?.notifyWrapper,
                }}
                style={{
                    notifyWrapper: style,
                }}
            />
        </div>
    );
};
