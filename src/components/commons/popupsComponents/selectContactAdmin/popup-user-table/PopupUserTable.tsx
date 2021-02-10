import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { PopupUserFilter, User } from '../interfaces';
import LazyList from '../../../tableFilter/LazyList';
import PopupUserRow from './PopupUserRow';
import MmpClient from '../../../tableFilter/MmpClient';
import PopupUserTableHeader from './PopupUserTableHeader';
import PopupUserRowWrapper from './PopupUserRowWrapper';

interface IProps {
  filter: PopupUserFilter;
  setFilter: (newFilter: PopupUserFilter) => void;
  rowClick: (data: User) => void;
  exclude: any;
}

function getUserId(user: User) {
  return user.identifier;
}

function PopupUserTable(props: IProps) {
  const { filter, rowClick, exclude } = props;

  const fetchUserPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getUserPage(filter, pageSize, page);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <PopupUserTableHeader {...props} />
        <TableBody>
          <LazyList<User>
            token={filter}
            ChildElem={PopupUserRow}
            fetchPage={fetchUserPage}
            ChildWrapper={PopupUserRowWrapper}
            getElemId={getUserId}
            rowClick={rowClick}
            exclude={{ exclude: exclude, field: 'identifier' }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PopupUserTable;
