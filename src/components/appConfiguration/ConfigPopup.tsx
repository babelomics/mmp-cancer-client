import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, makeStyles, Typography, Grid } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
import GaiaIconButton from '../commons/GaiaIconButton';
import GaiaButton from '../commons/GaiaButton';
import GaiaIcon from '../commons/GaiaIcon';
import { useTranslation } from 'react-i18next';

interface IProps {
  message: string;
  title?: string;
  open?: boolean;
  type?: 'info' | 'error' | 'success' | 'warning';
  buttonType?: number;
  onClose?: () => void;
  onYes?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 10px 0 0',
    height: 0
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

export const ConfigPopup = ({ message, title, open = false, type = 'info', buttonType = 0, onClose, onYes }: IProps) => {
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
    }
  };

  const handleYes = () => {
    setOpen(false);
    if (onYes) {
      onYes();
    }
  };

  const renderIcon = () => {
    if (type === 'info') {
      return <GaiaIcon icon="info" size={60} />;
    }

    if (type === 'error') {
      return <GaiaIcon icon="error" size={60} color="error" />;
    }

    if (type === 'success') {
      return <GaiaIcon icon="check_circle" size={60} />;
    }

    if (type === 'warning') {
      return <GaiaIcon icon="report_problem" size={60} color="inherit" />;
    }
  };

  return (
    <Dialog onClose={handleClose} open={openState}>
      <DialogTitle className={classes.title} onClose={handleClose} />
      <DialogContent style={{ overflow: 'hidden', padding: '10px 70px' }}>
        <Grid container spacing={3}>
          <Grid item xs={message.length < 20 ? 4 : 2} container justify="flex-end">
            {renderIcon()}
          </Grid>
          <Grid item xs={9} container alignItems="center">
            <Typography style={{ whiteSpace: 'pre-wrap' }} variant="subtitle2">
              {message}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {buttonType === 0 && <GaiaButton text={t('commons.buttons.accept')} onClick={handleClose} />}
        {buttonType === 1 && <GaiaButton text={t('commons.buttons.ok')} onClick={handleClose} />}
        {buttonType === 2 && (
          <>
            <GaiaButton text={t('commons.buttons.yes')} onClick={handleYes} />
            <GaiaButton text={t('commons.buttons.no')} onClick={handleClose} />
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfigPopup;
