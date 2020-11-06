import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import GaiaTable, { ITableFilter } from '../commons/GaiaTable';
import routes from '../router/routes';
import { ITableData } from './interfaces';
import { Query } from 'material-table';
import GaiaContainer from '../commons/GaiaContainer';

interface IProps {
  loading: boolean;
  fetchRegistrationRequests: (query: Query<any>, filters: ITableFilter) => Promise<any>;
}

export const RegistrationManagement = (props: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <GaiaContainer icon="contact_mail" title={t('registrationManagement.title')}>
      <GaiaTable
        loading={props.loading}
        showTitle={false}
        columns={[
          {
            title: t('commons.fields.identifier'),
            field: 'identifier'
          },
          {
            title: t('commons.fields.firstName'),
            field: 'firstName',
            render: (rowData: ITableData) => `${rowData.firstName} ${rowData.lastName}`
          },
          {
            title: t('commons.fields.organization'),
            field: 'organization'
          },
          {
            title: t('commons.fields.dateRequest'),
            field: 'applicationDate',
            type: 'date'
          },
          {
            title: t('commons.fields.attended'),
            field: 'attended',
            type: 'boolean',
            hidden: true
          }
        ]}
        remoteData={props.fetchRegistrationRequests}
        filtersMenu={true}
        rowStyle={(data: ITableData) => {
          if (data.attended !== null) {
            return {
              backgroundColor: 'lightgray'
            };
          }

          return {};
        }}
        onRowClick={(e, rowData) => {
          history.push(`${routes.PATH_ADMIN_REVIEW_REQUEST}/${rowData.identifier}`);
        }}
      />
    </GaiaContainer>
  );
};

export default RegistrationManagement;
