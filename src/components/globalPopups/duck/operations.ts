import { Dispatch } from 'redux';
import actions from './actions';

const setPopupOpen = actions.setPopupOpen;

const showMessagePopup = (message: string, type: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm', onClose?: () => void) => (dispatch: Dispatch) => {
  dispatch(actions.showMessagePopup(message, type, onClose));
};

export default { showMessagePopup, setPopupOpen };
