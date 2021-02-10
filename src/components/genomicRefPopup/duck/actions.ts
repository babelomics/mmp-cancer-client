import types from './types';

const initFetch = () => ({ type: types.AC_INIT_FETCH });
const errFetch = () => ({ type: types.AC_ERR_FETCH });
const endFetch = () => ({ type: types.AC_END_FETCH });
const initFetchTable = () => ({ type: types.AC_INIT_FETCH_TABLE });
const errFetchTable = () => ({ type: types.AC_ERR_FETCH_TABLE });
const endFetchTable = () => ({ type: types.AC_END_FETCH_TABLE });
const loadSpeciesData = (data: any) => ({ type: types.AC_LOAD_SPIECES_DATA, payload: data });
const loadSpeciesAssembly = (data: any) => ({ type: types.AC_UPDATE_GENOMIC_REFERENCE_DATA, payload: data });
const updateGenomicReferenceData = (data: any) => ({ type: types.AC_UPDATE_GENOMIC_REFERENCE_DATA, payload: data });
const loadAssemblyData = (data: any) => ({ type: types.AC_LOAD_ASSEMBLY_DATA, payload: data });
const loadEnsemblReleaseData = (data: any) => ({ type: types.AC_LOAD_ENSEMBL_RELEASE_DATA, payload: data });
const resetRedux = () => ({ type: types.AC_RESET_GENOMIC_REFERENCE });
const setOpenSpeciesPopup = (selection: boolean) => ({ type: types.AC_OPEN_SPECIES_TABLE_POPUP, payload: selection });
const setOpenAssemblyPopup = (selection: boolean) => ({ type: types.AC_OPEN_ASSEMBLY_TABLE_POPUP, payload: selection });

export default {
  setOpenAssemblyPopup,
  setOpenSpeciesPopup,
  updateGenomicReferenceData,
  loadEnsemblReleaseData,
  loadAssemblyData,
  loadSpeciesAssembly,
  initFetch,
  errFetch,
  endFetch,
  initFetchTable,
  errFetchTable,
  endFetchTable,
  loadSpeciesData,
  resetRedux
};
