import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Query } from 'material-table';

import { IRootState } from '../../store';
import { ITableFilter } from '../commons/GaiaTable';
import { operations } from './duck';
import RegistrationManagement from './RegisrationManagement';

interface IProps extends RouteComponentProps {
  loading: boolean;
  fetchRegistrationRequests: (query: Query<any>, filters: ITableFilter, previousData: any) => Promise<any>;
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <RegistrationManagement {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.registrationManagement.loading
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
