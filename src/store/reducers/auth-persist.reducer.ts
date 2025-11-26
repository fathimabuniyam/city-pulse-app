import { createSlice } from '@reduxjs/toolkit';

export interface Props {}

const initialState: Props = {};

const authPersistSlice = createSlice({
  name: 'authPersist',
  initialState,
  reducers: {},
});

export const {} = authPersistSlice.actions;

export default authPersistSlice.reducer;
