import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';

import routes from './routes';
import Template from './template';
import forgotPassword from '../forgotPassword';
import SetPassword from '../setPassword';
import RegistryRequest from '../registryRequest';
import UserProfile from '../userProfile';
import DrugProfile from '../drugProfile';
import AppConfiguration from '../appConfiguration';
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
import ProjectProfile from '../projectProfile';
import PermissionsAndUsers from '../permissionsAndUsers';
import Individuals from '../individualsManagement';
import { API_ENDPOINT, API_USERS } from '../../utils/constants';
import individualsDetails from '../individualsDetails';

const Router = (props: any) => {
  const { login, logout } = props;

  // Interval para la auto-renovacion del token cada hora
  const REFRESH_URL = `${API_ENDPOINT}${API_USERS}/refreshToken`;
  useEffect(() => {
    setInterval(() => {
      axios.post(REFRESH_URL);
    }, 3600000); //3600000
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Template isAuthenticated={login.isAuthenticated} user={login.user} logout={logout}>
        <Switch>
          <Route path={routes.PATH_LOGIN} component={Login} />
          <SecuredRoute path={routes.PATH_HOME} component={Home} login={login} configData={login.configData} configurationOnly={!login.configData.configured} redirect={routes.PATH_MAINTENANCE} />
          <Route path={routes.PATH_FORGOT_PASSWORD} component={forgotPassword} />
          <Route path={routes.PATH_SET_PASSWORD} component={SetPassword} />
          <SecuredRoute path={routes.PATH_USERS_MANAGEMENT} component={UsersManagement} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_PROJECTS_MANAGEMENT} component={ProjectsManagement} login={login} configData={login.configData} />
          <SecuredRoute path={routes.PATH_DRUGS_MANAGEMENT} component={DrugsManagement} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_REGISTRATION_MANAGEMENT} component={RegistrationManagement} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_USER_PROFILE} component={UserProfile} login={login} configData={login.configData} />
          <SecuredRoute path={routes.PATH_DRUG_PROFILE} component={DrugProfile} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_ADMIN_CREATE_USER} component={CreateNewUser} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_ADMIN_REVIEW_REQUEST} component={RegistryRequest} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_ADMIN_CONFIGURATION} component={AppConfiguration} login={login} configData={login.configData} adminOnly configurationOnly={!login.configData.configured} />
          <SecuredRoute path={routes.PATH_PANEL_SETS_MANAGEMENT} component={PanelSetsManagement} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_CREATE_PANEL_SET} component={CreateNewPanelSet} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_PANEL_SET_PROFILE} component={PanelSetProfile} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_TAB_PANEL_DIAGNOSTIC} component={TabPanelDiagnostic} login={login} configData={login.configData} adminOnly />
          <SecuredRoute path={routes.PATH_PROJECT_PROFILE} component={ProjectProfile} login={login} configData={login.configData} />
          <SecuredRoute path={routes.PATH_PERMISSIONS_AND_USERS} component={PermissionsAndUsers} login={login} configData={login.configData} />
          <SecuredRoute path={routes.PATH_INDIVIDUALS_MANAGEMENT} component={Individuals} login={login} configData={login.configData} />
          <SecuredRoute path={routes.PATH_INDIVIDUALS_DETAILS} component={individualsDetails} login={login} configData={login.configData} />
          <Route path={routes.PATH_MAINTENANCE} component={underMaintenance} />
          <Route path="/" exact component={Login} />
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
