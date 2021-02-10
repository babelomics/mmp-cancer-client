import { UserFilter, User } from '../../usersManagement/interfaces';
import { RegistrationFilter, Registration } from '../../registrationManagement/interfaces';
import { PanelSet, PanelSetFilter } from '../../panelSetsManagement/interfaces';

import { API_DINAMIC_DICTIONARY, API_DRUGS, API_ENDPOINT, API_PANELS, API_PANEL_SETS, API_PROJECTS, API_USERS, API_USERS_REQUESTS } from '../../../utils/constants';
import axios from 'axios';
import { Panel, PanelFilter } from '../../panelSetProfile/interfaces';
import { Drug, DrugFilter } from '../../drugsManagement/interfaces';
import { ITableAssemblyData, ITableAssemblyDataFilter, ITableSpeciesData, ITableSpeciesDataFilter } from '../../genomicRefPopup/interfaces';
import { IGene, ICommonFilter, ITranscript, ITranscriptFilter, IIcd10, IHPO, IHPOFilter } from '../../tabPanelDiagnostic/tabs/interfaces';
import { IPopupSearchGeneFilter } from '../popupsComponents/searchGenes/interfaces';
import { ArrayUtils } from '../../../utils/arrayUtils';
import { ITranscriptPopupFilter } from '../../commons/popupsComponents/transcriptPopup/interfaces';
import { IHPOPopupFilter } from '../../commons/popupsComponents/hpoPopup/interfaces';
import { IProjectsFilter, IProjects } from '../../projectsManagement/interfaces';

