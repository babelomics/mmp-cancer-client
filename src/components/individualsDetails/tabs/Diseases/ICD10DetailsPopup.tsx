import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import GaiaModalFormik from '../../../commons/GaiaModalFormik';
import GaiaTextField from '../../../commons/GaiaTextField';
import { IHumanDisease } from '../../../individualsManagement/interfaces';
import GaiaDatePicker from '../../../commons/GaiaDatePicker';
import { doDateFormat } from '../../../../utils/utils';

interface IProps {
  open: boolean;
  data?: IHumanDisease;
  onClose?: () => void;
  addIcd10: (data: IHumanDisease) => void;
  updateICD10: (data: IHumanDisease) => void;
  mode: 'new' | 'edit';
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

const ICD10DetailsPopup = (props: IProps) => {
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

  const formik = useFormik<IHumanDisease>({
    initialValues: {
      diseaseId: props.data?.diseaseId ?? '',
      comment: props.data?.comment ?? '',
      dateOfDiagnosis: doDateFormat(new Date()),
      description: props.data?.description ?? ''
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (props.mode === 'edit') {
        props.updateICD10(values);
      } else {
        props.addIcd10(values);
      }

      handleClose();
    }
  });

  return (
    <GaiaModalFormik title={t('individuals.icd10Details.title')} formik={formik} open={openState} fullWidth maxWidth="md" onClose={handleClose}>
      <Grid container className={classes.container}>
        {/* Identifier */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.identifier')}
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="flex-start">
              <GaiaTextField required name="diseaseId" formik={formik} fullWidth disabled />
            </Grid>
          </Grid>
        </Grid>

        {/* Description */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.description')}
          </Grid>
          <Grid item xs={5}>
            <Grid container justify="flex-start">
              <GaiaTextField required name="description" formik={formik} fullWidth disabled />
            </Grid>
          </Grid>
        </Grid>

        {/* Date of diagnosis */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('individuals.icd10Details.dateOfDiagnosis')}
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="flex-start">
              <GaiaDatePicker label="" name="dateOfDiagnosis" formik={formik} disableFuture />
            </Grid>
          </Grid>
        </Grid>

        {/* Comment */}
        <Grid className={classes.row} container alignItems="center">
          <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
            {t('commons.fields.comment')}
          </Grid>
          <Grid item xs={8}>
            <Grid container justify="flex-start">
              <GaiaTextField required name="comment" formik={formik} fullWidth multiline rows={5} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </GaiaModalFormik>
  );
};

export default ICD10DetailsPopup;
