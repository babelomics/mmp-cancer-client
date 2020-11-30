import userEvent from '@testing-library/user-event';
import { result } from 'lodash';
import { AnyAction } from 'redux';
import { number } from 'yup';
import IState from '../interfaces';
import types from './types';

export const initialState: IState = {
  loading: false,
  configData: {},
  validationDirGenCodeURL: 200
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, result, config } = action;

  switch (type) {
    case types.AC_INIT_FETCH:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_FETCH:
      return {
        ...state,
        loading: false
      };
    case types.AC_UPDATE_CONFIG_DATA:
      return {
        ...state,
        configData: config
      };
    default:
      return state;
  }
};

export default reducer;
