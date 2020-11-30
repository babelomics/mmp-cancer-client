import { IConfiguration } from '../interfaces';
import types from './types';

const initFetch = () => ({ type: types.AC_INIT_FETCH });
const errFetch = () => ({ type: types.AC_ERR_FETCH });
const endFetch = () => ({ type: types.AC_END_FETCH });
const updateConfigData = (newData: IConfiguration) => ({ type: types.AC_UPDATE_CONFIG_DATA, config: newData });
//const validationGenUrl = (validationGenUrlCode: number) => ({ type: types.AC_VALIDATION_DIR_GEN_URL, data: validationGenUrlCode });

export default { initFetch, errFetch, endFetch, updateConfigData };
