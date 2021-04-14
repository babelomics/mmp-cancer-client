import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  loading: false,
  excludeGroups: [],
  excludeUsers: [],
  groupData: null,
  userPermissionData: null
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
    case types.AC_DELETE_GROUPS_OPTIONS:
      return {
        ...state,
        excludeGroups: state.excludeGroups.concat(payload)
      };
    case types.AC_END_FETCH_GROUP_DATA:
      return {
        ...state,
        loading: false,
        groupData: payload
      };
    case types.AC_SET_GROUP_DATA:
      return {
        ...state,
        groupData: payload
      };
    case types.AC_END_FETCH_USER_PERMISSION_DATA:
      return {
        ...state,
        loading: false,
        userPermissionData: payload
      };
    case types.AC_SET_USER_PERMISSION_DATA:
      return {
        ...state,
        userPermissionData: payload
      };
    case types.AC_SET_EXCLUDED_USERS:
      return {
        ...state,
        excludeUsers: payload
      };
    default:
      return state;
  }
};

export default reducer;
