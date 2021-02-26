import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IHPOFilter, IHPO } from '../../interfaces';
import LazyList from '../../../../commons/tableFilter/LazyList';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import HPOTableHeader from './HPOTableHeader';
import HPORowWrapper from './HPORowWrapper';
import HPORow from './HPORow';

interface IProps {
  filter: IHPOFilter;
  itemsList: any[];
  assembly: string;
  isDeleted?: boolean;
  onDelete: (transcript: IHPO) => void;
  setFilter: (newFilter: IHPOFilter) => void;
}

function HPOId(hpo: IHPO) {
  return hpo.hpoId;
}

function HPOTable(props: IProps) {
  const { filter, onDelete, itemsList } = props;

  const fetchHPOList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getHPOList(filter, itemsList);
    },
    [filter, itemsList]
  );

  return (
    <TableContainer>
      <Table>
        <HPOTableHeader {...props} />
        <TableBody>
          <LazyList<IHPO>
            token={filter}
            ChildElem={HPORow}
            fetchPage={fetchHPOList}
            ChildWrapper={HPORowWrapper}
            getElemId={HPOId}
            onDelete={onDelete}
            rowProps={{ isDeleted: props.isDeleted }}
            isReduxOnly
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HPOTable;
