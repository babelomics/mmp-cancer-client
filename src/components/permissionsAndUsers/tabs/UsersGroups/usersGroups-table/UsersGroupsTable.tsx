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
  excludeGroups: string[];
  projectId: string;
  projectDeleted: boolean;

  setFilter: (newFilter: IFilterUsersGroups) => void;
  handleRowClick: (group: IGroup) => void;
  onDelete: (groups: IGroup) => void;
}

function getGroupId(groups: IGroup) {
  return groups.groupId;
}

function UsersGroupsTable(props: IProps) {
  const { filter, onDelete, projectId } = props;

  const fetchUsersGroupsList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getGroupsList(filter, pageSize, page, projectId);
    },
    [filter, projectId]
  );

  return (
    <TableContainer>
      <Table>
        <UsersGroupsTableHeader {...props} />
        <TableBody>
          <LazyList<IGroup>
            token={filter}
            ChildElem={UsersGroupsRow}
            fetchPage={fetchUsersGroupsList}
            ChildWrapper={UsersGroupsRowWrapper}
            getElemId={getGroupId}
            onDelete={onDelete}
            rowProps={{ isDeleted: props.isDeleted, projectDeleted: props.projectDeleted }}
            exclude={{ exclude: props.excludeGroups, field: 'name' }}
            rowClick={props.handleRowClick}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersGroupsTable;
