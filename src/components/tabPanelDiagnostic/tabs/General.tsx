import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import GaiaTextField from '../../commons/GaiaTextField';
import GaiaLoading from '../../commons/GaiaLoading';

interface IProps {
  loading: boolean;
  formik: any;
  nextVersion: boolean;
  mode: string;
}

const General = (props: IProps) => {
  const { t } = useTranslation();

  const renderIdentifierField = () => {
    return (
      <Grid item xs={props.mode === 'edit' ? 3 : 4}>
        <GaiaTextField formik={props.formik} name="diagnosticPanelIdentifier" label={`${t('commons.fields.identifier')} *`} fullWidth disabled={props.mode === 'edit'} />
      </Grid>
    );
  };

  return (
    <>
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <GaiaTextField formik={props.formik} name="author" label={t('commons.fields.author')} fullWidth disabled />
              </Grid>
              <Grid item xs={4}>
                <GaiaTextField formik={props.formik} name="diagnosticPanelSetIdentifier" fullWidth label={t('commons.fields.diagnosticPanelSet')} disabled />
              </Grid>
              {props.mode === 'edit' && renderIdentifierField()}
            </Grid>
            <Grid container spacing={3}>
              {props.mode === 'new' && renderIdentifierField()}
              <Grid item xs={props.mode === 'edit' ? 3 : 4}>
                <GaiaTextField formik={props.formik} name="name" label={`${t('commons.fields.name')} *`} fullWidth disabled={props.nextVersion || props.formik.deletionDate ? true : false} />
              </Grid>
              {props.mode === 'edit' && (
                <React.Fragment>
                  <Grid item xs={3}>
                    <GaiaTextField formik={props.formik} name="creationDate" label={t('commons.fields.dateCreated')} fullWidth disabled />
                  </Grid>
                  <Grid item xs={3}>
                    <GaiaTextField formik={props.formik} name="deletionDate" label={t('commons.fields.dateDelete')} fullWidth disabled />
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={11}>
                <GaiaTextField
                  formik={props.formik}
                  name="description"
                  label={`${t('commons.fields.description')} *`}
                  fullWidth
                  disabled={props.nextVersion || props.formik.deletionDate ? true : false}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        </>
      )}
    </>
  );
};

export default General;
