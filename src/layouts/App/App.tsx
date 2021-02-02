import '../../styles/core.scss';
import styles from './app.module.scss';
import commonStyles from '../../styles/common.module.scss';

import { CONFIG } from 'config/config';
import { initializeGlobalServices, updateGlobalServices } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { coreSelector, updateTenant } from 'store/models/core';
import { notifySelector } from 'store/models/notify';
import { Notify, Spinner } from '@sellerspot/universal-components';
import { authRequests } from 'requests';
import { Auth } from 'layouts/Auth/Auth';

initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    // Getting Notify selector
    const coreState = useSelector(coreSelector);
    const dispatch = useDispatch();
    const notifyState = useSelector(notifySelector);

    useEffect(() => {
        // do tenant authorization and release isLoading if valid
        if (!coreState.isAuthorized && !coreState.isAuthenticated)
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
        else {
            // may we need to verify the available token (for validity) later
        }
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
                        <Route path={ROUTES.Auth}>
                            {!coreState.isAuthenticated ? (
                                <Auth />
                            ) : (
                                <Redirect to={ROUTES.DASHBOARD} />
                            )}
                        </Route>
                        {/* All other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                        <Route path={ROUTES.DASHBOARD}>
                            {coreState.isAuthenticated ? (
                                <Dashboard />
                            ) : (
                                <Redirect to={ROUTES.Auth} />
                            )}
                        </Route>
                    </Switch>
                    {/* global components */}
                    <Notify
                        notifyId={notifyState.notifyId}
                        content={notifyState.content}
                        timeout={notifyState.timeOut}
                        style={{
                            notifyWrapper: notifyState.styles,
                        }}
                    />
                </>
            )}
        </div>
    );
};
