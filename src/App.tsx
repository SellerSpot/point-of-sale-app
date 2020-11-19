import { Core } from './layouts/Core/Core';
import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from './config/routes';

export const App: FC = (): JSX.Element => {
    return (
        <div>
            <Switch>
                <Route path={ROUTES.HOME}>
                    <Core />
                </Route>
            </Switch>
        </div>
    );
};
