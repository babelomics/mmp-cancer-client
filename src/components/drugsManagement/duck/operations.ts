import { Dispatch } from 'redux';
import { Query } from 'material-table';
import { AxiosResponse } from 'axios';

import actions from './actions';
import api from './api';
import { generalTableRemoteFetchOperation } from '../../../utils/tableRemoteFetchOperation';
import { ITableFilter } from '../../commons/GaiaTable';
import { operations as drugProfileOperations } from '../../drugProfile/duck';

const setData = drugProfileOperations.setData;

const fetchDrugs = (query: Query<any>, filters: ITableFilter, previousData: any) => (dispatch: Dispatch) => {
  return generalTableRemoteFetchOperation(api.fetchDrugs, query, filters, previousData, actions.initFetch, actions.errFetch, actions.endFetch)(dispatch);
};

const changeAvailable = (drugs: string[], available: boolean, user: string) => (dispatch: Dispatch): Promise<any> => {
  dispatch(actions.initOperation());
  return new Promise((resolve, reject) => {
    api
      .changeAvailable(drugs, available, user)
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

export default { fetchDrugs, setData, changeAvailable, manualDrugsUpdate };
