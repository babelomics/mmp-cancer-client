import axios from 'axios';
import { IConfiguration } from '../interfaces';

import { API_ENDPOINT, API_CONFIGURATION, API_PUNDRUGS, API_CELLBASE } from '../../../utils/constants';

const API_CONFING_ENDPOINT = `${API_ENDPOINT}${API_CONFIGURATION}`;

//const API_USERS_REQUESTS_ENDPOINT = `${API_ENDPOINT}${API_USERS_REQUESTS}`;
// const fetchRegistrationRequests = (params: any) => {
//   return axios.get(`${API_USERS_REQUESTS_ENDPOINT}/list`, { params });
//};

const fetchConfigRequest = () => {
  return axios.get(`${API_CONFING_ENDPOINT}`, {});
};

const setNewConfig = (configParam: IConfiguration) => {
  return axios.put(`${API_CONFING_ENDPOINT}`, configParam);
};

const validatePanDrugsApi = (userField: string, passwordField: string, urlField: string) => {
  return axios.post(`${API_ENDPOINT}${API_PUNDRUGS}/validate`, { user: userField, password: passwordField, baseUrl: urlField });
};

const createPanDrugsUserApi = (userField: string, passwordField: string, urlField: string, emailField: string) => {
  return axios.post(`${API_ENDPOINT}${API_PUNDRUGS}/register`, { user: userField, password: passwordField, baseUrl: urlField, email: emailField });
};

const validateCellbaseUrlApi = (urlField: string) => {
  return axios.post(`${API_ENDPOINT}${API_CELLBASE}/validate`, { url: urlField });
};

export default { fetchConfigRequest, setNewConfig, validatePanDrugsApi, validateCellbaseUrlApi, createPanDrugsUserApi };
