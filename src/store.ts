import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import ILoginState from './components/login/interfaces';
import login from './components/login/duck';

import IPasswordRequestState from './components/forgotPassword/interfaces';
import passwordRequest from './components/forgotPassword/duck';

import setPasswordRequest from './components/setPassword/duck';
import ISetPassword from './components/setPassword/interfaces';

import usersManagement from './components/usersManagement/duck';
import IUsersManagement from './components/usersManagement/interfaces';

import userProfile from './components/userProfile/duck';
import IUserProfile from './components/userProfile/interfaces';

import createNewUser from './components/createNewUser/duck';
import ICreateNewUser from './components/createNewUser/interfaces';

import registryRequest from './components/registryRequest/duck';
import IRegistryRequest from './components/registryRequest/interfaces';

import registrationManagement from './components/registrationManagement/duck';
import IRegistrationManaement from './components/registrationManagement/interfaces';

import globalPopups from './components/globalPopups/duck';
import IGlobalPopups from './components/globalPopups/interfaces';

import { saveToStorage } from './utils/storage';

/**
 * Config redux store
 */

export const history = createBrowserHistory({ basename: '/' });

export interface IRootState {
  login: ILoginState;
  passwordRequest: IPasswordRequestState;
  setPasswordRequest: ISetPassword;
  usersManagement: IUsersManagement;
  userProfile: IUserProfile;
  createNewUser: ICreateNewUser;
  registryRequest: IRegistryRequest;
  registrationManagement: IRegistrationManaement;
  globalPopups: IGlobalPopups;
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
  combineReducers({ router: connectRouter(history), passwordRequest, setPasswordRequest, login, usersManagement, userProfile, createNewUser, registryRequest, registrationManagement, globalPopups }),
  compose(applyMiddleware(...middlewares), composeEnhancers())
);

// Sync redux user with sessionStorage
store.subscribe(
  throttle(() => {
    const user = store.getState().login.localUser;
    if (user) {
      saveToStorage({ ...user, token: `${user.token.includes('Bearer') ? user.token : `Bearer ${user.token}`}` });
    }
  }, 1000)
);

export default store;
