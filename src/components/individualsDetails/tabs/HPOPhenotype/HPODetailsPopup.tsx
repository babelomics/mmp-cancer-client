import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import GaiaModalFormik from '../../../commons/GaiaModalFormik';
import GaiaSelectField from '../../../commons/GaiaSelectField';
import GaiaTextField from '../../../commons/GaiaTextField';
import { getSpatialPatternList, getTemporalPattern, getAgeOfOnsetList, getLateralityList, getPaceOfProgressionList, getSeverityList, OBSERVED_LIST } from './modifiersLists';
import { IHumanPhenotype } from '../../../individualsManagement/interfaces';

interface IProps {
  open: boolean;
  data?: IHumanPhenotype;
  onClose?: () => void;
  addHPO: (data: IHumanPhenotype) => void;
  updateHPO: (data: IHumanPhenotype) => void;
  mode: 'new' | 'edit';
}

interface IForm {
  observed: string;
  identifier: string;
  spatialPattern: string;
  laterality: string;
  severity: string;
  temporalPattern: string;
  ageOfOnset: string;
  paceOfProgression: string;
  comment: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10
  },
  row: {
    marginBottom: 10
  },
  label: {
    marginRight: 10
  }
}));

const HPODetailsPopup = (props: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [openState, setOpen] = useState<boolean>(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);

    if (props.onClose) {
      props.onClose();
    }
  };

  const updateHPO = (modifier: string): string | undefined => {
    if (modifier === 'spatialPattern') {
      return props.data?.modifiers.map((temp) => getSpatialPatternList(t).find((aux) => temp === aux.key)?.key).filter((x) => x)[0];
    }

    if (modifier === 'laterality') {
      return props.data?.modifiers.map((temp) => getLateralityList(t).find((aux) => temp === aux.key)?.key).filter((x) => x)[0];
    }

    if (modifier === 'severity') {
      return props.data?.modifiers.map((temp) => getSeverityList(t).find((aux) => temp === aux.key)?.key).filter((x) => x)[0];
    }

    if (modifier === 'temporalPattern') {
      return props.data?.modifiers.map((temp) => getTemporalPattern(t).find((aux) => temp === aux.key)?.key).filter((x) => x)[0];
    }

    if (modifier === 'ageOfOnset') {
      return props.data?.modifiers.map((temp) => getAgeOfOnsetList(t).find((aux) => temp === aux.key)?.key).filter((x) => x)[0];
    }

    if (modifier === 'paceOfProgression') {
      return props.data?.modifiers.map((temp) => getPaceOfProgressionList(t).find((aux) => temp === aux.key)?.key).filter((x) => x)[0];
    }

    return undefined;
  };

  const formik = useFormik<IForm>({
    initialValues: {
      identifier: props.data?.phenotypeId ?? '',
      observed: props.data?.observed ?? '',
      spatialPattern: updateHPO('spatialPattern') ?? '',
      laterality: updateHPO('laterality') ?? '',
      severity: updateHPO('severity') ?? '',
      temporalPattern: updateHPO('temporalPattern') ?? '',
      ageOfOnset: updateHPO('ageOfOnset') ?? '',
      paceOfProgression: updateHPO('paceOfProgression') ?? '',
      comment: props.data?.comment ?? ''
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {} as IHumanPhenotype;
      data.phenotypeId = values.identifier;
      data.comment = values.comment;
      data.observed = values.observed;

      const modifiers = [values.spatialPattern, values.laterality, values.severity, values.temporalPattern, values.ageOfOnset, values.paceOfProgression].filter((x) => x) as string[];
      data.modifiers = modifiers;

      if (data.observed === 'ABSENT') {
        data.modifiers = [];
      }
      if (props.mode === 'edit') {
        props.updateHPO(data);
      } else {
        props.addHPO(data);
      }
      handleClose();
    }
  });

  return (
    <GaiaModalFormik title={t('individuals.hpoDetails.title')} formik={formik} open={openState} fullWidth maxWidth="md" onClose={handleClose}>
      <Grid container className={classes.container}>
        <Grid container spacing={3} className={classes.row}>
          {/* Identifier */}
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            {t('commons.fields.identifier')}
          </Grid>
          <Grid item xs={4}>
            <GaiaTextField name="identifier" formik={formik} disabled />
          </Grid>

          {/* Observed */}
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            {t('individuals.hpoDetails.observed')}
          </Grid>
          <Grid item xs={4}>
            <GaiaSelectField name="observed" label="-" items={OBSERVED_LIST} variant="filled" formik={formik} />
          </Grid>
        </Grid>

        {/* Modifiers */}
        <Grid container spacing={3} className={classes.row}>
          {/* Spatial pattern */}
          <Grid container item xs={2}></Grid>
          <Grid item xs={4}>
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              {t('individuals.hpoDetails.modifiers')}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.row}>
          {/* Spatial pattern */}
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            {t('individuals.hpoDetails.spatialPattern')}
          </Grid>
          <Grid item xs={4}>
            <GaiaSelectField
              name="spatialPattern"
              label="-"
              items={getSpatialPatternList(t)}
              labelAccessor="value"
              valueAccessor="key"
              variant="filled"
              formik={formik}
              tooltipAccessor="key"
              disabled={formik.values.observed !== 'PRESENT'}
            />
          </Grid>

          {/* Laterality */}
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            {t('individuals.hpoDetails.laterality')}
          </Grid>
          <Grid item xs={4}>
            <GaiaSelectField
              name="laterality"
              label="-"
              items={getLateralityList(t)}
              labelAccessor="value"
              valueAccessor="key"
              variant="filled"
              formik={formik}
              tooltipAccessor="key"
              disabled={formik.values.observed !== 'PRESENT'}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.row}>
          {/* Severity */}
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            {t('individuals.hpoDetails.severity')}
          </Grid>
          <Grid item xs={4}>
            <GaiaSelectField
              name="severity"
              label="-"
              items={getSeverityList(t)}
              labelAccessor="value"
              valueAccessor="key"
              variant="filled"
              formik={formik}
              tooltipAccessor="key"
              disabled={formik.values.observed !== 'PRESENT'}
            />
          </Grid>

          {/* Temporal pattern */}
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            {t('individuals.hpoDetails.temporalPattern')}
          </Grid>
          <Grid item xs={4}>
            <GaiaSelectField
              name="temporalPattern"
              label="-"
              items={getTemporalPattern(t)}
              labelAccessor="value"
              valueAccessor="key"
              variant="filled"
              formik={formik}
              tooltipAccessor="key"
              disabled={formik.values.observed !== 'PRESENT'}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.row}>
          {/* Age of onset */}
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            {t('individuals.hpoDetails.ageOfOnset')}
          </Grid>
          <Grid item xs={4}>
            <GaiaSelectField
              name="ageOfOnset"
              label="-"
              items={getAgeOfOnsetList(t)}
              labelAccessor="value"
              valueAccessor="key"
              variant="filled"
              formik={formik}
              tooltipAccessor="key"
              disabled={formik.values.observed !== 'PRESENT'}
            />
          </Grid>

          {/* Pace of progression */}
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            {t('individuals.hpoDetails.paceOfProgression')}
          </Grid>
          <Grid item xs={4}>
            <GaiaSelectField
              name="paceOfProgression"
              label="-"
              items={getPaceOfProgressionList(t)}
              labelAccessor="value"
              valueAccessor="key"
              variant="filled"
              formik={formik}
              tooltipAccessor="key"
              disabled={formik.values.observed !== 'PRESENT'}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.row}>
          {/* Comment */}
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            {t('individuals.hpoDetails.comment')}
          </Grid>
          <Grid item xs={10}>
            <GaiaTextField name="comment" multiline rows={5} formik={formik} />
          </Grid>
        </Grid>
      </Grid>
    </GaiaModalFormik>
  );
};

export default HPODetailsPopup;
