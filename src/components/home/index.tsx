import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../store';
import { operations } from './duck';
import Home from './Home';
import { ITokenData } from '../login/interfaces';
import routes from '../router/routes';

interface IProps extends RouteComponentProps {
  user: ITokenData | null;
  configured: boolean;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    if (this.props.user?.userType === 'User') {
      this.props.history.push(routes.PATH_PROJECTS_MANAGEMENT);
    }
  }

  render() {
    return <Home {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  user: state.login.user,
  configured: state.login.configData.configured
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
