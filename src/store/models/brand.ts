import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IGetBrands } from 'typings/ComponentTypings/brand.types';
import { RootState } from '../store';

interface IBrandState {
    brands: IGetBrands[];
}

const initialState: IBrandState = {
    brands: [],
};

const brand = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        addbrand: (state, { payload }: PayloadAction<IGetBrands>) => {
            state.brands.push(payload);
        },
        deleteBrand: (state, { payload }: PayloadAction<IGetBrands['_id']>) => {
            // to find the index of the brand to remove and delete it from array
            state.brands.splice(state.brands.findIndex((brand) => brand._id === payload));
        },
        editBrand: (state, { payload }: PayloadAction<IGetBrands>) => {
            state.brands[state.brands.findIndex((brand) => brand._id === payload._id)].name =
                payload.name;
        },
    },
});

// exporting reducer
export default brand.reducer;

// exporting actions
export const { addbrand, deleteBrand, editBrand } = brand.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const brandSelector: Selector<RootState, IBrandState> = (state: RootState) => state.brand;
