import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import actions from './actions';
import api from './api';
import routes from '../../router/routes';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import { IContactAdminUpdate, IData } from '../interfaces';

const setData = actions.setData;
const setUserSelectionPopupOpen = actions.setUserSelectionPopupOpen;

const fetchUserData = (identifier: string) => (dispatch: Dispatch) => {
  dispatch(actions.initOperation());
  api
    .fetchUserData(identifier)
    .then((res: AxiosResponse) => dispatch(actions.endFetchData(res.data)))
    .catch((err: any) => dispatch(actions.errOperation(err)));
};

const updateUser = (identifier: string, data: any, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .updateUser(identifier, data)
    .then((res: AxiosResponse) => dispatch(actions.endUpdateUser()))
    .catch((err: any) => {
      dispatch(actions.errOperation(err));
      if (err.status === 423) {
        dispatch(globalPopupOperations.showMessagePopup(t('userProfile.unsubscribe.errorAdmin'), 'error'));
      }

      if (err.status === 417) {
        dispatch(globalPopupOperations.showMessagePopup(t('userProfile.unsubscribe.warningContactAdmin'), 'warning', () => dispatch(actions.setUserSelectionPopupOpen(true))));
      }
    });
};

const changePassword = (identifier: string, password: string) => (dispatch: Dispatch) => {
  dispatch(actions.initOperation());
  api
    .changePassword(identifier, password)
    .then((res: AxiosResponse) => dispatch(actions.endUpdateUser()))
    .catch((err: any) => dispatch(actions.errOperation(err)));
};

const unsubscribeUser = (identifier: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .unsubscribeUser(identifier)
    .then((res: AxiosResponse) => {
      dispatch(actions.endUpdateUser());
      dispatch(globalPopupOperations.showMessagePopup(t('userProfile.unsubscribe.success'), 'success', () => dispatch(push(routes.PATH_HOME))));
    })
    .catch((err: any) => {
      dispatch(actions.errOperation(err));
      if (err.status === 423) {
        dispatch(globalPopupOperations.showMessagePopup(t('userProfile.unsubscribe.errorAdmin'), 'error'));
      }

      if (err.status === 417) {
        dispatch(globalPopupOperations.showMessagePopup(t('userProfile.unsubscribe.warningContactAdmin'), 'warning', () => dispatch(actions.setUserSelectionPopupOpen(true))));
      }
    });
};

const updateContactAdmin = (params: IContactAdminUpdate, t: any, user: any, isUnsubscribing: boolean) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .updateContactAdmin(params)
    .then(() => {
      if (isUnsubscribing) {
        dispatch(unsubscribeUser(user.identifier, t));
      } else {
        dispatch(updateUser(user.identifier, user, t));
      }
    })
    .catch((err: any) => dispatch(actions.errOperation(err)));
};

export default { fetchUserData, updateUser, setData, changePassword, unsubscribeUser, setUserSelectionPopupOpen, updateContactAdmin };
