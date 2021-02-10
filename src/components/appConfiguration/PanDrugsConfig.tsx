import React from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchemaPanDrugs } from './validationSchema';
import { IPandrugsConfig } from './interfaces';
import { Grid, Typography } from '@material-ui/core';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaButton from '../commons/GaiaButton';
import { FormikErrors, useFormik } from 'formik';

interface IProps {
  pandrugUrl: string | undefined;
  pandrugUser: string | undefined;
  pandrugPassword: string | undefined;
  pandrugEmail: string | undefined;
  validationState: boolean;
  apiValidPanDrugs: (pandrugsConfig: IPandrugsConfig, setFormikErrors: (errors: FormikErrors<IPandrugsConfig>) => void, t: any) => void;
  setValidationPandrug: (validationState: boolean) => void;
}

export const PanDrugsConfig = (props: IProps) => {
  const { t } = useTranslation();

  const formik = useFormik<IPandrugsConfig>({
    initialValues: {
      url: props.pandrugUrl ?? '',
      user: props.pandrugUser ?? '',
      password: props.pandrugPassword ?? '',
      email: props.pandrugEmail ?? ''
    },
    enableReinitialize: true,
    validationSchema: generateValidationSchemaPanDrugs(t),
    onSubmit: (values) => {
      props.setValidationPandrug(false);
      props.apiValidPanDrugs({ user: values.user, password: values.password, url: values.url, email: values.email }, formik.setErrors, t);
    }
  });

  const clickModify = () => {
    props.setValidationPandrug(true);
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" style={{ marginBottom: 20 }}>
        {t('panDrugsConfig.title')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <GaiaTextField fullWidth variant={props.validationState ? 'filled' : 'standard'} required name="url" label={t('commons.fields.url')} formik={formik} disabled={!props.validationState} />
        </Grid>
        <Grid item xs={3}>
          <GaiaTextField fullWidth variant={props.validationState ? 'filled' : 'standard'} required name="email" label={t('commons.fields.email')} formik={formik} disabled={!props.validationState} />
        </Grid>
        <Grid item xs={2}>
          <GaiaTextField fullWidth variant={props.validationState ? 'filled' : 'standard'} required name="user" label={t('commons.fields.user')} formik={formik} disabled={!props.validationState} />
        </Grid>
        <Grid item xs={2}>
          <GaiaTextField
            fullWidth
            variant={props.validationState ? 'filled' : 'standard'}
            type="password"
            required
            name="password"
            label={t('commons.fields.password')}
            formik={formik}
            disabled={!props.validationState}
          />
        </Grid>
        <Grid item xs={2}>
          {props.validationState ? <GaiaButton text={t('commons.buttons.validation')} onClick={formik.handleSubmit} /> : <GaiaButton text={t('commons.buttons.modify')} onClick={clickModify} />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default PanDrugsConfig;
