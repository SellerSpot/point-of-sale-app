import { INewSaleCart } from 'pages/Sale/components/NewSale/newSale.types';
import { RootState } from 'store/store';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

export interface IInitialStateNewSale {
    searchResults: pointOfSaleTypes.productResponseTypes.ISearchProduct['data'];
    cartData: INewSaleCart;
    totals: {
        grandTotal: number;
        grandTotalTax: number;
        grandTotalDiscount: number;
    };
    searchQuery: string;
}

export const initialStateNewSale: IInitialStateNewSale = {
    searchResults: {
        queryType: 'name',
        results: [],
    },
    cartData: {
        products: [],
        productCartInformation: [],
    },
    totals: {
        grandTotal: 0,
        grandTotalTax: 0,
        grandTotalDiscount: 0,
    },
    searchQuery: '',
};

const newSale = createSlice({
    name: 'newSale',
    initialState: initialStateNewSale,
    reducers: {
        setSearchResults: (
            state: IInitialStateNewSale,
            { payload }: PayloadAction<IInitialStateNewSale['searchResults']>,
        ) => {
            state.searchResults = payload;
        },
        setCartData: (
            state: IInitialStateNewSale,
            { payload }: PayloadAction<IInitialStateNewSale['cartData']>,
        ) => {
            state.cartData = payload;
        },
        setSearchQuery: (
            state: IInitialStateNewSale,
            { payload }: PayloadAction<IInitialStateNewSale['searchQuery']>,
        ) => {
            state.searchQuery = payload;
        },
        setGrandTotals: (
            state: IInitialStateNewSale,
            { payload }: PayloadAction<IInitialStateNewSale['totals']>,
        ) => {
            state.totals = payload;
        },
    },
});

// Exporting reducer
export default newSale.reducer;

// Exporting actions
export const { setSearchResults, setCartData, setSearchQuery, setGrandTotals } = newSale.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const newSaleSelector: Selector<RootState, IInitialStateNewSale> = (state: RootState) =>
    state.newSale;
