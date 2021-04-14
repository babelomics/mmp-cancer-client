import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { PanelSetFilter, PanelSet } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import PanelSetRow from './PanelSetRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import PanelSetTableHeader from './PanelSetTableHeader';
import PanelSetRowWrapper from './PanelSetRowWrapper';

interface IProps {
  filter: PanelSetFilter;
  setFilter: (newFilter: PanelSetFilter) => void;
}

function getPanelSetId(panelSet: PanelSet) {
  return panelSet.diagnosticPanelSetIdentifier;
}

function PanelSetTable(props: IProps) {
  const { filter } = props;

  const fetchPanelSetPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getPanelSetPage(filter, pageSize, page);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <PanelSetTableHeader {...props} />
        <TableBody>
          <LazyList<PanelSet> token={filter} ChildElem={PanelSetRow} fetchPage={fetchPanelSetPage} ChildWrapper={PanelSetRowWrapper} getElemId={getPanelSetId} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PanelSetTable;
