import { IUpdatePanelSetData } from '../interfaces';
import types from './types';

const initCreate = () => ({ type: types.AC_INIT_CREATE });
const endCreate = () => ({ type: types.AC_END_CREATE });
const initsend = () => ({ type: types.AC_INIT_CREATE });
const endsend = () => ({ type: types.AC_END_CREATE });
const errCreate = (error: any) => ({ type: types.AC_ERR_CREATE, payload: error });
const updateFormValue = (data: IUpdatePanelSetData) => ({ type: types.AC_UPDATE_FORM_VALUES, payload: data });
const resetRedux = () => ({ type: types.AC_RESET_FORM_VALUE });
export default { resetRedux, initCreate, endCreate, errCreate, initsend, endsend, updateFormValue };
