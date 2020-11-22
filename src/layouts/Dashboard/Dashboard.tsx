import React from 'react';
import { LeftNav } from './components/LeftNav/LeftNav';
import dashboardStyles from './dashboard.module.css';

export const Dashboard = (): JSX.Element => {
    return (
        <div className={dashboardStyles.dashboardWrapper}>
            <div className={dashboardStyles.leftNavWrapper}>
                <LeftNav />
            </div>
            <div className={dashboardStyles.mainBodyWrapper}></div>
        </div>
    );
};
