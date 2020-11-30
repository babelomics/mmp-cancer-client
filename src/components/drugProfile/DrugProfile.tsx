import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generateValidationSchema } from './validationSchema';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

import IDrugProfile, { IData } from './interfaces';
// import GaiaDrugProfile from '../commons/GaiaDrugProfile';
import GaiaContainer from '../commons/GaiaContainer';
import { Grid, Typography } from '@material-ui/core';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaDatePicker from '../commons/GaiaDatePicker';
import GaiaLink from '../commons/GaiaLink';
import GaiaCheckBox from '../commons/GaiaCheckBox';
import GaiaLoading from '../commons/GaiaLoading';

interface IProps {
  drugProfile: IDrugProfile;
  fetchDrugData: (identifier: string) => void;
  updateDrug: (data: any) => Promise<any>;
}

const useStyles = makeStyles((theme) => ({
  alternatives: {
    border: 'solid 1px lightgray',
    boxShadow: '-2px -1px 4px 0px rgba(0, 0, 0, 0.2)',
    padding: '5px 10px',
  }
}));

export const DrugProfile = (props: IProps) => {
  const classes = useStyles();
  const { data } = props.drugProfile;
  const { t } = useTranslation();
  const [firstVersionDate, setFirstVersionDate] = useState<any>('');
  const [lastVersion, setLastVersion] = useState(0);
  const [currentVersionData, setCurrentVersionData] = useState<any>({});

  useEffect(() => {
    const highestVersion = Math.max.apply(Math, data.modifications.map(function (k) { return k.version; }));
    const firstVersionData = data.modifications.find(k => k.previousVersion === null)
    if (firstVersionData) {
      setFirstVersionDate(firstVersionData.creationDate);
      setLastVersion(highestVersion);
      setCurrentVersionData(data.modifications.find(k => k.version === highestVersion));
    }
  }, [data]);

  const gotoPrevious = () => {
    const previous = data.modifications.find(k => k.version === currentVersionData.previousVersion);
    setCurrentVersionData(previous);
  }

  const gotoNext = () => {
    const next = data.modifications.find(k => k.previousVersion === currentVersionData.version);
    setCurrentVersionData(next);
  }


  const formik = useFormik<any>({
    initialValues: { ...currentVersionData, drugCreationDate: firstVersionDate, lastVersion: lastVersion },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      let cost = values.cost;
      if(values.cost) {
        cost = parseFloat(values.cost.replace(',', '.'));
      }
      const finalValues = { ...currentVersionData, available: values.available, cost: cost };
      props.updateDrug(finalValues)
      .then(result => {
        if (result.done) {
          
          props.fetchDrugData(finalValues.id);
        }
      });
    }
  });
  return (
    <GaiaContainer icon="healing" title={t('drugProfile.title')} onAccept={!props.drugProfile.loading ? formik.handleSubmit : undefined}>
      {props.drugProfile.loading ? (
        <GaiaLoading />
      ) : (
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <GaiaTextField fullWidth name="standardName" label={t('commons.fields.standardName')} formik={formik} disabled InputLabelProps={formik && formik.values.standardName? {shrink: true} : {}} />
              </Grid>
              <Grid item xs={5}>
                <GaiaTextField fullWidth name="commonName" label={t('commons.fields.commonName')} formik={formik} disabled InputLabelProps={formik && formik.values.commonName? {shrink: true} : {}}/>
              </Grid>
              <Grid item xs={2}>
                <GaiaDatePicker name="drugCreationDate" formik={formik} fullWidth label={t('drugProfile.creationDate')} disabled InputLabelProps={formik && formik.values.drugCreationDate? {shrink: true} : {}}/>
              </Grid>

              <Grid item xs={2}>
                <GaiaTextField fullWidth name="cost" label={t('commons.fields.cost')} disabled={currentVersionData.deletionDate !== null && currentVersionData.deletionDate !== ''} formik={formik} InputLabelProps={formik && formik.values.cost? {shrink: true} : {}}/>
              </Grid>
              <Grid item xs={2}>
                <GaiaDatePicker name="deletionDate" formik={formik} fullWidth label={t('drugProfile.deletionDate')} disabled InputLabelProps={formik && formik.values.deletionDate? {shrink: true} : {}}/>
              </Grid>
              <Grid item xs={2}>
                <GaiaDatePicker name="creationDate" formik={formik} fullWidth label={t('commons.fields.lastModificationDate')} disabled InputLabelProps={formik && formik.values.creationDate? {shrink: true} : {}}/>
              </Grid>
              <Grid item xs={2}>
                <GaiaCheckBox name="available" text={t('commons.fields.available')} formik={formik} labelPlacement="start" disabled={currentVersionData.deletionDate !== null && currentVersionData.deletionDate !== ''} />
              </Grid>
              <Grid item xs={2}>
                <GaiaTextField fullWidth name="version" label={t('drugProfile.currentVersion')} formik={formik} disabled InputLabelProps={formik && (formik.values.version || formik.values.version === 0) ? {shrink: true} : {}}/>
              </Grid>
              <Grid item xs={2}>
                <GaiaTextField fullWidth name="lastVersion" label={t('drugProfile.lastVersion')} formik={formik} disabled InputLabelProps={formik && formik.values.lastVersion? {shrink: true} : {}}/>
              </Grid>
              {currentVersionData && currentVersionData.alternativeNames && (
                <>
                  <Grid item xs={6} style={{paddingTop: 30}}>
                    <div className={classes.alternatives}>
                      <Typography variant="h6">{t('drugProfile.alternativeNames')}</Typography>
                    </div>
                    {currentVersionData.alternativeNames.map((n: any) => (
                      <div className={classes.alternatives}>
                        <div style={{ display: 'inline-block', width: '50%' }}><Typography>{n.name}</Typography></div>
                        <div style={{ display: 'inline-block', width: '50%' }}><Typography>{n.source}</Typography></div>
                      </div>
                    ))}
                  </Grid>
                  <Grid item xs={1}/>
                  <Grid item xs={2} style={{paddingTop: 40}}>
                  {currentVersionData.previousVersion !== null && (
                    <GaiaLink text={t('drugProfile.previous')} onClick={() => gotoPrevious()} />
                  )}
                  </Grid>
                  <Grid item xs={2} style={{paddingTop: 40}}>
                  {currentVersionData.version !== lastVersion && (
                    <GaiaLink text={t('drugProfile.next')} onClick={() => gotoNext()} />
                  )}
                  </Grid>
                </>
              )}

            </Grid>
          </React.Fragment>
        )}
    </GaiaContainer>
  );
};

export default DrugProfile;
