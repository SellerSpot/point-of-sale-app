import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface SliderModalInitialState {
    newSaleSlider: boolean;
    addProductSlider: boolean;
    addCategorySlider: boolean;
    addBrandSlider: boolean;
    addTaxBracketSlider: boolean;
    checkoutSlider: boolean;
}

const initialState: SliderModalInitialState = {
    newSaleSlider: false,
    addProductSlider: false,
    addCategorySlider: false,
    addBrandSlider: false,
    addTaxBracketSlider: false,
    checkoutSlider: false,
};

const sliderModalSlice = createSlice({
    name: 'sliderModal',
    initialState,
    reducers: {
        toggleSliderModal: (
            state,
            { payload }: PayloadAction<{ sliderName: keyof SliderModalInitialState; active: boolean }>,
        ) => {
            state[payload.sliderName] = payload.active;
        },
    },
});

// exporting reducer
export default sliderModalSlice.reducer;

// exporting actions
export const { toggleSliderModal } = sliderModalSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const sliderModalSelector: Selector<RootState, SliderModalInitialState> = (state: RootState) =>
    state.sliderModal;
