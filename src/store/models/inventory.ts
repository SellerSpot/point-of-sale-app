import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { RootState } from '../store';

interface IInventoryState {
    products: pointOfSaleTypes.productResponseTypes.IGetAllProducts['data'];
    categories: pointOfSaleTypes.categoryResponseTypes.IGetAllCategories['data'];
    taxBrackets: pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets['data'];
    stockUnits: pointOfSaleTypes.stockUnitResponseTypes.IGetAllStockUnits['data'];
}

const initialState: IInventoryState = {
    products: [],
    categories: [],
    taxBrackets: [],
    stockUnits: [],
};

const inventory = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setProducts: (
            state,
            {
                payload,
            }: PayloadAction<pointOfSaleTypes.productResponseTypes.IGetAllProducts['data']>,
        ) => {
            state.products = payload;
        },
        setCategories: (
            state,
            {
                payload,
            }: PayloadAction<pointOfSaleTypes.categoryResponseTypes.IGetAllCategories['data']>,
        ) => {
            state.categories = payload;
        },
        taxBrackets: (
            state,
            {
                payload,
            }: PayloadAction<pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets['data']>,
        ) => {
            state.taxBrackets = payload;
        },
        stockUnits: (
            state,
            {
                payload,
            }: PayloadAction<pointOfSaleTypes.stockUnitResponseTypes.IGetAllStockUnits['data']>,
        ) => {
            state.stockUnits = payload;
        },
    },
});

// exporting reducer
export default inventory.reducer;

// exporting actions
export const { setProducts, setCategories, taxBrackets, stockUnits } = inventory.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const inventorySelector: Selector<RootState, IInventoryState> = (state: RootState) =>
    state.inventory;
