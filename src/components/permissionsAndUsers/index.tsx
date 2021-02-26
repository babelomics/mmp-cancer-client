import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';
import CreateNewUser from './PermissionsAndUsers';
import { FormikErrors } from 'formik/dist/types';

interface IProps extends RouteComponentProps {
  loading: boolean;

  groupId: string;
  name: string;
  description: string;
  permission: any[];
  users: string[];
  permissionsNameList: string[];
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <CreateNewUser {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
