import types from './types';

const initFetch = () => ({ type: types.AC_INIT_FETCH });
const errFetch = () => ({ type: types.AC_ERR_FETCH });
const endFetch = (response: any) => ({ type: types.AC_END_FETCH, payload: response });
const initOperation = () => ({ type: types.AC_INIT_AVAILABLE });
const endOperation = () => ({type: types.AC_END_AVAILABLE});
const errOperation = (err: string) => ({ type: types.AC_ERR_AVAILABLE, payload: err });


export default { initFetch, errFetch, endFetch, endOperation, initOperation, errOperation };
