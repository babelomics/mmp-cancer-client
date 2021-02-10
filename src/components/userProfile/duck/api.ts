import axios from 'axios';
import { IData, IContactAdminUpdate } from '../interfaces';
import { API_ENDPOINT, API_USERS, API_CONFIGURATION } from '../../../utils/constants';

const API_USERS_ENDPOINT = `${API_ENDPOINT}${API_USERS}`;
const API_CONFING_ENDPOINT = `${API_ENDPOINT}${API_CONFIGURATION}`;

const fetchUserData = (identifier: string) => {
  return axios.get(`${API_USERS_ENDPOINT}/user/id/${identifier}`);
};

const updateUser = (identifier: string, data: IData) => {
  return axios.put(`${API_USERS_ENDPOINT}/user/id/${identifier}`, data);
};

const changePassword = (identifier: string, password: string) => {
  return axios.put(`${API_USERS_ENDPOINT}/user/id/${identifier}/changePassword`, password);
};

const unsubscribeUser = (identifier: string) => {
  return axios.delete(`${API_USERS_ENDPOINT}/user/id/${identifier}`);
};

const updateContactAdmin = (params: IContactAdminUpdate) => {
  return axios.put(`${API_CONFING_ENDPOINT}/update-contact-admin`, params);
};

export default { fetchUserData, updateUser, changePassword, unsubscribeUser, updateContactAdmin };
