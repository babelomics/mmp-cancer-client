import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import PermissionTabRow from './PermissionTabRow';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import PermissionTabRowWrapper from './PermissionTabRowWrapper';
import PermissionTabTableHeader from './PermissionTabTableHeader';
import LazyList from '../../../../commons/tableFilter/LazyList';
import { IUserPermission } from '../../../../permissionsAndUsers/interfaces';

interface IProps {
  inddividualId: string;
  projectId: string;
  onRowClick: (data: IUserPermission) => void;
  onDelete: (data: IUserPermission) => void;
}

function getUserId(permission: IUserPermission) {
  return permission.userId;
}

const PermissionTabTable = (props: IProps) => {
  const fetchPermissionPage = useCallback((pageSize: number, page: number) => {
    return MmpClient.getPermissionsIndividual(pageSize, page, props.inddividualId, props.projectId);
  }, []);

  return (
    <TableContainer>
      <Table>
        <PermissionTabTableHeader />
        <TableBody>
          <LazyList<IUserPermission>
            token={{}}
            ChildElem={PermissionTabRow}
            fetchPage={fetchPermissionPage}
            ChildWrapper={PermissionTabRowWrapper}
            getElemId={getUserId}
            rowClick={props.onRowClick}
            onDelete={(data) => props.onDelete(data)}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PermissionTabTable;
