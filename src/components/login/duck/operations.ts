import { Dispatch } from 'redux';
import actions from './actions';
import api from './api';
import { IAuthData, ILoginForm } from '../interfaces';
import { AxiosResponse } from 'axios';

const setUserData = actions.setUserData;
const setToken = actions.setToken;

const doLogin = (data: ILoginForm) => (dispatch: Dispatch) => {
  dispatch(actions.initLogin());
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

export default { doLogin, setUserData, setToken, logout };
