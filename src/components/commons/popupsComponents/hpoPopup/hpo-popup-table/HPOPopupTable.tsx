import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IHPOPopupFilter, IHPOPopup } from '../interfaces';
import LazyList from '../../../tableFilter/LazyList';
import MmpClient from '../../../tableFilter/MmpClient';
import HPOPopupTableHeader from './HPOPopupTableHeader';
import HPOPopupRowWrapper from './HPOPopupRowWrapper';
import HPOPopupRow from './HPOPopupRow';

interface IProps {
  filter: IHPOPopupFilter;
  assembly: string;
  exclude: string[];
  setFilter: (newFilter: IHPOPopupFilter) => void;
  addHPO: (hpo: any) => void;
}

function getHPOId(hpo: IHPOPopup) {
  return hpo.hpoId;
}

function HPOPopupTable(props: IProps) {
  const { filter, assembly, addHPO, exclude } = props;

  const fetchHPOList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getHPOModalList(filter, pageSize, page, assembly);
    },
    [filter]
  );

  const handleRowClick = (hpo: IHPOPopup) => {
    addHPO(hpo);
  };

  return (
    <TableContainer>
      <Table>
        <HPOPopupTableHeader {...props} />
        <TableBody>
          <LazyList<IHPOPopup>
            rowClick={handleRowClick}
            token={filter}
            ChildElem={HPOPopupRow}
            fetchPage={fetchHPOList}
            ChildWrapper={HPOPopupRowWrapper}
            getElemId={getHPOId}
            setFilter={props.setFilter}
            scrollModal={'HPOModal'}
            exclude={{ exclude: exclude, field: 'hpoId' }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HPOPopupTable;
