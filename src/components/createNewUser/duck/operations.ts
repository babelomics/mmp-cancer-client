import actions from './actions';
import api from './api';
import { operations as globalPopupOperations } from '../../globalPopups/duck';

const resetPopups = actions.resetPopups;

const createUser = (data: any, t: any) => (dispatch: any) => {
  dispatch(actions.initCreate());
  api
    .createUser(data)
    .then((res) => {
      dispatch(globalPopupOperations.showMessagePopup(t('createNewUser.messages.success'), 'success'));
      dispatch(actions.endCreate());
    })
    .catch((err) => {
      dispatch(globalPopupOperations.showMessagePopup(err, 'error'));
      dispatch(actions.endCreate());
    });
};

export default { createUser, resetPopups };
