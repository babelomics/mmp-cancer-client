import { AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import { IIndividual } from '../../individualsManagement/interfaces';
import { IUserPermission } from '../../permissionsAndUsers/interfaces';
import routes from '../../router/routes';
import actions from './actions';
import api from './api';
import permissionsAndUsersApi from '../../permissionsAndUsers/duck/api';

const resetReduxIndividual = actions.resetReduxIndividual;

const addHPO = actions.addHpo;
const deleteHPO = actions.deleteHPO;
const addIcd10 = actions.addIcd10;
const deleteICD10 = actions.deleteICD10;
const updateHPO = actions.updateHPO;
const updateICD10 = actions.updateICD10;
const setPermissionsData = actions.setPermissionsData;
const setExcludedUsers = actions.setExcludedUsers;

const fetchIndividualData = (identifier: string, guid: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .fetchIndividualData(identifier, guid)
    .then((res: AxiosResponse) => dispatch(actions.endFetchData(res.data)))
    .catch(() => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('projectProfile.connectionError'), 'error'));
    });
};

const deleteIndividualData = (individualId: string, projectId: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .apiDeleteIndividualData(individualId, projectId)
    .then((result) => {
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.messages.deleteSuccess'), 'success', () => dispatch(push(`${routes.PATH_INDIVIDUALS_MANAGEMENT}/${projectId}`))));
      dispatch(actions.endOperation());
    })
    .catch((err: any) => {
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.messages.deleteIndividualsError'), 'error'));
      dispatch(actions.endOperation());
    });
};

const updateIndividual = (projectId: string, data: IIndividual, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .updateIndividual(projectId, data)
    .then((result) => {
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.messages.updateSuccess'), 'success', () => dispatch(push(`${routes.PATH_INDIVIDUALS_MANAGEMENT}/${projectId}`))));
      dispatch(actions.endOperation());
    })
    .catch((err: any) => {
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.messages.updateError'), 'error'));
      dispatch(actions.endOperation());
    });
};

const createIndividual = (projectId: string, data: IIndividual, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .createIndividual(projectId, data)
    .then((result) => {
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.messages.createSuccess'), 'success', () => dispatch(push(`${routes.PATH_INDIVIDUALS_MANAGEMENT}/${projectId}`))));
      dispatch(actions.endOperation());
    })
    .catch((err: any) => {
      dispatch(actions.endOperation());

      if (err.status === 422) {
        dispatch(globalPopupOperations.showMessagePopup(t('individuals.messages.errorEmptyIdentifier'), 'error'));
      }
      if (err.status === 409) {
        dispatch(globalPopupOperations.showMessagePopup(t('individuals.messages.errorIdentifier'), 'error'));
      } else {
        dispatch(globalPopupOperations.showMessagePopup(t('individuals.messages.createError'), 'error'));
      }
    });
};

const fetchIndividualPermissions = (individualId: string, projectId: string, userId: string, t: any) => (dispatch: any) => {
  dispatch(actions.initFetchPermissionsData());

  Promise.all([api.fetchIndividualPermissions(individualId, projectId, userId), permissionsAndUsersApi.fetchUserPermissions(projectId, userId)])
    .then((responses) => {
      const individualPermissions = responses[0]?.data;
      const otherPermissions = responses[1]?.data;

      if (individualPermissions && otherPermissions) {
        let mixed = { ...individualPermissions, permissions: [...individualPermissions.permissions, ...otherPermissions.permissions] };
        dispatch(actions.endFetchPermissionsData(mixed));
      }
    })
    .catch(() => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('projectProfile.connectionError'), 'error'));
    });
};

const addIndividualPermission = (data: IUserPermission, projectId: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .addIndividualPermission(data, projectId)
    .then((result) => {
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.permissionsDetails.createSuccess'), 'success'));
      dispatch(actions.endOperation());
      dispatch(actions.setExcludedUsers(data.userId));
      dispatch(actions.setPermissionsData(null));
    })
    .catch((err: any) => {
      dispatch(actions.endOperation());
      dispatch(actions.setPermissionsData(null));
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.permissionsDetails.createError'), 'error'));
    });
};

const updateIndividualPermissions = (data: IUserPermission, projectId: string, individualId: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .updateIndividualPermissions(data, projectId, individualId)
    .then((result) => {
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.permissionsDetails.updateSuccess'), 'success'));
      dispatch(actions.endOperation());
      dispatch(actions.setPermissionsData(null));
    })
    .catch((err: any) => {
      dispatch(actions.endOperation());
      dispatch(actions.setPermissionsData(null));
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.permissionsDetails.updateError'), 'error'));
    });
};

const deleteIndividualPermissions = (userId: string, projectId: string, individualId: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .deleteIndividualPermissions(userId, projectId, individualId)
    .then((result) => {
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.permissionsDetails.deleteSuccess'), 'success'));
      dispatch(actions.endOperation());
      dispatch(actions.setPermissionsData(null));
      dispatch(actions.removeExcludedUser(userId));
    })
    .catch((err: any) => {
      dispatch(actions.endOperation());
      dispatch(actions.setPermissionsData(null));
      dispatch(globalPopupOperations.showMessagePopup(t('individuals.permissionsDetails.deleteError'), 'error'));
    });
};

export default {
  fetchIndividualData,
  deleteIndividualData,
  updateIndividual,
  createIndividual,
  resetReduxIndividual,
  addHPO,
  deleteHPO,
  addIcd10,
  deleteICD10,
  updateHPO,
  updateICD10,
  addIndividualPermission,
  fetchIndividualPermissions,
  setPermissionsData,
  setExcludedUsers,
  updateIndividualPermissions,
  deleteIndividualPermissions
};
