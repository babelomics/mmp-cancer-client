import { AnyAction } from 'redux';
import IState from '../interfaces';
import types from './types';

export const initialState: IState = {
  loading: false,
  configData: {},
  validationPundrugs: false,
  validationGenomDict: false
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, config, validState } = action;

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
        configData: { ...state.configData, ...config }
      };
    case types.AC_LOAD_CONFIG_DATA:
      return {
        ...state,
        configData: config
      };
    case types.AC_SET_VALIDATION_PUNDRUG:
      return {
        ...state,
        validationPundrugs: validState
      };
    case types.AC_SET_VALIDATION_GENOM_DICT:
      return {
        ...state,
        validationGenomDict: validState
      };
    case types.AC_SET_RESET_VALIDATIONS:
      return {
        ...state,
        validationPundrugs: false,
        validationGenomDict: false
      };
    default:
      return state;
  }
};

export default reducer;
