export default interface IState {
  loading: boolean;
}

export interface IFormData {
  identifier: string;
  password: string;
}

export interface ITokenData {
  sub: string;
  exp: number;
  iat: number;
  userType: string;
}
