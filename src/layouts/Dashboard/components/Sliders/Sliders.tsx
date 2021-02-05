import { AddBrand } from 'pages/Inventory/components/AddBrand/AddBrand';
import { AddCategory } from 'pages/Inventory/components/AddCategory/AddCategory';
import { AddProduct } from 'pages/Inventory/components/AddProduct/AddProduct';
import { AddStockUnit } from 'pages/Inventory/components/AddStockUnit/addStockUnit';
import { AddTaxBracket } from 'pages/Inventory/components/AddTaxBracket/AddTaxBracket';
import { Checkout } from 'pages/Sale/components/Checkout/Checkout';
import { NewSale } from 'pages/Sale/components/NewSale/NewSale';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { sliderModalSelector } from 'store/models/sliderModal';
import { SliderModal } from '@sellerspot/universal-components';

// Interface for callBackStateTrack
export interface ICallBackStateTrack {
    addProductSlider: boolean;
    addCategorySlider: boolean;
    checkoutSlider: boolean;
    newSaleSlider: boolean;
    addBrandSlider: boolean;
    addTaxBracketSlider: boolean;
    addStockUnitSlider: boolean;
}

const Sliders = (): ReactElement => {
    const {
        addProductSlider,
        addCategorySlider,
        checkoutSlider,
        newSaleSlider,
        addBrandSlider,
        addTaxBracketSlider,
        addStockUnitSlider,
    } = useSelector(sliderModalSelector);

    // state used to track the callbacks from the sliderModal
    // true - backdrop or esc event fired
    // false - no event fired
    const callBackStateTrack = useState<ICallBackStateTrack>({
        addProductSlider: false,
        addCategorySlider: false,
        checkoutSlider: false,
        newSaleSlider: false,
        addBrandSlider: false,
        addTaxBracketSlider: false,
        addStockUnitSlider: false,
    });

    return (
        <>
            <SliderModal
                active={newSaleSlider.show}
                sliderSize={'100%'}
                onClickBackdrop={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        newSaleSlider: true,
                    })
                }
                onClickEsc={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        newSaleSlider: true,
                    })
                }
            >
                <NewSale callBackStateTrack={callBackStateTrack} />
            </SliderModal>
            <SliderModal
                active={addProductSlider.show}
                sliderSize={'40%'}
                onClickBackdrop={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addProductSlider: true,
                    })
                }
                onClickEsc={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addProductSlider: true,
                    })
                }
            >
                <AddProduct callBackStateTrack={callBackStateTrack} />
            </SliderModal>
            <SliderModal
                active={addBrandSlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addBrandSlider: true,
                    })
                }
                onClickEsc={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addBrandSlider: true,
                    })
                }
            >
                <AddBrand callBackStateTrack={callBackStateTrack} />
            </SliderModal>

            <SliderModal
                active={addCategorySlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addCategorySlider: true,
                    })
                }
                onClickEsc={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addCategorySlider: true,
                    })
                }
            >
                <AddCategory callBackStateTrack={callBackStateTrack} />
            </SliderModal>
            <SliderModal
                active={addTaxBracketSlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addTaxBracketSlider: true,
                    })
                }
                onClickEsc={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addTaxBracketSlider: true,
                    })
                }
            >
                <AddTaxBracket callBackStateTrack={callBackStateTrack} />
            </SliderModal>
            <SliderModal
                active={addStockUnitSlider.show}
                sliderSize={'30%'}
                onClickBackdrop={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addStockUnitSlider: true,
                    })
                }
                onClickEsc={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        addStockUnitSlider: true,
                    })
                }
            >
                <AddStockUnit callBackStateTrack={callBackStateTrack} />
            </SliderModal>
            <SliderModal
                active={checkoutSlider.show}
                sliderSize={'80%'}
                onClickBackdrop={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        checkoutSlider: true,
                    })
                }
                onClickEsc={() =>
                    callBackStateTrack[1]({
                        ...callBackStateTrack[0],
                        checkoutSlider: true,
                    })
                }
            >
                <Checkout callBackStateTrack={callBackStateTrack} />
            </SliderModal>
        </>
    );
};

export default Sliders;
