import { Dispatch } from 'redux';
import { Query } from 'material-table';

import actions from './actions';
import api from './api';
import { generalTableRemoteFetchOperation } from '../../../utils/tableRemoteFetchOperation';
import { ITableFilter } from '../../commons/GaiaTable';
import { operations as userProfileOperations } from '../../userProfile/duck';

const setData = userProfileOperations.setData;

const fetchUsers = (query: Query<any>, filters: ITableFilter, previousData: any, exclude?: any) => (dispatch: Dispatch) => {
  return generalTableRemoteFetchOperation(api.fetchUsers, query, filters, previousData, actions.initFetch, actions.errFetch, actions.endFetch, exclude)(dispatch);
};

export default { fetchUsers, setData };
