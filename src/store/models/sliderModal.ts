import { IAddBrandFormSchema } from 'pages/Inventory/components/AddBrand/addBrand.types';
import { IAddCategoryFormSchema } from 'pages/Inventory/components/AddCategory/addCategory.types';
import { IAddProductFormSchema } from 'pages/Inventory/components/AddProduct/addProduct.types';
import { IAddStockUnitFormSchema } from 'pages/Inventory/components/AddStockUnit/addStockUnit.types';
import { IAddTaxBracketFormSchema } from 'pages/Inventory/components/AddTaxBracket/addTaxBracket.types';
import { RootState } from 'store/store';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';

interface ISliders {
    newSaleSlider: {
        autoFillData?: null;
    };
    addProductSlider: {
        autoFillData?: IAddProductFormSchema;
    };
    addCategorySlider: {
        autoFillData?: IAddCategoryFormSchema;
    };
    addBrandSlider: {
        autoFillData?: IAddBrandFormSchema;
    };
    addTaxBracketSlider: {
        autoFillData?: IAddTaxBracketFormSchema;
    };
    addStockUnitSlider: {
        autoFillData?: IAddStockUnitFormSchema;
    };
    checkoutSlider: {
        autoFillData?: null;
    };
}

export interface ISliderModalInitialState {
    sliders: ISliders;
    openSliders: (keyof ISliders)[];
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
        checkoutSlider: {},
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
