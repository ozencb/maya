import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import inMemoryJWTManager from '../../helpers/jwt';
import { AuthServices } from '../../services';

const INITIAL_STATE = {
  authenticated: false,
  loading: false,
  user: {},
  error: false,
  errorMessage: null,
};

const logOut = createAsyncThunk('logOut', async () => {
  await AuthServices.logOut();
  inMemoryJWTManager.eraseToken();
});

export const sessionReducer = createSlice({
  name: 'session',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<any>) => {
      state.authenticated = action.payload;
    },
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    setAuthError: (state) => {
      inMemoryJWTManager.eraseToken();
      state.authenticated = false;
      state.loading = false;
    },
  },
  extraReducers: {
    [logOut.fulfilled.type]: (state) => {
      state.authenticated = false;
      state.loading = false;
    },
  },
});

export const {
  setUser,
  setAuthenticated,
  showLoading,
  hideLoading,
  setAuthError,
} = sessionReducer.actions;
export { logOut };

export default sessionReducer.reducer;
