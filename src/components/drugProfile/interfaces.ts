// Interfaces related to the component Example

export default interface IState {
  loading: boolean;
  error: any;
  success: boolean;
  data: IData;
}

export interface IData {
  modifications: any[];
}

export interface IPasswordModify {
  password: string;
  confirmPassword: string;
}

export interface IUnsubscribeForm {
  confirmation: string;
}
