import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';
import { IConfirmDialogProps } from '../../components/ConfirmDialog/ConfirmDialog';
import { RootState } from '../store';

const initialState: IConfirmDialogProps = {
    active: false,
};

const confirmModalSlice = createSlice({
    name: 'confirmDialog',
    initialState,
    reducers: {
        openConfirmDialog: (state, { payload }: PayloadAction<IConfirmDialogProps>) => {
            state = {
                ...payload,
                active: true,
            };
        },
        closeConfirmDialog: (state) => {
            // state = {
            //     active: false,
            //     description: '',
            //     title: '',
            //     failureActionLabel: '',
            //     successActionLabel: '',
            //     onFailure: () => void 0,
            //     onSuccess: () => void 0,
            //     style: {},
            // };

            state.active = false;
            state.description = '';
            state.title = '';
            state.failureActionLabel = '';
            state.successActionLabel = '';
            state.onSuccess = () => void 0;
            state.onFailure = () => void 0;
        },
    },
});

// exporting reducer
export default confirmModalSlice.reducer;

// exporting actions
export const { openConfirmDialog, closeConfirmDialog } = confirmModalSlice.actions;

// exporting selector - useful when using it in components to select particular state from global store
export const confirmDialogSelector: Selector<RootState, IConfirmDialogProps> = (state: RootState) =>
    state.confirmDialogModal;
