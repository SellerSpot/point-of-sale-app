import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import './styles/core.css';
import { store } from 'store/store';
import { notifySelector } from 'store/models/notify';
import { useSelector } from 'react-redux';
import { Notify } from '@sellerspot/universal-components';

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
