import React, { useCallback } from 'react';
import { TableBody, TableContainer, Table } from '@material-ui/core';
import { IGroup } from '../../../interfaces';
import LazyList from '../../../../commons/tableFilter/LazyList';
import GroupRow from './GroupRow';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import GroupTableHeader from './GroupTableHeader';
import GroupRowWrapper from './GroupRowWrapper';

interface IProps {
  selectedRows: any[];
  setSelectedRows: (selected: any[], item?: IGroup, checked?: boolean) => void;
  projectId: string;
}

function getGroupId(group: IGroup) {
  return group.guid;
}

function GroupTable(props: IProps) {
  const { selectedRows, setSelectedRows, projectId } = props;

  const fetchGroupPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getGroupsList({}, pageSize, page, projectId);
    },
    [projectId]
  );

  return (
    <TableContainer>
      <Table>
        <GroupTableHeader />
        <TableBody>
          <LazyList<IGroup>
            token={{}}
            ChildElem={GroupRow}
            fetchPage={fetchGroupPage}
            ChildWrapper={GroupRowWrapper}
            getElemId={getGroupId}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            scrollAncestor="usersPermissions"
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GroupTable;
