import axios from 'axios';
import { API_ENDPOINT, API_AUTH, API_CONFIGURATION, API_USERS_REQUESTS } from '../../../utils/constants';
import { ISignUpForm } from '../interfaces';

const API_AUTH_ENDPOINT = `${API_ENDPOINT}${API_AUTH}`;
const API_CONFING_ENDPOINT = `${API_ENDPOINT}${API_CONFIGURATION}`;
const API_USERS_REQUESTS_ENDPOINT = `${API_ENDPOINT}${API_USERS_REQUESTS}`;

// Login
const auth = (identifier: string, password: string) => {
  return axios.post(`${API_AUTH_ENDPOINT}/signin`, { identifier, password });
};

// Config data
const fetchConfigData = () => {
  return axios.get(`${API_CONFING_ENDPOINT}`);
};

// SignUp
const createRequest = (data: ISignUpForm) => {
  return axios.post(`${API_USERS_REQUESTS_ENDPOINT}/public/user`, data);
};

export default { auth, fetchConfigData, createRequest };
