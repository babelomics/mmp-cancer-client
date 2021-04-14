import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PanelSetFilter } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import PanelSetFilterButtons from './panel-set-filter-buttons/PanelSetFilterButtons';
import PanelSetTable from './panel-set-table/PanelSetTable';
import routes from '../router/routes';
import { useHistory } from 'react-router-dom';
import { Add } from '@material-ui/icons';

const defaultPanelSetFilter = { isDeleted: false } as PanelSetFilter;

export const PanelSetsManagement = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<PanelSetFilter>(defaultPanelSetFilter);

  const handleOnBack = () => {
    history.push(`${routes.PATH_HOME}`);
  };

  return (
    <GaiaContainer
      icon="dynamic_feed"
      title={t('panelSetsManagement.title')}
      onBack={handleOnBack}
      acceptButtonText={t('commons.buttons.new')}
      acceptButtonIcon={<Add />}
      onAccept={() => history.push(routes.PATH_CREATE_PANEL_SET)}
    >
      <PanelSetFilterButtons filter={filter} setFilter={setFilter} />
      <PanelSetTable filter={filter} setFilter={setFilter} />
    </GaiaContainer>
  );
};

export default PanelSetsManagement;
