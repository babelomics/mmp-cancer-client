import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import GaiaButton from '../commons/GaiaButton';
import { TextField } from '@material-ui/core';
import PopupUsersSelection from '../commons/popupsComponents/selectContactAdmin/PopupUsersSelection';
import { User } from '../usersManagement/interfaces';
import { IConfiguration } from './interfaces';

interface IProps {
  identifier: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  updateConfigData: (config: IConfiguration) => void;
}

export const ContactAdminConfig = (props: IProps) => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const { t } = useTranslation();

  const setValueField = (data: User) => {
    props.updateConfigData({ contactEmail: data.email ?? '', contactIdentifier: data.identifier ?? '', contactLastName: data.lastName ?? '', contactName: data.firstName ?? '' });
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
          <TextField label={t('commons.fields.identifier')} fullWidth disabled required name="id" value={props.identifier} />
        </Grid>
        <Grid item xs={4}>
          <TextField label={t('commons.fields.name')} fullWidth disabled required name="name" value={props.name && props.surname ? `${props.name} ${props.surname}` : ''} />
        </Grid>
        <Grid item xs={4}>
          <TextField label={t('commons.fields.email')} fullWidth disabled required name="email" value={props.email} />
        </Grid>
        <Grid item xs={2}>
          <GaiaButton text={t('commons.buttons.modify')} onClick={clicModify} />
        </Grid>
      </Grid>
      {openPopup && (
        <PopupUsersSelection titlePopup={t('appConfiguration.contactManagementPopupTitle')} open={true} openPopupParent={setOpenPopup} setValueField={setValueField} exclude={[props.identifier]} />
      )}
    </React.Fragment>
  );
};
export default ContactAdminConfig;
