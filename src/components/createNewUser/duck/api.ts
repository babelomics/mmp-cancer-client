import axios from 'axios';
import { IFormData } from '../interfaces';
import { API_ENDPOINT, API_USERS } from '../../../utils/constants';

const API_USERS_ENDPOINT = `${API_ENDPOINT}${API_USERS}`;

const createUser = (data: IFormData) => {
  return axios.post(`${API_USERS_ENDPOINT}/user`, data);
};

export default { createUser };
