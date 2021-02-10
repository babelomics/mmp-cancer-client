import axios from 'axios';
import { API_ENDPOINT, API_PANELS, API_DINAMIC_DICTIONARY } from '../../../utils/constants';
import { IDiagnosticPanelGlobal } from '../interfaces';

const API_GETPANEL_ENDPOINT = `${API_ENDPOINT}${API_PANELS}`;
const API_DICTIONARY = `${API_ENDPOINT}${API_DINAMIC_DICTIONARY}`;

const apiFetchPanelGlobal = (diagnosticPanelGuid: string) => {
  return axios.get(`${API_GETPANEL_ENDPOINT}/diagnosticPanel/id/${diagnosticPanelGuid}/tabs`);
};

const apiDeletePanelGlobal = (diagnosticPanelSetIdentifier: string, diagnosticPanelGuid: string, children: boolean) => {
  return axios.delete(`${API_GETPANEL_ENDPOINT}/id/${diagnosticPanelSetIdentifier}/diagnosticPanel/id/${diagnosticPanelGuid}?toDeleteChildren=${children}`);
};

const apiCheckRegion = (region: any, assembly: any) => {
  return axios.get(`${API_DICTIONARY}/assemblies/${assembly}/regions/${region.chromosome}/${region.initPosition}/${region.endPosition}/check`);
};

const apiUpdatePanelGlobal = (diagnosticPanelGuid: string, params: IDiagnosticPanelGlobal) => {
  return axios.put(`${API_GETPANEL_ENDPOINT}/diagnosticPanel/id/${diagnosticPanelGuid}`, params);
};

const createPanel = (data: IDiagnosticPanelGlobal) => {
  return axios.post(`${API_GETPANEL_ENDPOINT}/diagnosticPanel`, data);
};

export default { apiUpdatePanelGlobal, apiDeletePanelGlobal, apiFetchPanelGlobal, apiCheckRegion, createPanel };
