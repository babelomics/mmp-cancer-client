export default interface IState {
  loading: boolean;
}

export interface ITableData {
  firstName: string | null;
  lastName: string | null;
  identifier: string | null;
  accessType?: string | null;
  email: string | null;
  organization: string | null;
  applicationDate: string | Date | null;
  accessRequestReason: string;
  accessRefusalReason: string;
  attended: 'approve' | 'reject' | null | boolean;
  userType: string;
}
