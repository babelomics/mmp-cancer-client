import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import GaiaContainer from '../commons/GaiaContainer';
import GaiaLoading from '../commons/GaiaLoading';
import GaiaTabsPanel, { GaiaTab } from '../commons/GaiaTabs';
import UsersGroups from './tabs/UsersGroups';
import GroupProfilePopup from './popups/GroupProfilePopup';
import { IGroup, IUserPermission } from './interfaces';
import Associated from './tabs/Associated';
import Specifics from './tabs/Specifics';
import UsersPermissionsPopup from './popups/UsersPermissionsPopup';

interface IProps {
  login: any;
  loading: boolean;
  excludeGroups: string[];
  excludeUsers: string[];
  projectId: string;
  groupData: IGroup | null;
  userPermissionData: IUserPermission | null;
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
}

const PermissionsAndUsers = (props: IProps) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<number>(0);
  const [openGroupPopup, setOpenGroupPopup] = useState<boolean>(false);
  const [openUsersPermissionsPopup, setOpenUsersPermissionsPopup] = useState<boolean>(false);

  useEffect(() => {
    if (props.groupData !== null) {
      setOpenGroupPopup(true);
    }
  }, [props.groupData]);

  useEffect(() => {
    if (props.userPermissionData !== null) {
      setOpenUsersPermissionsPopup(true);
    }
  }, [props.userPermissionData]);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleGroupPopupSubmit = (data: IGroup) => {
    if (props.groupData) {
      props.updateGroup(data, props.groupData.guid || '', t);
    } else {
      props.addNewGroup(data, t);
    }
    setOpenGroupPopup(false);
    props.setGroupData(null);
  };

  const handleGroupRowClick = (group: IGroup) => {
    props.fetchGroupDetails(group.guid || '');
  };

  const handleUsersPermissionsPopupSubmit = (data: IUserPermission) => {
    if (props.userPermissionData) {
      props.updateUsersPermissions(props.projectId, data.userId, data, t);
    } else {
      if (data.permissions && data.permissions.length) {
        props.addNewUserPermission(props.projectId, data.userId, data, t);
      } else {
        props.showMessagePopup(t('permissionsAndUsers.messages.createEmptyUserPermissionError'), 'error');
      }
    }
    setOpenUsersPermissionsPopup(false);
    props.setUserPermissionData(null);
  };

  const handleUserPermissionRowClick = (userPermission: IUserPermission) => {
    props.fetchUserPermissions(props.projectId, userPermission.userId);
  };

  return (
    <GaiaContainer icon="vpn_key" title={'Permissions and users'}>
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <div style={{ overflow: 'auto' }}>
          {/* Group Popup */}
          {openGroupPopup && (
            <GroupProfilePopup
              open={true}
              onClose={() => {
                setOpenGroupPopup(false);
                props.setGroupData(null);
              }}
              projectId={props.projectId}
              onSubmit={handleGroupPopupSubmit}
              data={props.groupData}
            />
          )}

          {/* Users Permissions Popup */}
          {openUsersPermissionsPopup && (
            <UsersPermissionsPopup
              open={true}
              onClose={() => {
                setOpenUsersPermissionsPopup(false);
                props.setUserPermissionData(null);
              }}
              projectId={props.projectId}
              onSubmit={handleUsersPermissionsPopupSubmit}
              data={props.userPermissionData}
              exclude={[...props.excludeUsers, props.login.user.sub]}
            />
          )}

          <GaiaTabsPanel value={value} onChange={handleChange}>
            <GaiaTab
              title={t('permissionsAndUsers.tabs.usersGroups')}
              component={
                <UsersGroups
                  onAdd={() => setOpenGroupPopup(true)}
                  deleteGroups={props.deleteGroups}
                  excludeGroups={props.excludeGroups}
                  handleRowClick={handleGroupRowClick}
                  projectId={props.projectId}
                  projectDeleted={props.projectDeleted}
                />
              }
            />
            <GaiaTab
              title={t('permissionsAndUsers.tabs.associated')}
              component={
                <Associated
                  onAdd={() => setOpenUsersPermissionsPopup(true)}
                  projectId={props.projectId}
                  deleteUserGroup={props.deleteUserGroup}
                  handleRowClick={handleUserPermissionRowClick}
                  projectDeleted={props.projectDeleted}
                />
              }
            />
            <GaiaTab
              title={t('permissionsAndUsers.tabs.specifics')}
              component={<Specifics onAdd={() => setOpenGroupPopup(true)} projectId={props.projectId} deleteUserGroup={props.deleteUserGroup} projectDeleted={props.projectDeleted} />}
            />
          </GaiaTabsPanel>
        </div>
      )}
    </GaiaContainer>
  );
};

export default PermissionsAndUsers;
