import { AddBrand } from 'pages/Inventory/components/AddBrand/AddBrand';
import { AddCategory } from 'pages/Inventory/components/AddCategory/AddCategory';
import { AddProduct } from 'pages/Inventory/components/AddProduct/AddProduct';
import { AddStockUnit } from 'pages/Inventory/components/AddStockUnit/addStockUnit';
import { AddTaxBracket } from 'pages/Inventory/components/AddTaxBracket/AddTaxBracket';
import { Checkout } from 'pages/Sale/components/Checkout/Checkout';
import { NewSale } from 'pages/Sale/components/NewSale/NewSale';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newSaleSelector } from 'store/models/newSale';
import { SLIDERS, sliderModalSelector } from 'store/models/sliderModal';
import {
    GLOBAL_KEYBOARD_SHORTCUTS,
    addSliderToCallBackStateTrack,
    handleOpenSlider,
} from 'utilities/general';
import { SliderModal } from '@sellerspot/universal-components';

const Sliders = (): ReactElement => {
    const sliderState = useSelector(sliderModalSelector);
    const newSaleState = useSelector(newSaleSelector);
    const dispatch = useDispatch();

    //* Used to handle the keydown events related to sliderModals
    const handleSliderKeydownGlobal = useCallback(
        (event: KeyboardEvent) => {
            // newSaleSlider invoke
            if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE) {
                event.preventDefault();
                handleOpenSlider({
                    autoFillData: null,
                    sliderName: SLIDERS.newSaleSlider,
                });
            }
            // addProductSlider invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_PRODUCT) {
                event.preventDefault();
                handleOpenSlider({
                    autoFillData: null,
                    sliderName: SLIDERS.addProductSlider,
                });
            }
            // addCategorySlider invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_CATEGORY) {
                event.preventDefault();
                handleOpenSlider({
                    autoFillData: null,
                    sliderName: SLIDERS.addCategorySlider,
                });
            }
            // addBrandSlider invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_BRAND) {
                event.preventDefault();
                handleOpenSlider({
                    autoFillData: null,
                    sliderName: SLIDERS.addBrandSlider,
                });
            }
            // addTaxBracket invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_TAXBRACKET) {
                event.preventDefault();
                handleOpenSlider({
                    autoFillData: null,
                    sliderName: SLIDERS.addTaxBracketSlider,
                });
            }
            // addStockUnit invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_STOCKUNIT) {
                event.preventDefault();
                handleOpenSlider({
                    autoFillData: null,
                    sliderName: SLIDERS.addStockUnitSlider,
                });
            }
            // checkoutSlider invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.CHECKOUT) {
                event.preventDefault();
                // only enabling this slider if the new sale cart is not empty and the new sale slider is open
                if (
                    sliderState.openSliders.includes(SLIDERS.newSaleSlider) &&
                    newSaleState.cartData.products.length > 0
                ) {
                    handleOpenSlider({
                        autoFillData: null,
                        sliderName: SLIDERS.checkoutSlider,
                    });
                }
            }
        },
        [newSaleState],
    );

    //# Slider Modal Event Listener setup

    // used to invoke and listen to sliderModal related keydown events
    useEffect(() => {
        document.addEventListener('keydown', handleSliderKeydownGlobal);
        return () => {
            document.removeEventListener('keydown', handleSliderKeydownGlobal);
        };
    }, []);

    return (
        <>
            <SliderModal
                active={sliderState.openSliders.includes(SLIDERS.newSaleSlider)}
                sliderSize={'100%'}
                zIndex={sliderState.openSliders.indexOf(SLIDERS.newSaleSlider) + 10 ?? 0}
                onClickBackdrop={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.newSaleSlider,
                        sliderState,
                    })
                }
                onClickEsc={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.newSaleSlider,
                        sliderState,
                    })
                }
            >
                <NewSale />
            </SliderModal>
            <SliderModal
                active={sliderState.openSliders.includes(SLIDERS.addProductSlider)}
                zIndex={sliderState.openSliders.indexOf(SLIDERS.addProductSlider) + 10 ?? 0}
                sliderSize={'40%'}
                onClickBackdrop={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addProductSlider,
                        sliderState,
                    })
                }
                onClickEsc={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addProductSlider,
                        sliderState,
                    })
                }
            >
                <AddProduct />
            </SliderModal>
            <SliderModal
                active={sliderState.openSliders.includes(SLIDERS.addBrandSlider)}
                zIndex={sliderState.openSliders.indexOf(SLIDERS.addBrandSlider) + 10 ?? 0}
                sliderSize={'30%'}
                onClickBackdrop={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addBrandSlider,
                        sliderState,
                    })
                }
                onClickEsc={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addBrandSlider,
                        sliderState,
                    })
                }
            >
                <AddBrand />
            </SliderModal>
            <SliderModal
                active={sliderState.openSliders.includes(SLIDERS.addCategorySlider)}
                zIndex={sliderState.openSliders.indexOf(SLIDERS.addCategorySlider) + 10 ?? 0}
                sliderSize={'30%'}
                onClickBackdrop={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addCategorySlider,
                        sliderState,
                    })
                }
                onClickEsc={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addCategorySlider,
                        sliderState,
                    })
                }
            >
                <AddCategory />
            </SliderModal>
            <SliderModal
                active={sliderState.openSliders.includes(SLIDERS.addTaxBracketSlider)}
                zIndex={sliderState.openSliders.indexOf(SLIDERS.addTaxBracketSlider) + 10 ?? 0}
                sliderSize={'30%'}
                onClickBackdrop={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addTaxBracketSlider,
                        sliderState,
                    })
                }
                onClickEsc={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addTaxBracketSlider,
                        sliderState,
                    })
                }
            >
                <AddTaxBracket />
            </SliderModal>
            <SliderModal
                active={sliderState.openSliders.includes(SLIDERS.addStockUnitSlider)}
                zIndex={sliderState.openSliders.indexOf(SLIDERS.addStockUnitSlider) + 10 ?? 0}
                sliderSize={'30%'}
                onClickBackdrop={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addStockUnitSlider,
                        sliderState,
                    })
                }
                onClickEsc={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.addStockUnitSlider,
                        sliderState,
                    })
                }
            >
                <AddStockUnit />
            </SliderModal>
            <SliderModal
                active={sliderState.openSliders.includes(SLIDERS.checkoutSlider)}
                zIndex={sliderState.openSliders.indexOf(SLIDERS.checkoutSlider) + 10 ?? 0}
                sliderSize={'80%'}
                onClickBackdrop={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.checkoutSlider,
                        sliderState,
                    })
                }
                onClickEsc={() =>
                    addSliderToCallBackStateTrack({
                        sliderName: SLIDERS.checkoutSlider,
                        sliderState,
                    })
                }
            >
                <Checkout />
            </SliderModal>
        </>
    );
};

export default Sliders;
