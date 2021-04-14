import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { IHumanPhenotype, IIndividual, IHumanDisease } from '../individualsManagement/interfaces';
import { operations } from './duck';
import routes from '../router/routes';
import IndividualsDetails from './IndividualsDetails';
import { IUserPermission } from '../permissionsAndUsers/interfaces';

interface IProps extends RouteComponentProps {
  login: any;
  loading: boolean;
  t: any;
  individualData: IIndividual;
  permissionsPopupLoading: boolean;
  permissionsData: IUserPermission | null;
  excludedUsers: string[];

  fetchIndividualData: (identifier: string, individualId: string, t: any) => void;
  deleteIndividualData: (individualId: string, projectId: string, t: any) => void;
  updateIndividual: (projectId: string, data: IIndividual, t: any) => void;
  createIndividual: (projectId: string, data: IIndividual, t: any) => void;
  resetReduxIndividual: () => void;
  addHPO: (data: IHumanPhenotype) => void;
  deleteHPO: (id: string) => void;
  addIcd10: (data: IHumanDisease) => void;
  deleteICD10: (id: string) => void;
  updateHPO: (data: IHumanPhenotype) => void;
  updateICD10: (data: IHumanDisease) => void;

  fetchIndividualPermissions: (individualId: string, projectId: string, userId: string, t: any) => void;
  addIndividualPermission: (data: IUserPermission, projectId: string, t: any) => void;
  setPermissionsData: (data: IUserPermission | null) => void;
  setExcludedUsers: (ids: string | string[]) => void;
  updateIndividualPermissions: (data: IUserPermission, projectId: string, individualId: string, t: any) => void;
  deleteIndividualPermissions: (userId: string, projectId: string, individualId: string, t: any) => void;
}

interface IState {
  projectId: string;
  individualId: string;
  tab: string;
}

class Wrapper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      projectId: '',
      individualId: '',
      tab: ''
    };
  }

  componentWillUnmount() {
    this.props.resetReduxIndividual();
  }

  componentDidMount() {
    const pathParts = this.props.history.location.pathname.split('/');
    const projectId = pathParts[2];
    const individualId = pathParts[3];
    const tab = pathParts[4];

    if (projectId) {
      this.setState({ projectId, individualId, tab }, () => {
        if (individualId) {
          this.props.fetchIndividualData(projectId, individualId, this.props.t);
        }
      });
    } else {
      this.props.history.push(`${routes.PATH_INDIVIDUALS_MANAGEMENT}/${projectId}`);
    }
  }

  componentDidUpdate() {
    const pathParts = this.props.history.location.pathname.split('/');
    const projectId = pathParts[2];
    const individualId = pathParts[3];
    const tab = pathParts[4];

    if (projectId && individualId) {
      if ((projectId !== this.state.projectId || !this.state.projectId) && (individualId !== this.state.individualId || !this.state.individualId)) {
        this.setState({ projectId: projectId, individualId, tab }, () => {
          this.props.fetchIndividualData(projectId, individualId, this.props.t);
        });
      }
    }
  }

  render() {
    return <IndividualsDetails {...this.props} individualId={this.state.individualId} projectId={this.state.projectId} tab={this.state.tab} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  login: state.login,
  loading: state.individualsDetails.loading,
  individualData: state.individualsDetails.individualData,
  permissionsPopupLoading: state.individualsDetails.permissionsPopupLoading,
  permissionsData: state.individualsDetails.permissionsData,
  excludedUsers: state.individualsDetails.excludedUsers
});

const mapDispatchToProps = { ...operations };

const TranslatedWrapper = withTranslation()<any>(Wrapper);
export default connect(mapStateToProps, mapDispatchToProps)(TranslatedWrapper);
