import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserFilter } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import UserFilterButtons from './user-filter-buttons/UserFilterButtons';
import UserTable from './user-table/UserTable';
import { useHistory } from 'react-router-dom';
import routes from '../router/routes';

const defaultUserFilter = {} as UserFilter;

const UsersManagement = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<UserFilter>(defaultUserFilter);
  const history = useHistory();

  const goHome = () => {
    history.push(routes.PATH_HOME);
  };

  return (
    <GaiaContainer icon="group_add" title={t('usersManagement.title')} onBack={goHome}>
      <div style={{ overflow: 'auto' }}>
        <UserFilterButtons filter={filter} setFilter={setFilter} />
        <UserTable filter={filter} setFilter={setFilter} />
      </div>
    </GaiaContainer>
  );
};

export default UsersManagement;
