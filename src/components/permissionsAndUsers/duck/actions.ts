import { IGroup, IUserPermission } from '../interfaces';
import types from './types';

const initOperation = () => ({ type: types.AC_INIT_OPERATION });
const endOperation = () => ({ type: types.AC_END_OPERATION });
const deleteGroupsOptions = (identifier: any) => ({ type: types.AC_DELETE_GROUPS_OPTIONS, payload: identifier });
const endFetchGroupData = (data: IGroup) => ({ type: types.AC_END_FETCH_GROUP_DATA, payload: data });
const setGroupData = (data: IGroup | null) => ({ type: types.AC_SET_GROUP_DATA, payload: data });
const endFetchUserPermissionData = (data: IUserPermission) => ({ type: types.AC_END_FETCH_USER_PERMISSION_DATA, payload: data });
const setUserPermissionData = (data: IUserPermission | null) => ({ type: types.AC_SET_USER_PERMISSION_DATA, payload: data });
const setExcludedUsers = (arr: string[]) => ({ type: types.AC_SET_EXCLUDED_USERS, payload: arr });

export default { initOperation, endOperation, deleteGroupsOptions, endFetchGroupData, setGroupData, endFetchUserPermissionData, setUserPermissionData, setExcludedUsers };
