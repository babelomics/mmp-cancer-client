import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Query } from 'material-table';

import GaiaTable, { ITableFilter } from '../commons/GaiaTable';
import IUsersManagement, { ITableData } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import routes from '../router/routes';
import { doDateFormat } from '../../utils/utils';

interface IProps {
  fetchUsers: (query: Query<any>, filters: ITableFilter, previousData: any) => Promise<any>;
  usersManagement: IUsersManagement;
}

export const UsersManagement = (props: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <GaiaContainer icon="group_add" title={t('usersManagement.title')}>
      <GaiaTable
        showTitle={false}
        loading={props.usersManagement.loading}
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
            title: t('commons.fields.email'),
            field: 'email'
          },
          {
            title: t('commons.fields.organization'),
            field: 'organization'
          },
          {
            title: t('commons.fields.dateCreated'),
            field: 'dateCreated',
            type: 'date',
            render: (rowData: ITableData) => {
              return doDateFormat(rowData.dateCreated);
            }
          },
          {
            title: t('commons.fields.userType.title'),
            field: 'userType'
          },
          {
            title: t('commons.fields.dateLastAccess'),
            field: 'dateLastAccess',
            type: 'date',
            render: (rowData: ITableData) => {
              return doDateFormat(rowData.dateLastAccess);
            }
          }
        ]}
        remoteData={props.fetchUsers}
        filtersMenu={true}
        onAddClick={() => history.push(routes.PATH_ADMIN_CREATE_USER)}
        onRowClick={(e, rowData) => {
          history.push(`${routes.PATH_USER_PROFILE}/${rowData.identifier}`);
        }}
      />
    </GaiaContainer>
  );
};

export default UsersManagement;
