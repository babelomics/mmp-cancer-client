import { AxiosResponse } from 'axios';
import { push } from 'connected-react-router';

import actions from './actions';
import api from './api';
import routes from '../../router/routes';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import { operations as loginOperations } from '../../login/duck';
import { IContactAdminUpdate } from '../interfaces';

const setData = actions.setData;
const setUserSelectionPopupOpen = actions.setUserSelectionPopupOpen;

const fetchUserData = (identifier: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .fetchUserData(identifier)
    .then((res: AxiosResponse) => dispatch(actions.endFetchData(res.data)))
    .catch((err: any) => {
      dispatch(actions.errOperation(err));
      dispatch(globalPopupOperations.showMessagePopup(t('userProfile.connectionError'), 'error'));
    });
};

const updateUser = (identifier: string, data: any, t: any, currentUser?: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  return new Promise((resolve) => {
    api
      .updateUser(identifier, data)
      .then((res: AxiosResponse) => {
        dispatch(actions.endUpdateUser());

        if (currentUser) {
          if (currentUser.sub === identifier && currentUser.userType !== data.userType) {
            dispatch(
              globalPopupOperations.showMessagePopup(t('userProfile.updateUser.ownSuccess'), 'success', () => {
                dispatch(loginOperations.logout());
                dispatch(push(routes.PATH_LOGIN));
              })
            );
          } else {
            dispatch(globalPopupOperations.showMessagePopup(t('userProfile.updateUser.success'), 'success'));
          }
        } else {
          dispatch(globalPopupOperations.showMessagePopup(t('userProfile.updateUser.success'), 'success'));
        }

        resolve({
          done: true
        });
      })
      .catch((err: any) => {
        dispatch(actions.errOperation(err));
        if (err.status === 423) {
          dispatch(globalPopupOperations.showMessagePopup(t('userProfile.unsubscribe.errorAdmin'), 'error'));
        }

        if (err.status === 417) {
          dispatch(globalPopupOperations.showMessagePopup(t('userProfile.unsubscribe.warningContactAdminUpdate'), 'warningConfirm', () => dispatch(actions.setUserSelectionPopupOpen(true))));
        }

        if (err.status === 409) {
          dispatch(globalPopupOperations.showMessagePopup(t('registryRequest.messages.errorEmail'), 'error'));
        } else {
          dispatch(globalPopupOperations.showMessagePopup(t('userProfile.connectionError'), 'error'));
        }
      });
  });
};

const changePassword = (identifier: string, password: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .changePassword(identifier, password)
    .then((res: AxiosResponse) => {
      dispatch(actions.endOperation());
      dispatch(actions.endFetchData(res.data));
      dispatch(globalPopupOperations.showMessagePopup(t('userProfile.successPassword'), 'success'));
    })
    .catch((err: any) => {
      dispatch(actions.errOperation(err));
      if (err.status === 422) {
        dispatch(globalPopupOperations.showMessagePopup(t('userProfile.errorPassword'), 'error'));
      }
      if (err.status === 404) {
        dispatch(globalPopupOperations.showMessagePopup(t('userProfile.errorPassword'), 'error'));
      }
    });
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
        dispatch(globalPopupOperations.showMessagePopup(t('userProfile.unsubscribe.warningContactAdmin'), 'warningConfirm', () => dispatch(actions.setUserSelectionPopupOpen(true))));
      }
      if (err.status === 409) {
        dispatch(globalPopupOperations.showMessagePopup(t('userProfile.unsubscribe.errorConflict'), 'error'));
      } else {
        dispatch(globalPopupOperations.showMessagePopup(t('userProfile.connectionError'), 'error'));
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
