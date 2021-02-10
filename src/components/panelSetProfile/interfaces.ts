import SortDirection from '../commons/tableFilter/interfaces/SortDirection';

export default interface IState {
  loading: boolean;
  panelSetData: IPanelSetData;
}

export interface IFormData {
  diagnosticPanelSetIdentifier: string;
  name: string;
  creationDate: string | Date;
  description: string;
  assembly: string;
  ensemblRelease: string;
}

export interface IPanelSetData {
  diagnosticPanelSetIdentifier: string;
  name: string | null;
  description: string | null;
  panelsNumber: number | null;
  creationDate: string | Date | null;
  deletionDate: string | Date | null;
  author?: string | null;
  reference: {
    ensemblRelease: string | null;
    assembly: string | null;
  };
  isHuman?: boolean;
}

export interface ISpeciesTable {
  loading: boolean;
}

export interface IDeleteForm {
  confirmation: string;
}

export interface IReference {
  reference: {
    ensemblRelease: string | null;
    assembly: string | null;
  };
}
export interface Panel {
  guid: string;
  diagnosticPanelIdentifier: string;
  name: string;
  description: string;
  author: string;
  ascendingPanels: boolean;
  descendingPanels: boolean;
  genessNumber: number;
  transcNumber: number;
  regionsNumber: number;
  variantsNumber: number;
  creationDate: string | Date;
  deletionDate: string | Date;
}

export interface PanelFilter {
  searchText?: string;
  identifier?: string;
  name?: string;
  author?: string;
  isDeleted?: boolean;
  ascendingPanels?: boolean;
  descendingPanels?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
  deletedAfter?: Date;
  deletedBefore?: Date;
  sortBy?: string;
  sortDirection?: SortDirection;
}
