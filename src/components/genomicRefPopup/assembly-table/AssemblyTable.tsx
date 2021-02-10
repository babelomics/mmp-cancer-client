import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { ITableAssemblyData, ITableAssemblyDataFilter } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import AssemblyRow from './AssemblyRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import AssemblyTableHeader from './AssemblyTableHeader';
import AssemblyRowWrapper from './AssemblyRowWrapper';

interface IProps {
  filter: ITableAssemblyDataFilter;
  setFilter: (newFilter: ITableAssemblyDataFilter) => void;
  taxonomyId?: string;
  rowClick: (data: ITableAssemblyData) => void;
}

function getAssemblyId(assembly: ITableAssemblyData) {
  return assembly.accession;
}

function AssemblyTable(props: IProps) {
  const { filter, taxonomyId, rowClick } = props;

  const fetchAssemblyPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getAssemblyPage(filter, pageSize, page, taxonomyId);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <AssemblyTableHeader {...props} />
        <TableBody>
          <LazyList<ITableAssemblyData> rowClick={rowClick} token={filter} ChildElem={AssemblyRow} fetchPage={fetchAssemblyPage} ChildWrapper={AssemblyRowWrapper} getElemId={getAssemblyId} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AssemblyTable;
