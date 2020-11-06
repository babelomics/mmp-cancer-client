import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  loading: false
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type } = action;

  switch (type) {
    case types.AC_INIT_FETCH:
      return {
        ...state,
        loading: true
      };
    case types.AC_ERR_FETCH:
      return {
        ...state,
        loading: false
      };
    case types.AC_END_FETCH:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
