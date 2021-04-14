import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse, Drawer, Grid, Typography } from '@material-ui/core';
import { useFormik, FormikErrors } from 'formik';
import { useHistory } from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import parse from 'html-react-parser';

import { loginValidationSchema } from './validationSchema';
import ILoginState, { ILoginForm, ISignUpForm } from './interfaces';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaSelectField from '../commons/GaiaSelectField';
import GaiaLink from '../commons/GaiaLink';
import GaiaButton from '../commons/GaiaButton';
import routes from '../router/routes';
import GaiaLoading from '../commons/GaiaLoading';
import { useStyles } from './styles';
import SignUp from './SignUp';

interface IProps {
  login: ILoginState;
  doLogin: (data: ILoginForm) => void;
  errLogin: (textMessage: null | string) => void;
  // SignUp
  createRequest: (data: any, setFormikErrors: (errors: FormikErrors<ISignUpForm>) => void, t?: any, onSuccess?: () => void) => void;
}

export const Login = (props: IProps) => {
  const { doLogin, login } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const [openAboutInfo, setOpenAboutInfo] = useState<boolean>(false);
  const [openInstallInfo, setOpenInstallInfo] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { type: '', username: '', password: '' },
    enableReinitialize: true,
    validationSchema: loginValidationSchema(t),
    onSubmit: (values) => {
      doLogin(values);
    }
  });

  return (
    <div className={classes.bg}>
      {/* Signup */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={openSignup}
        onClose={() => setOpenSignup(false)}
        classes={{
          paper: classes.drawerPaper
        }}
        hideBackdrop
      >
        <SignUp loading={props.login.loading} createRequest={props.createRequest} handleOpen={setOpenSignup} />
      </Drawer>

      {/* Login */}
      <div className={classes.loginBox}>
        <div className={classes.loginContent}>
          <Grid container spacing={3}>
            {/*  Title */}
            <Grid container>
              <Grid item xs={12}>
                <Typography color="primary" className={classes.title}>
                  {t('login.title')}
                </Typography>
              </Grid>
              {!login.loading && (
                <Grid item xs={12}>
                  <div className="d-flex">
                    <Typography className={classes.subTitle}>{t('login.noAccount')}</Typography>
                    <GaiaLink className={classes.subTitle} text={t('login.signUp')} onClick={() => setOpenSignup(true)} style={{ marginLeft: 10 }} bold />
                  </div>
                </Grid>
              )}
            </Grid>

            <form onSubmit={login.loading ? undefined : formik.handleSubmit} style={{ width: '100%' }}>
              {login.loading ? (
                <div className={classes.loading}>
                  <GaiaLoading />
                </div>
              ) : (
                <React.Fragment>
                  {/* Form */}
                  <Grid container className={classes.formItem}>
                    <Grid item xs={12}>
                      <GaiaSelectField
                        required
                        name="type"
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

                  {/* Identifier */}
                  <Grid container className={classes.formItem}>
                    <Typography style={{ fontWeight: 'bold', marginBottom: 5 }}>{t('commons.fields.user')} *</Typography>
                    <Grid item xs={12}>
                      <GaiaTextField required name="username" formik={formik} />
                    </Grid>
                  </Grid>

                  {/* Password */}
                  <Grid container className={classes.formItem}>
                    <Grid container style={{ marginBottom: 5 }}>
                      <Grid item xs={6}>
                        <Typography style={{ fontWeight: 'bold' }}>{t('commons.fields.password')} *</Typography>
                      </Grid>
                      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <GaiaLink text={t('login.forgotPassword')} onClick={() => history.push(routes.PATH_FORGOT_PASSWORD)} bold style={{ fontSize: 14 }} />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <GaiaTextField required type="password" name="password" formik={formik} />
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}

              {/* Sign in / Cancel button */}
              <Grid container style={{ marginTop: 45 }}>
                <Grid item xs={12}>
                  <GaiaButton
                    type="submit"
                    color={login.loading ? 'secondary' : 'primary'}
                    text={login.loading ? t('commons.buttons.cancel') : t('commons.buttons.signIn')}
                    disabled={formik.values.type !== 'Local'}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </div>
        <div className={classes.alert}>{login.error && !login.loading && t('login.messages.loginError')}</div>
      </div>

      {/* Info */}
      <div className={classes.infoWrapper}>
        <div className={classes.infoTitle} onClick={() => setOpenAboutInfo(!openAboutInfo)}>
          {openAboutInfo ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          <Typography>{t('launch.administrationInfoTitle')}</Typography>
        </div>
        <Collapse in={openAboutInfo}>
          <Typography className={classes.infoDescription} variant="body2">
            {parse(props.login.configData.text?.replace(/style="(.*?)"/g, '') || '')}
          </Typography>
          <Typography className={classes.infoDescription} variant="body2">
            {`${t('launch.contactEmail')} ${props.login.configData.email}`}
          </Typography>
        </Collapse>
        <div className={classes.infoTitle} onClick={() => setOpenInstallInfo(!openInstallInfo)}>
          {openInstallInfo ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          <Typography>{t('launch.installationInfoTitle')}</Typography>
        </div>
        <Collapse in={openInstallInfo}>
          <Typography className={classes.infoDescription} variant="body2">
            {t('launch.administrationInfoText')}
          </Typography>
        </Collapse>
      </div>
    </div>
  );
};

export default Login;
