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
  abnormality: boolean;
  exclude: string[];
  hideParents?: boolean;
  hideChildren?: boolean;
  setFilter: (newFilter: IHPOPopupFilter) => void;
  addHPO: (hpo: any) => void;
}

function getHPOId(hpo: IHPOPopup) {
  return hpo.hpoId;
}

function HPOPopupTable(props: IProps) {
  const { filter, abnormality, addHPO, exclude } = props;

  const fetchHPOList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getHPOModalList(filter, pageSize, page, abnormality);
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
            scrollAncestor={'HPOModal'}
            exclude={{ exclude: exclude, field: 'hpoId' }}
            rowProps={{
              hideParents: props.hideParents,
              hideChildren: props.hideChildren
            }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HPOPopupTable;
