import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { FormikErrors } from 'formik/dist/types';

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

const createRequest = (data: any, setFormikErrors: (errors: FormikErrors<IFormData>) => void, t?: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .createRequest(data)
    .then((res: AxiosResponse) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('registryRequest.messages.success'), 'success', () => dispatch(push(routes.PATH_LOGIN))));
    })
    .catch((err) => {
      dispatch(actions.errOperation());

      if (err.message.toLowerCase().includes('email')) {
        dispatch(globalPopupOperations.showMessagePopup(t('registryRequest.messages.errorEmail'), 'error'));
        setFormikErrors({ email: t('registryRequest.messages.errorEmail') });
      } else if (err.message.toLowerCase().includes('identifier')) {
        dispatch(globalPopupOperations.showMessagePopup(t('registryRequest.messages.errorIdentifier'), 'error'));
        setFormikErrors({ identifier: t('registryRequest.messages.errorIdentifier') });
      } else {
        dispatch(globalPopupOperations.showMessagePopup(t('commons.error.general'), 'error'));
      }
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
