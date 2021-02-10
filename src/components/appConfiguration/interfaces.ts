export default interface IState {
  loading: boolean;
  configData: IConfiguration;
  validationPundrugs: boolean;
  validationGenomDict: boolean;
}
export interface IConfiguration {
  contactEmail?: string;
  contactIdentifier?: string;
  contactLastName?: string;
  contactName?: string;
  setupInformation?: string;
  pandrugPassword?: string;
  pandrugURL?: string;
  pandrugUser?: string;
  pandrugEmail?: string;
  genomicDictionaryURL?: string;
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

export interface ISetupInformation {
  textValue: string;
}
