import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import Launch from './Launch';
import ILoginState from '../login/interfaces';
import { operations } from '../login/duck';
import routes from '../router/routes';

interface IProps extends RouteComponentProps {
  login: ILoginState;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      this.redirectToHome();
    }
  }

  redirectToHome = () => {
    this.props.history.push(routes.PATH_HOME);
  };

  render() {
    return <Launch {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  login: state.login
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
