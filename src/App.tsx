import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'config/routes';
import { Dashboard } from 'layouts/Dashboard/Dashboard';
import './styles/core.css';
import { notifySelector } from 'store/models/notify';
import { useSelector } from 'react-redux';
import { Notify } from '@sellerspot/universal-components';
import { useHotkeys } from 'react-hotkeys-hook';
import { store } from 'store/store';
import { toggleSliderModal } from 'store/models/sliderModal';
import { getGlobalKeyBoardShortcuts } from 'utils/keyboardShortcuts';

export const App = (): ReactElement => {
    // setting keyboard listeners
    useHotkeys(getGlobalKeyBoardShortcuts(), (event) => {
        event.preventDefault();
        if (event.code === 'F1') {
            event.preventDefault();
            store.dispatch(
                toggleSliderModal({
                    sliderName: 'newSaleSlider',
                    active: true,
                    autoFillData: null,
                }),
            );
        } else if (event.code === 'KeyP' && event.altKey) {
            store.dispatch(
                toggleSliderModal({
                    sliderName: 'addProductSlider',
                    active: true,
                    autoFillData: null,
                }),
            );
        }
    });

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
