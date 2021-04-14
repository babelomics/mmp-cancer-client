import { FormikErrors } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { saveToStorage, saveToStorageConfigData } from '../../utils/storage';
import routes from '../router/routes';
import { operations } from './duck';
import ILoginState, { ILoginForm, ISignUpForm } from './interfaces';
import Login from './Login';

interface IProps extends RouteComponentProps {
  login: ILoginState;
  doLogin: (data: ILoginForm) => void;
  errLogin: (textMessage: null | string) => void;
  fetchConfigData: () => void;
  // SignUp
  createRequest: (data: any, setFormikErrors: (errors: FormikErrors<ISignUpForm>) => void, t?: any, onSuccess?: () => void) => void;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      this.redirectToHome();
    } else {
      this.props.fetchConfigData();
      saveToStorageConfigData(this.props.login.configData.configured);
    }
  }

  componentWillUnmount() {
    this.props.errLogin(null);
  }

  componentDidUpdate(prevProps: IProps, prevState: any) {
    if (prevProps.login.isAuthenticated !== this.props.login.isAuthenticated) {
      if (this.props.login.isAuthenticated) {
        if (!this.props.login.user?.isAdmin && !this.props.login.configData.configured) {
          this.redirectToMaintenance();
        } else {
          saveToStorage({ ...this.props.login.localUser, token: `Bearer ${this.props.login.localUser}` }, this.props.login.configData.configured);
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
  login: state.login
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
