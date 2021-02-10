import React from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchemaDictonaryGen } from './validationSchema';
import { Grid, Typography } from '@material-ui/core';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaButton from '../commons/GaiaButton';
import { IGenomicDictConfig } from './interfaces';
import { FormikErrors, useFormik } from 'formik';

interface IProps {
  genomicDictionaryURL: string | undefined;
  validationState: boolean;
  apiValidUrl: (url: string, setFormikErrors: (errors: FormikErrors<IGenomicDictConfig>) => void, t: any) => void;
  setValidationGenomDict: (validationState: boolean) => void;
}

export const GenomicDictionaryConfig = (props: IProps) => {
  const { t } = useTranslation();

  const formik = useFormik<IGenomicDictConfig>({
    initialValues: {
      url: props.genomicDictionaryURL ?? ''
    },
    enableReinitialize: true,
    validationSchema: generateValidationSchemaDictonaryGen(t),
    onSubmit: (values) => {
      props.apiValidUrl(values.url, formik.setErrors, t);
    }
  });

  const clickModify = () => {
    props.setValidationGenomDict(true);
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" style={{ marginBottom: 20, marginTop: 30 }}>
        {t('genomicDictionaryConfig.title')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GaiaTextField fullWidth variant={props.validationState ? 'filled' : 'standard'} required name="url" label={t('commons.fields.url')} formik={formik} disabled={!props.validationState} />
        </Grid>
        <Grid item xs={3} style={{ marginLeft: 70 }}>
          {props.validationState ? <GaiaButton text={t('commons.buttons.validation')} onClick={formik.handleSubmit} /> : <GaiaButton text={t('commons.buttons.modify')} onClick={clickModify} />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default GenomicDictionaryConfig;
