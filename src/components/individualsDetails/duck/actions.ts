import { IHumanDisease, IHumanPhenotype } from '../../individualsManagement/interfaces';
import { IUserPermission } from '../../permissionsAndUsers/interfaces';
import types from './types';

const initOperation = () => ({ type: types.AC_INIT_OPERATION });
const endOperation = () => ({ type: types.AC_END_OPERATION });
const endFetchData = (data: any) => ({ type: types.AC_END_FETCH_DATA, payload: data });
const resetReduxIndividual = () => ({ type: types.AC_RESET_REDUX_INDIVIDUAL });
const addHpo = (data: IHumanPhenotype) => ({ type: types.AC_ADD_HPO, payload: data });
const deleteHPO = (id: String) => ({ type: types.AC_DELETE_HPO, payload: id });
const addIcd10 = (data: IHumanDisease) => ({ type: types.AC_ADD_ICD10, payload: data });
const deleteICD10 = (id: String) => ({ type: types.AC_DELETE_ICD10, payload: id });
const updateHPO = (data: IHumanPhenotype) => ({ type: types.AC_UPDATE_HPO, payload: data });
const updateICD10 = (data: IHumanDisease) => ({ type: types.AC_UPDATE_ICD10, payload: data });
const setPermissionsData = (data: IUserPermission | null) => ({ type: types.AC_SET_PERMISSIONS_DATA, payload: data });
const initFetchPermissionsData = () => ({ type: types.AC_INIT_FETCH_PERMISSIONS_DATA });
const endFetchPermissionsData = (data: IUserPermission) => ({ type: types.AC_END_FETCH_PERMISSIONS_DATA, payload: data });
const setExcludedUsers = (ids: string | string[]) => ({ type: types.AC_SET_EXCLUDED_USERS, payload: ids });
const removeExcludedUser = (id: string) => ({ type: types.AC_REMOVE_EXCLUDED_USER, payload: id });

export default {
  initOperation,
  endOperation,
  endFetchData,
  resetReduxIndividual,
  addHpo,
  deleteHPO,
  addIcd10,
  deleteICD10,
  updateHPO,
  updateICD10,
  setPermissionsData,
  initFetchPermissionsData,
  endFetchPermissionsData,
  setExcludedUsers,
  removeExcludedUser
};
