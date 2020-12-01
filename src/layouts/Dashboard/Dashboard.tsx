import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SliderModal } from '../../components/SliderModal/SliderModal';
import { ROUTES } from '../../config/routes';
import { AddProduct } from '../../pages/AddProduct/AddProduct';
import { CashRegister } from '../../pages/CashRegister/CashRegister';
import { Inventory } from '../../pages/Inventory/Inventory';
import { Sales } from '../../pages/Sales/Sales';
import { LeftNav } from './components/LeftNav/LeftNav';
import dashboardStyles from './dashboard.module.css';

export const Dashboard = (): JSX.Element => {
    const [isAddProductActive, setIsAddProductActive] = useState(false);
    useEffect(() => {
        setIsAddProductActive(true);
    }, []);
    return (
        <div className={dashboardStyles.dashboardWrapper}>
            <div className={dashboardStyles.leftNavWrapper}>
                <LeftNav />
            </div>
            <div className={dashboardStyles.mainBodyWrapper}>
                <Switch>
                    <Route path={ROUTES.INVENTORY}>
                        <Inventory />
                    </Route>
                    <Route path={ROUTES.CASH_REGISTER}>
                        <CashRegister />
                    </Route>
                    {/* this is '/' route hence should be placed atlast */}
                    <Route path={ROUTES.SALES}>
                        <Sales />
                    </Route>
                </Switch>
            </div>
            {/* full view sliders should be placed down here */}
            <SliderModal active={isAddProductActive}>
                <AddProduct />
            </SliderModal>
        </div>
    );
};
