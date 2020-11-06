import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { useFormik } from 'formik';

import GaiaTextField from '../commons/GaiaTextField';
import { IFormData } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import { generateValidationSchema } from './validationSchema';
import GaiaLoading from '../commons/GaiaLoading';

interface IProps {
  loading: boolean;
  requestPassword: (data: string, t: any) => void;
}

export const ForgotPassword = (props: IProps) => {
  const { t } = useTranslation();

  const formik = useFormik<IFormData>({
    initialValues: {
      identifier: '',
      email: ''
    },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      let data = null;

      if (values.identifier) {
        data = values.identifier;
      }
      if (values.email) {
        data = values.email;
      }

      if (data) {
        props.requestPassword(data, t);
      }
    }
  });

  return (
    <GaiaContainer title={t('forgotPassword.title')} onAccept={formik.handleSubmit}>
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <React.Fragment>
          <h3>{t('forgotPassword.subtitle')}</h3>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <GaiaTextField fullWidth name="identifier" label={t('commons.fields.identifier')} formik={formik} />
            </Grid>
            <Grid item xs={6}>
              <GaiaTextField fullWidth name="email" label={t('commons.fields.email')} formik={formik} />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </GaiaContainer>
  );
};

export default ForgotPassword;
