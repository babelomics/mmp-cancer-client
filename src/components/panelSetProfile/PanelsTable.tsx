import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { IPanelSetData, PanelFilter } from './interfaces';
import PanelFilterButtons from './panel-filter-buttons/PanelFilterButtons';
import PanelTable from './panel-table/PanelTable';

const defaultPanelFilter = { isDeleted: false } as PanelFilter;

interface IProps {
  panelSetData: IPanelSetData;
}

export const PanelsTable = (props: IProps) => {
  const history = useHistory();
  const [identifierSet, setIndentifierSet] = useState<string>('');
  const [filter, setFilter] = useState<PanelFilter>(defaultPanelFilter);
  useEffect(() => {
    const pathParts = history.location.pathname.split('/');
    setIndentifierSet(pathParts[2]);
  }, []);

  return (
    <>
      <PanelFilterButtons filter={filter} setFilter={setFilter} panelSetData={props.panelSetData} />
      <PanelTable filter={filter} setFilter={setFilter} panelSetId={identifierSet} />
    </>
  );
};

export default PanelsTable;
