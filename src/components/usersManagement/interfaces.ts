import SortDirection from '../commons/tableFilter/interfaces/SortDirection';

export default interface IState {
  loading: boolean;
}

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

export interface UserFilter {
  searchText?: string;
  identifier?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  organization?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  lastAccessAfter?: Date;
  lastAccessBefore?: Date;
  userType?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
}
