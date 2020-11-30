import axios from 'axios';
import { API_ENDPOINT, API_DRUGS } from '../../../utils/constants';

const API_DRUGS_ENDPOINT = `${API_ENDPOINT}${API_DRUGS}`;

const fetchDrugs = (params: any) => {
  return axios.get(`${API_DRUGS_ENDPOINT}/list`, { params });
};

const changeAvailable = (drugs: string[], available: boolean, user: string) => {
  return axios.put(`${API_DRUGS_ENDPOINT}/updateAvailability`, { standardName: drugs, isAvailable: available, userId: user });
};

const manualDrugsUpdate = () => {
  return axios.post(`${API_DRUGS_ENDPOINT}/manual-drug-update`);
}

export default { fetchDrugs, changeAvailable, manualDrugsUpdate };
