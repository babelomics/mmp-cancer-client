import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  loading: false,
  listSpeciesData: [],
  listAssemblyData: [],
  listEnsemblRelease: [],
  genomicReference: { accession: null, ensemblRelease: null },
  loadingTableData: false,
  openSpeciesPopup: false,
  openAssemblyPopup: false
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_FETCH:
      return {
        ...state,
        loading: true
      };
    case types.AC_ERR_FETCH:
      return {
        ...state,
        loading: false
      };
    case types.AC_END_FETCH:
      return {
        ...state,
        loading: false
      };
    case types.AC_INIT_FETCH_TABLE:
      return {
        ...state,
        loadingTableData: true
      };
    case types.AC_END_FETCH_TABLE:
      return {
        ...state,
        loadingTableData: false
      };
    case types.AC_ERR_FETCH_TABLE:
      return {
        ...state,
        loadingTableData: false
      };
    case types.AC_LOAD_SPIECES_DATA:
      return {
        ...state,
        listSpeciesData: payload
      };
    case types.AC_LOAD_GENOMIC_REFERENCE_DATA:
      return {
        ...state,
        genomicReference: payload
      };
    case types.AC_UPDATE_GENOMIC_REFERENCE_DATA:
      return {
        ...state,
        genomicReference: { ...state.genomicReference, ...payload }
      };
    case types.AC_LOAD_ENSEMBL_RELEASE_DATA:
      return {
        ...state,
        listEnsemblRelease: payload
      };
    case types.AC_LOAD_ASSEMBLY_DATA:
      return {
        ...state,
        listAssemblyData: payload
      };
    case types.AC_OPEN_SPECIES_TABLE_POPUP:
      return {
        ...state,
        openSpeciesPopup: payload
      };
    case types.AC_OPEN_ASSEMBLY_TABLE_POPUP:
      return {
        ...state,
        openAssemblyPopup: payload
      };
    case types.AC_RESET_GENOMIC_REFERENCE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
