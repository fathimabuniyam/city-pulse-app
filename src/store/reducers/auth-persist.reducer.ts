import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Props {
  token: string | null;
}

const initialState: Props = {
  token: null,
};

const authPersistSlice = createSlice({
  name: 'authPersist',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearAuth } = authPersistSlice.actions;

export const selectToken = (state: { authPersist: Props }) =>
  state.authPersist.token;
export const selectIsLoggedIn = (state: { authPersist: Props }) =>
  Boolean(state.authPersist.token);

export default authPersistSlice.reducer;
