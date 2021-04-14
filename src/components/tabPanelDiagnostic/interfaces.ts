// Interfaces related to the component Example

export default interface IState {
  loading: boolean;
  error: any;
  success: boolean | null;
  diagnosticPanelGlobal: IDiagnosticPanelGlobal;
  panelSetId: string;
  assemblyId: string;
  mode: 'new' | 'edit';
}

export interface IFormData {
  identifier: string;
  name: string;
  description: string;
  assembly: string;
  ensemblRelease: string;
}

export interface IGeneralData {
  author: string | null;
  diagnosticPanelSetIdentifier: string;
  diagnosticPanelIdentifier: string;
  name: string | null;
  creationDate: string | null;
  deletionDate: string | null;
  description: string | null;
}
export interface IDiagnosticPanel {
  general: IGeneralData;
}
export interface ITableRegionData {
  general: IGeneralData;
}

export interface ITablePanelData {
  identifier: string;
  name: string;
  description: string;
  parentIds: string[] | null;
}

export interface IDeleteForm {
  confirmation: string;
}

// Interfaces for Diagnostic global panel data
export interface IDiagnosticPanelGlobal {
  ascendants: IAscendant[];
  assembly: string | null;
  author: string | null;
  creationDate: string | null;
  deletionDate: string | null;
  descendants: IAscendant[];
  description: string | null;
  diagnosticPanelIdentifier: string;
  diagnosticPanelSetIdentifier: string;
  geneList: IGeneList[];
  hpoList: IHpoList[];
  icd10List: IIcd10List[];
  isHuman: boolean;
  name: string | null;
  previousVersion: string;
  nextVersion: string;
  regionList: IRegionList[];
  transcriptList: ITranscriptList[];
  variantList: IVariantList[];
  guid: string;
  isNewVersion?: boolean;
  ensmblRelease: string;
}

export interface IDiagnosticPanelGlobalUpdate {
  ascendants?: IAscendant[];
  assembly?: string | null;
  author?: string | null;
  creationDate?: string | null;
  deletionDate?: string | null;
  descendants?: IAscendant[];
  description?: string | null;
  diagnosticPanelIdentifier?: string;
  diagnosticPanelSetIdentifier?: string;
  geneList?: IGeneList[];
  hpoList?: IHpoList[];
  icd10List?: IIcd10List[];
  isHuman?: boolean;
  name?: string | null;
  previousVersion?: string;
  nextVersion?: string;
  regionList?: IRegionList[];
  transcriptList?: ITranscriptList[];
  variantList?: IVariantList[];
  guid?: string;
  isNewVersion?: boolean;
}

interface IAscendant {
  description: string;
  diagnosticPanelIdentifier: string;
  name: string;
  parentIds: string[];
  toDelete: boolean;
}

interface IGeneList {
  biotype: string;
  description: string;
  end: number;
  geneId: string;
  hgnc: string;
  isChildren: boolean;
  seqRegion: string;
  start: number;
  strand: string;
  transcripts: ITranscriptList[];
}

interface ITranscriptList {
  biotype: string;
  canonical: boolean;
  end: number;
  geneId: string;
  isChildren: boolean;
  name: string;
  refseq: string[];
  seqRegion: string;
  start: number;
  strand: string;
  transcriptId: string;
}

interface IHpoList {
  altID: string[];
  children: string[];
  def: string;
  hpoId: string;
  name: string;
  parents: string[];
}

interface IIcd10List {
  children: IParent[];
  desc: string;
  id: string;
  parent: IParent;
  type: string;
}

interface IParent {
  desc: string;
  id: string;
  type: string;
}

interface IRegionList {
  chromosome: string;
  endPosition: string;
  initPosition: string;
  regionIdentifier: string;
}

interface IVariantList {
  alternative: string;
  chromosomeSequence: string;
  initPosition: string;
  isChildren: boolean;
  reference: string;
  variantIdentifier: string;
}
