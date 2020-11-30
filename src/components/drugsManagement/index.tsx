import { Query } from 'material-table';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { ITableFilter } from '../commons/GaiaTable';
import { operations } from './duck';
import DrugsManagement from './DrugsManagement';
import IDrugsManagement from './interfaces';

interface IProps extends RouteComponentProps {
  fetchDrugs: (query: Query<any>, filters: ITableFilter, previousData: any) => Promise<any>;
  manualDrugsUpdate: () => Promise<any>;
  changeAvailable: (drugs: string[], available: boolean, user: string) => Promise<any>;
  drugsManagement: IDrugsManagement;
  user: string | null | undefined ;
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <DrugsManagement {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  drugsManagement: state.drugsManagement,
  user: state.login.localUser?.username
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
