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

  console.log(checkFormik);

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }}>
      <GaiaContainer title={titlePopup} onBack={handleClose} onAccept={checkFormik.handleSubmit} style={{ overflow: 'hidden', padding: '30px' }}>
        <div style={{ marginBottom: '10px' }}>
          {t('tabPanelDiagnostic.fields.chromosomeSequence')} : {t('tabPanelDiagnostic.fields.initPosition')} : {t('tabPanelDiagnostic.fields.reference')} :{' '}
          {t('tabPanelDiagnostic.fields.alternative')}
        </div>
        <div>
          <GaiaTextField required name="chromosome" style={{ marginRight: '10px', width: '220px' }} label={''} formik={checkFormik} fullWidth /> :
          <GaiaTextField name="initPosition" style={{ marginLeft: '10px', width: '150px', marginRight: '10px' }} label={''} formik={checkFormik} fullWidth />
          :
          <GaiaTextField required name="reference" style={{ marginLeft: '10px', width: '35px', marginRight: '10px' }} label={''} formik={checkFormik} fullWidth />
          :
          <GaiaTextField required name="alternative" style={{ marginLeft: '10px', width: '35px', marginRight: '10px' }} label={''} formik={checkFormik} fullWidth />
        </div>
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupUsersSelection;
