import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchema, modifyPasswordSchema, unsubscribeSchema } from './validationSchema';
import { useFormik } from 'formik';

import IUserProfile, { IContactAdminUpdate, IData, IPasswordModify, IUnsubscribeForm } from './interfaces';
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
import PopupUsersSelection from '../commons/popupsComponents/selectContactAdmin/PopupUsersSelection';
import routes from '../router/routes';
import { useHistory } from 'react-router-dom';

interface IProps {
  login: any;
  userProfile: IUserProfile;
  updateUser: (identifier: string, data: any, t: any) => Promise<any>;
  changePassword: (identifier: string, password: string, t: any) => void;
  unsubscribeUser: (identifier: string, t: any) => void;
  setUserSelectionPopupOpen: (open: boolean) => void;
  updateContactAdmin: (params: IContactAdminUpdate, t: any, user: any, isUnsubscribing: boolean) => void;
  fetchUserData: (identifier: string, t: any) => void;
}

export const UserProfile = (props: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openUnsubscribeModal, setOpenUnsubscribeModal] = useState(false);
  //const [selectedContactAdmin, setSelectedAdminContact] = useState<IContactAdminUpdate | null>(null);
  const [isUnsubscribing, setIsUnsubscribing] = useState<boolean>(false);

  const { data } = props.userProfile;
  const [showCheck, setShowCheck] = useState(data.userType === 0);

  useEffect(() => {
    setShowCheck(data.userType === 0);
  }, [data]);
  //  useEffect(() => {​​
  //    setShowCheck(data.userType === 0);
  //  }​​, [data]);

  const formik = useFormik<IData>({
    initialValues: { ...data },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      const finalValues = { ...data, ...values, userType: getUserTypeByValue(values.userType) };

      if (isUnsubscribing) {
        setIsUnsubscribing(false);
      }
      props.updateUser(values.identifier, finalValues, t).then((result) => {
        if (result.done) {
          props.fetchUserData(values.identifier, t);
        }
      });
    }
  });

  const passwordFormik = useFormik<IPasswordModify>({
    initialValues: { password: '', confirmPassword: '' },
    initialErrors: { password: '', confirmPassword: '' },
    enableReinitialize: true,
    validationSchema: modifyPasswordSchema(t),

    onSubmit: (values) => {
      setOpenPasswordModal(false);
      props.changePassword(data.identifier, values.password, t);
    }
  });

  const unsubscribeFormik = useFormik<IUnsubscribeForm>({
    initialValues: { confirmation: '' },
    enableReinitialize: true,
    validationSchema: unsubscribeSchema(t),
    onSubmit: () => {
      setOpenUnsubscribeModal(false);
      props.unsubscribeUser(data.identifier, t);
    }
  });

  const closePasswordModal = () => {
    setOpenPasswordModal(false);
    passwordFormik.resetForm();
  };

  const closeUnsubscribeModal = () => {
    setOpenUnsubscribeModal(false);
    unsubscribeFormik.resetForm();
  };

  const handleCheck = (event: any, child: any) => {
    formik.setFieldValue('canCreateProject', false);
    if (event.target.value === 0) {
      setShowCheck(true);
    } else {
      setShowCheck(false);
    }
  };

  const backScreenBefore = () => {
    history.push(routes.PATH_USERS_MANAGEMENT);
  };

  return (
    <GaiaContainer icon="assignment_ind" title={t('userProfile.title')} onAccept={!props.userProfile.loading ? formik.handleSubmit : undefined} onBack={backScreenBefore}>
      {/* Password Modal */}
      <GaiaModalFormik open={openPasswordModal} title={t('userProfile.modifyPassword')} formik={passwordFormik} onClose={closePasswordModal} onSubmit={passwordFormik.handleSubmit}>
        <GaiaTextField required type="password" name="password" label={t('userProfile.password')} formik={passwordFormik} fullWidth />
        <GaiaTextField required type="password" name="confirmPassword" label={t('userProfile.repeatPassword')} formik={passwordFormik} fullWidth />
      </GaiaModalFormik>

      {/* Unsubscribe Modal */}
      <GaiaModalFormik
        open={openUnsubscribeModal}
        title={t('userProfile.unsubscribe.title')}
        formik={unsubscribeFormik}
        onClose={closeUnsubscribeModal}
        //onSubmit={closeUnsubscribeModal}
      >
        <Typography variant="body1">{t('userProfile.unsubscribe.description')}</Typography>
        <GaiaTextField required name="confirmation" label={t('commons.fields.confirmation')} formik={unsubscribeFormik} fullWidth />
      </GaiaModalFormik>

      {/* User Selection Popup */}
      <PopupUsersSelection
        titlePopup={t('usersManagement.titlePopupAdmin')}
        open={props.userProfile.showUserSelectionPopup}
        openPopupParent={props.setUserSelectionPopupOpen}
        setValueField={(selectedUser) => {
          const updatedContactData = { contactIdentifier: selectedUser.identifier, contactName: selectedUser.firstName, contactLastName: selectedUser.lastName, contactEmail: selectedUser.email };
          //setSelectedAdminContact(updatedContactData);
          if (isUnsubscribing) {
            props.updateContactAdmin(updatedContactData, t, data, true);
          } else {
            const finalValues = { ...data, ...formik.values, userType: getUserTypeByValue(formik.values.userType) };
            props.updateContactAdmin(updatedContactData, t, finalValues, false);
          }
        }}
        exclude={[props.userProfile.data.identifier]}
      />

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
              <GaiaTextField fullWidth required name="firstName" label={t('commons.fields.name')} formik={formik} />
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
              {!props.login.user.isAdmin || (showCheck && <GaiaCheckBox name="canCreateProject" formik={formik} text={t('commons.fields.projectCreationPermission')} labelPlacement="start" />)}
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            {props.login.user.isAdmin && (
              <Grid item xs={4}>
                <GaiaSelectField
                  required
                  name="userType"
                  label={t('commons.fields.userType')}
                  formik={formik}
                  items={[t('userProfile.userType.user'), t('userProfile.userType.admin')]}
                  fullWidth
                  onChange={handleCheck}
                />
              </Grid>
            )}
            <Grid item xs={8}>
              <div style={{ display: 'inline-block', marginRight: '20px' }}>
                <GaiaLink text={t('userProfile.modifyPassword')} onClick={() => setOpenPasswordModal(true)} />
              </div>
              <div style={{ display: 'inline-block' }}>
                <GaiaButton
                  text={t('userProfile.userUnsubscribe')}
                  onClick={(e) => {
                    setOpenUnsubscribeModal(true);
                    setIsUnsubscribing(true);
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </GaiaContainer>
  );
};

export default UserProfile;
