import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, makeStyles, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
import GaiaIconButton from './GaiaIconButton';
import GaiaButton from './GaiaButton';
import { useTranslation } from 'react-i18next';

interface IProps {
  title: string;
  open?: boolean;
  children?: any;
  formik: any;
  onSubmit?: () => void;
  onClose?: () => void;
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

const DialogTitle = (props: any) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? <GaiaIconButton icon={<Close />} onClick={onClose} /> : null}
    </MuiDialogTitle>
  );
};

export const GaiaModalFormik = ({ title, open = false, children, formik, onSubmit, onClose }: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openState, setOpen] = useState(open);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
      setTimeout(() => formik.resetForm(), 1000);
    }
  };

  const handleSubmit = () => {
    if (!onSubmit) {
      formik.handleSubmit();
    }
    if (onSubmit && formik.isValid) {
      onSubmit();
      setTimeout(() => formik.resetForm(), 1000);
    }
  };

  return (
    <Dialog onClose={handleClose} open={openState}>
      <DialogTitle className={classes.title} onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <GaiaButton text={t('commons.buttons.cancel')} onClick={handleClose} />
        <GaiaButton text={t('commons.buttons.accept')} onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export default GaiaModalFormik;
