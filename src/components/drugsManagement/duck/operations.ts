import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import actions from './actions';
import api from './api';
import { operations as drugProfileOperations } from '../../drugProfile/duck';

const setData = drugProfileOperations.setData;

const changeAvailable = (drugs: string[], available: boolean, user: string, isAllSelected: boolean, filters: any) => (dispatch: Dispatch): Promise<any> => {
  dispatch(actions.initOperation());
  return new Promise((resolve, reject) => {
    api
      .changeAvailable(drugs, available, user, isAllSelected, filters)
      .then((res: AxiosResponse) => {
        dispatch(actions.endOperation())
        resolve({
          done: true
        });
      })
      .catch((err: any) => {
        dispatch(actions.errOperation(err))
        reject(err);
      });
  })
};

const manualDrugsUpdate = () => (dispatch: Dispatch): Promise<any> => {
  dispatch(actions.initOperation());
  return new Promise((resolve, reject) => {
    api
      .manualDrugsUpdate()
      .then((res: AxiosResponse) => {
        dispatch(actions.endOperation())
        resolve({
          done: true
        });
      })
      .catch((err: any) => {
        dispatch(actions.errOperation(err))
        reject(err);
      });
  })
};

export default { setData, changeAvailable, manualDrugsUpdate };
