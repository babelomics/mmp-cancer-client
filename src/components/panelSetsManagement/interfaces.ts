import SortDirection from '../commons/tableFilter/interfaces/SortDirection';

export default interface IState {
  loading: boolean;
}

export interface PanelSet {
  diagnosticPanelSetIdentifier: string;
  name: string;
  description: string;
  author: string;
  panelsNumber: number;
  creationDate: string | Date;
  deletionDate: string | Date;
  reference: {
    ensemblRelease: string;
    assembly: string;
  };
}

export interface PanelSetFilter {
  searchText?: string;
  identifier?: string;
  name?: string;
  author?: string;
  assembly?: string;
  ensemblRelease?: string;
  isDeleted?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
  deletedAfter?: Date;
  deletedBefore?: Date;
  sortBy?: string;
  sortDirection?: SortDirection;
}
