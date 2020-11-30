import axios from 'axios';
import { IData } from '../interfaces';
import { API_ENDPOINT, API_DRUGS } from '../../../utils/constants';

const API_DRUGS_ENDPOINT = `${API_ENDPOINT}${API_DRUGS}`;

const fetchDrugData = (identifier: string) => {
  return axios.get(`${API_DRUGS_ENDPOINT}/drug/id/${identifier}`);
};

const updateDrug = (data: IData) => {
  return axios.put(`${API_DRUGS_ENDPOINT}/drug`, data);
};

export default { fetchDrugData, updateDrug };
