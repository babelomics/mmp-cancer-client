import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Add } from '@material-ui/icons';

import { IProjectsFilter } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import ProjectsFilterButtons from './projects-filter-buttons/ProjectsFilterButtons';
import ProjectsTable from './projects-table/ProjectsTable';
import routes from '../router/routes';
import ILogin, { ITokenData } from '../login/interfaces';
import { userCanCreate } from '../../utils/permissionsUtils';
import { P_INDIRECT_PROJECT } from '../permissionsAndUsers/permissions';

interface IProps {
  user: ITokenData;
  login: ILogin;
}

const defaultUserFilter = {} as IProjectsFilter;

const ProjectsManagement = (props: IProps) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<IProjectsFilter>(defaultUserFilter);
  const history = useHistory();

  const goHome = () => {
    history.push(routes.PATH_HOME);
  };

  const goToNewProject = () => {
    history.push(routes.PATH_PROJECT_PROFILE);
  };

  return (
    <GaiaContainer
      icon="folder_open"
      title={t('projectsManagement.title')}
      onBack={goHome}
      hideBackButton={props.user.userType === 'User'}
      acceptButtonText={t('commons.buttons.new')}
      acceptButtonIcon={<Add />}
      onAccept={() => (userCanCreate(props.login.user, P_INDIRECT_PROJECT, 'undefined') ? goToNewProject() : undefined)}
    >
      <div style={{ overflow: 'auto' }}>
        <ProjectsFilterButtons filter={filter} setFilter={setFilter} login={props.login} />
        <ProjectsTable filter={filter} setFilter={setFilter} />
      </div>
    </GaiaContainer>
  );
};

export default ProjectsManagement;
