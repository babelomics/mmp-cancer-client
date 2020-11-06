import axios from 'axios';
import { IData } from '../interfaces';
import { API_ENDPOINT, API_USERS } from '../../../utils/constants';

const API_USERS_ENDPOINT = `${API_ENDPOINT}${API_USERS}`;

const fetchUserData = (identifier: string) => {
  return axios.get(`${API_USERS_ENDPOINT}/user/id/${identifier}`);
};

const updateUser = (identifier: string, data: IData) => {
  return axios.put(`${API_USERS_ENDPOINT}/user/id/${identifier}`, data);
};

const changePassword = (identifier: string, password: string) => {
  return axios.put(`${API_USERS_ENDPOINT}/user/id/${identifier}/changePassword`, { password });
};

const unsubscribeUser = (identifier: string) => {
  return axios.delete(`${API_USERS_ENDPOINT}/user/id/${identifier}`);
};

export default { fetchUserData, updateUser, changePassword, unsubscribeUser };
