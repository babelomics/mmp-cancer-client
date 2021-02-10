import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { ICommonFilter, IGene } from '../../interfaces';
import LazyList from '../../../../commons/tableFilter/LazyList';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import GeneTableHeader from './GeneTableHeader';
import GeneRowWrapper from './GeneRowWrapper';
import GeneRow from './GeneRow';

interface IProps {
  filter: ICommonFilter;
  itemsList: any[];
  setFilter: (newFilter: ICommonFilter) => void;
  onDelete: (gene: IGene) => void;
}

function getGeneId(gene: IGene) {
  return gene.geneId;
}

function GenesTable(props: IProps) {
  const { filter, onDelete, itemsList } = props;

  const fetchGenesList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getGenesList(filter, itemsList);
    },
    [filter, itemsList]
  );

  return (
    <TableContainer>
      <Table>
        <GeneTableHeader {...props} />
        <TableBody>
          <LazyList<IGene> token={filter} ChildElem={GeneRow} fetchPage={fetchGenesList} ChildWrapper={GeneRowWrapper} getElemId={getGeneId} onDelete={onDelete} isReduxOnly />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GenesTable;
