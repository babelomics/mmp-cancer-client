import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import GaiaTextField from '../../../commons/GaiaTextField';
import GaiaSelectField from '../../../commons/GaiaSelectField';
import GaiaDatePicker from '../../../commons/GaiaDatePicker';
import { IIndividual } from '../../../individualsManagement/interfaces';

interface IProps {
  formik: any;
  data: IIndividual;
  individualId: string;
}

const useStyles = makeStyles((theme) => ({
  row: {
    marginBottom: 15
  }
}));

const BasicInfo = (props: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const getSexList = () => {
    return sexList.sort((a, b) => a.value - b.value);
  };

  const sexList = [
    {
      key: 'FEMALE',
      value: t('individuals.female')
    },
    {
      key: 'MALE',
      value: t('individuals.male')
    },
    {
      key: 'OTHER',
      value: t('individuals.other')
    },
    {
      key: 'UNKNOWN',
      value: t('individuals.unknown')
    }
  ] as any[];

  return (
    <React.Fragment>
      <Typography variant="subtitle2" style={{ marginBottom: 20 }}>
        {t('individuals.individualsDetails')}
      </Typography>

      <Grid container>
        {/* Identifier */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.identifier')} *
          </Grid>
          <Grid item xs={5}>
            <Grid container justify="flex-start">
              <GaiaTextField required name="individualId" formik={props.formik} fullWidth disabled={props.data.individualId !== ''} />
            </Grid>
          </Grid>
        </Grid>

        {/* Name */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.name')} *
          </Grid>
          <Grid item xs={5}>
            <Grid container justify="flex-start">
              <GaiaTextField required name="name" formik={props.formik} fullWidth />
            </Grid>
          </Grid>
        </Grid>

        {/* Date of birth */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.dateOfBirth')}
          </Grid>
          <Grid item xs={3}>
            <Grid container justify="flex-start">
              <GaiaDatePicker label={'Date of birth'} name="dateOfBirth" formik={props.formik} disableFuture />
            </Grid>
          </Grid>
        </Grid>

        {/* Life Status */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.lifeStatus')}
          </Grid>
          <Grid item xs={3}>
            <Grid container justify="flex-start">
              <GaiaSelectField
                variant="filled"
                name="lifeStatus.status"
                formik={props.formik}
                valueAccessor="key"
                labelAccessor="value"
                items={[
                  {
                    key: 'ALIVE',
                    value: t('individuals.alive')
                  },
                  {
                    key: 'DECEASED',
                    value: t('individuals.deceased')
                  }
                ]}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Life Status Detail*/}
        {props.formik.values.lifeStatus.status === 'DECEASED' && (
          <Grid className={classes.row} container alignItems="center">
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
              {t('commons.fields.lifeStatusDetail')}
            </Grid>
            <Grid item xs={3}>
              <Grid container justify="flex-start">
                <GaiaSelectField
                  variant="filled"
                  name="lifeStatus.hpoId"
                  formik={props.formik}
                  valueAccessor="key"
                  labelAccessor="value"
                  items={[
                    {
                      key: 'HP:0003826',
                      value: t('individuals.stillbirth')
                    },
                    {
                      key: 'HP:0011420',
                      value: t('individuals.neonatalDeath')
                    },
                    {
                      key: 'HP:0003819',
                      value: t('individuals.deathInChildhood')
                    },
                    {
                      key: 'HP:0001522',
                      value: t('individuals.deathInInfancy')
                    },
                    {
                      key: 'HP:0011421',
                      value: t('individuals.deathInAdolescence')
                    },
                    {
                      key: 'HP:0100613',
                      value: t('individuals.deathInEarlyAdulthood')
                    }
                  ]}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Phenotype Sex */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.phenotypeSex')}
          </Grid>
          <Grid item xs={3}>
            <Grid container justify="flex-start">
              <GaiaSelectField variant="filled" name="sex" formik={props.formik} valueAccessor="key" labelAccessor="value" items={getSexList()} fullWidth />
            </Grid>
          </Grid>
        </Grid>

        {/* Karyotypic Sex */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.karyotypicSex')}
          </Grid>
          <Grid item xs={3}>
            <Grid container justify="flex-start">
              <GaiaTextField required name="karyotypicSex" formik={props.formik} fullWidth />
            </Grid>
          </Grid>
        </Grid>

        {/* Ethnicity */}
        {(props.data.isHuman || !props.individualId) && (
          <Grid className={classes.row} container alignItems="center">
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
              {t('commons.fields.ethnicity')}
            </Grid>
            <Grid item xs={3}>
              <Grid container justify="flex-start">
                <GaiaTextField required name="humanEthnicity" formik={props.formik} fullWidth />
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Comment */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.comment')}
          </Grid>
          <Grid item xs={8}>
            <Grid container justify="flex-start">
              <GaiaTextField required name="comment" formik={props.formik} fullWidth multiline rows={4} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BasicInfo;
