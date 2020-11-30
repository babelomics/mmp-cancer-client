import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchemaPanDrugs } from './validationSchema';
import { IFormDataPanDrugs } from './interfaces';
import { Grid, Typography } from '@material-ui/core';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaButton from '../commons/GaiaButton';
import { FormikErrors, useFormik } from 'formik';
import ConfigPopup from './ConfigPopup';
import { IPandrugsConfig } from './interfaces';

interface IProps {
  pandrugUrl: string | undefined;
  pandrugUser: string | undefined;
  pandrugPassword: string | undefined;
  pandrugEmail: string | undefined;
  validationState: boolean;
  setValidationParentState: (state: boolean) => void;
  setPundrugsParentState: (pandrugsConfig: IPandrugsConfig) => void;
  apiValidPanDrugs: (user: string, password: string, url: string) => Promise<any>;
  apiCreatePanDrugsUser: (user: string, password: string, url: string, email: string) => Promise<any>;
}

export const PanDrugsConfig = (props: IProps) => {
  // this state will be used to save the response of the PanDrugsConfig modification attempt
  const [resultValidation, setResultValidation] = useState<number>(0);

  const setStateToParent = (values: IPandrugsConfig) => {
    let objPandrugsConfig = {
      user: values.user,
      password: values.password,
      email: values.email,
      url: values.url
    };
    props.setPundrugsParentState(objPandrugsConfig);
  };

  const { t } = useTranslation();
  const formik = useFormik<IFormDataPanDrugs>({
    initialValues: {
      url: props.pandrugUrl ?? 'https://www.pandrugs.org/pandrugs-backend',
      user: props.pandrugUser ?? '',
      password: props.pandrugPassword ?? '',
      email: props.pandrugEmail ?? ''
    },
    enableReinitialize: true,
    validationSchema: generateValidationSchemaPanDrugs(t),
    onSubmit: (values) => {
      props.setValidationParentState(!props.validationState);
      props
        .apiValidPanDrugs(values.user, values.password, values.url)
        .then((result) => {
          switch (result.code) {
            case 200:
              setResultValidation(200);
              setStateToParent(formik.values);
              break;
            default:
              setResultValidation(1);
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 401:
              setResultValidation(401);
              break;
            case 404:
              setResultValidation(404);
              props.setValidationParentState(!props.validationState);
              break;
            default:
              formik.resetForm();
              setResultValidation(1);
          }
        });
    }
  });

  const clickModify = () => {
    props.setValidationParentState(!props.validationState);
    setResultValidation(0);
  };

  const createNewPandrugUser = () => {
    props
      .apiCreatePanDrugsUser(formik.values.user, formik.values.password, formik.values.url, formik.values.email)
      .then((result) => {
        switch (result.code) {
          case 200:
            setResultValidation(200);
            setStateToParent(formik.values);
            break;
          default:
            setResultValidation(1);
        }
      })
      .catch((error) => {
        setResultValidation(1);
        props.setValidationParentState(!props.validationState);
      });
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
      {resultValidation === 1 && <ConfigPopup message={t('panDrugsConfig.messages.unknowwn')} open={true} type={'info'} buttonType={1} />}
      {resultValidation === 200 && <ConfigPopup message={t('panDrugsConfig.messages.success')} open={true} type={'success'} buttonType={1} />}
      {resultValidation === 404 && <ConfigPopup message={t('panDrugsConfig.messages.invalidUrl')} open={true} type={'info'} buttonType={1} />}
      {resultValidation === 401 && (
        <ConfigPopup
          message={t('panDrugsConfig.messages.notExist') + 'Usuario: ' + formik.values.user + ' / ' + 'Password: ' + formik.values.password}
          open={true}
          type={'info'}
          buttonType={2}
          onYes={createNewPandrugUser}
          onClose={formik.resetForm}
        />
      )}
    </React.Fragment>
  );
};
export default PanDrugsConfig;
