import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, makeStyles, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Cancel, CheckCircle, Close, DoneRounded } from '@material-ui/icons';
import GaiaButton from './GaiaButton';
import { useTranslation } from 'react-i18next';
import GaiaFabButton from './GaiaFabButton';

interface IProps {
  title: string;
  id?: string;
  open?: boolean;
  children?: any;
  formik: any;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  hideCloseButton?: boolean;
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
  const { children, onClose, hideCloseButton, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {!hideCloseButton ? <GaiaFabButton color="default" icon={<Close />} onClick={onClose} /> : null}
    </MuiDialogTitle>
  );
};

export const GaiaModalFormik = ({ title, id, open = false, children, formik, maxWidth, fullWidth, onSubmit, onClose, hideCloseButton }: IProps) => {
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
    <Dialog onClose={handleClose} open={openState} maxWidth={maxWidth} fullWidth={fullWidth}>
      <DialogTitle className={classes.title} onClose={handleClose} hideCloseButton={hideCloseButton}>
        {title}
      </DialogTitle>
      <DialogContent id={id} style={{ padding: '20px 24px' }}>
        {children}
      </DialogContent>
      <DialogActions className={classes.root}>
        <GaiaButton icon={<CheckCircle />} variant="outlined" text={t('commons.buttons.accept')} onClick={handleSubmit} />
        <GaiaButton color="default" icon={<Cancel />} variant="outlined" text={t('commons.buttons.cancel')} onClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
};

export default GaiaModalFormik;
