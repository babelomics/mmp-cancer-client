import axios, { AxiosRequestConfig } from 'axios';
import { AnyAction } from 'redux';

import loginActions from '../components/login/duck/actions';
import globalPopupsActions from '../components/globalPopups/duck/actions';
import loginOperations from '../components/login/duck/operations';
import permissionsApi from '../components/permissionsAndUsers/duck/api';
import store from '../store';
import { API_ENDPOINT, API_USERS } from './constants';
import i18n from '../i18n';
import routes from '../components/router/routes';
import { push, goBack } from 'connected-react-router';

const API_USERS_ENDPOINT = `${API_ENDPOINT}${API_USERS}`;

const getToken = (): string | null | undefined => {
  return store.getState().login.localUser?.token ?? null;
};

axios.interceptors.request.use(async function (config: AxiosRequestConfig) {
  const userToken = getToken();
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  if (userToken) {
    config.headers['Authorization'] = `${userToken}`;
  }

  // Make request to get user permissions
  const shouldGetPermissions =
    (config.method === 'get' || config.method === 'GET') &&
    !config.url?.includes(`${API_USERS_ENDPOINT}/user/permissions`) &&
    !config.url?.includes('/configuration') &&
    store.getState().login.user.userType !== 'Admin';

  if (shouldGetPermissions) {
    permissionsApi.fetchUserGlobalPermissions().then((res: any) => {
      store.dispatch(loginOperations.setUserPermissions(res.data.permissionList));
    });
  }

  return config;
});

axios.interceptors.response.use(
  (response: any) => {
    const responseToken = response.headers['authorization'];

    if (responseToken) {
      store.dispatch<AnyAction>(loginActions.setToken(responseToken));
    }

    return response;
  },
  (error: any) => {
    const response = error.response?.data ?? undefined;
    const message = error.response ? (typeof error.response.data === 'string' ? error.response.data : `${error.response.data.status} ${error.response.data.error}`) : null;
    const token = getToken();
    let showCustomErr = true;

    if (response && parseInt(response.status) === 401 && token) {
      store.dispatch<AnyAction>(
        globalPopupsActions.showMessagePopup('Session expired', 'error', () => {
          localStorage.clear();
          store.dispatch<AnyAction>(loginActions.logout());
        })
      );
    }

    // Show Unauthorized error
    if (error.response?.status === 403) {
      showCustomErr = false;
      store.dispatch<AnyAction>(globalPopupsActions.showMessagePopup(i18n.t('commons.error.unauthorized'), 'error', () => store.dispatch<AnyAction>(goBack())));
    }

    return Promise.reject({ status: error.response?.status ?? 500, message: message, showCustomError: showCustomErr });
  }
);
