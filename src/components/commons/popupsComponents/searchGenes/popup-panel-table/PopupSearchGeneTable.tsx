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
  ensmblRelease: string;
  setFilter: (newFilter: IPopupSearchGeneFilter) => void;
  addGene: (gene: any) => void;
}

function getGeneId(gene: IGene) {
  return gene.geneId;
}

function PopupSearchGeneTable(props: IProps) {
  const { filter, assembly, addGene, exclude, ensmblRelease } = props;

  const fetchGenePage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getGenesSelectionList(filter, pageSize, page, assembly, ensmblRelease);
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
            scrollAncestor={'geneModal'}
            exclude={{ exclude: exclude, field: 'geneId' }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PopupSearchGeneTable;
