import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface INotifyState {
    notifyId: string | number;
    content: JSX.Element;
    timeOut: number;
    styles?: React.CSSProperties;
}

const initialState: INotifyState = {
    notifyId: null,
    content: null,
    timeOut: 3000,
    styles: null,
};

const notify = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        showNotify: (
            state,
            {
                payload,
            }: PayloadAction<
                Pick<INotifyState, 'content'> & { timeOut?: number; styles?: React.CSSProperties }
            >,
        ) => {
            state.content = payload.content;
            state.notifyId = Math.random();
            state.timeOut = payload.timeOut ?? state.timeOut;
            state.styles = payload.styles ?? state.styles;
        },
    },
});

// exporting reducer
export default notify.reducer;

// exporting actions
export const { showNotify } = notify.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const notifySelector: Selector<RootState, INotifyState> = (state: RootState) => state.notify;
