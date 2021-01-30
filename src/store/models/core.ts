import { RootState } from 'store/store';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

interface ICoreState {
    isLoading: boolean;
    isAuthenticated: boolean;
    tenant: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse['data'];
}

const initialState: ICoreState = {
    isLoading: true,
    isAuthenticated: false,
    tenant: {
        _id: '',
        name: '',
        email: '',
        token: '',
        auth: null,
    },
};

const coreSlice = createSlice({
    name: 'core',
    initialState,
    reducers: {
        updateLoading: (state, { payload }: PayloadAction<ICoreState['isLoading']>) => {
            state.isLoading = payload;
        },
        updateTenant: (state, { payload }: PayloadAction<ICoreState['tenant']>) => {
            state.tenant = payload;
            if (payload?.auth?._id) state.isAuthenticated = true;
            else state.isAuthenticated = false;
            state.isLoading = false;
        },
    },
});

// Exporting reducer
export default coreSlice.reducer;

// Exporting actions
export const { updateLoading, updateTenant } = coreSlice.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const coreSelector: Selector<RootState, ICoreState> = (state: RootState) => state.core;
