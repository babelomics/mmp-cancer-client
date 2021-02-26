import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';
import ProjectProfile from './ProjectProfile';
import { withTranslation } from 'react-i18next';
import { IProject, IProjectsFilter } from '../projectsManagement/interfaces';

interface IProps extends RouteComponentProps {
  login: any;
  width: any;
  t: any;
  projectData: IProject;
  loading: boolean;
  mode: 'new' | 'edit';
  fetchProjectData: (identifier: string, t: any) => void;
  updateProjectData: (identifier: string, values: IProject, t: any) => void;
  resetReduxProject: () => void;
  deleteProjectData: (identifier: string, t: any) => void;
  setMode: () => void;
  createProject: (values: IProject, t: any) => void;
}

interface IState {
  currentGuid: string;
}
class Wrapper extends React.Component<IProps, IState, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentGuid: ''
    };
  }
  componentDidMount() {
    const pathParts = this.props.history.location.pathname.split('project/');
    const projectId = pathParts[1];

    if (projectId) {
      this.props.fetchProjectData(projectId, this.props.t);
    }
  }
  componentDidUpdate() {
    const pathParts = this.props.history.location.pathname.split('/');
    const projectId = pathParts[2];
    if (projectId) {
      if (projectId !== this.state.currentGuid || !this.state.currentGuid) {
        this.setState({ currentGuid: projectId }, () => {
          this.props.fetchProjectData(projectId, this.props.t);
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
