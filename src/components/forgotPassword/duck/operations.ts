import { push } from 'connected-react-router';

import api from './api';
import actions from './actions';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import routes from '../../router/routes';

const requestPassword = (data: string, t: any) => (dispatch: any) => {
  dispatch(actions.iniPasswordRequest());
  api
    .requestPassword(data)
    .then(() => {
      dispatch(actions.endPasswordRequest());
      dispatch(globalPopupOperations.showMessagePopup(t('forgotPassword.messages.success'), 'success', () => push(routes.PATH_LOGIN)));
    })
    .catch(() => {
      dispatch(actions.endPasswordRequest());
      dispatch(globalPopupOperations.showMessagePopup(t('commons.error.generalContact'), 'error'));
    });
};

export default {
  requestPassword
};
