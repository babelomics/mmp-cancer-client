import axios from 'axios';
import { IPanelSetData } from '../interfaces';
import { API_ENDPOINT, API_PANEL_SETS } from '../../../utils/constants';

const API_GETPANEL_ENDPOINT = `${API_ENDPOINT}${API_PANEL_SETS}`;

const apiCreatePanelSetData = (param: IPanelSetData) => {
  return axios.post(`${API_GETPANEL_ENDPOINT}/diagnosticPanelSet`, param);
};

const apiSendPanelSetData = (param: any) => {
  return axios.post(`${API_GETPANEL_ENDPOINT}/diagnosticPanelSet/sendFile`, param);
};

const uploadFile = (formData: FormData) => {
  return axios.post(`${API_GETPANEL_ENDPOINT}/diagnosticPanelSet/sendFile`, formData);
};

export default { apiCreatePanelSetData, apiSendPanelSetData, uploadFile };
