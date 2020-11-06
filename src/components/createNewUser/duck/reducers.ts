import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  loading: false,
  error: null,
  success: null
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_CREATE:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.AC_END_CREATE:
      return {
        ...state,
        loading: false,
        error: null,
        success: true
      };
    case types.AC_ERR_CREATE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case types.AC_RESET_POPUPS:
      return {
        ...state,
        error: null,
        success: null
      };
    default:
      return state;
  }
};

export default reducer;
