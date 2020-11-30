import { Query } from 'material-table';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { ITableFilter } from '../commons/GaiaTable';
import { operations } from './duck';
import UsersManagement from './UsersManagement';
import IUsersManagement from './interfaces';

interface IProps extends RouteComponentProps {
  fetchUsers: (query: Query<any>, filters: ITableFilter, previousData: any) => Promise<any>;
  usersManagement: IUsersManagement;
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <UsersManagement {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  usersManagement: state.usersManagement
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
