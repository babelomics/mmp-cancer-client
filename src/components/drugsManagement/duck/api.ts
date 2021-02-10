import axios from 'axios';
import { API_ENDPOINT, API_DRUGS } from '../../../utils/constants';

const API_DRUGS_ENDPOINT = `${API_ENDPOINT}${API_DRUGS}`;

const changeAvailable = (drugs: string[], available: boolean, user: string, isAllSelected: boolean, filters: any) => {
  return axios.put(`${API_DRUGS_ENDPOINT}/updateAvailability`, { standardName: drugs, isAvailable: available, userId: user, isAllSelected: isAllSelected, filters: filters });
};

const manualDrugsUpdate = () => {
  return axios.post(`${API_DRUGS_ENDPOINT}/manual-drug-update`);
}

export default { changeAvailable, manualDrugsUpdate };
