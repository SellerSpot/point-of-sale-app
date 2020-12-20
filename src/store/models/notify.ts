import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { TMajorColors } from '../../config/cssVariables';
import { RootState } from '../store';

interface InitialState {
    active: boolean;
    message: string;
    type: TMajorColors;
    timeout: number;
}

const initialState: InitialState = {
    active: false,
    message: '',
    type: 'success',
    timeout: 3000, // 3 seconds
};

const notify = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        showNotify: (
            state: InitialState,
            { payload }: PayloadAction<Omit<InitialState, 'active' | 'timeout'>>,
        ) => {
            Object.assign(state, { ...initialState, ...payload, active: true });
        },
        closeNotify: (state: InitialState) => {
            Object.assign(state, { ...initialState, type: state.type });
        },
    },
});

// exporting reducer
export default notify.reducer;

// exporting actions
export const { showNotify, closeNotify } = notify.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const notifySelector: Selector<RootState, InitialState> = (state: RootState) => state.notify;
