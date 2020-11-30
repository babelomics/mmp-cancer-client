import axios from 'axios';
import { API_ENDPOINT, API_CONFIGURATION } from '../../../utils/constants';

const API_CONFING_ENDPOINT = `${API_ENDPOINT}${API_CONFIGURATION}`;

const fetchConfigRequest = () => {
    return axios.get(`${API_CONFING_ENDPOINT}`, {});
  };

  export default { fetchConfigRequest };
