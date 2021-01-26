import { SliderModal } from '@sellerspot/universal-components';
import { AddBrand } from 'pages/Inventory/components/AddBrand/AddBrand';
import { AddCategory } from 'pages/Inventory/components/AddCategory/AddCategory';
import { AddProduct } from 'pages/Inventory/components/AddProduct/AddProduct';
import { AddTaxBracket } from 'pages/Inventory/components/AddTaxBracket/AddTaxBracket';
import { NewSale } from 'pages/Sale/components/NewSale/NewSale';
import React, { ReactElement, useState } from 'react';
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

    // state used to track the callbacks from the sliderModal
    const callBackStateTrack = useState(false);

    return (
        <>
            <SliderModal
                active={newSaleSlider.show}
                sliderSize={'100%'}
                onClickBackdrop={() => callBackStateTrack[1](true)}
                onClickEsc={() => callBackStateTrack[1](true)}
            >
                <NewSale />
            </SliderModal>
            <SliderModal
                active={addProductSlider.show}
                sliderSize={'50%'}
                onClickBackdrop={() => callBackStateTrack[1](true)}
                onClickEsc={() => callBackStateTrack[1](true)}
            >
                <AddProduct callBackStateTrack={callBackStateTrack} />
            </SliderModal>
            <SliderModal
                active={addBrandSlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() => callBackStateTrack[1](true)}
                onClickEsc={() => callBackStateTrack[1](true)}
            >
                <AddBrand callBackStateTrack={callBackStateTrack} />
            </SliderModal>

            <SliderModal
                active={addCategorySlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() => callBackStateTrack[1](true)}
                onClickEsc={() => callBackStateTrack[1](true)}
            >
                <AddCategory callBackStateTrack={callBackStateTrack} />
            </SliderModal>
            <SliderModal
                active={addTaxBracketSlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() => callBackStateTrack[1](true)}
                onClickEsc={() => callBackStateTrack[1](true)}
            >
                <AddTaxBracket callBackStateTrack={callBackStateTrack} />
            </SliderModal>

            {/* <SliderModal
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
