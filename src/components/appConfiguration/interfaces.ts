export default interface IState {
  loading: boolean;
  configData: IConfiguration;
  validationDirGenCodeURL: number;
}
export interface IConfiguration {
  cellbaseURL?: string;
  contactEmail?: string;
  contactIdentifier?: string;
  contactLastName?: string;
  contactName?: string;
  pandrugPassword?: string;
  pandrugURL?: string;
  pandrugUser?: string;
  pandrugEmail?: string;
  setupInformation?: string;
}

export interface IFormDataPanDrugs {
  url: string;
  user: string;
  password: string;
  email: string;
}

export interface IFormDataDicGen {
  url: string;
}

export interface IAdminConfig {
  name: string;
  surname: string;
  email: string;
  identifier: string;
}

export interface IPandrugsConfig {
  user: string;
  password: string;
  email: string;
  url: string;
}

export interface IGenomicDictConfig {
  url: string;
}
