import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IIndividualsFilter } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import IndividualsFilterButtons from './individuals-filter-buttons/IndividualsFilterButtons';
import IndividualsTable from './individuals-table/IndividualsTable';
import routes from '../router/routes';
import { useHistory } from 'react-router-dom';
import { Add } from '@material-ui/icons';

interface IProps {
  projectId: string;
}

const defaultUserFilter = {} as IIndividualsFilter;

const IndividualsManagement = (props: IProps) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<IIndividualsFilter>(defaultUserFilter);
  const history = useHistory();

  const goProject = () => {
    history.push(`${routes.PATH_PROJECT_PROFILE}/${props.projectId}`);
  };

  return (
    <GaiaContainer
      icon="person_pin"
      title={t('individuals.title')}
      onBack={goProject}
      acceptButtonText={t('commons.buttons.new')}
      acceptButtonIcon={<Add />}
      onAccept={() => {
        history.push(`${routes.PATH_INDIVIDUALS_DETAILS}/${props.projectId}`);
      }}
    >
      <div style={{ overflow: 'auto' }}>
        <IndividualsFilterButtons filter={filter} setFilter={setFilter} projectId={props.projectId} />
        <IndividualsTable filter={filter} setFilter={setFilter} projectId={props.projectId} />
      </div>
    </GaiaContainer>
  );
};

export default IndividualsManagement;
