import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../store';
import { saveToStorage } from '../../utils/storage';
import routes from '../router/routes';
import { operations } from './duck';

import ILoginState, { ILoginForm } from './interfaces';
import Login from './Login';

interface IProps extends RouteComponentProps {
  login: ILoginState;
  doLogin: (data: ILoginForm) => void;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      this.redirectToHome();
    }
  }

  componentDidUpdate(prevProps: IProps, prevState: any) {
    if (prevProps.login.isAuthenticated !== this.props.login.isAuthenticated) {
      if (this.props.login.isAuthenticated) {
        saveToStorage({ ...this.props.login.localUser, token: `Bearer ${this.props.login.localUser}` });
        this.redirectToHome();
      }
    }
  }

  redirectToHome = () => {
    this.props.history.push(routes.PATH_HOME);
  };

  render() {
    return <Login {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  login: state.login
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
