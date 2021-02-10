import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';
import DrugsManagement from './DrugsManagement';

interface IProps extends RouteComponentProps {
  manualDrugsUpdate: () => Promise<any>;
  changeAvailable: (drugs: string[], available: boolean, user: string, isAllSelected: boolean, filters: any) => Promise<any>;
  user: string | null | undefined ;
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <DrugsManagement {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  user: state.login.localUser?.username
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
