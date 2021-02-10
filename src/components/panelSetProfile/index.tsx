import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';

import PanelSetProfile from './PanelSetProfile';
import { IPanelSetData, IReference } from './interfaces';

interface IProps extends RouteComponentProps {
  loading: boolean;
  panelSetData: IPanelSetData;
  fetchPanelSetData: (identifier: string) => void;
  deletePanelSetData: (identifier: string, t: any) => void;
  updatePanelSetData: (identifier: string, dataPanelProfile: IPanelSetData, t: any) => Promise<any>;
  updateReferencePanelSetData: (data: IReference) => void;
  exportPanel: (identifier: string, t: any, filename?: string) => void;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    const pathParts = this.props.history.location.pathname.split('/');
    const identifier = pathParts[2];
    this.props.fetchPanelSetData(identifier);
  }

  render() {
    return <PanelSetProfile {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.panelSetProfile.loading,
  panelSetData: state.panelSetProfile.panelSetData
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
