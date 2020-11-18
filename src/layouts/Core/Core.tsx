import React from 'react';
import { Home } from '../../pages/Home/Home';
import { CoreNav } from './components/CoreNav';

export const Core: React.FC = (): JSX.Element => {
    return (
        <div>
            <div>Core layout</div>
            <p>using the component specific to this layout under ./components</p>
            <CoreNav />
            <p>layout holds the Home page</p>
            <Home />
        </div>
    );
};
