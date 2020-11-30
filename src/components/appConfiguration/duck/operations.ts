import { Query } from 'material-table';
import { Dispatch } from 'redux';
import { IConfiguration } from '../interfaces';
import { AxiosResponse } from 'axios';

import { generalTableRemoteFetchOperation } from '../../../utils/tableRemoteFetchOperation';
import { ITableFilter } from '../../commons/GaiaTable';
import actions from './actions';
import api from './api';

// const fetchRegistrationRequests = (query: Query<any>, filters: ITableFilter) => (dispatch: Dispatch) => {
//  //return generalTableRemoteFetchOperation(api.fetchRegistrationRequests, query, filters, actions.initFetch, actions.errFetch, actions.endFetch)(dispatch);
// };
// export default { fetchRegistrationRequests };

const fetchConfigRequest = () => (dispatch: Dispatch) => {
  dispatch(actions.initFetch());
  api
    .fetchConfigRequest()
    .then((result) => {
      dispatch(actions.updateConfigData(result.data));
      dispatch(actions.endFetch());
    })
    .catch((err: any) => dispatch(actions.errFetch()));
};

const updateConfigData = actions.updateConfigData;

const setNewConfig = (newConfing: IConfiguration) => (dispatch: Dispatch) => {
  dispatch(actions.initFetch());
  api
    .setNewConfig(newConfing)
    .then((result) => {
      dispatch(actions.updateConfigData(result.data));
      dispatch(actions.endFetch());
    })
    .catch((err: any) => dispatch(actions.errFetch()));
};

const validatePanDrugs = (user: string, password: string, url: string) => (dispatch: Dispatch): Promise<any> => {
  //dispatch(actions.initFetch());
  return new Promise((resolve, reject) => {
    api
      .validatePanDrugsApi(user, password, url)
      .then((result: AxiosResponse) => {
        //dispatch(actions.endFetch());
        resolve({
          code: 200
        });
      })
      .catch((err: any) => {
        //dispatch(actions.endFetch());
        reject({
          code: err.status
        });
      });
  });
};

const createPanDrugsUser = (user: string, password: string, url: string, email: string) => (dispatch: Dispatch): Promise<any> => {
  return new Promise((resolve, reject) => {
    api
      .createPanDrugsUserApi(user, password, url, email)
      .then((result: AxiosResponse) => {
        resolve({
          code: 200
        });
      })
      .catch((err: any) => {
        reject({
          code: err.status
        });
      });
  });
};

const validateCellbaseUrl = (url: string, formikError?: any) => (dispatch: Dispatch): Promise<any> => {
  //dispatch(actions.initFetch());
  return new Promise((resolve, reject) => {
    api
      .validateCellbaseUrlApi(url)
      .then((result: AxiosResponse) => {
        resolve({
          code: 200
        });
      })
      .catch((err: any) => {
        reject({
          code: err.status
        });
      });
  });
};

export default { fetchConfigRequest, updateConfigData, setNewConfig, validateCellbaseUrl, validatePanDrugs, createPanDrugsUser };
