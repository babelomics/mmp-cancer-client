import { Query } from 'material-table';
import { Dispatch } from 'redux';

import { generalTableRemoteFetchOperation } from '../../../utils/tableRemoteFetchOperation';
import { ITableFilter } from '../../commons/GaiaTable';
import actions from './actions';
import api from './api';

const fetchRegistrationRequests = (query: Query<any>, filters: ITableFilter, previousData: any) => (dispatch: Dispatch) => {
  return generalTableRemoteFetchOperation(api.fetchRegistrationRequests, query, filters, previousData, actions.initFetch, actions.errFetch, actions.endFetch)(dispatch);
};

export default { fetchRegistrationRequests };
