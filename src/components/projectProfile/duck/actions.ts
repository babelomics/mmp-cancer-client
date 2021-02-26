import { IProject, IProjectsFilter } from '../../projectsManagement/interfaces';
import types from './types';

const initOperation = () => ({ type: types.AC_INIT_OPERATION });
const errOperation = (error: any) => ({ type: types.AC_ERR_OPERATION, payload: error });
const endOperation = () => ({ type: types.AC_END_OPERATION });

const endFetchData = (data: any) => ({ type: types.AC_END_FETCH_DATA, payload: data });

const resetReduxProject = () => ({ type: types.AC_RESET_REDUX_PROJECT });

const setMode = (mode: string) => ({ type: types.AC_SET_MODE, payload: mode });

export default {
  initOperation,
  errOperation,
  endOperation,
  endFetchData,
  resetReduxProject,
  setMode
};
