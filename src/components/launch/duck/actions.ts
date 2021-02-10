import types from './types';

const initFetch = () => ({ type: types.AC_INIT_FETCH });
const errFetch = (data: any) => ({ type: types.AC_ERR_FETCH, payload: data  });
const endFetch = (data: any) => ({ type: types.AC_END_FETCH, payload: data });
const updateConfigStatus = (isConfigured: Boolean) => ({ type: types.AC_UPDATE_CONFIG_STATUS, payload: isConfigured });

export default { initFetch, errFetch, endFetch, updateConfigStatus };
