import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from './routes';

interface IProps {
  path: string;
  login: any;
  launch: any;
  component: any;
  redirect?: string;
  adminOnly?: boolean;
  configurationOnly?: boolean;
}

const SecuredRoute = ({ path, login, component: Component, redirect, adminOnly, configurationOnly, launch, ...otherProps }: IProps) => {
  const isAllowed = () => {
    // TODO: Implement roles logic
    if (configurationOnly) {
      return login.isAuthenticated && login.user.isAdmin && !launch.data.configured;
    }
    if (adminOnly) {
      return login.isAuthenticated && login.user.isAdmin && launch.data.configured;
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
