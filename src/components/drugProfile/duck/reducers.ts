import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';
import { doDateFormat } from '../../../utils/utils';

export const initialState: IState = {
  loading: false,
  error: null,
  success: false,
  data: {
    modifications: []
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
      return {
        ...state,
        loading: false,
        error: payload
      };
    case types.AC_END_FETCH_DATA:
      let result = [...payload];
      result.forEach((key: any, index: number) => {
        key.creationDate = doDateFormat(result[index].creationDate);
        if (key.deletionDate) {
          key.deletionDate = doDateFormat(result[index].deletionDate);
        }
        if (key.cost) {
          key.cost = key.cost.toFixed(2).replace(',', '.', 'g');
        } else {
          key.cost = '';
        }
      });
      return {
        ...state,
        loading: false,
        data: {
          modifications: result
        }
      };
    case types.AC_END_UPDATE_DRUG:
      return {
        ...state,
        loading: false
      };
    case types.AC_SET_DATA:
      return {
        ...state,
        data: {
          ...payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
