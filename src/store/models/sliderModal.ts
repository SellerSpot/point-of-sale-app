import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    newSaleSlider: boolean;
    addProductSlider: boolean;
    checkoutSlider: boolean;
}

const initialState: InitialState = {
    newSaleSlider: false,
    addProductSlider: false,
    checkoutSlider: false,
};

const sliderModalSlice = createSlice({
    name: 'sliderModal',
    initialState,
    reducers: {
        toggleSliderModal: (state, { payload }: PayloadAction<{ sliderName: keyof InitialState; active: boolean }>) => {
            state[payload.sliderName] = payload.active;
        },
    },
});

// exporting reducer
export default sliderModalSlice.reducer;

// exporting actions
export const { toggleSliderModal } = sliderModalSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const sliderModalSelector: Selector<RootState, InitialState> = (state: RootState) => state.sliderModal;
