import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IProjectsFilter } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import ProjectsFilterButtons from './projects-filter-buttons/ProjectsFilterButtons';
import ProjectsTable from './projects-table/ProjectsTable';

const defaultUserFilter = {} as IProjectsFilter;

const ProjectsManagement = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<IProjectsFilter>(defaultUserFilter);

  return (
    <GaiaContainer icon="group_add" title={t('projectsManagement.title')}>
      <div style={{ overflow: 'auto' }}>
        <ProjectsFilterButtons filter={filter} setFilter={setFilter} />
        <ProjectsTable filter={filter} setFilter={setFilter} />
      </div>
    </GaiaContainer>
  );
};

export default ProjectsManagement;
