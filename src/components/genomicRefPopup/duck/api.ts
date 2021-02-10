import axios from 'axios';
import { API_ENDPOINT, API_DINAMIC_DICTIONARY } from '../../../utils/constants';

const apiFetchSpieces = () => {
  return axios.get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/species`, {});
};

const apiGetSpiecesAssembly = (idAssembly: string) => {
  return axios.get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/assembly?searchText=${idAssembly}`, {});
};

const apiFetchAssembly = (taxonomyId: string) => {
  return axios.get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/assembly?taxonomyId=${taxonomyId} `, {});
};
const fetchSpecies = () => {
  return axios.get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/species`, {});
};

const apiAssemblyAccession = (accession: string) => {
  return axios.get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/ensembl/${accession}`, {});
};

export default { apiFetchSpieces, apiGetSpiecesAssembly, apiFetchAssembly, apiAssemblyAccession, fetchSpecies };
