import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';
import UserProfile from './UserProfile';
import IUserProfile, { IContactAdminUpdate } from './interfaces';
import routes from '../router/routes';
import { withTranslation } from 'react-i18next';

interface IProps extends RouteComponentProps {
  login: any;
  userProfile: IUserProfile;
  t: any;
  fetchUserData: (identifier: string, t: any) => void;
  updateUser: (identifier: string, data: any, t: any) => Promise<any>;
  changePassword: (identifier: string, password: string, t: any) => void;
  unsubscribeUser: (identifier: string, t: any) => void;
  setUserSelectionPopupOpen: (open: boolean) => void;
  updateContactAdmin: (params: IContactAdminUpdate, t: any, user: any, isUnsubscribing: boolean) => void;
  [key: string]: any;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    const pathParts = this.props.history.location.pathname.split('/');
    const userIdentifier = pathParts[2];

    // If an username exists in url
    if (userIdentifier) {
      // Check if user logged is the same as identifier in url
      if (this.props.login.user.sub === userIdentifier || this.props.login.user.isAdmin) {
        this.props.fetchUserData(userIdentifier, this.props.t);
      } else {
        // Redirect to Home
        this.props.history.push(routes.PATH_HOME);
      }
    } else {
      this.props.fetchUserData(this.props.login.user.sub, this.props.t);
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
const TranslatedWrapper = withTranslation()<any>(Wrapper);

export default connect(mapStateToProps, mapDispatchToProps)(TranslatedWrapper);
