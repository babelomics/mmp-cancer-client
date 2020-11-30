import React from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchema } from './validationSchema';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

import ILoginState, { ILoginForm } from './interfaces';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaSelectField from '../commons/GaiaSelectField';
import GaiaLink from '../commons/GaiaLink';
import GaiaButton from '../commons/GaiaButton';
import GaiaLoadingModal from '../commons/GaiaLoadingModal';
import routes from '../router/routes';

interface IProps {
  login: ILoginState;
  doLogin: (data: ILoginForm) => void;
}

const useStyles = makeStyles((theme) => ({
  loginWrapper: {
    backgroundColor: '#F3F3F3',
    width: '35%',
    margin: '0 auto',
    display: 'block',
    padding: theme.spacing(4),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10)
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
  title: {
    marginLeft: theme.spacing(4)
  },
  form: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  },
  formItem: {
    marginTop: theme.spacing(6)
  },
  alert: {
    marginBottom: theme.spacing(4)
  }
}));

export const Login = (props: IProps) => {
  const { doLogin, login } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const formik = useFormik({
    initialValues: { type: 0, username: '', password: '' },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      doLogin(values);
    }
  });

  return (
    <div className={classes.loginWrapper}>
      <GaiaLoadingModal open={login.loading} title={t('commons.loading.signIn')} />
      <div className={classes.titleWrapper}>
        Logo
        <Typography variant="h5" className={classes.title}>
          {t('login.title')}
        </Typography>
      </div>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Grid container justify="center" alignItems="center">
          {login.error && (
            <Grid item xs={12}>
              <Alert variant="filled" severity="error" className={classes.alert}>
                {t('login.messages.loginError')}
              </Alert>
            </Grid>
          )}
          <Grid className={classes.formItem} item xs={12}>
            <GaiaSelectField required name="type" label={t('commons.fields.typeOfAccess.title')} formik={formik} items={['Local', 'LDAP', 'ElixirAAI']} fullWidth />
          </Grid>
          <Grid className={classes.formItem} item xs={12}>
            <GaiaTextField required name="username" label={t('commons.fields.identifier')} formik={formik} />
          </Grid>
          <Grid className={classes.formItem} item xs={12}>
            <GaiaTextField required type="password" name="password" label={t('commons.fields.password')} formik={formik} />
          </Grid>
          <Grid className={classes.formItem} item xs={12}>
            <GaiaButton text={t('commons.buttons.signIn')} type="submit" disabled={formik.values.type !== 0} uppercase fullWidth />
          </Grid>
          <Grid style={{ marginTop: 15 }} item xs={12}>
            <GaiaButton text={t('commons.buttons.goBack')} type="button" uppercase fullWidth onClick={() => history.goBack()} />
          </Grid>
          <Grid className={classes.formItem} item xs={6}>
            <GaiaLink text={t('login.forgotPassword')} onClick={() => history.push(routes.PATH_FORGOT_PASSWORD)} />
          </Grid>
          <Grid className={classes.formItem} item xs={6}>
            <GaiaLink text={t('login.signup')} onClick={() => history.push(routes.PATH_SIGNUP)} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
