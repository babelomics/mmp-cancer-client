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
import DrugProfile from '../drugProfile';
import AppConfiguration from '../appConfiguration';
import Launch from '../launch';
import Login from '../login';
import Home from '../home';
import UsersManagement from '../usersManagement';
import DrugsManagement from '../drugsManagement';
import RegistrationManagement from '../registrationManagement';
import CreateNewUser from '../createNewUser';
import NotFoundPage from '../404NotFound';
import { IRootState, history } from '../../store';
import { operations as LoginOperations } from '../login/duck';
import SecuredRoute from './SecuredRoute';
import underMaintenance from '../underMaintenance';
import PanelSetsManagement from '../panelSetsManagement';
import CreateNewPanelSet from '../createNewPanelSet';
import PanelSetProfile from '../panelSetProfile';
import TabPanelDiagnostic from '../tabPanelDiagnostic';
import ProjectsManagement from '../projectsManagement';

const Router = (props: any) => {
  const { login, logout, launch } = props;

  return (
    <ConnectedRouter history={history}>
      <Template isAuthenticated={login.isAuthenticated} user={login.user} logout={logout}>
        <Switch>
          <Route path={routes.PATH_LOGIN} component={Login} />
          <SecuredRoute path={routes.PATH_HOME} component={Home} login={login} launch={launch} configurationOnly={!launch.data.configured} redirect={routes.PATH_MAINTENANCE} />
          <Route path={routes.PATH_FORGOT_PASSWORD} component={forgotPassword} />
          <Route path={routes.PATH_SET_PASSWORD} component={SetPassword} />
          <Route path={routes.PATH_SIGNUP} component={RegistryRequest} />
          <Route path={routes.PATH_LAUNCH} component={Launch} />
          <SecuredRoute path={routes.PATH_USERS_MANAGEMENT} component={UsersManagement} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_PROJECTS_MANAGEMENT} component={NotFoundPage} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_DRUGS_MANAGEMENT} component={DrugsManagement} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_REGISTRATION_MANAGEMENT} component={RegistrationManagement} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_USER_PROFILE} component={UserProfile} login={login} launch={launch} />
          <SecuredRoute path={routes.PATH_DRUG_PROFILE} component={DrugProfile} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_ADMIN_CREATE_USER} component={CreateNewUser} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_ADMIN_REVIEW_REQUEST} component={RegistryRequest} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_ADMIN_CONFIGURATION} component={AppConfiguration} login={login} launch={launch} adminOnly configurationOnly={!launch.data.configured} />
          <SecuredRoute path={routes.PATH_PANEL_SETS_MANAGEMENT} component={PanelSetsManagement} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_CREATE_PANEL_SET} component={CreateNewPanelSet} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_PANEL_SET_PROFILE} component={PanelSetProfile} login={login} launch={launch} adminOnly />
          <SecuredRoute path={routes.PATH_TAB_PANEL_DIAGNOSTIC} component={TabPanelDiagnostic} login={login} launch={launch} adminOnly />
          <Route path={routes.PATH_MAINTENANCE} component={underMaintenance} />
          <Route path="/" exact component={Launch} />
          <Route component={NotFoundPage} />
        </Switch>
      </Template>
    </ConnectedRouter>
  );
};
const mapStateToProps = (state: IRootState) => ({
  login: state.login,
  launch: state.launch
});

const mapDispatchToProps = {
  logout: LoginOperations.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
