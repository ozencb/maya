import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  authenticated: false,
  user: {},
};

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
  },
});

export const { setUser, setAuthenticated } = sessionReducer.actions;

export default sessionReducer.reducer;
