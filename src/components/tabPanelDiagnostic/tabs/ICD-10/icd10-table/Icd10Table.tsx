import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { ICommonFilter, IIcd10 } from '../../interfaces';
import LazyList from '../../../../commons/tableFilter/LazyList';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import Icd10TableHeader from './Icd10TableHeader';
import Icd10RowWrapper from './Icd10RowWrapper';
import Icd10Row from './Icd10Row';

interface IProps {
  filter: ICommonFilter;
  itemsList: any[];
  isDeleted?: boolean;
  setFilter: (newFilter: ICommonFilter) => void;
  onDelete: (gene: IIcd10) => void;
}

function getIgcd10Id(icd10: IIcd10) {
  return icd10.id;
}

function Icd10Table(props: IProps) {
  const { filter, onDelete, itemsList } = props;

  const fetchIcd10List = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getIcd10List(filter, itemsList);
    },
    [filter, itemsList]
  );

  return (
    <TableContainer>
      <Table>
        <Icd10TableHeader {...props} />
        <TableBody>
          <LazyList<IIcd10>
            token={filter}
            ChildElem={Icd10Row}
            fetchPage={fetchIcd10List}
            ChildWrapper={Icd10RowWrapper}
            getElemId={getIgcd10Id}
            onDelete={onDelete}
            rowProps={{ isDeleted: props.isDeleted }}
            isReduxOnly
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Icd10Table;
