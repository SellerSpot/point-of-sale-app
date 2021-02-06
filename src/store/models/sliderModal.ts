import { IAddBrandFormSchema } from 'pages/Inventory/components/AddBrand/addBrand.types';
import { IAddCategoryFormSchema } from 'pages/Inventory/components/AddCategory/addCategory.types';
import { IAddProductFormSchema } from 'pages/Inventory/components/AddProduct/addProduct.types';
import { IAddStockUnitFormSchema } from 'pages/Inventory/components/AddStockUnit/addStockUnit.types';
import { IAddTaxBracketFormSchema } from 'pages/Inventory/components/AddTaxBracket/addTaxBracket.types';
import { RootState } from 'store/store';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';

export enum SLIDERS {
    'newSaleSlider' = 'newSaleSlider',
    'addProductSlider' = 'addProductSlider',
    'addCategorySlider' = 'addCategorySlider',
    'addBrandSlider' = 'addBrandSlider',
    'addTaxBracketSlider' = 'addTaxBracketSlider',
    'addStockUnitSlider' = 'addStockUnitSlider',
    'checkoutSlider' = 'checkoutSlider',
}

// type to compile the list of sliders
export type TSliders = {
    [key in SLIDERS]: {
        autoFillData:
            | IAddProductFormSchema
            | IAddCategoryFormSchema
            | IAddBrandFormSchema
            | IAddTaxBracketFormSchema
            | IAddStockUnitFormSchema;
    };
};

export interface ISliderModalInitialState {
    sliders: TSliders;
    openSliders: (keyof TSliders)[];
}

const initialState: ISliderModalInitialState = {
    sliders: {
        newSaleSlider: {
            autoFillData: null,
        },
        addProductSlider: {
            autoFillData: null,
        },
        addCategorySlider: {
            autoFillData: null,
        },
        addBrandSlider: {
            autoFillData: null,
        },
        addTaxBracketSlider: {
            autoFillData: null,
        },
        addStockUnitSlider: {
            autoFillData: null,
        },
        checkoutSlider: {
            autoFillData: null,
        },
    },
    openSliders: [],
};

const sliderModalSlice = createSlice({
    name: 'sliderModal',
    initialState,
    reducers: {
        openSliderModal: (
            state,
            {
                payload,
            }: PayloadAction<{
                sliderName: keyof ISliderModalInitialState['sliders'];
                autoFillData:
                    | IAddProductFormSchema
                    | IAddCategoryFormSchema
                    | IAddStockUnitFormSchema
                    | IAddTaxBracketFormSchema;
            }>,
        ) => {
            // checking if slidermodal already exists in the queue
            const thisSliderModalPosition = state.openSliders.indexOf(payload.sliderName);
            if (thisSliderModalPosition > -1) {
                // slider modal is open, so popping all overlaying sliders
                state.openSliders.length = thisSliderModalPosition + 1;
            } else {
                // slider not already open
                state.openSliders.push(payload.sliderName);
                state.sliders[payload.sliderName].autoFillData = payload.autoFillData;
            }
        },
        closeSliderModal: (
            state,
            {
                payload,
            }: PayloadAction<{
                sliderName: keyof ISliderModalInitialState['sliders'];
            }>,
        ) => {
            // finding position of the sliderModal in the queue
            const thisSliderModalPosition = state.openSliders.indexOf(payload.sliderName);
            if (thisSliderModalPosition > -1) {
                state.openSliders.splice(thisSliderModalPosition, 1);
                state.sliders[payload.sliderName].autoFillData = null;
            }
        },
    },
});

// Exporting reducer
export default sliderModalSlice.reducer;

// Exporting actions
export const { openSliderModal, closeSliderModal } = sliderModalSlice.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const sliderModalSelector: Selector<RootState, ISliderModalInitialState> = (
    state: RootState,
) => state.sliderModal;
