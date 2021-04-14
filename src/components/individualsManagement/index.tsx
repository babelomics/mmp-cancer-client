import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../store';
import routes from '../router/routes';
import { operations } from './duck';
import IndividualsManagement from './IndividualsManagement';

interface IProps extends RouteComponentProps {
  t: any;
  projectDeleted: boolean;

  fetchProjectData: (identifier: string, t: any) => void;
}

interface IState {
  projectId: string;
}

class Wrapper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      projectId: ''
    };
  }

  componentDidMount() {
    const pathParts = this.props.history.location.pathname.split('/');
    const projectId = pathParts[2];

    if (projectId) {
      this.setState({ projectId });
      this.props.fetchProjectData(projectId, this.props.t);
    } else {
      this.props.history.push(routes.PATH_PROJECTS_MANAGEMENT);
    }
  }

  componentDidUpdate() {
    const pathParts = this.props.history.location.pathname.split('/');
    const projectId = pathParts[2];
    if (projectId) {
      if (projectId !== this.state.projectId || !this.state.projectId) {
        this.setState({ projectId: projectId });
      }
    }
  }
  render() {
    return <IndividualsManagement {...this.props} projectId={this.state.projectId} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.permissionsAndUsers.loading,
  excludeGroups: state.permissionsAndUsers.excludeGroups,
  groupData: state.permissionsAndUsers.groupData,
  userPermissionData: state.permissionsAndUsers.userPermissionData,
  projectDeleted: state.projectProfile.projectData.deletionDate !== null
});

const mapDispatchToProps = { ...operations };

const TranslatedWrapper = withTranslation()<any>(Wrapper);
export default connect(mapStateToProps, mapDispatchToProps)(TranslatedWrapper);
