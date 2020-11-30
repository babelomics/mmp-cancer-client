import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';
import { doDateFormat } from '../../../utils/utils';
import { getUserTypeByStr } from '../../../utils/roles';

export const initialState: IState = {
  loading: false,
  error: null,
  success: false,
  data: {
    firstName: '',
    lastName: '',
    identifier: '',
    accessType: '',
    email: '',
    organization: '',
    dateCreated: new Date(),
    dateLastAccess: new Date(),
    userType: 0,
    canCreateProject: false
  },
  showUserSelectionPopup: false
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_OPERATION:
      return {
        ...state,
        loading: true
      };
    case types.AC_ERR_OPERATION:
      return {
        ...state,
        loading: false,
        error: payload
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
        data: {
          ...payload,
          dateCreated: doDateFormat(payload.dateCreated),
          dateLastAccess: doDateFormat(payload.dateLastAccess),
          userType: getUserTypeByStr(payload.userType)
        }
      };
    case types.AC_END_UPDATE_USER:
      return {
        ...state,
        loading: false
      };
    case types.AC_SET_DATA:
      return {
        ...state,
        data: {
          ...payload,
          dateCreated: doDateFormat(payload.dateCreated),
          dateLastAccess: doDateFormat(payload.dateLastAccess)
        }
      };
    case types.AC_SET_USER_SELECTION_POPUP_OPEN:
      return {
        ...state,
        showUserSelectionPopup: payload
      };
    default:
      return state;
  }
};

export default reducer;
