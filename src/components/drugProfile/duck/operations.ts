import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import actions from './actions';
import api from './api';
import routes from '../../router/routes';
import { operations as globalPopupOperations } from '../../globalPopups/duck';

const setData = actions.setData;

const fetchDrugData = (identifier: string) => (dispatch: Dispatch) => {
  dispatch(actions.initOperation());
  api
    .fetchDrugData(identifier)
    .then((res: AxiosResponse) => dispatch(actions.endFetchData(res.data)))
    .catch((err: any) => dispatch(actions.errOperation(err)));
};

const updateDrug = (data: any) => (dispatch: Dispatch) => {
  dispatch(actions.initOperation());
  return new Promise((resolve, reject) => {
  api
    .updateDrug(data)
    .then((res: AxiosResponse) => {
      dispatch(actions.endUpdateDrug());
      resolve({
        done: true
      });
    })
    .catch((err: any) => {
      dispatch(actions.errOperation(err));
      reject(err);
    });
  })
};

export default { fetchDrugData, updateDrug, setData };