class MmpClient {
  static async getUserPage(filter: UserFilter, pageSize: number, page: number): Promise<User[]> {
    const params = {} as any;
    params.size = pageSize;
    params.page = page;
    if (!!filter.searchText) {
      params.search = filter.searchText;
    }
    if (!!filter.identifier) {
      params.identifier = filter.identifier;
    }
    if (!!filter.firstName) {
      params.firstName = filter.firstName;
    }
    if (!!filter.lastName) {
      params.lastName = filter.lastName;
    }
    if (!!filter.email) {
      params.email = filter.email;
    }
    if (!!filter.organization) {
      params.organization = filter.organization;
    }
    if (!!filter.createdAfter) {
      params.dateCreatedStart = this.translateDate(filter.createdAfter.toISOString().substring(0, 10));
    }
    if (!!filter.createdBefore) {
      params.dateCreatedEnd = this.translateDate(filter.createdBefore.toISOString().substring(0, 10));
    }
    if (!!filter.lastAccessAfter) {
      params.dateLastAccessStart = this.translateDate(filter.lastAccessAfter.toISOString().substring(0, 10));
    }
    if (!!filter.lastAccessBefore) {
      params.dateLastAccessEnd = this.translateDate(filter.lastAccessBefore.toISOString().substring(0, 10));
    }
    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }
    if (!!filter.userType) {
      params.userType = filter.userType;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_USERS}/list`, { params })
        .then((res: any) => {
          resolve(res.data.content);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  static async getRegistrationPage(filter: RegistrationFilter, pageSize: number, page: number): Promise<Registration[]> {
    const params = {} as any;
    params.size = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.search = filter.searchText;
    }
    if (!!filter.identifier) {
      params.identifier = filter.identifier;
    }
    if (!!filter.firstName) {
      params.firstName = filter.firstName;
    }
    if (!!filter.lastName) {
      params.lastName = filter.lastName;
    }
    if (!!filter.organization) {
      params.organization = filter.organization;
    }
    if (!!filter.requestedAfter) {
      params.applicationDateStart = this.translateDate(filter.requestedAfter.toISOString().substring(0, 10));
    }
    if (!!filter.requestedBefore) {
      params.applicationDateEnd = this.translateDate(filter.requestedBefore.toISOString().substring(0, 10));
    }
    if (filter.hasOwnProperty('attended') && (filter.attended === true || filter.attended === false)) {
      params.attended = filter.attended.toString();
    }
    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_USERS_REQUESTS}/list`, { params })
        .then((res: any) => {
          resolve(res.data.content);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  static async getPanelSetPage(filter: PanelSetFilter, pageSize: number, page: number): Promise<PanelSet[]> {
    const params = {} as any;
    params.size = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.search = filter.searchText;
    }
    if (!!filter.identifier) {
      params.diagnosticPanelSetIdentifier = filter.identifier;
    }
    if (!!filter.name) {
      params.name = filter.name;
    }
    if (!!filter.author) {
      params.author = filter.author;
    }
    if (!!filter.assembly) {
      params.assembly = filter.assembly;
    }
    if (!!filter.ensemblRelease) {
      params.ensemblRelease = filter.ensemblRelease;
    }
    if (filter.hasOwnProperty('isDeleted') && (filter.isDeleted === true || filter.isDeleted === false)) {
      params.isDeleted = filter.isDeleted.toString();
    }
    if (!!filter.createdAfter) {
      params.creationDateStart = this.translateDate(filter.createdAfter.toISOString().substring(0, 10));
    }
    if (!!filter.createdBefore) {
      params.creationDateEnd = this.translateDate(filter.createdBefore.toISOString().substring(0, 10));
    }
    if (!!filter.deletedAfter) {
      params.deletionDateStart = this.translateDate(filter.deletedAfter.toISOString().substring(0, 10));
    }
    if (!!filter.deletedBefore) {
      params.deletionDateEnd = this.translateDate(filter.deletedBefore.toISOString().substring(0, 10));
    }
    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_PANEL_SETS}/list`, { params })
        .then((res: any) => {
          resolve(res.data.content);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  static async getPanelPage(filter: PanelFilter, pageSize: number, page: number, id: string): Promise<Panel[]> {
    const params = {} as any;
    params.size = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.search = filter.searchText;
    }
    if (!!filter.identifier) {
      params.diagnosticPanelIdentifier = filter.identifier;
    }
    if (!!filter.name) {
      params.name = filter.name;
    }
    if (!!filter.author) {
      params.author = filter.author;
    }
    if (filter.hasOwnProperty('isDeleted') && (filter.isDeleted === true || filter.isDeleted === false)) {
      params.isDeleted = filter.isDeleted.toString();
    }
    if (filter.hasOwnProperty('ascendingPanels') && (filter.ascendingPanels === true || filter.ascendingPanels === false)) {
      params.ascendingPanels = filter.ascendingPanels.toString();
    }
    if (filter.hasOwnProperty('descendingPanels') && (filter.descendingPanels === true || filter.descendingPanels === false)) {
      params.descendingPanels = filter.descendingPanels.toString();
    }
    if (!!filter.createdAfter) {
      params.creationDateStart = this.translateDate(filter.createdAfter.toISOString().substring(0, 10));
    }
    if (!!filter.createdBefore) {
      params.creationDateEnd = this.translateDate(filter.createdBefore.toISOString().substring(0, 10));
    }
    if (!!filter.deletedAfter) {
      params.deletionDateStart = this.translateDate(filter.deletedAfter.toISOString().substring(0, 10));
    }
    if (!!filter.deletedBefore) {
      params.deletionDateEnd = this.translateDate(filter.deletedBefore.toISOString().substring(0, 10));
    }
    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_PANELS}/${id}/list`, { params })
        .then((res: any) => {
          resolve(res.data.content);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  static async getDrugPage(filter: DrugFilter, pageSize: number, page: number): Promise<Drug[]> {
    const params = {} as any;
    params.size = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.search = filter.searchText;
    }
    if (!!filter.standardName) {
      params.standardName = filter.standardName;
    }
    if (!!filter.commonName) {
      params.commonName = filter.commonName;
    }
    if (filter.hasOwnProperty('available') && (filter.available === true || filter.available === false)) {
      params.isAvailable = filter.available.toString();
    }
    if (!!filter.lastModificationAfter) {
      params.dateModifiedStart = this.translateDate(filter.lastModificationAfter.toISOString().substring(0, 10));
    }
    if (!!filter.lastModificationBefore) {
      params.dateModifiedEnd = this.translateDate(filter.lastModificationBefore.toISOString().substring(0, 10));
    }
    if (filter.hasOwnProperty('isDeleted') && (filter.isDeleted === true || filter.isDeleted === false)) {
      params.isDeleted = filter.isDeleted.toString();
    }
    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_DRUGS}/list`, { params })
        .then((res: any) => {
          resolve(res.data.content);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  static async getSpeciesPage(filter: ITableSpeciesDataFilter, pageSize: number, page: number): Promise<ITableSpeciesData[]> {
    const params = {} as any;
    params.size = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.search = filter.searchText;
    }

    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }

    return new Promise((resolve, reject) => {
      return axios
        .get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/species`, { params })
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  static async getAssemblyPage(filter: ITableAssemblyDataFilter, pageSize: number, page: number, taxonomyId?: string): Promise<ITableAssemblyData[]> {
    const params = {} as any;
    params.size = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.searchText = filter.searchText;
    }

    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }
    return new Promise((resolve, reject) => {
      const url = taxonomyId ? `${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/assembly?taxonomyId=${taxonomyId} ` : `${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/assembly`;
      return axios
        .get(url, { params })
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  static getGenesList(filter: ICommonFilter, items: IGene[]): Promise<IGene[]> {
    return new Promise((resolve, reject) => {
      let filteredItems = items.slice(0);

      if (filter.searchText) {
        filteredItems = ArrayUtils.filterByText(items, filter.searchText);
      }

      if (filter.sortBy) {
        filteredItems = ArrayUtils.sortByProperty(filteredItems, filter.sortBy, filter.sortDirection?.toUpperCase() ?? 'ASC');
      }
      resolve(filteredItems);
    });
  }

  static async getGenesSelectionList(filter: IPopupSearchGeneFilter, pageSize: number, page: number, assembly: string): Promise<IGene[]> {
    const params = {} as any;
    params.pageSize = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.searchText = filter.searchText;
    }

    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/assemblies/${assembly}/genes`, { params })
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  static async getTranscriptList(filter: ITranscriptFilter, items: ITranscript[]): Promise<ITranscript[]> {
    return new Promise((resolve, reject) => {
      let filteredItems = items.slice(0);

      if (filter.searchText) {
        filteredItems = ArrayUtils.filterByText(items, filter.searchText);
      }

      if (filter.sortBy) {
        filteredItems = ArrayUtils.sortByProperty(filteredItems, filter.sortBy, filter.sortDirection?.toUpperCase() ?? 'ASC');
      }
      resolve(filteredItems);
    });
  }
  static async getTranscriptModalList(filter: ITranscriptPopupFilter, pageSize: number, page: number, assembly: string): Promise<ITranscript[]> {
    const params = {} as any;
    params.pageSize = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.searchText = filter.searchText;
    }

    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/assemblies/${assembly}/transcripts`, { params })
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  static async getHPOList(filter: IHPOFilter, items: IHPO[]): Promise<IHPO[]> {
    return new Promise((resolve, reject) => {
      let filteredItems = items.slice(0);

      if (filter.searchText) {
        filteredItems = ArrayUtils.filterByText(items, filter.searchText);
      }

      if (filter.sortBy) {
        filteredItems = ArrayUtils.sortByProperty(filteredItems, filter.sortBy, filter.sortDirection?.toUpperCase() ?? 'ASC');
      }
      resolve(filteredItems);
    });
  }
  static async getHPOModalList(filter: IHPOPopupFilter, pageSize: number, page: number, assembly: string): Promise<IHPO[]> {
    const params = {} as any;
    params.pageSize = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.searchText = filter.searchText;
    }

    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/hpos/list`, { params })
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  static async getIcd10List(filter: IPopupSearchGeneFilter, items: IIcd10[]): Promise<IIcd10[]> {
    return new Promise((resolve, reject) => {
      let filteredItems = items.slice(0);

      if (filter.sortBy) {
        filteredItems = ArrayUtils.sortByProperty(filteredItems, filter.sortBy, filter.sortDirection?.toUpperCase() ?? 'ASC');
      }
      resolve(filteredItems);
    });
  }

  static async getIcd10SelectionList(filter: ICommonFilter, pageSize: number, page: number): Promise<IGene[]> {
    const params = {} as any;
    params.pageSize = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.searchText = filter.searchText;
    }

    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_DINAMIC_DICTIONARY}/icd10/list`, { params })
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  static async getProjectsPage(filter: IProjectsFilter, pageSize: number, page: number): Promise<IProjects[]> {
    const params = {} as any;
    params.size = pageSize;
    params.page = page;

    if (!!filter.searchText) {
      params.searchText = filter.searchText;
    }
    if (!!filter.projectId) {
      params.projectId = filter.projectId;
    }
    if (!!filter.name) {
      params.name = filter.name;
    }
    if (!!filter.creationDateEnd) {
      params.creationDateEnd = this.translateDate(filter.creationDateEnd.toISOString().substring(0, 10));
    }
    if (!!filter.creationDateStart) {
      params.creationDateStart = this.translateDate(filter.creationDateStart.toISOString().substring(0, 10));
    }
    if (!!filter.modificationDateEnd) {
      params.modificationDateEnd = this.translateDate(filter.modificationDateEnd.toISOString().substring(0, 10));
    }
    if (!!filter.modificationDateStart) {
      params.modificationDateStart = this.translateDate(filter.modificationDateStart.toISOString().substring(0, 10));
    }
    if (filter.hasOwnProperty('isDeleted') && (filter.isDeleted === true || filter.isDeleted === false)) {
      params.isDeleted = filter.isDeleted.toString();
    }
    if (!!filter.sortBy) {
      const value = filter.sortBy + (undefined !== filter.sortDirection ? ',' + filter.sortDirection : '');
      params.sort = value;
    }
    if (!!filter.assembly) {
      params.assembly = filter.assembly;
    }
    if (!!filter.ensemblRelease) {
      params.ensemblRelease = filter.ensemblRelease;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_ENDPOINT}${API_PROJECTS}/list`, { params })
        .then((res: any) => {
          resolve(res.data.content);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // TODO: remove this and make all strings ISO
  static readonly translateDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(5, 7);
    const day = dateStr.substring(8, 10);
    return `${day}/${month}/${year}`;
  };
}

export default MmpClient;
