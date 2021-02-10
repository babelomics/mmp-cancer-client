import axios from 'axios';
import { IPanelSetData } from '../interfaces';
import { API_ENDPOINT, API_PANEL_SETS } from '../../../utils/constants';

const API_GETPANEL_ENDPOINT = `${API_ENDPOINT}${API_PANEL_SETS}`;

const apiFetchPanelSetData = (identifier: string) => {
  return axios.get(`${API_GETPANEL_ENDPOINT}/diagnosticPanelSet/id/${identifier}`);
};

const apiDeletePanelSetData = (identifier: string) => {
  return axios.delete(`${API_GETPANEL_ENDPOINT}/diagnosticPanelSet/id/${identifier}`);
};

const apiUpdatePanelSetData = (identifier: string, param: IPanelSetData) => {
  return axios.put(`${API_GETPANEL_ENDPOINT}/diagnosticPanelSet/id/${identifier}`, param);
};

const exportPanel = (identifier: string) => {
  return axios.get(`${API_GETPANEL_ENDPOINT}/diagnosticPanelSet/id/${identifier}/export`, { responseType: 'json' });
};

export default { apiFetchPanelSetData, apiDeletePanelSetData, apiUpdatePanelSetData, exportPanel };
