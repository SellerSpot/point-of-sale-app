import { AddBrand } from 'pages/Inventory/components/AddBrand/AddBrand';
import { AddCategory } from 'pages/Inventory/components/AddCategory/AddCategory';
import { AddProduct } from 'pages/Inventory/components/AddProduct/AddProduct';
import { AddStockUnit } from 'pages/Inventory/components/AddStockUnit/addStockUnit';
import { AddTaxBracket } from 'pages/Inventory/components/AddTaxBracket/AddTaxBracket';
import { Checkout } from 'pages/Sale/components/Checkout/Checkout';
import { NewSale } from 'pages/Sale/components/NewSale/NewSale';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newSaleSelector } from 'store/models/newSale';
import { openSliderModal, sliderModalSelector } from 'store/models/sliderModal';
import { store } from 'store/store';
import { GLOBAL_KEYBOARD_SHORTCUTS } from 'utilities/general';
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
    const sliderState = useSelector(sliderModalSelector);
    const newSaleState = useSelector(newSaleSelector);
    const dispatch = useDispatch();

    //* Used to handle the keydown events related to sliderModals
    const handleSliderKeydownGlobal = useCallback(
        (event: KeyboardEvent) => {
            // newSaleSlider invoke
            if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE) {
                event.preventDefault();
                dispatch(
                    openSliderModal({
                        autoFillData: null,
                        sliderName: 'newSaleSlider',
                    }),
                );
            }
            // addProductSlider invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_PRODUCT) {
                event.preventDefault();
                dispatch(
                    openSliderModal({
                        autoFillData: null,
                        sliderName: 'addProductSlider',
                    }),
                );
            }
            // addCategorySlider invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_CATEGORY) {
                event.preventDefault();
                dispatch(
                    openSliderModal({
                        autoFillData: null,
                        sliderName: 'addCategorySlider',
                    }),
                );
            }
            // addBrandSlider invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_BRAND) {
                event.preventDefault();
                dispatch(
                    openSliderModal({
                        autoFillData: null,
                        sliderName: 'addBrandSlider',
                    }),
                );
            }
            // addTaxBracket invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_TAXBRACKET) {
                event.preventDefault();
                dispatch(
                    openSliderModal({
                        autoFillData: null,
                        sliderName: 'addTaxBracketSlider',
                    }),
                );
            }
            // addStockUnit invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.ADD_STOCKUNIT) {
                event.preventDefault();
                dispatch(
                    openSliderModal({
                        autoFillData: null,
                        sliderName: 'addStockUnitSlider',
                    }),
                );
            }
            // checkoutSlider invoke
            else if (event.key === GLOBAL_KEYBOARD_SHORTCUTS.CHECKOUT) {
                event.preventDefault();
                // only enabling this slider if the new sale cart is not empty and the new sale slider is open
                if (
                    sliderState.openSliders.includes('newSaleSlider') &&
                    newSaleState.cartData.products.length > 0
                ) {
                    dispatch(
                        openSliderModal({
                            autoFillData: null,
                            sliderName: 'checkoutSlider',
                        }),
                    );
                }
            }
        },
        [newSaleState],
    );

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
                active={sliderState.openSliders.includes('newSaleSlider')}
                sliderSize={'100%'}
                zIndex={sliderState.openSliders.indexOf('newSaleSlider') + 10 ?? 0}
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
                active={sliderState.openSliders.includes('addProductSlider')}
                zIndex={sliderState.openSliders.indexOf('addProductSlider') + 10 ?? 0}
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
                active={sliderState.openSliders.includes('addBrandSlider')}
                zIndex={sliderState.openSliders.indexOf('addBrandSlider') + 10 ?? 0}
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
                active={sliderState.openSliders.includes('addCategorySlider')}
                zIndex={sliderState.openSliders.indexOf('addCategorySlider') + 10 ?? 0}
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
                active={sliderState.openSliders.includes('addTaxBracketSlider')}
                zIndex={sliderState.openSliders.indexOf('addTaxBracketSlider') + 10 ?? 0}
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
                active={sliderState.openSliders.includes('addStockUnitSlider')}
                zIndex={sliderState.openSliders.indexOf('addStockUnitSlider') + 10 ?? 0}
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
                active={sliderState.openSliders.includes('checkoutSlider')}
                zIndex={sliderState.openSliders.indexOf('checkoutSlider') + 10 ?? 0}
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
