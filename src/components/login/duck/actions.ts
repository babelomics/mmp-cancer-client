import types from './types';
import { IUserData } from '../../../utils/storage';
import { IConfigData } from '../interfaces';
import { IPermission } from '../../permissionsAndUsers/permissions';

const initOperation = () => ({ type: types.AC_INIT_OPERATION });
const endOperation = () => ({ type: types.AC_END_OPERATION });
const endLogin = (response: IUserData) => ({ type: types.AC_END_LOGIN, payload: response });
const errLogin = (err: null | string) => ({ type: types.AC_ERR_LOGIN, payload: err });
const setUserData = (user: IUserData) => ({ type: types.SET_USER_DATA, payload: user });
const setToken = (token: string) => ({ type: types.SET_TOKEN, payload: token });
const logout = () => ({ type: types.LOGOUT });
const setUserPermissions = (permissions: IPermission[]) => ({ type: types.SET_USER_PERMISSIONS, payload: permissions });

// Config Data
const endFetchConfigData = (data: IConfigData) => ({ type: types.AC_END_FETCH_CONFIG_DATA, payload: data });
const errFetchConfigData = (error: any) => ({ type: types.AC_END_FETCH_CONFIG_DATA, payload: error });
const updateConfigData = (isConfigured: Boolean) => ({ type: types.AC_UPDATE_CONFIG_DATA, payload: isConfigured });

export default { initOperation, endOperation, endLogin, errLogin, setUserData, setToken, logout, endFetchConfigData, errFetchConfigData, updateConfigData, setUserPermissions };
