import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import lodash from 'lodash';
import { RootState } from '../store';

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
            console.log(lodash.merge(initialState, payload));
            state = lodash.merge(initialState, payload);
        },
    },
});

// Exporting reducer
export default notify.reducer;

// Exporting actions
export const { showNotify } = notify.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const notifySelector: Selector<RootState, InitialState> = (state: RootState) => state.notify;
