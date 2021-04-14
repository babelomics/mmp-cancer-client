import { Dispatch } from 'redux';
import actions from './actions';
import api from './api';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import routes from '../../router/routes';
import { push } from 'connected-react-router';
import { IDiagnosticPanelGlobal } from '../interfaces';
import { AxiosResponse } from 'axios';
import { doDateFormat } from '../../../utils/utils';

const resetRedux = actions.resetRedux;
const addNewAscendant = actions.addNewAscendant;
const addNewDescendant = actions.addNewDescendant;
const deleteAscendant = actions.deleteAscendant;
const deleteDescendant = actions.deleteDescendant;

const addNewRegion = actions.addNewRegion;
const addNewVariant = actions.addNewVariant;
const deleteRegion = actions.deleteRegion;
const deleteVariant = actions.deleteVariant;

const setPanelSetId = actions.setPanelSetId;
const setAssemblyId = actions.setAssemblyId;
const updatePanelGeneral = actions.updatePanelGeneral;

const deleteGene = actions.deleteGene;
const addGene = actions.addGene;

const deleteTranscript = actions.deleteTranscript;
const addTranscript = actions.addTranscript;

const deleteHPO = actions.deleteHPO;
const addHPO = actions.addHPO;

const addIcd10 = actions.addIcd10;
const deleteIcd10 = actions.deleteIcd10;

const fetchPanelGlobal = (diagnosticPanelGuid: string) => (dispatch: Dispatch) => {
  dispatch(actions.initFetch());
  api
    .apiFetchPanelGlobal(diagnosticPanelGuid)
    .then((result: AxiosResponse<IDiagnosticPanelGlobal>) => {
      dispatch(
        actions.loadPanelGeneral({ ...result.data, creationDate: doDateFormat(result.data.creationDate, 'YYYY-MM-DD'), deletionDate: result.data.deletionDate ? result.data.deletionDate : '' })
      );
      dispatch(actions.endFetch());
    })
    .catch((err: any) => {
      dispatch(actions.endFetch());
    });
};

const checkRegion = (region: any, assembly: any) => (dispatch: Dispatch): Promise<any> => {
  return new Promise((resolve, reject) => {
    api
      .apiCheckRegion(region, assembly)
      .then((result: any) => {
        resolve({ done: true });
      })
      .catch((err: any) => reject(err));
  });
};

const deletePanelGlobal = (PanelSetIdentifier: string, PanelGuid: string, children: boolean, t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());
  api
    .apiDeletePanelGlobal(PanelSetIdentifier, PanelGuid, children)
    .then((result: any) => {
      dispatch(globalPopupOperations.showMessagePopup(t('tabPanelDiagnostic.messages.successDelete'), 'success', () => dispatch(push(`${routes.PATH_PANEL_SET_PROFILE}/${PanelSetIdentifier}`))));
      dispatch(actions.endFetch());
    })
    .catch((err: any) => {
      dispatch(actions.endFetch());
      dispatch(globalPopupOperations.showMessagePopup(t('tabPanelDiagnostic.messages.error'), 'error'));
      dispatch(actions.endFetch());
    });
};

const updatePanelGlobal = (identifier: string, dataPanel: IDiagnosticPanelGlobal, t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());

  return new Promise((resolve, reject) => {
    api
      .apiUpdatePanelGlobal(identifier, dataPanel)
      .then((result: any) => {
        dispatch(globalPopupOperations.showMessagePopup(t('panelProfileSet.messages.success'), 'success'));
        resolve({ done: true, nextVersion: result.data.guid });
        dispatch(actions.endFetch());
      })
      .catch((err: any) => {
        reject(err);
        dispatch(globalPopupOperations.showMessagePopup(t('panelProfileSet.messages.error'), 'error'));
        dispatch(actions.endFetch());
      });
  });
};

const createPanel = (data: IDiagnosticPanelGlobal, t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());
  api
    .createPanel(data)
    .then((result) => {
      dispatch(globalPopupOperations.showMessagePopup(t('panelProfileSet.messages.creationSuccess'), 'success'));
      dispatch(actions.endFetch());
      dispatch(push(`${routes.PATH_TAB_PANEL_DIAGNOSTIC}/${result.data.guid}`));
    })
    .catch((err: any) => {
      dispatch(actions.endFetch());
      if (err.status === 409) {
        dispatch(globalPopupOperations.showMessagePopup(t('panelProfileSet.messages.errorIdentifierOrName'), 'error'));
      }
    });
};

export default {
  updatePanelGeneral,
  updatePanelGlobal,
  deletePanelGlobal,
  fetchPanelGlobal,
  createPanel,
  addNewAscendant,
  addNewDescendant,
  deleteAscendant,
  deleteDescendant,
  addNewRegion,
  addNewVariant,
  deleteRegion,
  deleteVariant,
  checkRegion,
  resetRedux,
  setPanelSetId,
  setAssemblyId,
  deleteGene,
  addGene,
  deleteTranscript,
  addTranscript,
  deleteHPO,
  addHPO,
  addIcd10,
  deleteIcd10
};
