export default interface IState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ISetPassword {
  password: string;
}
