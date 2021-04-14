import { push } from 'connected-react-router';
import actions from './actions';
import api from './api';
import { operations as globalPopupOperations } from '../../globalPopups/duck';

import { IPanelSetData } from '../interfaces';
import routes from '../../router/routes';

const updateFormValue = actions.updateFormValue;

const resetRedux = actions.resetRedux;
const showMessage = globalPopupOperations.showMessagePopup;

const createPanelSetData = (dataPanel: IPanelSetData, t: any) => (dispatch: any) => {
  dispatch(actions.initCreate());
  return new Promise((resolve, reject) => {
    api
      .apiCreatePanelSetData(dataPanel)
      .then((result: any) => {
        resolve({ done: true });
        dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.success'), 'success', () => dispatch(actions.endCreate())));
      })
      .catch((err: any) => {
        reject(err);
        if (err.status === 409) {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.errorConflict'), 'error', () => dispatch(actions.endCreate())));
        }
      });
  });
};

const apiSendPanelSetData = (data: any, t: any) => (dispatch: any) => {
  dispatch(actions.initsend());
  api
    .apiSendPanelSetData(data)
    .then((res: any) => {
      dispatch(actions.endsend());
      dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importCorrect'), 'info'));
    })
    .catch((err: any) => {
      dispatch(actions.endsend());
      dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importPopupError'), 'error'));
    });
};

const uploadFile = (formData: FormData, t: any, showCustomConflictCodes: boolean) => (dispatch: any) => {
  dispatch(actions.initCreate());
  return new Promise((resolve, reject) => {
    api
      .uploadFile(formData)
      .then((res: any) => {
        const catchImport = res.data.split('[')[1].split(']')[0];

        dispatch(actions.endCreate());
        dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importPopupSuccess'), 'success', () => dispatch(push(`${routes.PATH_PANEL_SET_PROFILE}/${catchImport.trim()}`))));
        resolve(null);
      })
      .catch((err: any) => {
        dispatch(actions.endCreate());

        const customError = err?.message?.split('CUSTOM_ERROR_CODE:')[1]?.trim();

        if (customError === '422_INVALID_REFERENCES') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_InvalidRef'), 'error'));
        }

        if (customError === '400_EMPTY_MANDATORY_FIELDS') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError400_EmptyMandatoryFields'), 'error'));
        }

        if (customError === '400_INCORRECT_FILE_NAME') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError400_InvalidFileName'), 'error'));
        }

        if (customError === '400_NOT_JSON') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError400_NotJson'), 'error'));
        }

        if (customError === '422_INCORRECT_ID_OR_NAME') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_InvalidIdOrName'), 'error'));
        }

        if (customError === '422_FUTURE_DATES') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_FutureDates'), 'error'));
        }

        if (customError === '422_INVALID_TRANSCRIPT') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_InvalidTranscript'), 'error'));
        }

        if (customError === '422_INVALID_ASSOCIATIONS') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_InvalidAssociations'), 'error'));
        }

        if (customError === '422_INVALID_GENES') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_InvalidGenes'), 'error'));
        }

        if (customError === '422_INVALID_DATES') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_InvalidDates'), 'error'));
        }

        if (customError === '422_PANELS_COEXIST') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_PanelsCoexist'), 'error'));
        }

        if (customError === '422_AUTHOR') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_Author'), 'error'));
        }
        if (customError === '409_INVALID_NUMBER_CURRENT_PANELS') {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError422_InvalidNumberOfPanels'), 'error'));
          reject({ ...err, status: 500 });
        }

        if (showCustomConflictCodes) {
          if (customError === '409_IDENTIFIER_ALREADY_EXITS') {
            dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError409_IdentifierExists'), 'error'));
          }

          if (customError === '409_NAME_ALREADY_EXITS') {
            dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importError409_NameExists'), 'error'));
          }
        }

        if (!customError) {
          dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.importPopupError'), 'error'));
        }

        reject(err);
      });
  });
};

export default { resetRedux, updateFormValue, createPanelSetData, apiSendPanelSetData, uploadFile, showMessage };
