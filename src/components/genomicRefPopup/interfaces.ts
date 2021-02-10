import SortDirection from '../commons/tableFilter/interfaces/SortDirection';

export default interface IState {
  loading: boolean;
  listSpeciesData: any[];
  listAssemblyData: any[];
  listEnsemblRelease: any[];
  genomicReference: IGenomicReferenceData;
  loadingTableData: boolean;
  openSpeciesPopup: boolean;
  openAssemblyPopup: boolean;
}

export interface IGenomicRef {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  assembly: string | undefined;
  scienticName: string | undefined;
  ensemblRelease: string | undefined;
}

export interface IGenomicReferenceData {
  accession: string | null;
  accessionType?: string | null;
  longName?: string | null;
  name?: string | null;
  species?: ISpeciesOrganism;
  ucscAlias?: string | null;
  ensemblRelease: string | null;
}

export interface ISpeciesOrganism {
  taxonomyId: string | undefined;
  scientificName: string | undefined;
  commonName: string | undefined;
}

export interface ITableSpeciesData {
  taxonomyId: string;
  scientificName: string | null;
  commonName: string | null;
}

export interface ITableSpeciesDataFilter {
  taxonomyId?: string;
  scientificName?: string | null;
  commonName?: string | null;
  sortBy?: string;
  sortDirection?: SortDirection;
  searchText?: string;
}

export interface IAssembly {
  id: string | undefined;
  description: string | undefined;
  name: string | undefined;
  ucscAlias: string | undefined;
}

export interface ITableAssemblyData {
  accession: string;
  accessionType: string | null;
  description: string | undefined;
  name: string | undefined;
  ucscAlias: string | undefined;
  species: ISpeciesOrganism;
}

export interface ITableAssemblyDataFilter {
  id?: string | null;
  description?: string | undefined;
  name?: string | undefined;
  ucscAlias?: string | undefined;
  sortBy?: string;
  sortDirection?: SortDirection;
  searchText?: string;
}
