import { Dispatch } from 'redux';
import actions from './actions';
import api from './api';

import { push } from 'connected-react-router';
import routes from '../../router/routes';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import { operations as tabPanelDiagnostic } from '../../tabPanelDiagnostic/duck';

import { IPanelSetData } from '../interfaces';

const setPanelSetId = tabPanelDiagnostic.setPanelSetId;
const setAssemblyId = tabPanelDiagnostic.setAssemblyId;

const updateReferencePanelSetData = actions.updateReferencePanelSetData;

const fetchPanelSetData = (identifier: string) => (dispatch: Dispatch) => {
  dispatch(actions.initFetch());
  api
    .apiFetchPanelSetData(identifier)
    .then((res) => {
      dispatch(actions.endFetch());
      dispatch(actions.fechPanelSetData(res.data));

      dispatch(tabPanelDiagnostic.setPanelSetId(res.data.diagnosticPanelSetIdentifier));
      dispatch(tabPanelDiagnostic.setAssemblyId(res.data.reference.assembly));
    })
    .catch((err) => {
      dispatch(actions.errFetch());
    });
};

const deletePanelSetData = (identifier: string, t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());
  return new Promise((resolve, reject) => {
    api
      .apiDeletePanelSetData(identifier)
      .then((result) => {
        dispatch(globalPopupOperations.showMessagePopup(t('panelProfileSet.messages.successDelete'), 'success', () => dispatch(push(routes.PATH_PANEL_SETS_MANAGEMENT))));
        resolve({ done: true });
        dispatch(actions.endFetch());
      })
      .catch((err: any) => {
        reject(err);
        dispatch(globalPopupOperations.showMessagePopup(t('panelProfileSet.messages.error'), 'error'));
        dispatch(actions.errFetch());
      });
  });
};

const updatePanelSetData = (identifier: string, dataPanel: IPanelSetData, t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());
  return new Promise((resolve, reject) => {
    api
      .apiUpdatePanelSetData(identifier, dataPanel)
      .then((result) => {
        dispatch(globalPopupOperations.showMessagePopup(t('panelProfileSet.messages.success'), 'success', () => dispatch(actions.endFetch())));
        resolve({ done: true });
        dispatch(actions.endFetch());
      })
      .catch((err: any) => {
        reject(err);
        dispatch(globalPopupOperations.showMessagePopup(t('panelProfileSet.messages.error'), 'error'));
        dispatch(actions.errFetch());
      });
  });
};

const exportPanel = (identifier: string, t: any, filename?: string) => (dispatch: any) => {
  api
    .exportPanel(identifier)
    .then((res) => {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(res.data, null, 4));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', filename ?? 'export.json');
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    })
    .catch(() => dispatch(globalPopupOperations.showMessagePopup(t('panelSetCreate.messages.exportPopupError'), 'error')));
};

export default { updateReferencePanelSetData, fetchPanelSetData, deletePanelSetData, updatePanelSetData, exportPanel, setPanelSetId, setAssemblyId };
