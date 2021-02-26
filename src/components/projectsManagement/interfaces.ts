import SortDirection from '../commons/tableFilter/interfaces/SortDirection';

export default interface IState {
  loading: boolean;
  mode: 'new' | 'edit';
}

export interface IProject {
  projectId: string;
  name: string;
  description: string;
  author: string;
  creationDate: Date | string | null;
  modificationDate: Date | string | null;
  assembly: string;
  ensemblRelease: string;
  organism: string;
  accessType: string;
  samplesNumber: number;
  individualsNumber: number;
  analysesNumber: number;
  filesNumber: number;
  diagnosticPanelsNumber: number;
  drugsNumber: number;
  deletionDate: Date | string | null;
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
  organism?: string;
  isDeleted?: boolean;
  sortBy?: string;
  sortDirection?: SortDirection;
  search?: string;
}
