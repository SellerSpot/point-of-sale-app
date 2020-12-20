import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { CONFIG } from 'config/config';
import * as reducers from './models';

export const store = configureStore({
    reducer: combineReducers({ ...reducers }),
    devTools: CONFIG.ENV === 'development' ? true : false,
    middleware: getDefaultMiddleware({
        serializableCheck: false, // try to avoid using non-serialized value in store (only use if it is really needed)
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): ReturnType<typeof useDispatch> => useDispatch<AppDispatch>();
