import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { ArrowBack, ArrowForwardIos, Cancel, CheckCircle } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import GaiaButton from './GaiaButton';
import GaiaIcon from './GaiaIcon';
import { useHistory } from 'react-router-dom';
import GaiaFabButton from './GaiaFabButton';

interface IProps {
  isLaunchScreen?: boolean;
  icon?: string;
  title?: string;
  acceptButtonText?: string;
  acceptButtonIcon?: React.ReactNode | (() => React.ReactNode);
  children?: any;
  actions?: IAction[];
  style?: React.CSSProperties;
  hideBackButton?: boolean;
  breadcrumbs?: string[];
  onBack?: (e: any) => void;
  onAccept?: (e: any) => void;
  onCancel?: (e: any) => void;
}

interface IAction {
  icon: React.ReactElement;
  tooltip?: string;
  disabled?: boolean;
  variant?: 'fab' | 'button';
  text?: string;
  onClick?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '100%',
    height: '100%'
  },
  icon: {
    marginRight: 10,
    color: theme.palette.primary.light
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto'
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  rowSpace: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 35
  },
  childrenWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap'
  },
  childrenContainer: {
    paddingBottom: 50,
    whiteSpace: 'nowrap'
  },
  breadcrumbIcon: {
    marginRight: 5,
    marginLeft: 5,
    color: theme.palette.primary.light,
    fontSize: 16,
    marginTop: 3
  }
}));

const GaiaContainer = ({ icon, title, acceptButtonText, acceptButtonIcon, onBack, onAccept, onCancel, children, actions, style, hideBackButton, breadcrumbs }: IProps) => {
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

  const renderBreadcrumbs = () => {
    return (
      <div className="d-flex" style={{ flexWrap: 'wrap' }}>
        {breadcrumbs?.map((b, i) => {
          if (i < breadcrumbs.length - 1) {
            return (
              <React.Fragment>
                <Typography className={classes.title} variant="body2">
                  {b}
                </Typography>
                <ArrowForwardIos className={classes.breadcrumbIcon} />
              </React.Fragment>
            );
          }
          return (
            <Typography className={classes.title} variant="body2">
              {b}
            </Typography>
          );
        })}
      </div>
    );
  };

  return (
    <Paper className={classes.root} style={style}>
      <div className={classes.rowSpace}>
        <div className={classes.titleWrapper}>
          {!hideBackButton && <GaiaFabButton color="default" icon={<ArrowBack />} iconSize={20} onClick={handleBack} tooltip={t('commons.buttons.goBack')} style={{ marginRight: 30 }} />}
          <GaiaIcon className={classes.icon} color="inherit" icon={icon} size={27} />
          {breadcrumbs ? (
            renderBreadcrumbs()
          ) : (
            <Typography className={classes.title} variant="body2">
              {title}
            </Typography>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {actions?.map((a) =>
            !a.variant || a.variant === 'fab' ? (
              <GaiaFabButton color="default" icon={a.icon} iconSize={20} onClick={a.onClick} tooltip={a.tooltip ?? ''} disabled={a.disabled} style={{ marginLeft: 20 }} />
            ) : (
              <GaiaButton color="default" icon={a.icon} text={a.text ?? ''} onClick={a.onClick} disabled={a.disabled} style={{ marginLeft: 20 }} />
            )
          )}
          {onAccept && (
            <GaiaButton icon={acceptButtonIcon || <CheckCircle />} iconSize={18} text={acceptButtonText || t('commons.buttons.accept')} onClick={onAccept} style={{ fontSize: 14, marginLeft: 20 }} />
          )}
          {onCancel && <GaiaButton icon={<Cancel />} iconSize={18} color="secondary" text={t('commons.buttons.cancel')} onClick={onCancel} style={{ fontSize: 14, marginLeft: 20 }} />}
        </div>
      </div>
      <div className={classes.childrenWrapper}>
        <div className={classes.childrenContainer}>{children}</div>
      </div>
    </Paper>
  );
};
export default GaiaContainer;
