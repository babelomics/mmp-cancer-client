import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikErrors } from 'formik';

import { useStyles } from './styles';
import GaiaLink from '../commons/GaiaLink';
import GaiaSelectField from '../commons/GaiaSelectField';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaButton from '../commons/GaiaButton';
import { signUpValidationSchema } from './validationSchema';
import { ISignUpForm } from './interfaces';
import GaiaLoading from '../commons/GaiaLoading';

interface IProps {
  loading: boolean;
  createRequest: (data: any, setFormikErrors: (errors: FormikErrors<ISignUpForm>) => void, t?: any, onSuccess?: () => void) => void;
  handleOpen: (state: boolean) => void;
}

const SignUp = (props: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const formik = useFormik<ISignUpForm>({
    initialValues: {
      accessType: '',
      identifier: '',
      organization: '',
      firstName: '',
      lastName: '',
      email: '',
      accessRequestReason: ''
    },
    enableReinitialize: true,
    validationSchema: signUpValidationSchema(t),
    onSubmit: (values) => {
      props.createRequest(values, formik.setErrors, t, hide);
    }
  });

  const hide = () => {
    props.handleOpen(false);
    formik.resetForm();
  };

  return (
    <React.Fragment>
      {/*  Title */}
      <Grid container>
        <Grid item xs={12}>
          <Typography color="primary" className={classes.title}>
            {t('signUp.title')}
          </Typography>
        </Grid>
        {!props.loading && (
          <Grid item xs={12}>
            <div className="d-flex">
              <Typography className={classes.subTitle}>{t('signUp.alreadyAccount')}</Typography>
              <GaiaLink className={classes.subTitle} text={t('login.title')} style={{ marginLeft: 10 }} bold onClick={hide} />
            </div>
          </Grid>
        )}
      </Grid>

      {/* Form */}
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        {props.loading ? (
          <div className={classes.loading}>
            <GaiaLoading />
          </div>
        ) : (
          <React.Fragment>
            <Grid container className={classes.formItem} spacing={3}>
              <Grid item xs={6}>
                <GaiaSelectField
                  required
                  name="accessType"
                  label={t('commons.fields.typeOfAccess.title')}
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
                  formik={formik}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container className={classes.formItem} spacing={3}>
              <Grid item xs={6}>
                <Typography className={classes.formLabel}>{t('commons.fields.user')} *</Typography>
                <GaiaTextField fullWidth required name="identifier" formik={formik} />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.formLabel}>{t('commons.fields.organization')} *</Typography>
                <GaiaTextField fullWidth required name="organization" formik={formik} />
              </Grid>
            </Grid>

            <Grid container className={classes.formItem} spacing={3}>
              <Grid item xs={6}>
                <Typography className={classes.formLabel}>{t('commons.fields.firstName')} *</Typography>
                <GaiaTextField fullWidth required name="firstName" formik={formik} />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.formLabel}>{t('commons.fields.lastName')} *</Typography>
                <GaiaTextField fullWidth required name="lastName" formik={formik} />
              </Grid>
            </Grid>

            <Grid container className={classes.formItem} spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.formLabel}>{t('commons.fields.email')} *</Typography>
                <GaiaTextField fullWidth required name="email" formik={formik} />
              </Grid>
            </Grid>

            <Grid container className={classes.formItem} spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.formLabel}>{t('signUp.reason')} *</Typography>
                <GaiaTextField fullWidth required multiline name="accessRequestReason" rows={4} formik={formik} />
              </Grid>
            </Grid>

            <Grid container className={classes.formItem} spacing={3}>
              <Grid item xs={6}>
                <GaiaButton type="submit" color="primary" text={t('commons.buttons.submit')} fullWidth disabled={formik.values.accessType !== 'Local'} />
              </Grid>
              <Grid item xs={6}>
                <GaiaButton color="secondary" text={t('commons.buttons.cancel')} fullWidth onClick={hide} />
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </form>
    </React.Fragment>
  );
};

export default SignUp;
