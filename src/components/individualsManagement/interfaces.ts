import SortDirection from '../commons/tableFilter/interfaces/SortDirection';
import { IPermission } from '../permissionsAndUsers/permissions';
export default interface IState {
  loading: boolean;
}
export interface IIndividual {
  individualId: string;
  name: string;
  dateOfBirth: Date | null;
  lifeStatus?: ILifeStatus;
  sex?: string;
  comment: string;
  karyotypicSex: string;
  humanEthnicity: string;
  humanDisease?: IHumanDisease[];
  humanPhenotype?: IHumanPhenotype[];
  isHuman: boolean;
}
export interface IIndividualsFilter {
  hpo?: string;
  icd10?: string;
  sex?: string;
  karyotypicSex?: string;
  individualId?: string;
  name?: string;
  comment?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  search?: string;
}
export interface IHumanDisease {
  diseaseId: string;
  dateOfDiagnosis: Date | null | string;
  ontology?: string;
  comment: string;
  description: string;
}

export interface IHumanPhenotype {
  phenotypeId: string;
  observed: string;
  modifiers: string[];
  comment: string;
}
export interface ILifeStatus {
  status: string;
  detail: string;
}
