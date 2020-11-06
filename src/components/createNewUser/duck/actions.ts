import types from './types';

const initCreate = () => ({ type: types.AC_INIT_CREATE });
const endCreate = () => ({ type: types.AC_END_CREATE });
const errCreate = (error: any) => ({ type: types.AC_ERR_CREATE, payload: error });

const resetPopups = () => ({ type: types.AC_RESET_POPUPS });

export default { initCreate, endCreate, errCreate, resetPopups };
