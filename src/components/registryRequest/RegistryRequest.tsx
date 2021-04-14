import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { FormikErrors, useFormik } from 'formik';

import { generateValidationSchema } from './validationSchema';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaSelectField from '../commons/GaiaSelectField';
import GaiaContainer from '../commons/GaiaContainer';
import { IFormData } from './interfaces';
import { useHistory } from 'react-router-dom';
import routes from '../router/routes';
import GaiaRadioButtonGroup from '../commons/GaiaRadioButtonGroup';
import GaiaLoading from '../commons/GaiaLoading';
import GaiaIcon from '../commons/GaiaIcon';
import { initialState } from './duck';

interface IProps {
  loading: boolean;
  data: IFormData;
  createRequest: (data: any, setFormikErrors: (errors: FormikErrors<IFormData>) => void, t?: any) => void;
  processRequest: (data: any, t?: any) => void;
}

const useStyles = makeStyles((theme) => ({
  attendContainer: {
    display: 'flex'
  },
  icon: {
    marginRight: 10
  }
}));

export const RegistryRequest = (props: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const isReviewing = () => {
    // TODO: Check if user is admin
    const path = history.location.pathname.split('/');
    return `/${path[1]}` === routes.PATH_ADMIN_REVIEW_REQUEST;
  };

  const resetAccessRefusalReason = () => {
    formik.setFieldValue('accessRefusalReason', '');
  };

  const formik = useFormik({
    initialValues: isReviewing() ? { ...props.data } : { ...initialState.data },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      if (isReviewing()) {
        props.processRequest(values, t);
      } else {
        props.createRequest(values, formik.setErrors, t);
      }
    }
  });

  const renderAttendedText = () => {
    return (
      <div className={classes.attendContainer}>
        <GaiaIcon icon={props.data.attended === 'approve' ? 'check_circle' : 'cancel'} size={35} className={classes.icon} />
        <Typography variant="h6">{props.data.attended === 'approve' ? t('registryRequest.review.approved') : t('registryRequest.review.denied')}</Typography>
      </div>
    );
  };
  const backScreenBefore = () => {
    history.push(routes.PATH_REGISTRATION_MANAGEMENT);
  };

  return (
    <GaiaContainer
      icon={isReviewing() ? 'gavel' : 'person_add'}
      title={isReviewing() ? t('registryRequest.review.title') : t('registryRequest.title')}
      onAccept={props.data.attended === null ? formik.handleSubmit : undefined}
      acceptButtonText={isReviewing() ? t('commons.buttons.process') : undefined}
      onBack={backScreenBefore}
    >
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <GaiaSelectField
                required
                name="accessType"
                label={t('commons.fields.typeOfAccess.title')}
                formik={formik}
                valueAccessor="key"
                labelAccessor="value"
                items={[
                  {
                    key: 'Local',
                    value: 'Local'
                  },
                  {
                    key: 'LDAP',
                    value: 'LDAP'
                  },
                  {
                    key: 'Elixir',
                    value: 'ElixirAAI'
                  }
                ]}
                disabled={isReviewing()}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <GaiaTextField fullWidth required name="identifier" label={t('commons.fields.identifier')} formik={formik} disabled={isReviewing()} />
            </Grid>
            <Grid item xs={4}>
              <GaiaTextField fullWidth required name="organization" label={t('commons.fields.organization')} formik={formik} disabled={isReviewing()} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <GaiaTextField fullWidth required name="firstName" label={t('commons.fields.firstName')} formik={formik} disabled={isReviewing()} />
            </Grid>
            <Grid item xs={4}>
              <GaiaTextField fullWidth required name="lastName" label={t('commons.fields.lastName')} formik={formik} disabled={isReviewing()} />
            </Grid>
            <Grid item xs={4}>
              <GaiaTextField fullWidth required name="email" label={t('commons.fields.email')} formik={formik} disabled={isReviewing()} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <GaiaTextField fullWidth required multiline name="accessRequestReason" rows={4} label={t('registryRequest.reason')} formik={formik} disabled={isReviewing()} />
            </Grid>
          </Grid>

          {isReviewing() && (
            <Grid container spacing={3}>
              {formik.values.attended !== 'reject' ? (
                <Grid item xs={4}>
                  <GaiaSelectField
                    required
                    name="userType"
                    label={t('commons.fields.userType')}
                    formik={formik}
                    valueAccessor="key"
                    labelAccessor="value"
                    items={[
                      {
                        key: 'User',
                        value: t('commons.fields.userTypeOptions.user')
                      },
                      {
                        key: 'Admin',
                        value: t('commons.fields.userTypeOptions.admin')
                      }
                    ]}
                    disabled={props.data.attended !== null}
                    fullWidth
                  />
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <GaiaTextField name="accessRefusalReason" label={t('registryRequest.review.denyReasonLabel')} formik={formik} disabled={props.data.attended !== null} multiline />
                </Grid>
              )}

              <Grid container item xs={formik.values.attended !== 'reject' ? 8 : 6} justify="flex-end" alignItems="flex-end">
                {props.data.attended ? (
                  renderAttendedText()
                ) : (
                  <GaiaRadioButtonGroup
                    name="attended"
                    formik={formik}
                    onChange={resetAccessRefusalReason}
                    items={[
                      {
                        label: t('registryRequest.review.approve'),
                        value: 'approve'
                      },
                      {
                        label: t('registryRequest.review.deny'),
                        value: 'reject'
                      }
                    ]}
                  />
                )}
              </Grid>
            </Grid>
          )}
        </React.Fragment>
      )}
    </GaiaContainer>
  );
};

export default RegistryRequest;
