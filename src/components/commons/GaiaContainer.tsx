import React from 'react';
import { Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import GaiaIconButton from './GaiaIconButton';
import GaiaButton from './GaiaButton';
import GaiaIcon from './GaiaIcon';
import { useHistory } from 'react-router-dom';

interface IProps {
  isLaunchScreen?: boolean;
  icon?: string;
  title?: string;
  backButtonText?: string;
  acceptButtonText?: string;
  children?: any;
  hideBackButton?: boolean;
  backHistory?: boolean;
  onBack?: (e: any) => void;
  onAccept?: (e: any) => void;
  backActions?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '100%'
  },
  icon: {
    marginRight: 10
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto'
  },
  rowSpace: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  childrenWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap'
  },
  childrenContainer: {
    paddingTop: 50,
    paddingBottom: 50,
    whiteSpace: 'nowrap'
  }
}));

const GaiaContainer = ({ icon, title, backButtonText, acceptButtonText, backHistory, onBack, onAccept, backActions, children, isLaunchScreen, hideBackButton }: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const handleBack = (e: any) => {
    if (backActions) {
      backActions();
    }
    if (onBack) {
      onBack(e);
      if (backHistory) {
        history.goBack();
      }
    } else {
      history.goBack();
    }
  };

  return (
    <Paper className={classes.root}>
      {!isLaunchScreen && (
        <React.Fragment>
          <div className={classes.rowSpace}>
            <div className={classes.title}>
              <GaiaIcon className={classes.icon} color="inherit" icon={icon} size={30} />
              <Typography variant="h5">{title}</Typography>
            </div>
            <GaiaIconButton icon={<Close />} onClick={handleBack} />
          </div>
          <Divider />
          <div className={classes.rowSpace} style={{ marginTop: '25px' }}>
            {!isLaunchScreen && !hideBackButton && <GaiaButton text={backButtonText || t('commons.buttons.goBack')} onClick={handleBack} />}
            {onAccept && <GaiaButton text={acceptButtonText || t('commons.buttons.accept')} onClick={onAccept} />}
          </div>
        </React.Fragment>
      )}
      <div className={classes.childrenWrapper}>
        <div className={classes.childrenContainer}>{children}</div>
      </div>
    </Paper>
  );
};
export default GaiaContainer;
