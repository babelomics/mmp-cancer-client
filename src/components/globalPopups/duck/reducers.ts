import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  open: false,
  type: 'info',
  message: '',
  onClose: () => {}
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, message, messageType, onClose, open } = action;

  switch (type) {
    case types.AC_SHOW_MESSAGE:
      return {
        ...state,
        open: true,
        message,
        type: messageType,
        onClose: onClose
      };
    case types.AC_SET_POPUP_OPEN:
      return {
        ...state,
        open
      };
    default:
      return state;
  }
};

export default reducer;
