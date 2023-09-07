import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { storage } from 'src/utils/storage';
import { projectFetch } from 'src/client/projectFetch';
import { Profile } from 'src/server.types';
import { message } from 'antd';
import i18n from 'i18next';
import { TOKEN_KEY, tokenActions, tokenSelectors } from '../../token';
import { profileActions } from '../../profile';
import { TokenChannel } from './TokenChannel';

const tokenChannel = new TokenChannel('token-saver-channel');

export function* setToken(): Generator {
  const token = (yield select(tokenSelectors.get)) as string;
  tokenChannel.setToken(token);
  if (token) {
    storage.set(TOKEN_KEY, token);
    try {
      const profile = (yield projectFetch('/profile', {
        headers: { 'Content-Type': 'application/json', authorization: token },
      })) as Profile;
      yield put(profileActions.set(profile));
    } catch (e) {
      if ('code' in e) {
        message.error(i18n.t(`errors.${e.code}`));
        if (e.code === 'ERR_TOKEN_REQUIRED_ERROR' || e.code === 'ERR_USER_NOT_REGISTER') {
          yield put(tokenActions.logout());
        }
      } else {
        message.error(e.message);
      }
    }
  }
}
export function* clearToken() {
  storage.remove(TOKEN_KEY);
  tokenChannel.setToken(null);
  yield put(profileActions.set(null));
}

export function* getToken() {
  const token = storage.get(TOKEN_KEY);
  yield put(tokenActions.set(token));
}

export function* tokenSaga() {
  yield takeEvery(tokenActions.logout().type, clearToken);
  yield takeLatest(tokenActions.set().type, setToken); // setToken отправляет запрос, потому лучше использовать takeLatest
}
