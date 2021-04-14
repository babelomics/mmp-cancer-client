import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IFilterUsersPermissions, IUserPermission } from '../../../interfaces';
import LazyList from '../../../../commons/tableFilter/LazyList';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import SpecificsPermissionsTableHeader from './SpecificsPermissionsTableHeader';
import SpecificsPermissionsRowWrapper from './SpecificsPermissionsRowWrapper';
import SpecificsPermissionsGroupsRow from './SpecificsPermissionsRow';

interface IProps {
  filter: IFilterUsersPermissions;
  isDeleted?: boolean;
  projectId: string;
  projectDeleted: boolean;

  setFilter: (newFilter: IFilterUsersPermissions) => void;
  onDelete: (associated: IUserPermission) => void;
  navegateTo: (individualId: string, projectId: string, tab: string) => void;
}

function getGroupId(associated: IUserPermission) {
  return associated.userId;
}

function SpecificsPermissionsTable(props: IProps) {
  const { filter, onDelete, projectId } = props;

  const fetchSpecificUserList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getSpecificUserList(filter, pageSize, page, projectId);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <SpecificsPermissionsTableHeader {...props} />
        <TableBody>
          <LazyList<IUserPermission>
            token={filter}
            ChildElem={SpecificsPermissionsGroupsRow}
            fetchPage={fetchSpecificUserList}
            ChildWrapper={SpecificsPermissionsRowWrapper}
            getElemId={getGroupId}
            onDelete={onDelete}
            rowProps={{ isDeleted: props.isDeleted, projectDeleted: props.projectDeleted, navegateTo: props.navegateTo, projectId: props.projectId }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SpecificsPermissionsTable;
