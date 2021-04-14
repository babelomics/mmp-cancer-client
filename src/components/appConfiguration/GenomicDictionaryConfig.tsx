import React from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchemaDictonaryGen } from './validationSchema';
import { Grid, Typography } from '@material-ui/core';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaButton from '../commons/GaiaButton';
import { IGenomicDictConfig } from './interfaces';
import { FormikErrors, useFormik } from 'formik';
import GaiaFabButton from '../commons/GaiaFabButton';
import { Done, Edit } from '@material-ui/icons';

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
      <Typography color="primary" variant="subtitle2" style={{ marginBottom: 20, marginTop: 30, fontWeight: 'bold' }}>
        {t('genomicDictionaryConfig.title')}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={11}>
          <Typography variant="body2">{t('commons.fields.url')}</Typography>
          <GaiaTextField fullWidth required name="url" formik={formik} disabled={!props.validationState} />
        </Grid>
        <Grid item xs={1} style={{ marginTop: 15 }}>
          {props.validationState ? (
            <GaiaFabButton color="default" icon={<Done />} size="small" onClick={formik.handleSubmit} />
          ) : (
            <GaiaFabButton color="default" icon={<Edit />} size="medium" onClick={clickModify} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default GenomicDictionaryConfig;
