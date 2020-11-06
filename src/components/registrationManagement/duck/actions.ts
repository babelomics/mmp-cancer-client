import types from './types';

const initFetch = () => ({ type: types.AC_INIT_FETCH });
const errFetch = () => ({ type: types.AC_ERR_FETCH });
const endFetch = () => ({ type: types.AC_END_FETCH });

export default { initFetch, errFetch, endFetch };
