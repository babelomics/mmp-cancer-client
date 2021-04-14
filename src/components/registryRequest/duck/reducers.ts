import { AnyAction } from 'redux';
import IState from '../interfaces';
import types from './types';

export const initialState: IState = {
  loading: false,
  data: {
    accessType: '',
    identifier: '',
    organization: '',
    firstName: '',
    lastName: '',
    email: '',
    accessRequestReason: '',
    userType: '',
    accessRefusalReason: '',
    attended: null
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
    case types.AC_ERR_OPERATION:
    case types.AC_END_OPERATION:
      return {
        ...state,
        loading: false
      };
    case types.AC_END_FETCH:
      return {
        ...state,
        loading: false,
        data: {
          ...payload,
          userType: 0,
          accessType: payload.accessType
        }
      };
    default:
      return state;
  }
};

export default reducer;
