import types from './types';

const initOperation = () => ({ type: types.AC_INIT_OPERATION });
const endOperation = () => ({ type: types.AC_END_OPERATION });
const errOperation = () => ({ type: types.AC_ERR_OPERATION });
const endFetch = (data: any) => ({ type: types.AC_END_FETCH, payload: data });

export default {
  initOperation,
  endOperation,
  errOperation,
  endFetch
};
