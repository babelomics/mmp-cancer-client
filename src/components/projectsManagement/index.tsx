import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../store';
import ILogin, { ITokenData } from '../login/interfaces';
import ProjectsManagement from './ProjectsManagement';

interface IProps extends RouteComponentProps {
  user: ITokenData;
  login: ILogin;
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <ProjectsManagement {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  user: state.login.user,
  login: state.login
});

export default connect(mapStateToProps, {})(Wrapper);
