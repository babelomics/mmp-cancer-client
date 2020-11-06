import axios from 'axios';
import { IFormData } from '../interfaces';
import { API_ENDPOINT, API_USERS_REQUESTS } from '../../../utils/constants';

const API_USERS_REQUESTS_ENDPOINT = `${API_ENDPOINT}${API_USERS_REQUESTS}`;

const fetchRequestData = (identifier: string) => {
  return axios.get(`${API_USERS_REQUESTS_ENDPOINT}/id/${identifier}`);
};

const createRequest = (data: IFormData) => {
  return axios.post(`${API_USERS_REQUESTS_ENDPOINT}/public/user`, data);
};

const processRequest = (data: IFormData) => {
  return axios.put(`${API_USERS_REQUESTS_ENDPOINT}/id/${data.identifier}`, data);
};

export default { fetchRequestData, createRequest, processRequest };
