import { RootState } from 'store/store';
import { PayloadAction, Selector, createSlice } from '@reduxjs/toolkit';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';

interface ICoreState {
    isLoading: boolean;
    isAuthenticated: boolean;
    isAuthorized: boolean;
    tenant: pointOfSaleTypes.authResponseTypes.IAuthorizeTenantResponse['data'];
}

const actualInitialState: ICoreState = {
    isLoading: true,
    isAuthenticated: false,
    isAuthorized: false,
    tenant: {
        _id: '',
        name: '',
        email: '',
        token: '',
        auth: null,
    },
};

const getInitialState = (): ICoreState => {
    try {
        const cachedAuthState = localStorage.getItem(CONFIG.REUDX_CORE_STATE) ?? null;
        if (cachedAuthState) {
            const hydratedAuthState: ICoreState = JSON.parse(cachedAuthState) ?? {};
            if (
                Object.keys(actualInitialState).length === Object.keys(actualInitialState).length &&
                hydratedAuthState?.tenant?._id &&
                hydratedAuthState?.tenant?.token
            ) {
                return hydratedAuthState;
            } else {
                throw 'Ivalid Localstore authState';
            }
        }
    } catch (error) {
        // invalid local storage auth state
        // safe clear local storage object
        localStorage.clear();
    }

    return actualInitialState;
};

const initialState: ICoreState = getInitialState();

const coreSlice = createSlice({
    name: 'core',
    initialState,
    reducers: {
        updateLoading: (state, { payload }: PayloadAction<ICoreState['isLoading']>) => {
            state.isLoading = payload;
        },
        updateTenant: (state, { payload }: PayloadAction<ICoreState['tenant']>) => {
            state.tenant = payload;
            state.isAuthorized = true;
            if (payload?.auth?._id) state.isAuthenticated = true;
            else state.isAuthenticated = false;
            state.isLoading = false;
            localStorage.setItem(CONFIG.REUDX_CORE_STATE, JSON.stringify(state));
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.tenant.auth = null;
            localStorage.setItem(CONFIG.REUDX_CORE_STATE, JSON.stringify(state));
            // refresh token to cut down the auth payload from token (hence token will only contain authorizatin details) // that should be done on logout component itself
        },
    },
});

// Exporting reducer
export default coreSlice.reducer;

// Exporting actions
export const { updateLoading, updateTenant, logoutUser } = coreSlice.actions;

// Exporting selector - useful when using it in components to select particular state from global store
export const coreSelector: Selector<RootState, ICoreState> = (state: RootState) => state.core;
