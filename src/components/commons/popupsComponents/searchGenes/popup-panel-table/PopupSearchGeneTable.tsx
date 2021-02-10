import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IPopupSearchGeneFilter, IGene } from '../interfaces';
import LazyList from '../../../tableFilter/LazyList';
import PopupSearchGeneRow from './PopupSearchGeneRow';
import MmpClient from '../../../tableFilter/MmpClient';
import PopupSearchGeneTableHeader from './PopupSearchGeneTableHeader';
import PopupSearchGeneRowWrapper from './PopupSearchGeneRowWrapper';

interface IProps {
  filter: IPopupSearchGeneFilter;
  assembly: string;
  exclude: string[];
  setFilter: (newFilter: IPopupSearchGeneFilter) => void;
  addGene: (gene: any) => void;
}

function getGeneId(gene: IGene) {
  return gene.geneId;
}

function PopupSearchGeneTable(props: IProps) {
  const { filter, assembly, addGene, exclude } = props;

  const fetchGenePage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getGenesSelectionList(filter, pageSize, page, assembly);
    },
    [filter]
  );

  const handleRowClick = (gene: IGene) => {
    addGene(gene);
  };

  return (
    <TableContainer>
      <Table>
        <PopupSearchGeneTableHeader {...props} />
        <TableBody>
          <LazyList<any>
            rowClick={handleRowClick}
            token={filter}
            ChildElem={PopupSearchGeneRow}
            fetchPage={fetchGenePage}
            ChildWrapper={PopupSearchGeneRowWrapper}
            getElemId={getGeneId}
            scrollModal={'geneModal'}
            exclude={{ exclude: exclude, field: 'geneId' }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PopupSearchGeneTable;
