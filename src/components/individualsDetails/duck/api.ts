import axios from 'axios';
import { API_ENDPOINT, API_INDIVIDUALS } from '../../../utils/constants';
import { IIndividual } from '../../individualsManagement/interfaces';
import { IUserPermission } from '../../permissionsAndUsers/interfaces';

const API_INDIVIDUAL_ENDPOINT = `${API_ENDPOINT}${API_INDIVIDUALS}`;

const fetchIndividualData = (identifier: string, guid: string) => {
  return axios.get(`${API_INDIVIDUAL_ENDPOINT}/project/id/${identifier}/individual/id/${guid}`);
};

const apiDeleteIndividualData = (individualId: string, projectId: string) => {
  return axios.delete(`${API_INDIVIDUAL_ENDPOINT}/project/id/${projectId}/individual/id/${individualId}`);
};

const updateIndividual = (projectId: string, data: IIndividual) => {
  return axios.put(`${API_INDIVIDUAL_ENDPOINT}/project/id/${projectId}/individual/id/${data.individualId}`, data);
};

const createIndividual = (projectId: string, data: IIndividual) => {
  return axios.post(`${API_INDIVIDUAL_ENDPOINT}/project/id/${projectId}/individual`, data);
};

const fetchIndividualPermissions = (individualId: string, projectId: string, userId: string) => {
  return axios.get(`${API_INDIVIDUAL_ENDPOINT}/individual/id/${individualId}/project/id/${projectId}/user/id/${userId}`);
};

const addIndividualPermission = (data: IUserPermission, projectId: string) => {
  return axios.post(`${API_INDIVIDUAL_ENDPOINT}/project/id/${projectId}/permissions/add/user/id/${data.userId}`, data);
};

const updateIndividualPermissions = (data: IUserPermission, projectId: string, individualId: string) => {
  return axios.put(`${API_INDIVIDUAL_ENDPOINT}/individual/id/${individualId}/project/id/${projectId}/user/id/${data.userId}`, data);
};

const deleteIndividualPermissions = (userId: string, projectId: string, individualId: string) => {
  return axios.delete(`${API_INDIVIDUAL_ENDPOINT}/individual/id/${individualId}/project/id/${projectId}/permissions/delete/user/id/${userId}`);
};

export default {
  fetchIndividualData,
  apiDeleteIndividualData,
  updateIndividual,
  createIndividual,
  addIndividualPermission,
  fetchIndividualPermissions,
  updateIndividualPermissions,
  deleteIndividualPermissions
};
