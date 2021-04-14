import { IDiagnosticPanelGlobal, IDiagnosticPanelGlobalUpdate } from '../interfaces';
import { IGene, IHPO, ITranscript, IIcd10 } from '../tabs/interfaces';
import types from './types';

const initFetch = () => ({ type: types.AC_INIT_FETCH });
const endFetch = () => ({ type: types.AC_END_FETCH });
const initCreate = () => ({ type: types.AC_INIT_CREATE });
const loadPanelGeneral = (newData: IDiagnosticPanelGlobal) => ({ type: types.AC_LOAD_PANEL_DATA, payload: newData });
const updatePanelGeneral = (newData: IDiagnosticPanelGlobalUpdate) => ({ type: types.AC_UPDATE_PANEL_DATA, payload: newData });

const addNewAscendant = (newAscendant: any) => ({ type: types.AC_NEW_ASCENDANT, payload: newAscendant });
const addNewDescendant = (newDescendant: any) => ({ type: types.AC_NEW_DESCENDANT, payload: newDescendant });
const deleteAscendant = (ascendant: any) => ({ type: types.AC_DELETE_ASCENDANT, payload: ascendant });
const deleteDescendant = (data: any) => ({ type: types.AC_DELETE_DESCENDANT, payload: data });

const addNewRegion = (newRegion: any) => ({ type: types.AC_NEW_REGION, payload: newRegion });
const addNewVariant = (newVariant: any) => ({ type: types.AC_NEW_VARIANT, payload: newVariant });
const deleteRegion = (region: any) => ({ type: types.AC_DELETE_REGION, payload: region });
const deleteVariant = (variant: any) => ({ type: types.AC_DELETE_VARIANT, payload: variant });

const endCreate = () => ({ type: types.AC_END_CREATE });
const errCreate = (error: any) => ({ type: types.AC_ERR_CREATE, payload: error });

const resetRedux = () => ({ type: types.AC_RESET_GENONIC_REFERENCE });

const setPanelSetId = (id: String) => ({ type: types.AC_PANELSET_ID, playload: id });
const setAssemblyId = (id: String) => ({ type: types.AC_ASSEMBLY_ID, playload: id });

const deleteGene = (id: String) => ({ type: types.AC_DELETE_GENE, payload: id });
const addGene = (gene: IGene) => ({ type: types.AC_ADD_GENE, payload: gene });

const deleteTranscript = (id: String) => ({ type: types.AC_DELETE_TRANSCRIPT, payload: id });
const addTranscript = (transcript: ITranscript) => ({ type: types.AC_ADD_TRANSCRIPT, payload: transcript });

const deleteHPO = (id: String) => ({ type: types.AC_DELETE_HPO, payload: id });
const addHPO = (hpo: IHPO) => ({ type: types.AC_ADD_HPO, payload: hpo });

const addIcd10 = (icd10: IIcd10) => ({ type: types.AC_ADD_ICD10, payload: icd10 });
const deleteIcd10 = (id: String) => ({ type: types.AC_DELETE_ICD10, payload: id });

export default {
  resetRedux,
  initFetch,
  endFetch,
  initCreate,
  endCreate,
  errCreate,
  loadPanelGeneral,
  updatePanelGeneral,
  addNewAscendant,
  addNewDescendant,
  deleteAscendant,
  deleteDescendant,
  addNewRegion,
  addNewVariant,
  deleteRegion,
  deleteVariant,
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
