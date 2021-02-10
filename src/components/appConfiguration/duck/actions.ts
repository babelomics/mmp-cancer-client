import { IConfiguration } from '../interfaces';
import types from './types';

const initFetch = () => ({ type: types.AC_INIT_FETCH });
const errFetch = () => ({ type: types.AC_ERR_FETCH });
const endFetch = () => ({ type: types.AC_END_FETCH });
const loadConfigData = (newData: IConfiguration) => ({ type: types.AC_LOAD_CONFIG_DATA, config: newData });
const updateConfigData = (newData: IConfiguration) => ({ type: types.AC_UPDATE_CONFIG_DATA, config: newData });
const setValidationPandrug = (validationState: boolean) => ({ type: types.AC_SET_VALIDATION_PUNDRUG, validState: validationState });
const setValidationGenomDict = (validationState: boolean) => ({ type: types.AC_SET_VALIDATION_GENOM_DICT, validState: validationState });
const resetValidations = () => ({ type: types.AC_SET_RESET_VALIDATIONS });

export default { resetValidations, initFetch, errFetch, endFetch, updateConfigData, loadConfigData, setValidationPandrug, setValidationGenomDict };
