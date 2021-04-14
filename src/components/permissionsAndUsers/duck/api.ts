import axios from 'axios';

import { API_ENDPOINT, API_GROUPS, API_PERMISSIONS, API_USERS } from '../../../utils/constants';
import { IGroup, IUserPermission } from '../interfaces';

const API_GROUPS_ENDPOINT = `${API_ENDPOINT}${API_GROUPS}`;
const API_PERMISSIONS_ENDPOINT = `${API_ENDPOINT}${API_PERMISSIONS}`;
const API_USERS_ENDPOINT = `${API_ENDPOINT}${API_USERS}`;

const addNewGroup = (data: IGroup) => {
  return axios.post(`${API_GROUPS_ENDPOINT}/group`, data);
};

const fetchGroupDetails = (guid: string) => {
  return axios.get(`${API_GROUPS_ENDPOINT}/group/id/${guid}`);
};

const updateGroup = (guid: string, data: IGroup) => {
  return axios.put(`${API_GROUPS_ENDPOINT}/group/id/${guid}`, data);
};

const deleteGroups = (guid: string, option: string) => {
  return axios.delete(`${API_GROUPS_ENDPOINT}/group/id/${guid}`, { data: { option } });
};

const deleteUserGroup = (identifier: string, userId: string) => {
  return axios.delete(`${API_PERMISSIONS_ENDPOINT}/project/id/${identifier}/remove/user/id/${userId}`);
};

const addNewUserPermission = (projectId: string, userId: string, data: IUserPermission) => {
  return axios.post(`${API_PERMISSIONS_ENDPOINT}/project/id/${projectId}/add/user/id/${userId}`, data);
};

const fetchUserPermissions = (projectId: string, userId: string) => {
  return axios.get(`${API_PERMISSIONS_ENDPOINT}/project/id/${projectId}/user/id/${userId}`);
};

const updateUsersPermissions = (projectId: string, userId: string, data: IUserPermission) => {
  return axios.put(`${API_PERMISSIONS_ENDPOINT}/project/id/${projectId}/user/id/${userId}`, data);
};

const fetchUserGlobalPermissions = () => {
  return axios.get(`${API_USERS_ENDPOINT}/user/permissions`);
};

export default { addNewGroup, fetchGroupDetails, updateGroup, deleteGroups, deleteUserGroup, addNewUserPermission, fetchUserPermissions, updateUsersPermissions, fetchUserGlobalPermissions };
