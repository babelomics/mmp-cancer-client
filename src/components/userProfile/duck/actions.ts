import { IData } from '../interfaces';
import types from './types';

const initOperation = () => ({ type: types.AC_INIT_OPERATION });
const errOperation = (error: any) => ({ type: types.AC_ERR_OPERATION, payload: error });
const endOperation = () => ({ type: types.AC_END_OPERATION });

const endFetchData = (data: any) => ({ type: types.AC_END_FETCH_DATA, payload: data });
const endUpdateUser = () => ({ type: types.AC_END_UPDATE_USER });

const setData = (data: IData) => ({
  type: types.AC_SET_DATA,
  payload: data
});

const setUserSelectionPopupOpen = (open: boolean) => ({
  type: types.AC_SET_USER_SELECTION_POPUP_OPEN,
  payload: open
});

export default {
  initOperation,
  errOperation,
  endOperation,
  endFetchData,
  endUpdateUser,
  setData,
  setUserSelectionPopupOpen
};
