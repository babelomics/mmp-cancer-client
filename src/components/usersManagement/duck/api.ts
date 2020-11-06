import axios from 'axios';
import { API_ENDPOINT, API_USERS } from '../../../utils/constants';

const API_USERS_ENDPOINT = `${API_ENDPOINT}${API_USERS}`;

const fetchUsers = (params: any) => {
  return axios.get(`${API_USERS_ENDPOINT}/list`, { params });
};

export default { fetchUsers };
