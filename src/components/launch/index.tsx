import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import Launch from './Launch';
import ILoginState from '../login/interfaces';
import ILaunchState from './interfaces';
import { operations } from './duck';
import routes from '../router/routes';
import { saveToStorageLaunch } from '../../utils/storage';

interface IProps extends RouteComponentProps {
  launch:ILaunchState;
  login: ILoginState;
  fetchConfigRequest: () => void;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      this.redirectToHome();
    }
    else {
      this.props.fetchConfigRequest();
      saveToStorageLaunch(this.props.launch.data.configured);
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
  login: state.login,
  launch: state.launch
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
