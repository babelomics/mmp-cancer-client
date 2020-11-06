import axios from 'axios';
import { API_ENDPOINT, API_USERS_REQUESTS } from '../../../utils/constants';

const API_USERS_REQUESTS_ENDPOINT = `${API_ENDPOINT}${API_USERS_REQUESTS}`;

const fetchRegistrationRequests = (params: any) => {
  return axios.get(`${API_USERS_REQUESTS_ENDPOINT}/list`, { params });
};

export default { fetchRegistrationRequests };
