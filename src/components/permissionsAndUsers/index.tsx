import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import routes from '../router/routes';
import { operations } from './duck';
import { IGroup, IUserPermission } from './interfaces';
import PermissionsAndUsers from './PermissionsAndUsers';

interface IProps extends RouteComponentProps {
  login: any;
  loading: boolean;
  excludeGroups: string[];
  excludeUsers: string[];
  groupData: IGroup | null;
  userPermissionData: IUserPermission | null;
  t: any;
  projectDeleted: boolean;

  addNewGroup: (data: IGroup, t: any) => void;
  updateGroup: (data: IGroup, guid: string, t: any) => void;
  deleteGroups: (guid: string, option: string, t: any) => void;
  deleteUserGroup: (identifier: string, userId: string, t: any) => void;
  fetchGroupDetails: (name: string) => void;
  setGroupData: (data: IGroup | null) => void;
  addNewUserPermission: (projectId: string, userId: string, data: IUserPermission, t: any) => void;
  fetchUserPermissions: (projectId: string, userId: string) => void;
  setUserPermissionData: (data: IUserPermission | null) => void;
  updateUsersPermissions: (projectId: string, userId: string, data: IUserPermission, t: any) => void;
  showMessagePopup: (message: string, type: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm', onClose?: (() => void) | undefined) => void;
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
    return <PermissionsAndUsers {...this.props} projectId={this.state.projectId} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  login: state.login,
  loading: state.permissionsAndUsers.loading,
  excludeGroups: state.permissionsAndUsers.excludeGroups,
  excludeUsers: state.permissionsAndUsers.excludeUsers,
  groupData: state.permissionsAndUsers.groupData,
  userPermissionData: state.permissionsAndUsers.userPermissionData,
  projectDeleted: state.projectProfile.projectData.deletionDate !== null
});

const mapDispatchToProps = { ...operations };

const TranslatedWrapper = withTranslation()<any>(Wrapper);
export default connect(mapStateToProps, mapDispatchToProps)(TranslatedWrapper);
