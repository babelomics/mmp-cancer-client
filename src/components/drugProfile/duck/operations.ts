import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import actions from './actions';
import api from './api';
import { operations as globalPopupOperations } from '../../globalPopups/duck';

const setData = actions.setData;

const fetchDrugData = (identifier: string) => (dispatch: Dispatch) => {
  dispatch(actions.initOperation());
  api
    .fetchDrugData(identifier)
    .then((res: AxiosResponse) => dispatch(actions.endFetchData(res.data)))
    .catch((err: any) => dispatch(actions.errOperation(err)));
};

const updateDrug = (data: any, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  return new Promise((resolve, reject) => {
    api
      .updateDrug(data)
      .then((res: AxiosResponse) => {
        dispatch(actions.endUpdateDrug());
        dispatch(globalPopupOperations.showMessagePopup(t('drugsManagement.successUpdateDrugs'), 'success'));
        resolve({
          done: true
        });
      })
      .catch((err: any) => {
        dispatch(actions.errOperation(err));
        reject(err);
      });
  });
};

export default { fetchDrugData, updateDrug, setData };
