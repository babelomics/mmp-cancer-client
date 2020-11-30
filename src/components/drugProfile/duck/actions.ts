import { IData } from '../interfaces';
import types from './types';

const initOperation = () => ({ type: types.AC_INIT_OPERATION });
const errOperation = (error: any) => ({ type: types.AC_ERR_OPERATION, payload: error });

const endFetchData = (data: any) => ({ type: types.AC_END_FETCH_DATA, payload: data });
const endUpdateDrug = () => ({ type: types.AC_END_UPDATE_DRUG });

const setData = (data: IData) => ({
  type: types.AC_SET_DATA,
  payload: data
});

export default {
  initOperation,
  errOperation,
  endFetchData,
  endUpdateDrug,
  setData
};
