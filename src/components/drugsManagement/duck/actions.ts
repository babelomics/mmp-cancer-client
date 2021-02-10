import types from './types';

const initOperation = () => ({ type: types.AC_INIT_AVAILABLE });
const endOperation = () => ({type: types.AC_END_AVAILABLE});
const errOperation = (err: string) => ({ type: types.AC_ERR_AVAILABLE, payload: err });


export default { endOperation, initOperation, errOperation };
