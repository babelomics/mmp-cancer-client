import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IFilterUsersPermissions, IUserPermission } from '../../../interfaces';
import LazyList from '../../../../commons/tableFilter/LazyList';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import AssociatedGroupsTableHeader from './AssociatedGroupsTableHeader';
import AssociatedGroupsRowWrapper from './AssociatedGroupsRowWrapper';
import AssociatedGroupsRow from './AssociatedGroupsRow';

interface IProps {
  filter: IFilterUsersPermissions;
  isDeleted?: boolean;
  projectId: string;
  projectDeleted: boolean;

  setFilter: (newFilter: IFilterUsersPermissions) => void;
  onDelete: (associated: IUserPermission) => void;
  handleRowClick: (userPermission: IUserPermission) => void;
}

function getAssociatedId(associated: IUserPermission) {
  return associated.userId;
}

function AssociatedTable(props: IProps) {
  const { filter, onDelete, projectId } = props;

  const fetchAsociatedUserList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getAsociatedUserList(filter, pageSize, page, projectId);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <AssociatedGroupsTableHeader {...props} />
        <TableBody>
          <LazyList<IUserPermission>
            token={filter}
            ChildElem={AssociatedGroupsRow}
            fetchPage={fetchAsociatedUserList}
            ChildWrapper={AssociatedGroupsRowWrapper}
            getElemId={getAssociatedId}
            onDelete={onDelete}
            rowProps={{ isDeleted: props.isDeleted, projectDeleted: props.projectDeleted }}
            rowClick={props.handleRowClick}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AssociatedTable;
