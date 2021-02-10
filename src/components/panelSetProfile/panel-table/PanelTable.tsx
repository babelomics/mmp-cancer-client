import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { PanelFilter, Panel } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import PanelRow from './PanelRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import PanelTableHeader from './PanelTableHeader';
import PanelRowWrapper from './PanelRowWrapper';

interface IProps {
  filter: PanelFilter;
  setFilter: (newFilter: PanelFilter) => void;
  panelSetId: string;
}

function getPanelId(panel: Panel) {
  return panel.diagnosticPanelIdentifier;
}

function PanelTable(props: IProps) {
  const { filter, panelSetId } = props;

  const fetchPanelPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getPanelPage(filter, pageSize, page, panelSetId);
    },
    [filter, panelSetId]
  );

  return (
    <TableContainer>
      <Table>
        <PanelTableHeader {...props} />
        <TableBody>
          <LazyList<Panel> token={filter} ChildElem={PanelRow} fetchPage={fetchPanelPage} ChildWrapper={PanelRowWrapper} getElemId={getPanelId} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PanelTable;
