import { Core } from './layouts/Core/Core';
import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from './config/routes';
import './styles/core.module.css';
import commonStyles from './styles/common.module.css';

export const App: FC = (): JSX.Element => {
    return (
        <div>
            <button className={commonStyles.disableButton}>Custom Button</button>
            <Switch>
                <Route path={ROUTES.HOME}>
                    <Core />
                </Route>
            </Switch>
        </div>
    );
};
