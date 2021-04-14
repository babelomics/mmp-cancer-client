import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { FormikErrors } from 'formik';

import actions from './actions';
import api from './api';
import { IAuthData, ILoginForm, ISignUpForm } from '../interfaces';
import { operations as globalPopupOperations } from '../../globalPopups/duck';

const setUserData = actions.setUserData;
const setToken = actions.setToken;
const errLogin = actions.errLogin;
const setUserPermissions = actions.setUserPermissions;

// Config data
const updateConfigData = actions.updateConfigData;

// Login
const doLogin = (data: ILoginForm) => (dispatch: Dispatch) => {
  localStorage.clear();
  dispatch(actions.initOperation());
  api
    .auth(data.username, data.password)
    .then((res: AxiosResponse<IAuthData>) => {
      dispatch(
        actions.endLogin({
          username: data.username,
          token: res.data.token
        })
      );
    })
    .catch((err) => dispatch(actions.errLogin(err)));
};

const logout = () => (dispatch: Dispatch) => {
  localStorage.clear();
  dispatch(actions.logout());
};

const fetchConfigData = () => (dispatch: Dispatch) => {
  api
    .fetchConfigData()
    .then((result) => dispatch(actions.endFetchConfigData(result.data)))
    .catch((err: any) => {
      dispatch(actions.errFetchConfigData(err.status));
    });
};

// SignUp
const createRequest = (data: any, setFormikErrors: (errors: FormikErrors<ISignUpForm>) => void, t?: any, onSuccess?: () => void) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .createRequest(data)
    .then((res: AxiosResponse) => {
      dispatch(actions.endOperation());
      dispatch(
        globalPopupOperations.showMessagePopup(t('signUp.messages.success'), 'success', () => {
          if (onSuccess) {
            onSuccess();
          }
        })
      );
    })
    .catch((err) => {
      dispatch(actions.endOperation());
      if (err.message.toLowerCase().includes('email')) {
        dispatch(globalPopupOperations.showMessagePopup(t('signUp.messages.errorEmail'), 'error'));
        setFormikErrors({ email: t('signUp.messages.errorEmail') });
      } else if (err.message.toLowerCase().includes('identifier')) {
        dispatch(globalPopupOperations.showMessagePopup(t('signUp.messages.errorIdentifier'), 'error'));
        setFormikErrors({ identifier: t('signUp.messages.errorIdentifier') });
      } else {
        dispatch(globalPopupOperations.showMessagePopup(t('commons.error.general'), 'error'));
      }
    });
};

export default { doLogin, setUserData, setToken, errLogin, logout, fetchConfigData, updateConfigData, setUserPermissions, createRequest };
