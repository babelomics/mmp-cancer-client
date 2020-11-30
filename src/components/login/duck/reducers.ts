import types from './types';
import { AnyAction } from 'redux';
import { loadFromStorageUser } from '../../../utils/storage';
import IState, { ITokenData } from '../interfaces';
import { decodeJwt } from '../../../utils/utils';

const localUserData = loadFromStorageUser();

const loadDecodedData = (token: string | null): ITokenData | null => {
  if (token) {
    const decodedToken = decodeJwt<ITokenData>(token);
    return { ...decodedToken, isAdmin: decodedToken.userType === 'Admin' };
  }
  return null;
};

export const initialState: IState = {
  loading: false,
  localUser: localUserData,
  user: loadDecodedData(localUserData?.token ?? null),
  isAuthenticated: localUserData ? true : false,
  error: null
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_LOGIN:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_LOGIN:
      return {
        ...state,
        loading: false,
        localUser: { ...payload, token: `Bearer ${payload.token}` },
        user: loadDecodedData(payload.token),
        isAuthenticated: true
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
    default:
      return state;
  }
};

export default reducer;
