import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, makeStyles, Typography, Grid } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Cancel, CheckCircle, Close } from '@material-ui/icons';
import GaiaButton from './GaiaButton';
import { useTranslation } from 'react-i18next';
import GaiaIcon from './GaiaIcon';
import GaiaFabButton from './GaiaFabButton';

interface IProps {
  message: string;
  title?: string;
  open?: boolean;
  type?: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm' | 'warningTwoOptions';
  buttonType?: number | null;
  textFirst?: string;
  textSecond?: string;
  textThird?: string;
  preFormatText?: boolean;

  onClose?: () => void;
  onAccept?: () => void;
  onFirstAction?: () => void;
  onSecondAction?: () => void;
  onThirdAction?: () => void;
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
      {onClose ? <GaiaFabButton color="default" icon={<Close />} onClick={onClose} /> : null}
    </MuiDialogTitle>
  );
};

export const GaiaPopup = ({
  message,
  title,
  open = false,
  type = 'info',
  buttonType = null,
  textFirst,
  textSecond,
  textThird,
  preFormatText,
  onClose,
  onAccept,
  onFirstAction,
  onSecondAction,
  onThirdAction
}: IProps) => {
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

  const handleAccept = () => {
    setOpen(false);
    if (onAccept) {
      onAccept();
    }
  };

  const handleFirst = () => {
    setOpen(false);
    if (onFirstAction) {
      onFirstAction();
    }
  };

  const handleSecond = () => {
    setOpen(false);
    if (onSecondAction) {
      onSecondAction();
    }
  };

  const handleThird = () => {
    setOpen(false);
    if (onThirdAction) {
      onThirdAction();
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

      if (type === 'warning' || 'warningConfirm') {
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

    if (type === 'warning' || 'warningConfirm') {
      return <GaiaIcon icon="report_problem" size={60} color="inherit" style={{ color: '#FEC000' }} />;
    }
  };

  return (
    <Dialog onClose={handleClose} open={openState}>
      <DialogTitle className={classes.title} onClose={handleClose}>
        {renderTitle()}
      </DialogTitle>
      <DialogContent style={{ padding: '20px 24px' }}>
        <Grid container spacing={3}>
          <Grid item xs={message.length < 20 ? 4 : 3} container justify="flex-end" alignItems="center">
            {renderIcon()}
          </Grid>
          <Grid item xs={8} container alignItems="center">
            <Typography variant="h6"> {preFormatText ? <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-line' }}>{message}</pre> : message}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {type !== 'warningTwoOptions' ? (
          <>
            <GaiaButton variant="outlined" icon={<CheckCircle />} text={t('commons.buttons.accept')} onClick={handleAccept} />
            {type === 'warningConfirm' && <GaiaButton color="default" icon={<Cancel />} text={t('commons.buttons.cancel')} onClick={handleClose} />}
          </>
        ) : (
          <>
            {onFirstAction && textFirst && <GaiaButton variant="outlined" text={textFirst} onClick={handleFirst} />}
            {onSecondAction && textSecond && <GaiaButton variant="outlined" text={textSecond} onClick={handleSecond} />}
            {onThirdAction && textThird && <GaiaButton variant="outlined" text={textThird} onClick={handleThird} />}
            <GaiaButton color="default" icon={<Cancel />} text={t('commons.buttons.cancel')} onClick={handleClose} />
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GaiaPopup;
