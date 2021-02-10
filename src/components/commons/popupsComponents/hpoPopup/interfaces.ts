import SortDirection from '../../tableFilter/interfaces/SortDirection';

// =======

// =====  HPO POPUP
export interface IHPOPopup {
  hpoId: string;
  name: string;
  def: string;
  altID: string[];
  parents: string[];
  children: string[];
}
export interface IHPOPopupFilter {
  searchText?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
}
