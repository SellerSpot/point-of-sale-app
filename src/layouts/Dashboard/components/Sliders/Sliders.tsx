import React, { ReactElement } from 'react';
import { SliderModal } from '@sellerspot/universal-components';
import { useSelector } from 'react-redux';
import {
    SliderModalInitialState,
    sliderModalSelector,
    toggleSliderModal,
} from 'store/models/sliderModal';
import { store } from 'store/store';
import { NewSale } from 'pages/Sale/components/NewSale/NewSale';
import { AddProduct } from 'pages/Inventory/components/AddProduct/AddProduct';

// Used to close the sliderModals
export const handleSliderClose = (sliderModalToClose: keyof SliderModalInitialState): void => {
    switch (sliderModalToClose) {
        default:
            store.dispatch(
                toggleSliderModal({
                    sliderName: sliderModalToClose,
                    active: false,
                    autoFillData: null,
                }),
            );
            break;
    }
};

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
                active={newSaleSlider.show}
                sliderSize={'100%'}
                onClickBackdrop={() => handleSliderClose('newSaleSlider')}
            >
                <NewSale />
            </SliderModal>
            <SliderModal
                active={addProductSlider.show}
                sliderSize={'40%'}
                onClickBackdrop={() => handleSliderClose('addProductSlider')}
            >
                <AddProduct />
            </SliderModal>
            {/* <SliderModal
                active={addBrandSlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() => handleSliderClose('addBrandSlider')}
            >
                <AddBrand />
            </SliderModal>
            
            <SliderModal
                active={addCategorySlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() => handleSliderClose('addCategorySlider')}
            >
                <AddCategory />
            </SliderModal>
            <SliderModal
                active={addTaxBracketSlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() => handleSliderClose('addTaxBracketSlider')}
            >
                <AddTaxBracket />
            </SliderModal>
            
            <SliderModal
                active={checkoutSlider.show}
                sliderSize={'80%'}
                onClickBackdrop={() => handleSliderClose('checkoutSlider')}
            >
                <Checkout />
            </SliderModal> */}
        </>
    );
};

export default Sliders;
