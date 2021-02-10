// Interfaces related to the component Example

export default interface IState {
  loading: boolean;
  error: any;
  success: boolean | null;
  formValues: IPanelSetData;
}

// export interface IFormValues {
//   identifier?: string;
//   name?: string;
//   description?: string;
//   reference: IReference;
// }

export interface IFormData {
  diagnosticPanelSetIdentifier: string;
  name: string;
  description: string;
  assembly: string;
  ensemblRelease: string;
}

export interface IUpdatePanelSetData {
  diagnosticPanelSetIdentifier?: string;
  name?: string;
  description?: string;
  reference?: {
    ensemblRelease?: string;
    assembly?: string;
  };
}

export interface IPanelSetData {
  diagnosticPanelSetIdentifier: string;
  name: string;
  description: string;
  reference: IReference;
}

export interface IConfirmData {
  identifier: string;
  name: string;
  confirmation: string;
}

export interface IReference {
  ensemblRelease: string;
  assembly: string;
}

//============ JSON FILE

export interface IJsonFile {
  id: string;
  name: string;
  description: string;
  reference: IJsonFileReference;
  author: string;
  creationDate: Date | string | null;
  deletionDate: Date | string | null;
  exportDate: Date | string | null;
  panels: IJsonFilePanel[];
}

interface IJsonFilePanel {
  id: string;
  name: string;
  description: string;
  author: string;
  features: IJsonFileFeature[];
  associations: IJsonFileAssociation[];
  parentIds: any[];
  creationDate: Date | string | null;
  deletionDate: Date | string | null;
  guid: string;
}

interface IJsonFileAssociation {
  value: string;
  source: string;
}

interface IJsonFileFeature {
  diagnosticPanelFeatureIdentifier: string;
  type: string;
  inheritance: null;
  mode: null;
}

interface IJsonFileReference {
  assembly: string;
  ensemblRelease: string;
}
