import { SliderModal } from 'components/SliderModal/SliderModal';
import React, { ReactElement } from 'react';

import { Checkout } from 'pages/Sales/components/Checkout/Checkout';
import { NewSale } from 'pages/Sales/components/NewSale/NewSale';
import { AddCategory } from 'pages/Inventory/components/AddCategory/AddCategory';
import { AddBrand } from 'pages/Inventory/components/AddBrand/AddBrand';
import { AddTaxBracket } from 'pages/Inventory/components/AddTaxBracket/AddTaxBracket';
import { AddProduct } from 'pages/Inventory/components/AddProduct/AddProduct';
import { useSelector } from 'react-redux';
import { sliderModalSelector } from 'store/models/sliderModal';

const Sliders = (): ReactElement => {
    const {
        addProductSlider,
        addCategorySlider,
        checkoutSlider,
        newSaleSlider,
        addBrandSlider,
        addTaxBracketSlider,
    } = useSelector(sliderModalSelector);
    return (
        <>
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
        </>
    );
};

export default Sliders;
