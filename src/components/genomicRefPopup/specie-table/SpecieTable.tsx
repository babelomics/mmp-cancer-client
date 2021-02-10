import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { ITableSpeciesData, ITableSpeciesDataFilter } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import SpeciesRow from './SpecieRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import SpecieTableHeader from './SpeciesTableHeader';
import SpecieRowWrapper from './SpecieRowWrapper';

interface IProps {
  filter: ITableSpeciesDataFilter;
  setFilter: (newFilter: ITableSpeciesDataFilter) => void;
  rowClick: (data: ITableSpeciesData) => void;
}

function getSpeciesId(species: ITableSpeciesData) {
  return species.taxonomyId;
}

function SpeciesTable(props: IProps) {
  const { filter, rowClick } = props;

  const fetchSpeciesPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getSpeciesPage(filter, pageSize, page);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <SpecieTableHeader {...props} />
        <TableBody>
          <LazyList<ITableSpeciesData> token={filter} rowClick={rowClick} ChildElem={SpeciesRow} fetchPage={fetchSpeciesPage} ChildWrapper={SpecieRowWrapper} getElemId={getSpeciesId} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SpeciesTable;
