import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialState {
    coreHandshake: boolean;
}

const initialState: InitialState = {
    coreHandshake: false,
};

const coreSlice = createSlice({
    name: 'core',
    initialState,
    reducers: {
        initiateHandshake: (state, { payload }: PayloadAction<{ coreHandshake: boolean }>) => {
            state.coreHandshake = payload.coreHandshake;
        },
    },
});

// Exporting reducer
export default coreSlice.reducer;

// Exporting actions
export const { initiateHandshake } = coreSlice.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const coreSelector: Selector<RootState, InitialState> = (state: RootState) => state.core;
