import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { PopupPanelFilter, Panel } from '../interfaces';
import LazyList from '../../../tableFilter/LazyList';
import PopupPanelRow from './PopupPanelRow';
import MmpClient from '../../../tableFilter/MmpClient';
import PopupPanelTableHeader from './PopupPanelTableHeader';
import PopupPanelRowWrapper from './PopupPanelRowWrapper';

interface IProps {
  filter: PopupPanelFilter;
  setFilter: (newFilter: PopupPanelFilter) => void;
  rowClick: (data: Panel) => void;
  exclude: any;
  panelSetId: string;
}

function getPanelId(panel: Panel) {
  return panel.diagnosticPanelIdentifier;
}

function PopupPanelTable(props: IProps) {
  const { filter, rowClick, exclude, panelSetId } = props;

  const fetchPanelPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getPanelPage(filter, pageSize, page, panelSetId);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <PopupPanelTableHeader {...props} />
        <TableBody>
          <LazyList<Panel>
            token={filter}
            ChildElem={PopupPanelRow}
            fetchPage={fetchPanelPage}
            ChildWrapper={PopupPanelRowWrapper}
            getElemId={getPanelId}
            rowClick={rowClick}
            exclude={{ exclude: exclude, field: 'diagnosticPanelIdentifier' }}
            scrollAncestor={'selectPanelModal'}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PopupPanelTable;
