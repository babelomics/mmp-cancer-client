import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import LazyList from '../../../tableFilter/LazyList';
import PopupIcd10Row from './PopupSearchIcd10Row';
import MmpClient from '../../../tableFilter/MmpClient';
import PopupIcd10TableHeader from './PopupSearchIcd10TableHeader';
import PopupIcd10RowWrapper from './PopupSearchIcd10RowWrapper';
import { IIcd10, ICommonFilter } from '../../../../tabPanelDiagnostic/tabs/interfaces';

interface IProps {
  filter: ICommonFilter;
  exclude: string[];
  setFilter: (newFilter: ICommonFilter) => void;
  addIcd10: (icd10: any) => void;
}

function getIcd10Id(icd10: IIcd10) {
  return icd10.id;
}

function PopupIcd10Table(props: IProps) {
  const { filter, addIcd10, exclude } = props;

  const fetchIcd10Page = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getIcd10SelectionList(filter, pageSize, page);
    },
    [filter]
  );

  const handleRowClick = (icd10: IIcd10) => {
    addIcd10(icd10);
  };

  return (
    <TableContainer>
      <Table>
        <PopupIcd10TableHeader {...props} />
        <TableBody>
          <LazyList<any>
            rowClick={handleRowClick}
            token={filter}
            ChildElem={PopupIcd10Row}
            fetchPage={fetchIcd10Page}
            ChildWrapper={PopupIcd10RowWrapper}
            getElemId={getIcd10Id}
            setFilter={props.setFilter}
            scrollModal={'icd10Modal'}
            exclude={{ exclude: exclude, field: 'id' }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PopupIcd10Table;
