import { push } from 'connected-react-router';

import actions from './actions';
import api from './api';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import { IProject } from '../../projectsManagement/interfaces';
import routes from '../../router/routes';
import { ITokenData } from '../../login/interfaces';

const showMessagePopup = globalPopupOperations.showMessagePopup;

const fetchProjectData = (identifier: string, user: ITokenData, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());

  api
    .fetchProjectData(identifier)
    .then((res) => {
      dispatch(actions.endFetchData(res.data));
    })
    .catch((err: any) => {
      dispatch(actions.endOperation());
      if (err.showCustomError) {
        dispatch(globalPopupOperations.showMessagePopup(t('projectProfile.connectionError'), 'error'));
      }
    });
};

const updateProjectData = (identifier: string, values: IProject, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .updateProjectData(identifier, values)
    .then(() => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('projectProfile.modifyProjectSuccess'), 'success', () => dispatch(push(routes.PATH_PROJECTS_MANAGEMENT))));
    })
    .catch((error: any) => {
      dispatch(actions.endOperation());
      if (error.showCustomError) {
        dispatch(globalPopupOperations.showMessagePopup(t('projectProfile.errorModifyProject'), 'error'));
      }
    });
};

const deleteProjectData = (identifier: string, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .deleteProjectData(identifier)
    .then(() => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('projectProfile.deleteSuccess'), 'success', () => dispatch(push(routes.PATH_PROJECTS_MANAGEMENT))));
    })
    .catch((err: any) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('projectProfile.deleteError'), 'error'));
    });
};

const createProject = (values: IProject, t: any) => (dispatch: any) => {
  dispatch(actions.initOperation());
  api
    .createProject(values)
    .then((response) => {
      dispatch(actions.endOperation());
      dispatch(globalPopupOperations.showMessagePopup(t('projectProfile.createProject'), 'success', () => dispatch(push(`${routes.PATH_PROJECT_PROFILE}/${response.data.projectId}`))));
    })
    .catch((err: any) => {
      dispatch(actions.endOperation());

      if (err.status === 409) {
        dispatch(globalPopupOperations.showMessagePopup(t('panelProfileSet.messages.errorIdentifierOrName'), 'error'));
      } else {
        dispatch(globalPopupOperations.showMessagePopup(t('projectProfile.errorCreateProject'), 'error'));
      }
    });
};

const resetReduxProject = actions.resetReduxProject;
const setMode = actions.setMode;

export default { fetchProjectData, updateProjectData, resetReduxProject, deleteProjectData, setMode, createProject, showMessagePopup };
