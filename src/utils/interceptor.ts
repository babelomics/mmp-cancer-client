import axios from 'axios';
import { AnyAction } from 'redux';
import loginActions from '../components/login/duck/actions';
import globalPopupsActions from '../components/globalPopups/duck/actions';
import store from '../store';

const getToken = (): string | null | undefined => {
  return store.getState().login.localUser?.token ?? null;
};

axios.interceptors.request.use(async function (config) {
  const userToken = getToken();
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  if (userToken) {
    config.headers['Authorization'] = `${userToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => {
    const responseToken = response.config.headers['Authorization'];
    if (responseToken) {
      store.dispatch<AnyAction>(loginActions.setToken(responseToken));
    }

    return response;
  },
  (error) => {
    const response = error.response ? error.response.data : undefined;
    const message = typeof error.response.data === 'string' ? error.response.data : `${error.response.data.status} ${error.response.data.error}`;

    if (response && parseInt(response.status) === 401) {
      store.dispatch<AnyAction>(
        globalPopupsActions.showMessagePopup('Session expired', 'error', () => {
          localStorage.clear();
          store.dispatch<AnyAction>(loginActions.logout());
        })
      );
    }

    return Promise.reject(message);
  }
);
