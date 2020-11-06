// Interfaces related to the component Example

export default interface IState {
  loading: boolean;
  data: IFormData;
}

export interface IFormData {
  accessType: number;
  identifier: string;
  organization: string;
  firstName: string;
  lastName: string;
  email: string;
  accessRequestReason: string;
  userType?: number;
  accessRefusalReason?: string;
  attended?: 'approve' | 'reject' | null;
  isReviewing?: boolean;
}
