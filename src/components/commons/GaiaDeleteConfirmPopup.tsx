import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { GaiaModalFormik } from './GaiaModalFormik';
import { useFormik } from 'formik';
import GaiaTextField from './GaiaTextField';
import { useTranslation } from 'react-i18next';

interface IProps {
  message?: string;
  actionText?: string;
  title?: string;
  open?: boolean;
  onClose?: () => void;
  onAccept?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

export const GaiaDeleteConfirmPopup = ({ message, title, open = false, onClose, onAccept, actionText }: IProps) => {
  const { t } = useTranslation();
  const [openState, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const validationSchema = () =>
    Yup.object().shape({
      confirmation: Yup.string()
        .required(t('commons.error.required'))
        .test('MatchConfirmWord', t('commons.deleteConfirmWordNotMatch'), (value) => value === t('commons.deleteConfirmWord'))
    });

  const formik = useFormik({
    initialValues: { confirmation: '' },
    enableReinitialize: true,
    validationSchema: validationSchema(),
    onSubmit: () => {
      setOpen(false);
      formik.resetForm();

      if (onAccept) {
        onAccept();
      }
    }
  });

  return (
    <GaiaModalFormik
      open={openState}
      title={title || 'Delete'}
      formik={formik}
      onClose={() => {
        setOpen(false);
        formik.resetForm();

        if (onClose) {
          onClose();
        }
      }}
    >
      <Typography variant="body1">{message ? message : t('commons.deleteConfirmText', { action: actionText })}</Typography>
      <GaiaTextField required name="confirmation" label={t('commons.fields.confirmation')} formik={formik} fullWidth />
    </GaiaModalFormik>
  );
};

export default GaiaDeleteConfirmPopup;
