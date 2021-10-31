import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import sessionReducer from './reducers/session';

const rootReducer = combineReducers({
  sessionReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
