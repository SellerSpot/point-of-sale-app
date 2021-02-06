import '../../styles/core.scss';

import { CONFIG } from 'config/config';
import { initializeGlobalServices, updateGlobalServices } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Auth } from 'layouts/Auth/Auth';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { authRequests } from 'requests';
import { coreSelector, logoutUser, updateLoading, updateTenant } from 'store/models/core';
import { notifySelector } from 'store/models/notify';
import { Notify, Spinner } from '@sellerspot/universal-components';
import commonStyles from '../../styles/common.module.scss';
import styles from './app.module.scss';

initializeGlobalServices(); // application common initilizers goes here

export const App = (): ReactElement => {
    // Getting Notify selector
    const coreState = useSelector(coreSelector);
    const dispatch = useDispatch();
    const notifyState = useSelector(notifySelector);

    const authorizeTenant = async () => {
        const domainName = window.location.hostname?.split('.')?.[0];
        const response = await authRequests.authorizeTenant(domainName);
        if (response.status) {
            updateGlobalServices(response.data.token);
            dispatch(updateTenant(response.data));
        } else {
            window.location.replace(CONFIG.LANDING_APP_URL);
        }
    };

    useEffect(() => {
        dispatch(updateLoading(true));
        // do tenant authorization and release isLoading if valid
        (async () => {
            if (!coreState.isAuthorized && !coreState.isAuthenticated) {
                await authorizeTenant();
            } else if (!(await authRequests.verifyToken())) {
                await authorizeTenant();
            }
        }).call(null);
        dispatch(updateLoading(false));
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
