import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';
import ProjectProfile from './ProjectProfile';
import { withTranslation } from 'react-i18next';
import { IProject } from '../projectsManagement/interfaces';
import { ITokenData } from '../login/interfaces';
import { userCanCreate, userCanRead } from '../../utils/permissionsUtils';
import { P_INDIRECT_PROJECT, P_PROJECT_KEYWORD } from '../permissionsAndUsers/permissions';
import routes from '../router/routes';

interface IProps extends RouteComponentProps {
  login: any;
  width: any;
  t: any;
  projectData: IProject;
  loading: boolean;
  mode: 'new' | 'edit';

  fetchProjectData: (identifier: string, user: ITokenData, t: any) => void;
  updateProjectData: (identifier: string, values: IProject, t: any) => void;
  resetReduxProject: () => void;
  deleteProjectData: (identifier: string, t: any) => void;
  setMode: () => void;
  createProject: (values: IProject, t: any) => void;
  showMessagePopup: (message: string, type: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm', onClose?: (() => void) | undefined) => void;
}

interface IState {
  projectId: string;
}
class Wrapper extends React.Component<IProps, IState, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      projectId: ''
    };
  }

  componentDidMount() {
    if (userCanCreate(this.props.login.user, P_INDIRECT_PROJECT, 'undefined') || userCanRead(this.props.login.user, P_PROJECT_KEYWORD, this.props.projectData.projectId)) {
      const pathParts = this.props.history.location.pathname.split('project/');
      const projectId = pathParts[1];

      if (projectId) {
        this.setState({ projectId: projectId }, () => {
          this.props.fetchProjectData(projectId, this.props.login.user, this.props.t);
        });
      }
    } else {
      this.props.history.push(`${routes.PATH_PROJECTS_MANAGEMENT}`);
    }
  }

  componentDidUpdate() {
    const pathParts = this.props.history.location.pathname.split('/');
    const projectId = pathParts[2];

    if (projectId) {
      if (projectId !== this.state.projectId || !this.state.projectId) {
        this.setState({ projectId: projectId }, () => {
          this.props.fetchProjectData(projectId, this.props.login.user, this.props.t);
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.resetReduxProject();
  }

  render() {
    return <ProjectProfile {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  login: state.login,
  projectData: state.projectProfile.projectData,
  loading: state.projectProfile.loading,
  mode: state.projectProfile.mode
});

const mapDispatchToProps = { ...operations };
const TranslatedWrapper = withTranslation()<any>(Wrapper);

export default connect(mapStateToProps, mapDispatchToProps)(TranslatedWrapper);
