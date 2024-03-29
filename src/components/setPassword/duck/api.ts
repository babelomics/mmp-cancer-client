import axios from 'axios';
import { API_ENDPOINT, API_AUTH } from '../../../utils/constants';

const API_AUTH_ENDPOINT = `${API_ENDPOINT}${API_AUTH}`;

const signup = (token: string, identifier: string, password: string) => {
  return axios.post(`${API_AUTH_ENDPOINT}/signup`, { identifier, password }, {headers:{Authorization: token}});
};

export default { signup };
