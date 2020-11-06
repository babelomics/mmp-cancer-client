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
  onBack?: (e: any) => void;
  onAccept?: (e: any) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: 'auto'
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
    justifyContent: 'space-between'
  },
  childrenContainer: {
    paddingTop: 50,
    paddingBottom: 50
  }
}));

const GaiaContainer = ({ icon, title, backButtonText, acceptButtonText, onBack, onAccept, children, isLaunchScreen, hideBackButton }: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const handleBack = (e: any) => {
    if (onBack) {
      onBack(e);
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
        </React.Fragment>
      )}
      <div className={classes.childrenWrapper}>
        <div className={classes.childrenContainer}>{children}</div>
        <div className={classes.rowSpace}>
          {!isLaunchScreen && !hideBackButton && <GaiaButton text={backButtonText || t('commons.buttons.goBack')} onClick={handleBack} />}
          {onAccept && <GaiaButton text={acceptButtonText || t('commons.buttons.accept')} onClick={onAccept} />}
        </div>
      </div>
    </Paper>
  );
};
export default GaiaContainer;
