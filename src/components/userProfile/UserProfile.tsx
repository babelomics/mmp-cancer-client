import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchema, modifyPasswordSchema, unsubscribeSchema } from './validationSchema';
import { useFormik } from 'formik';

import IUserProfile, { IData, IPasswordModify, IUnsubscribeForm } from './interfaces';
// import GaiaUserProfile from '../commons/GaiaUserProfile';
import GaiaContainer from '../commons/GaiaContainer';
import { Grid, Typography } from '@material-ui/core';
import GaiaModalFormik from '../commons/GaiaModalFormik';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaDatePicker from '../commons/GaiaDatePicker';
import GaiaSelectField from '../commons/GaiaSelectField';
import GaiaLink from '../commons/GaiaLink';
import GaiaCheckBox from '../commons/GaiaCheckBox';
import GaiaButton from '../commons/GaiaButton';
import GaiaLoading from '../commons/GaiaLoading';
import { getUserTypeByValue } from '../../utils/roles';

interface IProps {
  login: any;
  userProfile: IUserProfile;
  updateUser: (identifier: string, data: any) => void;
  changePassword: (identifier: string, password: string) => void;
  unsubscribeUser: (identifier: string, t: any) => void;
}

export const UserProfile = (props: IProps) => {
  const { t } = useTranslation();

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openUnsubscribeModal, setOpenUnsubscribeModal] = useState(false);

  const { data } = props.userProfile;

  const formik = useFormik<IData>({
    initialValues: { ...data },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      const finalValues = { ...data, ...values, userType: getUserTypeByValue(values.userType) };
      props.updateUser(values.identifier, finalValues);
    }
  });

  const passwordFormik = useFormik<IPasswordModify>({
    initialValues: { password: '', confirmPassword: '' },
    initialErrors: { password: '', confirmPassword: '' },
    enableReinitialize: true,
    validationSchema: modifyPasswordSchema(t),
    onSubmit: (values) => {
      props.changePassword(data.identifier, values.password);
    }
  });

  const unsubscribeFormik = useFormik<IUnsubscribeForm>({
    initialValues: { confirmation: '' },
    enableReinitialize: true,
    validationSchema: unsubscribeSchema(t),
    onSubmit: () => {
      props.unsubscribeUser(data.identifier, t);
    }
  });

  const closePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  const closeUnsubscribeModal = () => {
    setOpenUnsubscribeModal(false);
  };

  return (
    <GaiaContainer icon="assignment_ind" title={t('userProfile.title')} onAccept={!props.userProfile.loading ? formik.handleSubmit : undefined}>
      {/* Password Modal */}
      <GaiaModalFormik open={openPasswordModal} title={t('userProfile.modifyPassword')} formik={passwordFormik} onClose={closePasswordModal} onSubmit={closePasswordModal}>
        <GaiaTextField required type="password" name="password" label={t('userProfile.password')} formik={passwordFormik} fullWidth />
        <GaiaTextField required type="password" name="confirmPassword" label={t('userProfile.repeatPassword')} formik={passwordFormik} fullWidth />
      </GaiaModalFormik>

      {/* Unsubscribe Modal */}
      <GaiaModalFormik open={openUnsubscribeModal} title={t('userProfile.unsubscribe.title')} formik={unsubscribeFormik} onClose={closeUnsubscribeModal} onSubmit={closeUnsubscribeModal}>
        <Typography variant="body1">{t('userProfile.unsubscribe.description')}</Typography>
        <GaiaTextField required name="confirmation" label={t('commons.fields.confirmation')} formik={unsubscribeFormik} fullWidth />
      </GaiaModalFormik>

      {props.userProfile.loading ? (
        <GaiaLoading />
      ) : (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <GaiaTextField fullWidth required name="identifier" label={t('commons.fields.identifier')} formik={formik} disabled />
            </Grid>
            <Grid item xs={4}>
              <GaiaTextField fullWidth required name="organization" label={t('commons.fields.organization')} formik={formik} disabled />
            </Grid>
            <Grid item xs={4}>
              <GaiaDatePicker name="dateCreated" formik={formik} fullWidth label={t('userProfile.creationDate')} disabled />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <GaiaTextField fullWidth required name="firstName" label={t('commons.fields.firstName')} formik={formik} />
            </Grid>
            <Grid item xs={4}>
              <GaiaTextField fullWidth required name="lastName" label={t('commons.fields.lastName')} formik={formik} />
            </Grid>
            <Grid item xs={4}>
              <GaiaDatePicker name="dateLastAccess" formik={formik} fullWidth label={t('userProfile.lastAccessDate')} disabled />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={8}>
              <GaiaTextField fullWidth required name="email" label={t('commons.fields.email')} formik={formik} />
            </Grid>
            <Grid item xs={4}>
              <GaiaLink text={t('userProfile.modifyPassword')} onClick={() => setOpenPasswordModal(true)} />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            {props.login.user.isAdmin && (
              <Grid item xs={4}>
                <GaiaSelectField
                  required
                  name="userType"
                  label={t('commons.fields.userType.title')}
                  formik={formik}
                  items={[t('userProfile.userType.user'), t('userProfile.userType.admin')]}
                  fullWidth
                />
              </Grid>
            )}
            {!props.login.user.isAdmin ||
              (data.userType === 0 && (
                <Grid item xs={4}>
                  <GaiaCheckBox name="projectPermissions" text={t('userProfile.projectPermissions')} labelPlacement="start" />
                </Grid>
              ))}
            <Grid item xs={4}>
              <GaiaButton text={t('userProfile.userUnsubscribe')} onClick={(e) => setOpenUnsubscribeModal(true)} />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </GaiaContainer>
  );
};

export default UserProfile;
