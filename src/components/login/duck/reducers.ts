import types from './types';
import { AnyAction } from 'redux';
import { loadFromStorageConfigData, loadFromStorageUser } from '../../../utils/storage';
import IState, { ITokenData } from '../interfaces';
import { decodeJwt } from '../../../utils/utils';
import { IPermission } from '../../permissionsAndUsers/permissions';

const localUserData = loadFromStorageUser();
const localConfigData = loadFromStorageConfigData();

const loadDecodedData = (token: string | null): ITokenData | null => {
  if (token) {
    const decodedToken = decodeJwt<ITokenData>(token);
    return { ...decodedToken, isAdmin: decodedToken.userType === 'Admin', permissions: [] };
  }
  return null;
};

export const initialState: IState = {
  loading: false,
  localUser: localUserData,
  user: loadDecodedData(localUserData?.token ?? null),
  isAuthenticated: localUserData ? true : false,
  error: null,
  configData: {
    configured: localConfigData ?? true,
    text: '',
    email: ''
  }
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_OPERATION:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_OPERATION:
      return {
        ...state,
        loading: false
      };
    case types.AC_END_LOGIN:
      return {
        ...state,
        loading: false,
        localUser: { ...payload, token: `Bearer ${payload.token}` },
        user: { ...loadDecodedData(payload.token), permissions: [] },
        isAuthenticated: true,
        error: null
      };
    case types.AC_ERR_LOGIN:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case types.SET_USER_DATA:
      return {
        ...state,
        localUser: payload,
        isAuthenticated: payload.username !== null && payload.token !== null
      };
    case types.SET_TOKEN:
      return {
        ...state,
        localUser: { ...state.localUser, token: `Bearer ${payload}` }
      };
    case types.LOGOUT:
      return {
        ...state,
        localUser: null,
        user: null,
        isAuthenticated: false
      };
    case types.SET_USER_PERMISSIONS:
      const stringArr = payload.map((p: IPermission) => `${p.action}-${p.entityType}-${p.entityId ?? 'undefined'}`);
      return {
        ...state,
        user: {
          ...state.user,
          permissions: state.user?.permissions?.concat(stringArr.filter((x: string) => !state.user?.permissions?.includes(x))?.filter((x: any) => x) ?? [])
        }
      };

    // Config Data
    case types.AC_END_FETCH_CONFIG_DATA:
      return {
        ...state,
        configData: {
          ...state.configData,
          text: payload.setupInformation,
          email: payload.contactEmail,
          configured: true
        }
      };
    case types.AC_ERR_FETCH_CONFIG_DATA:
      let configured = true;
      if (payload === 404) {
        configured = false;
      }
      return {
        ...state,
        configData: {
          ...state.configData,
          configured: configured
        }
      };
    default:
      return state;
  }
};

export default reducer;
