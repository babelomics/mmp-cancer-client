import { AnyAction } from 'redux';
import IState from '../interfaces';
import types from './types';
import { loadFromStorageLaunch } from '../../../utils/storage';

const localLaunch = loadFromStorageLaunch();

export const initialState: IState = {
  loading: false,
  data: {
    configured: localLaunch ?? true,
    text: ''
  }
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_FETCH:
      return {
        ...state,
        loading: true
      };
    case types.AC_ERR_FETCH:
      let configured = true;
      if (payload === 404) {
        configured = false;
      }
      return {
        ...state,
        loading: false,
        data:{
          ...state.data,
          configured: configured
        }
      };
    case types.AC_END_FETCH:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          text: payload.setupInformation,
          configured: true
        }
      };
    default:
      return state;
  }
};

export default reducer;
