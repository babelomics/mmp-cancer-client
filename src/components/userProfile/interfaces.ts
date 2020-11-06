// Interfaces related to the component Example

export default interface IState {
  loading: boolean;
  error: any;
  success: boolean;
  data: IData;
}

export interface IData {
  firstName: string;
  lastName: string;
  identifier: string;
  accessType: string;
  email: string;
  organization: string;
  dateCreated: string | Date;
  dateLastAccess: string | Date;
  userType: number;
  projectPermissions: boolean;
}

export interface IPasswordModify {
  password: string;
  confirmPassword: string;
}

export interface IUnsubscribeForm {
  confirmation: string;
}
