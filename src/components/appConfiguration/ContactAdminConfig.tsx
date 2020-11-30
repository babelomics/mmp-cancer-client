import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import GaiaButton from '../commons/GaiaButton';
import { TextField } from '@material-ui/core';
import PopupUsersSelection from '../usersManagement/PopupUsersSelection';
import { ITableData } from '../usersManagement/interfaces';
import { IAdminConfig } from './interfaces';

interface IProps {
  ident: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  setAdminState: (adminConfig: IAdminConfig) => void;
}

export const ContactAdminConfig = (props: IProps) => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [identifierField, setIdentifier] = useState<string>(props.ident ?? '');
  const [firstNameField, setFirstName] = useState<string>(props.name ?? '');
  const [lastNameField, setLastName] = useState<string>(props.surname ?? '');
  const [emailField, setEmail] = useState<string>(props.email ?? '');

  const { t } = useTranslation();

  const setValueField = (data: ITableData) => {
    setLastName(data.lastName ?? '');
    setFirstName(data.firstName ?? '');
    setIdentifier(data.identifier ?? '');
    setEmail(data.email ?? '');

    const objAdminConfig = {
      surname: data.lastName ?? '',
      name: data.firstName ?? '',
      identifier: data.identifier ?? '',
      email: data.email ?? ''
    };
    props.setAdminState(objAdminConfig);
  };

  const clicModify = () => {
    setOpenPopup(!openPopup);
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" style={{ marginBottom: 20 }}>
        {t('appConfiguration.subTitle')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <TextField label={t('commons.fields.identifier')} fullWidth disabled required name="id" value={identifierField} />
        </Grid>
        <Grid item xs={4}>
          <TextField label={t('commons.fields.firstName')} fullWidth disabled required name="name" value={`${firstNameField} ${lastNameField}`} />
        </Grid>
        <Grid item xs={4}>
          <TextField label={t('commons.fields.email')} fullWidth disabled required name="email" value={emailField} />
        </Grid>
        <Grid item xs={2}>
          <GaiaButton text={t('commons.buttons.modify')} onClick={clicModify} />
        </Grid>
      </Grid>
      {openPopup && <PopupUsersSelection open={true} buttonType={9} openPopupParent={setOpenPopup} setValueField={setValueField} exclude={[identifierField]} />}
    </React.Fragment>
  );
};
export default ContactAdminConfig;
