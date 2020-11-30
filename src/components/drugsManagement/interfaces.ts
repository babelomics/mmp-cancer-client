export default interface IState {
  loading: boolean;
  drugsData: any[];
}

export interface ITableData {
  version: number | null;
  standardName: string | null;
  commonName: string | null;
  available: boolean | null;
  cost: number | null;
  creationDate: string | Date | null;
  deletionDate: string | Date | null;
}
