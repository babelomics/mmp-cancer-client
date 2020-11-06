import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../store';
import { operations } from './duck';
import ForgotPassword from './ForgotPassword';

interface IProps extends RouteComponentProps {
  loading: boolean;
  requestPassword: (data: string, t: any) => void;
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <ForgotPassword {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.passwordRequest.loading
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
