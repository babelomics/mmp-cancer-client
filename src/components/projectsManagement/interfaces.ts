import SortDirection from '../commons/tableFilter/interfaces/SortDirection';
import { IDiagnosticPanel } from '../tabPanelDiagnostic/interfaces';

export default interface IState {
  loading: boolean;
}

export interface IProjects {
  analyses: Analysis[];
  assembly: string;
  author: string;
  creationDate: Date;
  deletionDate: Date;
  description: string;
  diagnosticPanels: IDiagnosticPanel[];
  drugs: Drug[];
  ensemblRelease: string;
  files: Analysis[];
  individuals: Analysis[];
  modificationDate: Date;
  name: string;
  projectId: string;
  samples: Analysis[];
}

export interface IProjectsFilter {
  projectId?: string;
  name?: string;
  creationDateStart?: Date;
  creationDateEnd?: Date;
  modificationDateStart?: Date;
  modificationDateEnd?: Date;
  assembly?: string;
  ensemblRelease?: string;
  isDeleted?: boolean;
  sortBy?: string;
  sortDirection?: SortDirection;
  searchText?: string;
}

export interface Analysis {}

export interface Association {
  source: string;
  value: string;
}

export interface Feature {
  diagnosticPanelFeatureIdentifier: string;
  inheritance: string;
  mode: string;
  type: string;
}

export interface Drug {
  alternativeNames: AlternativeName[];
  available: boolean;
  commonName: string;
  cost: number;
  creationDate: Date;
  deletionDate: Date;
  id: string;
  previousVersion: number;
  standardName: string;
  userId: string;
  version: number;
}

export interface AlternativeName {
  name: string;
  source: string;
}
