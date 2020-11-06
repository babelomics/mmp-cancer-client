import axios from 'axios';
import { API_ENDPOINT, API_EMAIL } from '../../../utils/constants';

const API_EMAIL_ENDPOINT = `${API_ENDPOINT}${API_EMAIL}`;

const requestPassword = (data: string) => {
  return axios.post(`${API_EMAIL_ENDPOINT}/passwordReminder/${data}`);
};

export default { requestPassword };
