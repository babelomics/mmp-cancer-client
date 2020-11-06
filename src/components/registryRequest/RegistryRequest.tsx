import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';

import { generateValidationSchema } from './validationSchema';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaSelectField from '../commons/GaiaSelectField';
import GaiaContainer from '../commons/GaiaContainer';
import { IFormData } from './interfaces';
import { useHistory } from 'react-router-dom';
import routes from '../router/routes';
import GaiaRadioButtonGroup from '../commons/GaiaRadioButtonGroup';
import GaiaLoading from '../commons/GaiaLoading';
import { getUserTypeByValue } from '../../utils/roles';
import { getAccessTypeByValue } from '../../utils/accessType';
import GaiaIcon from '../commons/GaiaIcon';

interface IProps {
  loading: boolean;
  data: IFormData;
  createRequest: (data: any, t?: any) => void;
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
    return `/${path[1]}/${path[2]}` === routes.PATH_ADMIN_REVIEW_REQUEST;
  };

  const formik = useFormik({
    initialValues: { ...props.data },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      const finalValues = { ...values, userType: getUserTypeByValue(values.userType ?? 0), accessType: getAccessTypeByValue(values.accessType) };
      if (isReviewing()) {
        props.processRequest(finalValues, t);
      } else {
        props.createRequest(finalValues, t);
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

  return (
    <GaiaContainer
      icon={isReviewing() ? 'gavel' : 'person_add'}
      title={isReviewing() ? t('registryRequest.review.title') : t('registryRequest.title')}
      onAccept={props.data.attended === null ? formik.handleSubmit : undefined}
      acceptButtonText={isReviewing() ? t('commons.buttons.process') : undefined}
    >
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <GaiaSelectField required name="accessType" label={t('commons.fields.typeOfAccess.title')} formik={formik} items={['Local', 'LDAP', 'ElixirAAI']} disabled={isReviewing()} fullWidth />
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
                    label={t('commons.fields.userType.title')}
                    formik={formik}
                    items={[t('commons.fields.userType.user'), t('commons.fields.userType.admin')]}
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
