import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { UserFilter, User } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import UserRow from './UserRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import UserTableHeader from './UserTableHeader';
import UserRowWrapper from './UserRowWrapper';

interface IProps {
  filter: UserFilter;
  setFilter: (newFilter: UserFilter) => void;
}

function getUserId(user: User) {
  return user.identifier;
}

function UserTable(props: IProps) {
  const { filter } = props;

  const fetchUserPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getUserPage(filter, pageSize, page);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <UserTableHeader {...props} />
        <TableBody>
          <LazyList<User> token={filter} ChildElem={UserRow} fetchPage={fetchUserPage} ChildWrapper={UserRowWrapper} getElemId={getUserId} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
