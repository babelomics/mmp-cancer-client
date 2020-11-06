import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import actions from './actions';
import api from './api';
import { IFormData } from '../interfaces';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import routes from '../../router/routes';

const fetchRequestData = (identifier: string) => (dispatch: Dispatch) => {
  dispatch(actions.initOperation());
  api
    .fetchRequestData(identifier)
    .then((res: AxiosResponse<IFormData>) => {
      dispatch(actions.endFetch(res.data));
    })
    .catch((err) => dispatch(actions.errOperation()));
};

const createRequest = (data: any, t?: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .createRequest(data)
    .then((res: AxiosResponse) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('registryRequest.messages.success'), 'success', () => dispatch(push(routes.PATH_LOGIN))));
    })
    .catch((err) => {
      dispatch(actions.errOperation());
      dispatch(globalPopupOperations.showMessagePopup(err, 'error'));
    });
};

const processRequest = (data: any, t?: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .processRequest(data)
    .then((res: AxiosResponse) => {
      dispatch(actions.endOperation());
      dispatch(
        globalPopupOperations.showMessagePopup(data.attended === 'approve' ? t('registrationManagement.messages.approveSuccess') : t('registrationManagement.messages.denySuccess'), 'success', () =>
          dispatch(push(routes.PATH_REGISTRATION_MANAGEMENT))
        )
      );
    })
    .catch((err) => dispatch(actions.errOperation()));
};

export default { fetchRequestData, createRequest, processRequest };
