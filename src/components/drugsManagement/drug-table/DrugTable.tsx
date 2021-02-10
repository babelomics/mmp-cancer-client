import React, { useCallback } from 'react';
import { TableBody, LinearProgress, TableContainer, TableCell, Table } from '@material-ui/core';
import { DrugFilter, Drug } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import DrugRow from './DrugRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import DrugTableHeader from './DrugTableHeader';
import DrugRowWrapper from './DrugRowWrapper';

interface IProps {
  filter: DrugFilter;
  setFilter: (newFilter: DrugFilter) => void;
  loading: boolean;
  selectedRows: any[];
  setSelectedRows: (selected: any[]) => void;
  selectAll: boolean;
  setSelectAll: (all: boolean) => void;
}

function getDrugId(drug: Drug) {
  return drug.id;
}

function DrugTable(props: IProps) {
  const { filter, loading, selectedRows, setSelectedRows, selectAll } = props;

  const fetchDrugPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getDrugPage(filter, pageSize, page);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <DrugTableHeader {...props} />
        <TableBody>
          {loading ? (
            <DrugRowWrapper>
              <LinearProgress />
            </DrugRowWrapper>
          ) : (
            <LazyList<Drug>
              token={filter}
              ChildElem={DrugRow}
              fetchPage={fetchDrugPage}
              ChildWrapper={DrugRowWrapper}
              getElemId={getDrugId}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              selectAll={selectAll}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DrugTable;
