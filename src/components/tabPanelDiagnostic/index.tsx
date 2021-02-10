import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { IPanelSetData } from '../panelSetProfile/interfaces';
import { operations } from './duck';
import { IDiagnosticPanelGlobal, IDiagnosticPanelGlobalUpdate } from './interfaces';
import { TabPanelDiagnostic } from './TabPanelDiagnostic';
import { IGene, ITranscript, IHPO, IIcd10 } from './tabs/interfaces';

interface IProps extends RouteComponentProps {
  loading: boolean;
  diagnosticPanel: any;
  assembly: any;
  panelguid: string;
  panelPreviousVersion: string;
  panelNextVersion: string;
  panelSetIdentifier: string;
  panelIdentifier: string;
  panelSetId: string;
  assemblyId: string;
  ascendants: any;
  descendants: any;
  isHuman: boolean | undefined;
  guid: string;
  geneList: any[];
  transcriptList: any[];
  hpoList: any[];
  icd10List: any[];
  mode: 'new' | 'edit';
  panelSetData: IPanelSetData;
  author: string;

  diagnosticPanelGeneral: IDiagnosticPanelGlobal;
  updatePanelGlobal: (identifier: string, dataPanelProfile: IDiagnosticPanelGlobal, t: any) => Promise<any>;
  fetchPanelGlobal: (guid: string) => void;
  deletePanelGlobal: (panelSetId: string, guid: string, children: boolean, t: any) => void;
  createPanel: (data: IDiagnosticPanelGlobal, t: any) => void;
  addNewAscendant: (newAscendant: any) => void;
  addNewDescendant: (newDescendant: any) => void;
  addNewRegion: (newRegion: any) => void;
  addNewVariant: (newVariant: any) => void;
  checkRegion: (region: any, assembly: any) => Promise<any>;
  addVariant: (variant: any) => Promise<any>;
  resetRedux: () => void;
  updatePanelGeneral: (newData: IDiagnosticPanelGlobalUpdate) => void;
  deleteGene: (id: string) => void;
  addGene: (gene: IGene) => void;
  deleteTranscript: (id: string) => void;
  addTranscript: (transcript: ITranscript) => void;
  deleteHPO: (id: string) => void;
  addHPO: (hpo: IHPO) => void;
  addIcd10: (icd10: IIcd10) => void;
  deleteIcd10: (id: string) => void;
}

interface IState {
  currentGuid: string;
}

class Wrapper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentGuid: ''
    };
  }

  componentDidMount() {
    const pathParts = this.props.history.location.pathname.split('/');
    const guid = pathParts[2];
    if (guid) {
      this.setState({ currentGuid: guid }, () => {
        this.props.fetchPanelGlobal(guid);
      });
    }
  }

  componentDidUpdate() {
    const pathParts = this.props.history.location.pathname.split('/');
    const guid = pathParts[2];
    if (guid) {
      if (guid !== this.state.currentGuid || !this.state.currentGuid) {
        this.setState({ currentGuid: guid }, () => {
          this.props.fetchPanelGlobal(guid);
        });
      }
    }
  }

  render() {
    return <TabPanelDiagnostic {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.tabPanelDiagnostic.loading,
  panelIdentifier: state.tabPanelDiagnostic.diagnosticPanelGlobal.diagnosticPanelIdentifier,
  //TBD
  panelSetIdentifier: state.tabPanelDiagnostic.diagnosticPanelGlobal.diagnosticPanelSetIdentifier || state.panelSetProfile.panelSetData.diagnosticPanelSetIdentifier,
  //
  diagnosticPanelGeneral: state.tabPanelDiagnostic.diagnosticPanelGlobal,
  panelguid: state.tabPanelDiagnostic.diagnosticPanelGlobal.guid,
  panelPreviousVersion: state.tabPanelDiagnostic.diagnosticPanelGlobal.previousVersion,
  panelNextVersion: state.tabPanelDiagnostic.diagnosticPanelGlobal.nextVersion,
  ascendants: state.tabPanelDiagnostic.diagnosticPanelGlobal.ascendants,
  descendants: state.tabPanelDiagnostic.diagnosticPanelGlobal.descendants,
  assembly: state.panelSetProfile.panelSetData.reference.assembly || state.tabPanelDiagnostic.diagnosticPanelGlobal.assembly,
  isHuman: state.panelSetProfile.panelSetData.isHuman || state.tabPanelDiagnostic.diagnosticPanelGlobal.isHuman,
  guid: state.tabPanelDiagnostic.diagnosticPanelGlobal.guid,
  geneList: state.tabPanelDiagnostic.diagnosticPanelGlobal.geneList,
  transcriptList: state.tabPanelDiagnostic.diagnosticPanelGlobal.transcriptList,
  hpoList: state.tabPanelDiagnostic.diagnosticPanelGlobal.hpoList,
  icd10List: state.tabPanelDiagnostic.diagnosticPanelGlobal.icd10List,
  mode: state.tabPanelDiagnostic.mode,
  panelSetData: state.panelSetProfile.panelSetData,
  author: state.tabPanelDiagnostic.diagnosticPanelGlobal.author || state.login.user?.sub || ''
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
