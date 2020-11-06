import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import routes from './routes';
import Template from './template';
import forgotPassword from '../forgotPassword';
import SetPassword from '../setPassword';
import RegistryRequest from '../registryRequest';
import UserProfile from '../userProfile';
import Launch from '../launch';
import Login from '../login';
import Home from '../home';
import UsersManagement from '../usersManagement';
import RegistrationManagement from '../registrationManagement';
import CreateNewUser from '../createNewUser';
import NotFoundPage from '../404NotFound';
import { IRootState, history } from '../../store';
import { operations as LoginOperations } from '../login/duck';
import SecuredRoute from './SecuredRoute';

const Router = (props: any) => {
  const { login, logout } = props;

  return (
    <ConnectedRouter history={history}>
      <Template isAuthenticated={login.isAuthenticated} user={login.user} logout={logout}>
        <Switch>
          <Route path={routes.PATH_LOGIN} component={Login} />
          <SecuredRoute path={routes.PATH_HOME} component={Home} login={login} />
          <Route path={routes.PATH_FORGOT_PASSWORD} component={forgotPassword} />
          <Route path={routes.PATH_SET_PASSWORD} component={SetPassword} />
          <Route path={routes.PATH_SIGNUP} component={RegistryRequest} />
          <Route path={routes.PATH_LAUNCH} component={Launch} />
          <SecuredRoute path={routes.PATH_USERS_MANAGEMENT} component={UsersManagement} login={login} adminOnly />
          <SecuredRoute path={routes.PATH_REGISTRATION_MANAGEMENT} component={RegistrationManagement} login={login} adminOnly />
          <SecuredRoute path={routes.PATH_USER_PROFILE} component={UserProfile} login={login} />
          <SecuredRoute path={routes.PATH_ADMIN_CREATE_USER} component={CreateNewUser} login={login} adminOnly />
          <SecuredRoute path={routes.PATH_ADMIN_REVIEW_REQUEST} component={RegistryRequest} login={login} adminOnly />
          <Route path="/" exact component={Launch} />
          <Route component={NotFoundPage} />
        </Switch>
      </Template>
    </ConnectedRouter>
  );
};

const mapStateToProps = (state: IRootState) => ({
  login: state.login
});

const mapDispatchToProps = {
  logout: LoginOperations.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
