import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from './routes';

interface IProps {
  path: string;
  login: any;
  configData: any;
  component: any;
  redirect?: string;
  adminOnly?: boolean;
  configurationOnly?: boolean;
}

const SecuredRoute = ({ path, login, component: Component, redirect, adminOnly, configurationOnly, configData, ...otherProps }: IProps) => {
  const isAllowed = () => {
    if (configurationOnly) {
      return login.isAuthenticated && login.user.isAdmin && !configData.configured;
    }
    if (adminOnly) {
      return login.isAuthenticated && login.user.isAdmin && configData.configured;
    }

    return login.isAuthenticated;
  };

  return (
    <Route
      {...otherProps}
      path={path}
      render={(props) => {
        return isAllowed() ? <Component {...props} /> : <Redirect to={redirect ? redirect : routes.PATH_LOGIN} />;
      }}
    />
  );
};

export default SecuredRoute;
