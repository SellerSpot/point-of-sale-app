import { merge } from 'lodash';
import { INewSaleCart } from 'pages/Sale/components/NewSale/newSale.types';
import { RootState } from 'store/store';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

interface InitialState {
    searchResults: pointOfSaleTypes.productResponseTypes.ISearchProduct['data'];
    cartData: INewSaleCart;
    searchQuery: string;
}

const initialState: InitialState = {
    searchResults: {
        queryType: 'name',
        results: [],
    },
    cartData: {
        products: [],
        productCartInformation: [],
    },
    searchQuery: '',
};

const newSale = createSlice({
    name: 'newSale',
    initialState,
    reducers: {
        setSearchResults: (
            state: InitialState,
            { payload }: PayloadAction<InitialState['searchResults']>,
        ) => {
            state.searchResults = payload;
        },
        setCartData: (
            state: InitialState,
            { payload }: PayloadAction<InitialState['cartData']>,
        ) => {
            state.cartData = payload;
        },
        setSearchQuery: (
            state: InitialState,
            { payload }: PayloadAction<InitialState['searchQuery']>,
        ) => {
            state.searchQuery = payload;
        },
    },
});

// Exporting reducer
export default newSale.reducer;

// Exporting actions
export const { setSearchResults, setCartData, setSearchQuery } = newSale.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const newSaleSelector: Selector<RootState, InitialState> = (state: RootState) =>
    state.newSale;
