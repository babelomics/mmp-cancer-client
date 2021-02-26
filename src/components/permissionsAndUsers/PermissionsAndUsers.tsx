import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import GaiaContainer from '../commons/GaiaContainer';
import { generateValidationSchema } from './validationSchema';
import GaiaLoading from '../commons/GaiaLoading';
import { Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GaiaTabsPanel, { GaiaTab } from '../commons/GaiaTabs';
import UsersGroups from './tabs/UsersGroups';

interface IProps {
  loading: boolean;

  groupId: string;
  name: string;
  description: string;
  permission: any[];
  users: string[];
  permissionsNameList: string[];
}

export const PermissionsAndUsers = (props: IProps) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<number>(0);
  const [openPopupSearchGenes, setOpenPopupSearchGenes] = useState<boolean>(false);

  const formik = useFormik<any>({
    initialValues: {},
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {}
  });
  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  return (
    <GaiaContainer icon="vpn_key" title={'Permissions and users'}>
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <div style={{ overflow: 'auto' }}>
          <GaiaTabsPanel value={value} onChange={handleChange}>
            <GaiaTab
              title={t('permissionsAndUsers.tabs.usersGroups')}
              component={
                <UsersGroups
                  groupId={props.groupId}
                  name={props.name}
                  description={props.description}
                  permission={props.permission}
                  users={props.users}
                  permissionsNameList={props.permissionsNameList}
                />
              }
            />
            <GaiaTab title={t('permissionsAndUsers.tabs.associated')} component={<DeleteIcon />} />
            <GaiaTab title={t('permissionsAndUsers.tabs.specifics')} component={<DeleteIcon />} />
          </GaiaTabsPanel>
        </div>
      )}
    </GaiaContainer>
  );
};

export default PermissionsAndUsers;
