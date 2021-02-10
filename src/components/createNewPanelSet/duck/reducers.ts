import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  loading: false,
  error: null,
  success: null,
  formValues: {
    diagnosticPanelSetIdentifier: '',
    name: '',
    description: '',
    reference: {
      assembly: '',
      ensemblRelease: ''
    }
  }
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_CREATE:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_CREATE:
      return {
        ...state,
        loading: false
      };
    case types.AC_INIT_SEND:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_SEND:
      return {
        ...state,
        loading: false
      };
    case types.AC_ERR_CREATE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case types.AC_UPDATE_FORM_VALUES:
      return {
        ...state,
        formValues: { ...state.formValues, ...payload }
      };
    case types.AC_RESET_FORM_VALUE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
