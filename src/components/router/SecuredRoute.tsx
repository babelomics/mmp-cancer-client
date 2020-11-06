import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from './routes';

interface IProps {
  path: string;
  login: any;
  component: any;
  redirect?: string;
  adminOnly?: boolean;
}

const SecuredRoute = ({ path, login, component: Component, redirect, adminOnly, ...otherProps }: IProps) => {
  const isAllowed = () => {
    // TODO: Implement roles logic
    if (adminOnly) {
      return login.isAuthenticated && login.user.isAdmin;
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
