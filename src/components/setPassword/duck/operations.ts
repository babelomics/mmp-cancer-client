import { push } from 'connected-react-router';

import actions from './actions';
import api from './api';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import { ADMIN_CONTACT_EMAIL } from '../../../utils/constants';
import routes from '../../router/routes';

const showMessagePopup = globalPopupOperations.showMessagePopup;

const signup = (token: string, identifier: string, password: string, t: any) => (dispatch: any) => {
  dispatch(actions.iniSetPassword());
  api
    .signup(token, identifier, password)
    .then(() => {
      dispatch(actions.endSetPassword());
      dispatch(globalPopupOperations.showMessagePopup(t('setPassword.messages.success'), 'success', () => dispatch(push(routes.PATH_LOGIN))));
    })
    .catch((err) => {
      dispatch(actions.endSetPassword());
      if (err.status === 417) {
        dispatch(globalPopupOperations.showMessagePopup(t('signUp.messages.errorToken'), 'error', () => dispatch(push(routes.PATH_LOGIN))));
      } else {
        dispatch(globalPopupOperations.showMessagePopup(`${t('commons.error.generalContact')}: ${ADMIN_CONTACT_EMAIL}`, 'error'));
      }
    });
};

export default {
  signup,
  showMessagePopup
};
