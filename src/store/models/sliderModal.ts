import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IGetBrand } from 'typings/components/brand.types';
import { IGetCategory } from 'typings/components/category.types';
import { IGetProduct } from 'typings/components/product.types';
import { IGetTaxBracket } from 'typings/components/taxBracket.types';
import { RootState } from '../store';

type TSliderAutofill = IGetProduct | IGetCategory | IGetBrand | IGetTaxBracket;

export interface SliderModalInitialState {
    newSaleSlider: {
        show: boolean;
        autoFillData?: null;
    };
    addProductSlider: {
        show: boolean;
        autoFillData?: IGetProduct;
    };
    addCategorySlider: {
        show: boolean;
        autoFillData?: IGetCategory;
    };
    addBrandSlider: {
        show: boolean;
        autoFillData?: IGetBrand;
    };
    addTaxBracketSlider: {
        show: boolean;
        autoFillData?: IGetTaxBracket;
    };
    checkoutSlider: {
        show: boolean;
        autoFillData?: null;
    };
}

const initialState: SliderModalInitialState = {
    newSaleSlider: {
        show: false,
    },
    addProductSlider: {
        show: false,
    },
    addCategorySlider: {
        show: false,
    },
    addBrandSlider: {
        show: false,
    },
    addTaxBracketSlider: {
        show: false,
    },
    checkoutSlider: {
        show: false,
    },
};

const sliderModalSlice = createSlice({
    name: 'sliderModal',
    initialState,
    reducers: {
        toggleSliderModal: (
            state,
            {
                payload,
            }: PayloadAction<{
                sliderName: keyof SliderModalInitialState;
                active: boolean;
                autoFillData?: TSliderAutofill;
            }>,
        ) => {
            state[payload.sliderName].show = payload.active;
            state[payload.sliderName].autoFillData = payload.autoFillData;
        },
    },
});

// exporting reducer
export default sliderModalSlice.reducer;

// exporting actions
export const { toggleSliderModal } = sliderModalSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const sliderModalSelector: Selector<RootState, SliderModalInitialState> = (
    state: RootState,
) => state.sliderModal;
