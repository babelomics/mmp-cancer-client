import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { useStyles } from '../popupStyle';
import { useFormik } from 'formik';
import { checkValidationSchema } from './validationSchema';
import GaiaTextField from '../../GaiaTextField';
import GaiaModalFormik from '../../GaiaModalFormik';

interface IProps {
  open?: boolean;
  onClose?: () => void;
  openPopupParent?: any;
  setValueField: (data: any) => void;
  titlePopup: string;
  assembly: string;
}

export const PopupUsersSelection = ({ open = false, onClose, openPopupParent, setValueField, titlePopup, assembly }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClickAccept = (values: any) => {
    const variant = {
      variantIdentifier: `${values.chromosome}:${values.initPosition}:${values.reference}:${values.alternative}`,
      chromosomeSequence: values.chromosome !== '' ? values.chromosome : null,
      initPosition: values.initPosition !== '' ? values.initPosition : null,
      reference: values.reference !== '' ? values.reference : null,
      alternative: values.alternative !== '' ? values.alternative : null,
      isChildren: false
    };
    if (values.chromosome && values.initPosition && values.reference && values.alternative) {
      setValueField(variant);
    }
    handleClose();
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
      variantIdentifier: '',
      chromosome: '',
      initPosition: '',
      reference: '',
      alternative: '',
      isChildren: false
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
    <GaiaModalFormik open={openState} title={titlePopup} formik={checkFormik} onClose={handleClose} maxWidth="sm" hideCloseButton fullWidth>
      <Grid container>
        <Grid xs={12}>
          {t('tabPanelDiagnostic.fields.chromosomeSequence')} : {t('tabPanelDiagnostic.fields.initPosition')} : {t('tabPanelDiagnostic.fields.reference')} :{' '}
          {t('tabPanelDiagnostic.fields.alternative')}
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 10 }}>
        <Grid item xs={4}>
          <GaiaTextField required name="chromosome" formik={checkFormik} fullWidth />
        </Grid>
        <Grid container item xs={1} justify="center" style={{ width: 25, maxWidth: 25, marginTop: 15 }}>
          :
        </Grid>
        <Grid item xs={3}>
          <GaiaTextField name="initPosition" style={{ whiteSpace: 'initial' }} formik={checkFormik} fullWidth />
        </Grid>
        <Grid container item xs={1} justify="center" style={{ width: 25, maxWidth: 25, marginTop: 15 }}>
          :
        </Grid>
        <Grid item xs={1}>
          <GaiaTextField required name="reference" style={{ whiteSpace: 'initial' }} formik={checkFormik} fullWidth />
        </Grid>
        <Grid container item xs={1} justify="center" style={{ width: 25, maxWidth: 25, marginTop: 15 }}>
          :
        </Grid>
        <Grid item xs={1}>
          <GaiaTextField required name="alternative" style={{ whiteSpace: 'initial' }} formik={checkFormik} fullWidth />
        </Grid>
      </Grid>
    </GaiaModalFormik>
  );
};

export default PopupUsersSelection;
