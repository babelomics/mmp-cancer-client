import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IIndividualsFilter, IIndividual } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import IndividualsRow from './IndividualsRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import IndividualsTableHeader from './IndividualsTableHeader';
import IndividualsRowWrapper from './IndividualsRowWrapper';

interface IProps {
  filter: IIndividualsFilter;
  setFilter: (newFilter: IIndividualsFilter) => void;
  projectId: string;
}

function getIndividualsId(individual: IIndividual) {
  return individual.individualId;
}

function IndividualsTable(props: IProps) {
  const { filter, projectId } = props;

  const fetchIndividualsPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getIndividualsPage(filter, pageSize, page, projectId);
    },
    [filter, projectId]
  );

  return (
    <TableContainer>
      <Table>
        <IndividualsTableHeader {...props} />
        <TableBody>
          <LazyList<IIndividual>
            token={filter}
            ChildElem={IndividualsRow}
            fetchPage={fetchIndividualsPage}
            ChildWrapper={IndividualsRowWrapper}
            getElemId={getIndividualsId}
            rowProps={{ projectId: projectId }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IndividualsTable;
