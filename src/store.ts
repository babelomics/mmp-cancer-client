import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import ILaunchState from './components/launch/interfaces';
import launch from './components/launch/duck';

import ILoginState from './components/login/interfaces';
import login from './components/login/duck';

import IPasswordRequestState from './components/forgotPassword/interfaces';
import passwordRequest from './components/forgotPassword/duck';

import setPasswordRequest from './components/setPassword/duck';
import ISetPassword from './components/setPassword/interfaces';

import IUsersManagement from './components/usersManagement/interfaces';

import userProfile from './components/userProfile/duck';
import IUserProfile from './components/userProfile/interfaces';

import createNewUser from './components/createNewUser/duck';
import ICreateNewUser from './components/createNewUser/interfaces';

import registryRequest from './components/registryRequest/duck';
import IRegistryRequest from './components/registryRequest/interfaces';

import IRegistrationManaement from './components/registrationManagement/interfaces';

import drugProfile from './components/drugProfile/duck';
import IDrugProfile from './components/drugProfile/interfaces';

import drugsManagement from './components/drugsManagement/duck';
import IDrugsManagement from './components/drugsManagement/interfaces';

import globalPopups from './components/globalPopups/duck';
import IGlobalPopups from './components/globalPopups/interfaces';

import appConfiguration from './components/appConfiguration/duck';
import IAppConfiguration from './components/appConfiguration/interfaces';

import IPanelSetsManagement from './components/panelSetsManagement/interfaces';

import createNewPanelSet from './components/createNewPanelSet/duck';
import ICreateNewPanelSet from './components/createNewPanelSet/interfaces';

import panelSetProfile from './components/panelSetProfile/duck';
import IPanelSetProfile from './components/panelSetProfile/interfaces';

import genomicRefPopup from './components/genomicRefPopup/duck';
import IGenomicRefPopup from './components/genomicRefPopup/interfaces';

import tabPanelDiagnostic from './components/tabPanelDiagnostic/duck';
import ITabPanelDiagnostic from './components/tabPanelDiagnostic/interfaces';

import { saveToStorage } from './utils/storage';

/**
 * Config redux store
 */

export const history = createBrowserHistory({ basename: '/' });

export interface IRootState {
  launch: ILaunchState;
  login: ILoginState;
  passwordRequest: IPasswordRequestState;
  appConfiguration: IAppConfiguration;
  setPasswordRequest: ISetPassword;
  usersManagement: IUsersManagement;
  userProfile: IUserProfile;
  createNewUser: ICreateNewUser;
  registryRequest: IRegistryRequest;
  registrationManagement: IRegistrationManaement;
  drugProfile: IDrugProfile;
  drugsManagement: IDrugsManagement;
  globalPopups: IGlobalPopups;
  panelSetsManagement: IPanelSetsManagement;
  createNewPanelSet: ICreateNewPanelSet;
  panelSetProfile: IPanelSetProfile;
  genomicRefPopup: IGenomicRefPopup;
  tabPanelDiagnostic: ITabPanelDiagnostic;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Create middleware array
const middlewares = [thunk, routerMiddleware(history)];

// Needed for Redux Devs Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    launch,
    passwordRequest,
    setPasswordRequest,
    login,
    userProfile,
    createNewUser,
    registryRequest,
    drugsManagement,
    globalPopups,
    drugProfile,
    appConfiguration,
    createNewPanelSet,
    panelSetProfile,
    genomicRefPopup,
    tabPanelDiagnostic
  }),
  compose(applyMiddleware(...middlewares), composeEnhancers())
);

// Sync redux user with sessionStorage
store.subscribe(
  throttle(() => {
    const user = store.getState().login.localUser;
    const launch = store.getState().launch.data;
    if (user) {
      saveToStorage({ ...user, token: `${user.token.includes('Bearer') ? user.token : `Bearer ${user.token}`}` }, launch.configured);
    }
  }, 1000)
);

export default store;
