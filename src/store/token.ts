import { createSlice } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { storage } from 'src/utils/storage';
import { RootState } from './index';

export const TOKEN_KEY = 'token';

export const tokenSlice = createSlice<
  string,
  { set: CaseReducer<string, PayloadAction<string>>; logout: CaseReducer<string> },
  'token'
>({
  name: 'token',
  initialState: storage.get(TOKEN_KEY),
  reducers: {
    set: (_, action) => action.payload,
    logout: () => null,
  },
});

export const tokenActions = tokenSlice.actions;
export const { reducer: token } = tokenSlice;

export const tokenSelectors = {
  get: (state: RootState): RootState['token'] => state.token,
};
