// Interfaces related to the component Example

export default interface IState {
  loading: boolean;
  error: any;
  success: boolean | null;
}

export interface IFormData {
  accessType: string;
  identifier: string;
  organization: string;
  firstName: string;
  lastName: string;
  userType: string;
  email: string;
  canCreateProject: boolean;
}
