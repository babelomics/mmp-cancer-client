import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { useFormik } from 'formik';

import { generateValidationSchema } from './validationSchema';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaContainer from '../commons/GaiaContainer';
import { IFormData, ITokenData } from './interfaces';
import GaiaLoading from '../commons/GaiaLoading';

interface IProps {
  loading: boolean;
  signup: (identifier: string, password: string, t: any) => void;
  tokenData?: ITokenData;
}

export const SetPassword = (props: IProps) => {
  const { signup } = props;
  const { t } = useTranslation();

  const formik = useFormik<IFormData>({
    initialValues: {
      identifier: '',
      password: ''
    },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      if (props.tokenData) {
        signup(props.tokenData.sub, values.password, t);
      }
    }
  });

  return (
    <GaiaContainer title={t('setPassword.title')} onAccept={formik.handleSubmit} hideBackButton>
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <React.Fragment>
          <h3>{t('setPassword.subtitle', { username: props.tokenData?.sub ?? '' })}</h3>
          <Grid container>
            <Grid item xs={4}>
              <GaiaTextField fullWidth type="password" required name="password" label={t('setPassword.password')} formik={formik} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <GaiaTextField fullWidth type="password" required name="passwordConfirm" label={t('setPassword.passwordConfirmation')} formik={formik} />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </GaiaContainer>
  );
};

export default SetPassword;
