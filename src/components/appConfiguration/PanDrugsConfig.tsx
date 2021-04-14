import React from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchemaPanDrugs } from './validationSchema';
import { IPandrugsConfig } from './interfaces';
import { Grid, Typography } from '@material-ui/core';
import GaiaTextField from '../commons/GaiaTextField';
import { FormikErrors, useFormik } from 'formik';
import GaiaFabButton from '../commons/GaiaFabButton';
import { Done, Edit } from '@material-ui/icons';

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
      <Typography color="primary" variant="subtitle2" style={{ marginBottom: 20, fontWeight: 'bold' }}>
        {t('panDrugsConfig.title')}
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={3}>
          <Typography variant="body2">{t('commons.fields.url')}</Typography>
          <GaiaTextField fullWidth required name="url" formik={formik} disabled={!props.validationState} />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">{t('commons.fields.email')}</Typography>
          <GaiaTextField fullWidth required name="email" formik={formik} disabled={!props.validationState} />
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2">{t('commons.fields.user')}</Typography>
          <GaiaTextField fullWidth required name="user" formik={formik} disabled={!props.validationState} />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">{t('commons.fields.password')}</Typography>
          <GaiaTextField fullWidth type="password" required name="password" formik={formik} disabled={!props.validationState} />
        </Grid>
        <Grid item xs={1} style={{ marginTop: 15 }}>
          {props.validationState ? (
            <GaiaFabButton color="default" icon={<Done />} size="medium" onClick={formik.handleSubmit} />
          ) : (
            <GaiaFabButton color="default" icon={<Edit />} size="medium" onClick={clickModify} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default PanDrugsConfig;
