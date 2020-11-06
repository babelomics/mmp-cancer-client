import types from './types';

const iniPasswordRequest = () => ({
  type: types.AC_INIT_PASSWORD_REQUEST
});
const endPasswordRequest = () => ({
  type: types.AC_END_PASSWORD_REQUEST
});

export default {
  iniPasswordRequest,
  endPasswordRequest
};
