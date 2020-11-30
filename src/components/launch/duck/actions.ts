import types from './types';

const initFetch = () => ({ type: types.AC_INIT_FETCH });
const errFetch = (data: any) => ({ type: types.AC_ERR_FETCH, payload: data  });
const endFetch = (data: any) => ({ type: types.AC_END_FETCH, payload: data });

export default { initFetch, errFetch, endFetch };
