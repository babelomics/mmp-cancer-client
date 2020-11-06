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
  dateCreated: string | Date | null;
  dateLastAccess: string | Date | null;
  userType: string;
}
