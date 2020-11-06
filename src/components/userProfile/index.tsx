import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';
import UserProfile from './UserProfile';
import IUserProfile from './interfaces';
import routes from '../router/routes';

interface IProps extends RouteComponentProps {
  login: any;
  userProfile: IUserProfile;
  fetchUserData: (identifier: string) => void;
  updateUser: (identifier: string, data: any) => void;
  changePassword: (identifier: string, password: string) => void;
  unsubscribeUser: (identifier: string, t: any) => void;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    const pathParts = this.props.history.location.pathname.split('/');
    const userIdentifier = pathParts[3];

    // If an username exists in url
    if (userIdentifier) {
      // Check if user logged is the same as identifier in url
      if (this.props.login.user.sub === userIdentifier || this.props.login.user.isAdmin) {
        this.props.fetchUserData(userIdentifier);
      } else {
        // Redirect to Home
        this.props.history.push(routes.PATH_HOME);
      }
    } else {
      this.props.fetchUserData(this.props.login.user.sub);
    }
  }

  render() {
    return <UserProfile {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  login: state.login,
  userProfile: state.userProfile
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
