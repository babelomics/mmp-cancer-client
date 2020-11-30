import { push } from 'connected-react-router';

import actions from './actions';
import api from './api';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import routes from '../../router/routes';
import { IFormData } from '../interfaces';
import { FormikErrors } from 'formik/dist/types';

const resetPopups = actions.resetPopups;

const createUser = (data: any, setFormikErrors: (errors: FormikErrors<IFormData>) => void, t: any) => (dispatch: any) => {
  dispatch(actions.initCreate());
  api
    .createUser(data)
    .then((res) => {
      dispatch(globalPopupOperations.showMessagePopup(t('createNewUser.messages.success'), 'success', () => dispatch(push(routes.PATH_USERS_MANAGEMENT))));
      dispatch(actions.endCreate());
    })
    .catch((err) => {
      dispatch(actions.endCreate());

      if (err.message.toLowerCase().includes('email')) {
        dispatch(globalPopupOperations.showMessagePopup(t('registryRequest.messages.errorEmail'), 'error'));
        setFormikErrors({ email: t('registryRequest.messages.errorEmail') });
      } else if (err.message.toLowerCase().includes('identifier')) {
        dispatch(globalPopupOperations.showMessagePopup(t('registryRequest.messages.errorIdentifier'), 'error'));
        setFormikErrors({ identifier: t('registryRequest.messages.errorIdentifier') });
      } else {
        dispatch(globalPopupOperations.showMessagePopup(t('commons.error.general'), 'error'));
      }
    });
};

export default { createUser, resetPopups };
