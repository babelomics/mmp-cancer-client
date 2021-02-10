import SortDirection from '../commons/tableFilter/interfaces/SortDirection';

export default interface IState {
  loading: boolean;
}

export interface Registration {
  firstName: string;
  lastName: string;
  identifier: string;
  accessType?: string;
  email: string;
  organization: string;
  applicationDate: string | Date;
  accessRequestReason: string;
  accessRefusalReason: string;
  attended: 'approve' | 'reject' | boolean;
  userType: string;
}

export interface RegistrationFilter {
  searchText?: string;
  identifier?: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  requestedAfter?: Date;
  requestedBefore?: Date;
  attended?: boolean;
  sortBy?: string;
  sortDirection?: SortDirection;
}
