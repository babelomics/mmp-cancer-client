import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../store';
import { saveToStorage } from '../../utils/storage';
import routes from '../router/routes';
import { operations } from './duck';

import ILoginState, { ILoginForm } from './interfaces';
import ILaunchState from '../launch/interfaces';
import Login from './Login';

interface IProps extends RouteComponentProps {
  login: ILoginState;
  launch: ILaunchState;
  doLogin: (data: ILoginForm) => void;
  errLogin: (textMessage: null | string) => void;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      this.redirectToHome();
    }
  }

  componentWillUnmount() {
    this.props.errLogin(null);
  }

  componentDidUpdate(prevProps: IProps, prevState: any) {
    if (prevProps.login.isAuthenticated !== this.props.login.isAuthenticated) {
      if (this.props.login.isAuthenticated) {
        if (!this.props.login.user?.isAdmin && !this.props.launch.data.configured) {
          this.redirectToMaintenance();
        } else {
          saveToStorage({ ...this.props.login.localUser, token: `Bearer ${this.props.login.localUser}` }, this.props.launch.data.configured);
          this.redirectToHome();
        }
      }
    }
  }

  redirectToHome = () => {
    this.props.history.push(routes.PATH_HOME);
  };

  redirectToMaintenance = () => {
    this.props.history.push(routes.PATH_MAINTENANCE);
  };

  render() {
    return <Login {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  login: state.login,
  launch: state.launch
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
