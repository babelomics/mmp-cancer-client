import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  loading: false,
  projectData: {
    projectId: '',
    name: '',
    description: '',
    author: '',
    creationDate: null,
    modificationDate: null,
    assembly: '',
    ensemblRelease: '',
    samplesNumber: 0,
    individualsNumber: 0,
    analysesNumber: 0,
    organism: '',
    filesNumber: 0,
    diagnosticPanelsNumber: 0,
    drugsNumber: 0,
    accessType: '',
    deletionDate: null
  },
  mode: 'new'
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_OPERATION:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_OPERATION:
      return {
        ...state,
        loading: false
      };
    case types.AC_END_FETCH_DATA:
      return {
        ...state,
        loading: false,
        projectData: {
          ...payload,
          accessType: payload.accessType || '',
          samplesNumber: payload.samplesNumber || 0,
          individualsNumber: payload.individualsNumber || 0,
          filesNumber: payload.filesNumber || 0,
          diagnosticPanelsNumber: payload.diagnosticPanelsNumber || 0,
          analysesNumber: payload.analysesNumber || 0,
          drugsNumber: payload.drugsNumber || 0
        },
        mode: 'edit'
      };
    case types.AC_SET_MODE:
      return {
        ...state,
        mode: payload
      };
    case types.AC_RESET_REDUX_PROJECT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
