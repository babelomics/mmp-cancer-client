import types from './types';
import { IUserData } from '../../../utils/storage';

const initLogin = () => ({ type: types.AC_INIT_LOGIN });
const endLogin = (response: IUserData) => ({ type: types.AC_END_LOGIN, payload: response });
const errLogin = (err: null | string) => ({ type: types.AC_ERR_LOGIN, payload: err });
const setUserData = (user: IUserData) => ({ type: types.SET_USER_DATA, payload: user });
const setToken = (token: string) => ({ type: types.SET_TOKEN, payload: token });
const logout = () => ({ type: types.LOGOUT });

export default { initLogin, endLogin, errLogin, setUserData, setToken, logout };
