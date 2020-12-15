import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
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
import { BillingSetup } from '../../pages/BillingSetup/BillingSetup';
import { AddCategory } from '../../pages/Inventory/components/AddCategory/AddCategory';
import { AddBrand } from '../../pages/Inventory/components/AddBrand/AddBrand';
import { AddTaxBracket } from '../../pages/Inventory/components/AddTaxBracket/AddTaxBracket';

export const Dashboard = (): JSX.Element => {
    const {
        addProductSlider,
        addCategorySlider,
        checkoutSlider,
        newSaleSlider,
        addBrandSlider,
        addTaxBracketSlider,
    } = useSelector(sliderModalSelector);

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
                    <Route path={ROUTES.BILLING_SETUP}>
                        <BillingSetup />
                    </Route>
                    {/* this is '/' route hence should be placed atlast */}
                    <Route path={ROUTES.SALES}>
                        <Sales />
                    </Route>
                </Switch>
            </div>
            {/* full view sliders should be placed down here */}
            <SliderModal
                sliderName={'addBrandSlider'}
                active={addBrandSlider}
                sliderSize={'30%'}
                confirmSliderClose={{
                    show: true,
                }}
            >
                <AddBrand />
            </SliderModal>
            <SliderModal
                sliderName={'addProductSlider'}
                active={addProductSlider}
                sliderSize={'40%'}
                confirmSliderClose={{
                    show: false,
                }}
            >
                <AddProduct />
            </SliderModal>
            <SliderModal
                sliderName={'addCategorySlider'}
                active={addCategorySlider}
                sliderSize={'30%'}
                confirmSliderClose={{
                    show: false,
                }}
            >
                <AddCategory />
            </SliderModal>
            <SliderModal
                sliderName={'addTaxBracketSlider'}
                active={addTaxBracketSlider}
                sliderSize={'30%'}
                confirmSliderClose={{
                    show: false,
                }}
            >
                <AddTaxBracket />
            </SliderModal>
            <SliderModal
                sliderName={'newSaleSlider'}
                active={newSaleSlider}
                sliderSize={'100%'}
                confirmSliderClose={{
                    show: false,
                }}
            >
                <NewSale />
            </SliderModal>
            <SliderModal
                sliderName={'checkoutSlider'}
                active={checkoutSlider}
                sliderSize={'80%'}
                confirmSliderClose={{
                    show: false,
                }}
            >
                <Checkout />
            </SliderModal>
        </div>
    );
};
