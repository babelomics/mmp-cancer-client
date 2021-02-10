import SortDirection from '../../tableFilter/interfaces/SortDirection';

export interface Panel {
  diagnosticPanelIdentifier: string;
  guid: string;
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

export interface PopupPanelFilter {
  searchText?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
}
