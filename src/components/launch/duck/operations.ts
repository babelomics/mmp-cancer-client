import { Dispatch } from 'redux';
import actions from './actions';
import api from './api';

const fetchConfigRequest = () => (dispatch: Dispatch) => {
    dispatch(actions.initFetch());
    api
      .fetchConfigRequest()
      .then((result) => dispatch(actions.endFetch(result.data)))
      .catch((err: any) => {
        dispatch(actions.errFetch(err.status))
      });
  };

  export default { fetchConfigRequest };