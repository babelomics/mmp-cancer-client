import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RegistrationFilter } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import RegistrationFilterButtons from './registration-filter-buttons/RegistrationFilterButtons';
import RegistrationTable from './registration-table/RegistrationTable';
import routes from '../router/routes';
import { useHistory } from 'react-router-dom';

const defaultRegistrationFilter = {} as RegistrationFilter;

export const RegistrationManagement = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<RegistrationFilter>(defaultRegistrationFilter);
  const history = useHistory();

  const goHome = () => {
    history.push(routes.PATH_HOME);
  };

  return (
    <GaiaContainer icon="contact_mail" title={t('registrationManagement.title')} onBack={goHome}>
      <RegistrationFilterButtons filter={filter} setFilter={setFilter} />
      <RegistrationTable filter={filter} setFilter={setFilter} />
    </GaiaContainer>
  );
};

export default RegistrationManagement;
