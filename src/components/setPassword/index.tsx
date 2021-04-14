import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'query-string';
import moment from 'moment';

import { IRootState } from '../../store';
import { operations } from './duck';
import SetPassword from './SetPassword';
import routes from '../router/routes';
import { decodeJwt } from '../../utils/utils';
import { ITokenData } from './interfaces';

interface IProps extends RouteComponentProps {
  login: any;
  loading: boolean;
  signup: (token: string, identifier: string, password: string, t: any) => void;
  showMessagePopup: (message: string, type: 'success' | 'error' | 'info' | 'warning', onClose: () => void) => void;
}

class Wrapper extends React.Component<IProps, {}> {
  state = {
    tokenData: undefined,
    token: ''
  };

  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      this.props.history.push(routes.PATH_HOME);
    } else {
      const parsed = qs.parse(this.props.history.location.search);
      if (parsed.token) {
        const decodedToken = decodeJwt<ITokenData>(parsed.token as string);
        if (decodedToken) {
          this.setState({ tokenData: decodedToken, token: parsed.token });
          // Check token expired
          if (moment().isAfter(moment.unix(decodedToken.exp))) {
            this.props.showMessagePopup('Token is invalid or has expired', 'error', () => this.props.history.push(routes.PATH_LOGIN));
          }
        }
      } else {
        this.props.history.push(routes.PATH_LOGIN);
      }
    }
  }

  render() {
    return <SetPassword {...this.props} tokenData={this.state.tokenData} token={this.state.token} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  login: state.login,
  loading: state.setPasswordRequest.loading
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
