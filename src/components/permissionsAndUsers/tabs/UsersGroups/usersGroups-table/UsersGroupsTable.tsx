import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IFilterUsersGroups, IGroup } from '../../../interfaces';
import LazyList from '../../../../commons/tableFilter/LazyList';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import UsersGroupsTableHeader from './UsersGroupsTableHeader';
import UsersGroupsRowWrapper from './UsersGroupsRowWrapper';
import UsersGroupsRow from './UsersGroupsRow';

interface IProps {
  filter: IFilterUsersGroups;
  isDeleted?: boolean;
  setFilter: (newFilter: IFilterUsersGroups) => void;
  onDelete: (groups: IGroup) => void;
}

function getGroupId(groups: IGroup) {
  return groups.groupId;
}

function UsersGroupsTable(props: IProps) {
  const { filter, onDelete } = props;

  const fetchGenesList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getGroupsList(filter, pageSize, page);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <UsersGroupsTableHeader {...props} />
        <TableBody>
          <LazyList<IGroup>
            token={filter}
            ChildElem={UsersGroupsRow}
            fetchPage={fetchGenesList}
            ChildWrapper={UsersGroupsRowWrapper}
            getElemId={getGroupId}
            onDelete={onDelete}
            rowProps={{ isDeleted: props.isDeleted }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersGroupsTable;
