// Interfaces related to the component Example

import { IUserData } from '../../utils/storage';

export default interface IState {
  loading: boolean;
  localUser: IUserData | null;
  user: ITokenData | null | any;
  isAuthenticated: boolean;
  error: null | string;
  configData: IConfigData;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IAuthData {
  token: string;
  type: string;
  id: string;
  identifier: string;
  email: string;
}

export interface ITokenData {
  sub: string;
  firstName: string;
  lastName: string;
  exp: number;
  iat: number;
  userType: string;
  isAdmin: boolean;
  permissions?: string[];
}

// Config Data
export interface IConfigData {
  configured: boolean;
  text: string;
  email: string;
}

// SignUp
export interface ISignUpForm {
  accessType: string;
  identifier: string;
  organization: string;
  firstName: string;
  lastName: string;
  email: string;
  accessRequestReason: string;
  userType?: string;
  accessRefusalReason?: string;
  attended?: 'approve' | 'reject' | null;
  isReviewing?: boolean;
}
