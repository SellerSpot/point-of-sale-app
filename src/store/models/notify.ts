import { merge } from 'lodash';
import { RootState } from 'store/store';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';

interface InitialState {
    notifyId: string | number;
    content?: JSX.Element;
    timeout?: number;
    className?: {
        notifyWrapper: string;
    };
    style?: React.CSSProperties;
}

const initialState: InitialState = {
    notifyId: null,
    timeout: 3000,
};

const notify = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        showNotify: (state: InitialState, { payload }: PayloadAction<InitialState>) => {
            console.log(merge(initialState, payload));
            state = merge(initialState, payload);
        },
    },
});

// Exporting reducer
export default notify.reducer;

// Exporting actions
export const { showNotify } = notify.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const notifySelector: Selector<RootState, InitialState> = (state: RootState) => state.notify;
