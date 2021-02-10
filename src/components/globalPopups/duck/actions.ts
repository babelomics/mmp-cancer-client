import types from './types';

const showMessagePopup = (message: string, type: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm', onClose?: () => void) => ({
  type: types.AC_SHOW_MESSAGE,
  message,
  messageType: type,
  onClose
});
const setPopupOpen = (open: boolean) => ({ type: types.AC_SET_POPUP_OPEN, open });

export default { showMessagePopup, setPopupOpen };
