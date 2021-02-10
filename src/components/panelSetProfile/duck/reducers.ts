import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  loading: false,
  panelSetData: {
    diagnosticPanelSetIdentifier: '',
    name: null,
    description: null,
    panelsNumber: null,
    creationDate: null,
    deletionDate: null,
    reference: {
      ensemblRelease: null,
      assembly: null
    },
    isHuman: false
  }
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_FETCH:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_FETCH:
      return {
        ...state,
        loading: false
      };
    case types.AC_ERR_FETCH:
      return {
        ...state,
        loading: false
      };
    case types.AC_LOAD_PANEL_SET_DATA:
      return {
        ...state,
        panelSetData: payload
      };
    case types.AC_UPDATE_PANEL_SET_DATA:
      return {
        ...state,
        panelSetData: { ...state.panelSetData, ...payload }
      };
    default:
      return state;
  }
};

export default reducer;
