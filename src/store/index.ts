import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { users } from 'src/store/users';
import { messages } from 'src/store/messages';
import { token } from './token';
import { initialized } from './initialized';
import { profile } from './profile';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    users,
    messages,
    initialized,
    token,
    profile,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
