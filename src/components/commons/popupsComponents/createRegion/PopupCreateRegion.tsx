import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaContainer from '../../GaiaContainer';
import { Dialog, Grid, TextField } from '@material-ui/core';
import { useStyles } from '../popupStyle';
import { useFormik } from 'formik';
import { checkValidationSchema } from './validationSchema';
import GaiaTextField from '../../GaiaTextField';

interface IProps {
  open?: boolean;
  onClose?: () => void;
  openPopupParent?: any;
  setValueField: (data: any) => void;
  checkRegion: (region: any, assembly: any) => Promise<any>;
  titlePopup: string;
  assembly: string;
}

export const PopupUsersSelection = ({ open = false, onClose, openPopupParent, setValueField, titlePopup, checkRegion, assembly }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [chromosome, setChromosome] = useState('');
  const [initPosition, setInitPosition] = useState('');
  const [endPosition, setEndPosition] = useState('');
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClickAccept = (values: any) => {
    const region = {
      regionIdentifier: `${values.chromosome}:${values.initPosition}:${values.endPosition}`,
      chromosome: values.chromosome !== '' ? values.chromosome : null,
      initPosition: values.initPosition !== '' ? values.initPosition : null,
      endPosition: values.endPosition !== '' ? values.endPosition : null
    };
    checkRegion(region, assembly).then(
      (result) => {
        if (result.done) {
          setError(false);
          setValueField(region);
          handleClose();
        }
      },
      () => {
        setError(true);
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
    if (openPopupParent) {
      openPopupParent(false);
    }

    if (onClose) {
      onClose();
    }
  };

  const initialValues = () => {
    return {
      chromosome: '',
      initPosition: '',
      endPosition: ''
    };
  };

  const checkFormik = useFormik({
    initialValues: initialValues(),
    enableReinitialize: true,
    validationSchema: checkValidationSchema(t),
    onSubmit: (values) => {
      handleClickAccept(values);
    }
  });

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }}>
      <GaiaContainer title={titlePopup} onBack={handleClose} onAccept={checkFormik.handleSubmit}>
        <Grid item xs={12}>
          {t('tabPanelDiagnostic.fields.chromosomeSequence')} : {t('tabPanelDiagnostic.fields.initPosition')} - {t('tabPanelDiagnostic.fields.endPosition')}
        </Grid>
        <Grid container>
          <Grid item xs={4} alignItems="center" style={{ display: 'flex' }}>
            <GaiaTextField required name="chromosome" style={{ marginRight: '10px' }} label={''} formik={checkFormik} fullWidth onChange={(e) => setChromosome(e.target.value)} /> :
          </Grid>
          <Grid item xs={4} alignItems="center" style={{ display: 'flex' }}>
            <GaiaTextField name="initPosition" style={{ marginLeft: '10px', marginRight: '10px' }} label={''} formik={checkFormik} fullWidth onChange={(e) => setInitPosition(e.target.value)} /> -
          </Grid>
          <Grid item xs={4}>
            <GaiaTextField name="endPosition" style={{ marginLeft: '10px' }} label={''} formik={checkFormik} fullWidth onChange={(e) => setEndPosition(e.target.value)} />
          </Grid>
        </Grid>
        {error && (
          <Grid item xs={12} style={{ color: 'red', marginTop: 10 }}>
            {t('tabPanelDiagnostic.error.notValirRegion')}
          </Grid>
        )}
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupUsersSelection;
