import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, CssBaseline, Typography, MenuItem, ListItemIcon } from '@material-ui/core';
import { AccountCircle, ExitToApp, MoreVert, Notifications } from '@material-ui/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import { useTranslation } from 'react-i18next';

import withMenu from '../../../HoC/withMenu';
import GaiaIconButton from '../../commons/GaiaIconButton';
import routes from '../routes';
import GaiaLink from '../../commons/GaiaLink';

interface IProps extends RouteComponentProps {
  isAuthenticated?: boolean;
  user?: any;
  logout?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  accessLink: {
    marginLeft: 'auto',
    color: 'white'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '100%'
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  username: {
    marginRight: 30
  }
}));

const CustomAppBar: React.FunctionComponent<IProps> = ({ children, isAuthenticated, history, user, logout }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const NotificationsButton = withMenu(GaiaIconButton);
  const MoreButton = withMenu(GaiaIconButton);

  const handleLogout = () => {
    if (logout) {
      logout();
      history.push(routes.PATH_LAUNCH);
    }
  };

  const showAccessLink = () => {
    return !isAuthenticated && (history.location.pathname === routes.PATH_LAUNCH || history.location.pathname === '/');
  };

  const goHome = () => {
    history.push(routes.PATH_HOME);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" noWrap className={classes.title} onClick={goHome}>
            {t('app.name').toUpperCase()}
          </Typography>
          {showAccessLink() && (
            <Typography className={classes.accessLink} noWrap>
              <GaiaLink color="inherit" text={t('app.access')} onClick={() => history.push(routes.PATH_LOGIN)} />
            </Typography>
          )}
          {isAuthenticated && (
            <React.Fragment>
              <Typography className={classes.username}>{user ? user.sub : ''}</Typography>
              <NotificationsButton id="notifications-menu" icon={<Notifications />} badge badgeCount={10} badgeHorizontalAlign="left" />
              <MoreButton id="more-menu" icon={<MoreVert />}>
                <MenuItem onClick={() => history.push(routes.PATH_USER_PROFILE)}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">{t('app.profile')}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">{t('app.logout')}</Typography>
                </MenuItem>
              </MoreButton>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default withRouter(CustomAppBar);
