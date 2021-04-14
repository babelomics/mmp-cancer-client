import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import PopupUsersSelection from '../commons/popupsComponents/selectUserPopup/PopupUsersSelection';
import { User } from '../usersManagement/interfaces';
import { IConfiguration } from './interfaces';
import GaiaFabButton from '../commons/GaiaFabButton';
import { Edit } from '@material-ui/icons';
import GaiaTextField from '../commons/GaiaTextField';

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
      <Typography color="primary" variant="subtitle2" style={{ marginBottom: 20, fontWeight: 'bold' }}>
        {t('appConfiguration.subTitle')}
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={3}>
          <Typography variant="body2">{t('commons.fields.identifier')}</Typography>
          <GaiaTextField fullWidth disabled required name="id" value={props.identifier} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">{t('commons.fields.name')}</Typography>
          <GaiaTextField fullWidth disabled required name="name" value={props.name && props.surname ? `${props.name} ${props.surname}` : ''} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">{t('commons.fields.email')}</Typography>
          <GaiaTextField fullWidth disabled required name="email" value={props.email} />
        </Grid>
        <Grid item xs={1} style={{ marginTop: 15 }}>
          <GaiaFabButton color="default" size="medium" icon={<Edit />} onClick={clicModify} />
        </Grid>
      </Grid>
      {openPopup && (
        <PopupUsersSelection
          titlePopup={t('appConfiguration.contactManagementPopupTitle')}
          open={true}
          openPopupParent={setOpenPopup}
          setValueField={setValueField}
          exclude={[props.identifier]}
          showAdminsOnly
        />
      )}
    </React.Fragment>
  );
};
export default ContactAdminConfig;
