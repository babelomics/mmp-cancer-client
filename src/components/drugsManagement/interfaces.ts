import SortDirection from "../commons/tableFilter/interfaces/SortDirection";

export default interface IState {
  loading: boolean;
  drugsData: any[];
}

export interface Drug {
  id: string;
  version: number;
  standardName: string;
  commonName: string;
  available: boolean;
  cost: number;
  creationDate: string | Date;
  deletionDate: string | Date;
}

export interface DrugFilter {
  searchText?: string;
  standardName?: string;
  commonName?: string;
  available?: boolean;
  lastModificationAfter?: Date;
  lastModificationBefore?: Date;
  isDeleted?: boolean;
  sortBy?: string;
  sortDirection?: SortDirection;
}
