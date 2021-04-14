import actions from './actions';
import api from './api';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import { IGroup, IUserPermission } from '../interfaces';
import { AxiosResponse } from 'axios';
import { operations as projectDataOperation } from '../../projectProfile/duck';

const setGroupData = actions.setGroupData;
const setUserPermissionData = actions.setUserPermissionData;
const showMessagePopup = globalPopupOperations.showMessagePopup;
const fetchProjectData = projectDataOperation.fetchProjectData;
const setExcludedUsers = actions.setExcludedUsers;

const addNewGroup = (data: IGroup, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .addNewGroup(data)
    .then((res: AxiosResponse) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.createGroupSuccess'), 'success'));
    })
    .catch((err) => {
      dispatch(actions.endOperation());
      if (err.status === 409) {
        dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.createGroupConflict'), 'error'));
      } else {
        dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.createGroupError'), 'error'));
      }
    });
};

const fetchGroupDetails = (guid: string) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .fetchGroupDetails(guid)
    .then((res: AxiosResponse) => {
      dispatch(actions.endFetchGroupData(res.data));
    })
    .catch(() => {
      dispatch(actions.endOperation());
    });
};

const updateGroup = (data: IGroup, guid: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .updateGroup(guid, data)
    .then((res: AxiosResponse) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.updateGroupSuccess'), 'success'));
    })
    .catch(() => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.updateGroupError'), 'error'));
    });
};

const deleteGroups = (guid: string, option: any, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .deleteGroups(guid, option)
    .then(() => {
      dispatch(actions.endOperation());
      dispatch(actions.deleteGroupsOptions(guid));
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.delete.deleteSuccess'), 'success'));
    })
    .catch((err: any) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.delete.deleteError'), 'error'));
    });
};

const deleteUserGroup = (identifier: string, userId: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .deleteUserGroup(identifier, userId)
    .then(() => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.delete.deleteSuccessAssociated'), 'success'));
    })
    .catch((err: any) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.delete.deleteErrorAssociated'), 'error'));
    });
};

const addNewUserPermission = (projectId: string, userId: string, data: IUserPermission, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .addNewUserPermission(projectId, userId, data)
    .then((res: AxiosResponse) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.createUserPermissionSuccess'), 'success'));
    })
    .catch((err) => {
      dispatch(actions.endOperation());
      if (err.status === 409) {
        dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.createUserPermissionConflict'), 'error'));
      } else {
        dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.createUserPermissionError'), 'error'));
      }
    });
};

const fetchUserPermissions = (projectId: string, userId: string) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .fetchUserPermissions(projectId, userId)
    .then((res: AxiosResponse) => {
      dispatch(actions.endFetchUserPermissionData(res.data));
    })
    .catch(() => {
      dispatch(actions.endOperation());
    });
};

const updateUsersPermissions = (projectId: string, userId: string, data: IUserPermission, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .updateUsersPermissions(projectId, userId, data)
    .then((res: AxiosResponse) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.updateUserPermissionSuccess'), 'success'));
    })
    .catch(() => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('permissionsAndUsers.messages.updateUserPermissionError'), 'error'));
    });
};

export default {
  addNewGroup,
  updateGroup,
  deleteGroups,
  deleteUserGroup,
  fetchGroupDetails,
  setGroupData,
  addNewUserPermission,
  fetchUserPermissions,
  setUserPermissionData,
  updateUsersPermissions,
  showMessagePopup,
  fetchProjectData,
  setExcludedUsers
};
