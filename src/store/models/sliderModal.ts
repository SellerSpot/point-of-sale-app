import { RootState } from 'store/store';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';

// import { IGetBrandFromServer } from 'pages/Inventory/components/AddBrand/brand.types';
// import { IGetCategoryFromServer } from 'typings/components/category.types';
// import { IGetProductFromServer } from 'typings/components/product.types';
// import { IGetTaxBracketFromServer } from 'typings/components/taxBracket.types';

export interface SliderModalInitialState {
    newSaleSlider: {
        show: boolean;
        autoFillData?: null;
    };
    addProductSlider: {
        show: boolean;
        // autoFillData?: IGetProductFromServer;
    };
    addCategorySlider: {
        show: boolean;
    };
    addBrandSlider: {
        show: boolean;
    };
    addTaxBracketSlider: {
        show: boolean;
    };
    addStockUnitSlider: {
        show: boolean;
    };
    // checkoutSlider: {
    //     show: boolean;
    //     autoFillData?: null;
    // };
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
    addStockUnitSlider: {
        show: false,
    },
    // checkoutSlider: {
    //     show: false,
    // },
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
            }>,
        ) => {
            state[payload.sliderName].show = payload.active;
        },
    },
});

// Exporting reducer
export default sliderModalSlice.reducer;

// Exporting actions
export const { toggleSliderModal } = sliderModalSlice.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const sliderModalSelector: Selector<RootState, SliderModalInitialState> = (
    state: RootState,
) => state.sliderModal;
