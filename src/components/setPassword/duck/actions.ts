import types from './types';

const iniSetPassword = () => ({
  type: types.AC_INIT_SET_PASSWORD
});
const endSetPassword = () => ({
  type: types.AC_END_SET_PASSWORD
});

export default {
  iniSetPassword,
  endSetPassword
};
