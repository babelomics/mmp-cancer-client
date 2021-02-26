import { IProject } from '../projectsManagement/interfaces';

export default interface IState {
  loading: boolean;
  projectData: IProject;
  mode: 'new' | 'edit';
}

export interface Analysis {}

export interface Association {
  source: string;
  value: string;
}

export interface Feature {
  diagnosticPanelFeatureIdentifier: string;
  inheritance: string;
  mode: string;
  type: string;
}

export interface Drug {
  alternativeNames: AlternativeName[];
  available: boolean;
  commonName: string;
  cost: number;
  creationDate: Date;
  deletionDate: Date;
  id: string;
  previousVersion: number;
  standardName: string;
  userId: string;
  version: number;
}

export interface AlternativeName {
  name: string;
  source: string;
}
