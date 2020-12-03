import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { SliderModal } from '../../components/SliderModal/SliderModal';
import { ROUTES } from '../../config/routes';
import { AddProduct } from '../../pages/Inventory/components/AddProduct/AddProduct';
import { CashRegister } from '../../pages/CashRegister/CashRegister';
import { Inventory } from '../../pages/Inventory/Inventory';
import { Sales } from '../../pages/Sales/Sales';
import { sliderModalSelector } from '../../store/models/sliderModal';
import { LeftNav } from './components/LeftNav/LeftNav';
import dashboardStyles from './dashboard.module.css';
import { Checkout } from '../../pages/Sales/components/Checkout/Checkout';
import { NewSale } from '../../pages/Sales/components/NewSale/NewSale';
import { confirmDialogSelector } from '../../store/models/confirmDialogModal';

export const Dashboard = (): JSX.Element => {
    const { addProductSlider, checkoutSlider, newSaleSlider } = useSelector(sliderModalSelector);
    const confirmDialogProps = useSelector(confirmDialogSelector);
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
            <SliderModal active={newSaleSlider} sliderSize={'100%'}>
                <NewSale />
            </SliderModal>
            <SliderModal active={addProductSlider} sliderSize={'40%'}>
                <AddProduct />
            </SliderModal>
            <SliderModal active={checkoutSlider} sliderSize={'70%'}>
                <Checkout />
            </SliderModal>
            <ConfirmDialog
                active={confirmDialogProps.active}
                description={confirmDialogProps.description}
                title={confirmDialogProps.title}
                onFailure={confirmDialogProps.onFailure}
                onSuccess={confirmDialogProps.onSuccess}
                failureActionLabel={confirmDialogProps.failureActionLabel}
                successActionLabel={confirmDialogProps.successActionLabel}
            />
        </div>
    );
};
