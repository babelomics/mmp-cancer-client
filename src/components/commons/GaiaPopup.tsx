import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, makeStyles, Typography, Grid } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
import GaiaIconButton from './GaiaIconButton';
import GaiaButton from './GaiaButton';
import { useTranslation } from 'react-i18next';
import GaiaIcon from './GaiaIcon';

interface IProps {
  message: string;
  title?: string;
  open?: boolean;
  type?: 'info' | 'error' | 'success' | 'warning';
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

export const GaiaPopup = ({ message, title, open = false, type = 'info', onClose }: IProps) => {
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

  const renderTitle = () => {
    if (!title) {
      if (type === 'info') {
        return 'Info';
      }

      if (type === 'error') {
        return 'Error';
      }

      if (type === 'success') {
        return 'Success!';
      }

      if (type === 'warning') {
        return 'Warning';
      }
    }

    return title;
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
      <DialogTitle className={classes.title} onClose={handleClose}>
        {renderTitle()}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={message.length < 20 ? 4 : 3} container justify="flex-end">
            {renderIcon()}
          </Grid>
          <Grid item xs={8} container alignItems="center">
            <Typography variant="h6">{message}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <GaiaButton text={t('commons.buttons.accept')} onClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
};

export default GaiaPopup;
