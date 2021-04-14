import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, CssBaseline, Typography, MenuItem, ListItemIcon } from '@material-ui/core';
import { AccountCircle, ExitToApp, MoreVert, NotificationsActive } from '@material-ui/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import { useTranslation } from 'react-i18next';

import withMenu from '../../../HoC/withMenu';
import GaiaIconButton from '../../commons/GaiaIconButton';
import routes from '../routes';

interface IProps extends RouteComponentProps {
  isAuthenticated?: boolean;
  user?: any;
  logout?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex'
  },
  header: {
    backgroundColor: '#FFFFFF',
    boxShadow: 'none',
    borderBottom: '1px solid black'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  accessLink: {
    marginLeft: 'auto',
    color: 'white'
  },
  contentWrapper: {
    flexGrow: 1,
    padding: 0,
    width: '100%'
  },
  content: {
    width: '100%',
    height: 'calc(100% - 115px)'
  },
  title: {
    cursor: 'pointer'
  },
  username: {
    marginRight: 30,
    color: '#000000',
    cursor: 'pointer',
    '&:hover': {
      fontWeight: 'bold'
      // textDecoration: 'underline'
    }
  },
  footerStyle: {
    backgroundColor: '#FFFFFF',
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    borderTop: '1px solid #E1E1E1',
    zIndex: 1
  },
  footerText: {
    fontSize: '11px',
    color: '#696969'
  }
}));

const CustomAppBar: React.FunctionComponent<IProps> = ({ children, isAuthenticated, history, user, logout }) => {
  const { t } = useTranslation();
  const classes = useStyles(isAuthenticated);

  const UserName = (props: any) => {
    return (
      <Typography className={classes.username} {...props}>
        {user ? user.sub : ''}
      </Typography>
    );
  };

  const NotificationsButton = withMenu(GaiaIconButton);
  const UserButton = withMenu(UserName);

  const handleLogout = () => {
    if (logout) {
      logout();
      history.push(routes.PATH_LOGIN);
    }
  };

  const goHome = () => {
    history.push(routes.PATH_HOME);
  };

  const renderAppBar = () => {
    return (
      <React.Fragment>
        <AppBar position="fixed" className={classes.header}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img alt="logo" src={'/images/MMPLogo.svg'} className={classes.title} onClick={goHome} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <UserButton id="more-menu" icon={<MoreVert />}>
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
              </UserButton>
              <NotificationsButton id="notifications-menu" icon={<NotificationsActive />} style={{ color: '#F4BA27' }} />
            </div>
          </Toolbar>
        </AppBar>

        <main className={classes.contentWrapper}>
          <div className={classes.toolbar} />
          <div className={classes.content}>{children}</div>
        </main>
        <footer id="footer" className={classes.footerStyle}>
          <div style={{ paddingLeft: '40px', margin: '10px', display: 'flex', flexDirection: 'column' }}>
            <span className={classes.footerText} style={{ fontWeight: 'bold' }}>
              {[t('app.footerClinical')]}
            </span>
            <span className={classes.footerText}>{[t('app.footerFoundation')]}</span>
          </div>
        </footer>
      </React.Fragment>
    );
  };

  return (
    <div className={isAuthenticated ? classes.root : ''} style={!isAuthenticated ? { height: '100%', position: 'fixed', minWidth: '100%', minHeight: '100%' } : {}}>
      <CssBaseline />
      {isAuthenticated ? renderAppBar() : <React.Fragment>{children}</React.Fragment>}
    </div>
  );
};

export default withRouter(CustomAppBar);
