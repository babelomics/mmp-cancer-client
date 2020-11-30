import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchemaDictonaryGen } from './validationSchema';
import { IFormDataDicGen } from './interfaces';
import { Grid, Typography } from '@material-ui/core';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaButton from '../commons/GaiaButton';
import ConfigPopup from './ConfigPopup';
import { IGenomicDictConfig } from './interfaces';
import { FormikErrors, useFormik } from 'formik';

interface IProps {
  cellbaseURL: string | undefined;
  validationState: boolean;
  setValidationParentState: (state: boolean) => void;
  setGenomicDictParentState: (genomicDictConfig: IGenomicDictConfig) => void;
  apiValidUrl: (url: string, FormikErrors?: any) => Promise<any>;
}

export const GenomicDictionaryConfig = (props: IProps) => {
  // this state will be used to save the response of the PanDrugsConfig modification attempt
  const [resultValidation, setResultValidation] = useState<number>(0);
  const { t } = useTranslation();

  const formik = useFormik<IFormDataDicGen>({
    initialValues: {
      url: props.cellbaseURL ?? 'http://cellbase.clinbioinfosspa.es/cellbase-4.6.3/webservices/rest/'
    },
    enableReinitialize: true,
    validationSchema: generateValidationSchemaDictonaryGen(t),
    onSubmit: (values) => {
      // ADD PROMISE VALIDATION
      props.setValidationParentState(!props.validationState);
      props
        .apiValidUrl(values.url)
        .then((result) => {
          setResultValidation(result.code);
          switch (result.code) {
            case 200:
              setResultValidation(200);
              props.setGenomicDictParentState({ url: values.url });
              break;
            default:
              setResultValidation(1);
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 401:
              setResultValidation(401);
              props.setValidationParentState(!props.validationState);
              break;
            case 404:
              setResultValidation(404);
              props.setValidationParentState(!props.validationState);
              break;
            default:
              setResultValidation(1);
          }
        });
    }
  });

  const clickModify = () => {
    props.setValidationParentState(!props.validationState);
    setResultValidation(0);
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
      {resultValidation === 200 && <ConfigPopup message={t('genomicDictionaryConfig.messages.success')} open={true} type={'success'} buttonType={1} />}
      {resultValidation === 400 && <ConfigPopup message={t('genomicDictionaryConfig.messages.invalid')} open={true} type={'success'} buttonType={1} />}
      {resultValidation === 1 && <ConfigPopup message={t('genomicDictionaryConfig.messages.unknowwn')} open={true} type={'success'} buttonType={1} />}
    </React.Fragment>
  );
};
export default GenomicDictionaryConfig;
