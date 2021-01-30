import './styles/core.scss';

import { CONFIG } from 'config/config';
import { initializeGlobalServices, updateGlobalServices } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { coreSelector, updateTenant } from 'store/models/core';
import { notifySelector } from 'store/models/notify';
import { Notify, Spinner } from '@sellerspot/universal-components';
import { authRequests } from './requests/requests';
import styles from './styles/app.module.scss';
import commonStyles from './styles/common.module.scss';

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
