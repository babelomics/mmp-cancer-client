import SortDirection from "../../tableFilter/interfaces/SortDirection";

export interface User {
    identifier: string;
    firstName: string;
    lastName: string;
    accessType: string;
    email: string;
    organization?: string;
    dateCreated?: string;
    dateLastAccess?: string;
    userType: string;
    canCreateProjects?: boolean;
  }

  export interface PopupUserFilter {
    searchText?: string;
    userType?: string;
    sortBy?: string;
    sortDirection?: SortDirection;
  }