import { AxiosResponse } from 'axios';
import { Query, QueryResult } from 'material-table';
import { AnyAction, Dispatch } from 'redux';

import { ITableFilter } from '../components/commons/GaiaTable';
import { doDateFormat } from './utils';

// Pageable
interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
}

interface IPageable {
  content: any[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export const generalTableRemoteFetchOperation = (
  api: any,
  query: Query<any>,
  filters: ITableFilter,
  previousData: any,
  init: (...args: any[]) => AnyAction,
  err: (...args: any[]) => AnyAction,
  end: (...args: any[]) => AnyAction,
  exclude?: any,
  setId?: any
) => (dispatch: Dispatch): Promise<QueryResult<any>> => {
  dispatch(init());
  return new Promise((resolve, reject) => {
    let params: any = {
      page: query.page,
      size: query.pageSize
    };

    // Add filters to query
    if (filters) {
      Object.keys(filters).forEach((k) => {
        const filter: any = filters[k];
        if (typeof filter !== 'string') {
          if (typeof filter === 'boolean') {
            params[k] = filter;
          } else {
            let date: any;
            if (filter.fromDate !== null && filter.fromDate !== undefined) {
              date = filter.fromDate;
              params[k + 'Start'] = typeof date === 'string' || typeof date === 'boolean' || typeof date === 'number' ? date : date instanceof Date ? doDateFormat(date) : date;
            }
            if (filter.toDate !== null && filter.toDate !== undefined) {
              date = filter.toDate;
              params[k + 'End'] = typeof date === 'string' || typeof date === 'boolean' || typeof date === 'number' ? date : date instanceof Date ? doDateFormat(date) : date;
            }
          }
        } else {
          let other: any = filter;
          if (k === 'costMax' || k === 'costMin') {
            params[k] = parseFloat(filter.replace(',', '.'));
          } else {
            if (other !== null && other !== undefined) {
              params[k] = typeof other === 'string' || typeof other === 'boolean' || typeof other === 'number' ? other : other instanceof Date ? doDateFormat(other) : other;
            }
          }
        }
      });
    }

    if (query.orderBy) {
      params.sort = `${query.orderBy.field as string},${query.orderDirection}`;
    }

    if (query.search) {
      params.search = query.search;
    }
    if (setId) {
      //tables that depends from an id, for example panels depends of panelsetid
      api(params, setId)
        .then((res: AxiosResponse<IPageable>) => {
          let datashown = previousData;
          let pageshown = res.data.totalPages - 1;
          let totalshown = previousData.length;
          if (res.data.totalPages > res.data.pageable.pageNumber) {
            if (params.page === 0) {
              datashown = res.data.content;
            } else {
              datashown = datashown.concat(res.data.content);
            }
            pageshown = res.data.pageable.pageNumber;
            totalshown = res.data.totalElements;
          }
          if (exclude) {
            let filtered = [...datashown];
            exclude.forEach((element: any) => {
              filtered = filtered.filter((el: any) => {
                return el.diagnosticPanelIdentifier !== element;
              });
            });
            datashown = [...filtered];
          }
          dispatch(end(datashown));
          resolve({
            data: datashown,
            page: pageshown,
            totalCount: totalshown
          });
        })
        .catch((error: any) => {
          dispatch(err());
          reject(error);
        });
    } else {
      //All other table
      api(params)
        .then((res: AxiosResponse<IPageable>) => {
          let datashown = previousData;
          let pageshown = res.data.totalPages - 1;
          let totalshown = previousData.length;
          if (res.data.totalPages > res.data.pageable.pageNumber) {
            if (params.page === 0) {
              datashown = res.data.content;
            } else {
              datashown = datashown.concat(res.data.content);
            }
            pageshown = res.data.pageable.pageNumber;
            totalshown = res.data.totalElements;
          }
          if (exclude) {
            let filtered = [...datashown];
            exclude.forEach((element: any) => {
              filtered = filtered.filter((el: any) => {
                return el.identifier !== element;
              });
            });
            datashown = [...filtered];
          }
          dispatch(end(datashown));
          resolve({
            data: datashown,
            page: pageshown,
            totalCount: totalshown
          });
        })
        .catch((error: any) => {
          dispatch(err());
          reject(error);
        });
    }
  });
};
