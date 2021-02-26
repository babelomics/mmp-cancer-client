// Interfaces related to the component Example

import { IUserData } from '../../utils/storage';

export default interface IState {
  loading: boolean;
  localUser: IUserData | null;
  user: ITokenData | null;
  isAuthenticated: boolean;
  error: null | string;
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
}
