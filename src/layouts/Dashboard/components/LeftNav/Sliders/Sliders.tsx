import React, { ReactElement, useContext } from 'react';
import { SliderModal } from 'components/SliderModal/SliderModal';
import { Checkout } from 'pages/Sales/components/Checkout/Checkout';
import { NewSale } from 'pages/Sales/components/NewSale/NewSale';
import { AddCategory } from 'pages/Inventory/components/AddCategory/AddCategory';
import { AddBrand } from 'pages/Inventory/components/AddBrand/AddBrand';
import { AddTaxBracket } from 'pages/Inventory/components/AddTaxBracket/AddTaxBracket';
import { AddProduct } from 'pages/Inventory/components/AddProduct/AddProduct';
import { useSelector } from 'react-redux';
import { sliderModalSelector } from 'store/models/sliderModal';
import { handleSliderClose } from 'config/config';

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
                active={addBrandSlider}
                sliderSize={'30%'}
                onClickBackdrop={() => handleSliderClose('addBrandSlider')}
            >
                <AddBrand />
            </SliderModal>
            <SliderModal
                active={addProductSlider}
                sliderSize={'40%'}
                onClickBackdrop={() => handleSliderClose('addProductSlider')}
            >
                <AddProduct />
            </SliderModal>
            <SliderModal
                active={addCategorySlider}
                sliderSize={'30%'}
                onClickBackdrop={() => handleSliderClose('addCategorySlider')}
            >
                <AddCategory />
            </SliderModal>
            <SliderModal
                active={addTaxBracketSlider}
                sliderSize={'30%'}
                onClickBackdrop={() => handleSliderClose('addTaxBracketSlider')}
            >
                <AddTaxBracket />
            </SliderModal>
            <SliderModal
                active={newSaleSlider}
                sliderSize={'100%'}
                onClickBackdrop={() => handleSliderClose('newSaleSlider')}
            >
                <NewSale />
            </SliderModal>
            <SliderModal
                active={checkoutSlider}
                sliderSize={'80%'}
                onClickBackdrop={() => handleSliderClose('checkoutSlider')}
            >
                <Checkout />
            </SliderModal>
        </>
    );
};

export default Sliders;
