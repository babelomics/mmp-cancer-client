import { IFormData } from "../forgotPassword/interfaces";

export default interface IState {
  loading: boolean;
  data:IData
}

export interface IData {
  configured: boolean;
  text: string;
}
