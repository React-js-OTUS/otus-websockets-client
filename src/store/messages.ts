import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { Message } from 'src/server.types';
import { RootState } from './index';

export const messagesSlice = createSlice<
  Message[],
  { set: CaseReducer<Message[], PayloadAction<Message[]>> },
  'messages'
>({
  name: 'messages',
  initialState: null,
  reducers: {
    set: (_, action: PayloadAction<Message[]>) => action.payload,
  },
});

export const messagesActions = messagesSlice.actions;

export const messagesSelectors = {
  get: (state: RootState): RootState['messages'] => state.messages,
};

export const messages = messagesSlice.reducer;
