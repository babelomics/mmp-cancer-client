import axios from 'axios';
import { API_ENDPOINT, API_PROJECTS } from '../../../utils/constants';
import { IProject } from '../../projectsManagement/interfaces';

const API_PROJECTS_ENDPOINT = `${API_ENDPOINT}${API_PROJECTS}`;

const fetchProjectData = (identifier: string) => {
  return axios.get(`${API_PROJECTS_ENDPOINT}/project/id/${identifier}`);
};
const updateProjectData = (identifier: string, values: IProject) => {
  return axios.put(`${API_PROJECTS_ENDPOINT}/project/id/${identifier}`, values);
};
const deleteProjectData = (identifier: string) => {
  return axios.delete(`${API_PROJECTS_ENDPOINT}/id/${identifier}/project/`);
};

const createProject = (values: IProject) => {
  return axios.post(`${API_PROJECTS_ENDPOINT}/project/`, values);
};

export default { fetchProjectData, updateProjectData, deleteProjectData, createProject };
