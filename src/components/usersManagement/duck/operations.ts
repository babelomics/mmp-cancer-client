import { Dispatch } from 'redux';
import { Query } from 'material-table';

import actions from './actions';
import api from './api';
import { generalTableRemoteFetchOperation } from '../../../utils/tableRemoteFetchOperation';
import { ITableFilter } from '../../commons/GaiaTable';
import { operations as userProfileOperations } from '../../userProfile/duck';

const setData = userProfileOperations.setData;

const fetchUsers = (query: Query<any>, filters: ITableFilter) => (dispatch: Dispatch) => {
  return generalTableRemoteFetchOperation(api.fetchUsers, query, filters, actions.initFetch, actions.errFetch, actions.endFetch)(dispatch);
};

export default { fetchUsers, setData };
