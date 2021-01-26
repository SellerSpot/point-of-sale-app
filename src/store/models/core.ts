import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ICoreState {
    isLoading: boolean;
    tenant?: {
        _id: string;
        name: string;
        email: string;
        token: string;
    };
    auth?: {
        // will be wired with initial state later
        userName: string;
        userEmail: string;
        authToken: string;
    };
}

const initialState: ICoreState = {
    isLoading: false,
    tenant: {
        _id: '',
        name: '',
        email: '',
        token: '',
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
        },
    },
});

// Exporting reducer
export default coreSlice.reducer;

// Exporting actions
export const { updateLoading, updateTenant } = coreSlice.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const coreSelector: Selector<RootState, ICoreState> = (state: RootState) => state.core;
