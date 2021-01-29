import './styles/core.scss';

import { Notify, Spinner } from '@sellerspot/universal-components';
import React, { ReactElement, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { coreSelector, updateTenant } from 'store/models/core';
import { initializeGlobalServices, updateGlobalServices } from 'config/globalConfig';
import { useDispatch, useSelector } from 'react-redux';

import { CONFIG } from 'config/config';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import { ROUTES } from 'config/routes';
import { authRequests } from './requests/requests';
import commonStyles from './styles/common.module.scss';
import { notifySelector } from 'store/models/notify';
import styles from './styles/app.module.scss';

initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    // Getting Notify selector
    const coreState = useSelector(coreSelector);
    const dispatch = useDispatch();
    const { notifyId, content, timeout, className, style } = useSelector(notifySelector);
    useEffect(() => {
        // do tenant authorization and release isLoading if valid
        (async () => {
            const domainName = window.location.hostname?.split('.')?.[0];
            const response = await authRequests.authorizeTenant(domainName);
            if (response.status) {
                updateGlobalServices(response.data.token);
                dispatch(updateTenant(response.data));
            } else {
                window.location.replace(CONFIG.LANDING_APP_URL);
            }
        }).call(null);
    }, []);

    return (
        <div className={styles.appWrapper}>
            {coreState.isLoading ? (
                <div className={commonStyles.flexCenter}>
                    <Spinner size="large" />
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};
