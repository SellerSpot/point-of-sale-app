import { IAddBrandFormSchema } from 'pages/Inventory/components/AddBrand/addBrand.types';
import { IAddCategoryFormSchema } from 'pages/Inventory/components/AddCategory/addCategory.types';
import { IAddProductFormSchema } from 'pages/Inventory/components/AddProduct/addProduct.types';
import { IAddStockUnitFormSchema } from 'pages/Inventory/components/AddStockUnit/addStockUnit.types';
import { IAddTaxBracketFormSchema } from 'pages/Inventory/components/AddTaxBracket/addTaxBracket.types';
import { RootState } from 'store/store';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';

export interface ISliderModalInitialState {
    newSaleSlider: {
        show: boolean;
        autoFillData?: null;
    };
    addProductSlider: {
        show: boolean;
        autoFillData?: IAddProductFormSchema;
    };
    addCategorySlider: {
        show: boolean;
        autoFillData?: IAddCategoryFormSchema;
    };
    addBrandSlider: {
        show: boolean;
        autoFillData?: IAddBrandFormSchema;
    };
    addTaxBracketSlider: {
        show: boolean;
        autoFillData?: IAddTaxBracketFormSchema;
    };
    addStockUnitSlider: {
        show: boolean;
        autoFillData?: IAddStockUnitFormSchema;
    };
    checkoutSlider: {
        show: boolean;
        autoFillData?: null;
    };
}

const initialState: ISliderModalInitialState = {
    newSaleSlider: {
        show: false,
        autoFillData: null,
    },
    addProductSlider: {
        show: false,
        autoFillData: null,
    },
    addCategorySlider: {
        show: false,
        autoFillData: null,
    },
    addBrandSlider: {
        show: false,
        autoFillData: null,
    },
    addTaxBracketSlider: {
        show: false,
        autoFillData: null,
    },
    addStockUnitSlider: {
        show: false,
        autoFillData: null,
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
                sliderName: keyof ISliderModalInitialState;
                active: boolean;
                autoFillData:
                    | IAddProductFormSchema
                    | IAddCategoryFormSchema
                    | IAddStockUnitFormSchema
                    | IAddTaxBracketFormSchema;
            }>,
        ) => {
            state[payload.sliderName].show = payload.active;
            state[payload.sliderName].autoFillData = payload.autoFillData;
        },
    },
});

// Exporting reducer
export default sliderModalSlice.reducer;

// Exporting actions
export const { toggleSliderModal } = sliderModalSlice.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const sliderModalSelector: Selector<RootState, ISliderModalInitialState> = (
    state: RootState,
) => state.sliderModal;
