import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { User } from 'src/server.types';
import { RootState } from './index';

export const usersSlice = createSlice<User[], { set: CaseReducer<User[], PayloadAction<User[]>> }, 'users'>({
  name: 'users',
  initialState: null,
  reducers: {
    set: (_, action: PayloadAction<User[]>) => action.payload,
  },
});

export const usersActions = usersSlice.actions;

export const usersSelectors = {
  get: (state: RootState): RootState['users'] => state.users,
};

export const users = usersSlice.reducer;
