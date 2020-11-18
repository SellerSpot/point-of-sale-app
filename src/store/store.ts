import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { environment } from '../config/config';
import * as reducers from './models';

export const store = configureStore({
    reducer: combineReducers({ ...reducers }),
    devTools: environment === 'development' ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): ReturnType<typeof useDispatch> => useDispatch<AppDispatch>();
