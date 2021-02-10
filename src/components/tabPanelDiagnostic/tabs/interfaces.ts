import SortDirection from '../../commons/tableFilter/interfaces/SortDirection';

interface IDynamic {
  [key: string]: string | boolean | undefined;
}

export type ICommonFilter = IDynamic & {
  searchText?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
};

// =====  GENE
export type IGene = IDynamic & {
  geneId: string;
  hgnc: string;
  biotype: string;
  seqRegion: string;
  start: number;
  end: number;
  strand: string;
  description: string;
  transcripts: ITranscript[];
  isChildren: string;
};
// =======

// =====  TRANSCRIPT
export type ITranscript = IDynamic & {
  transcriptId: string;
  name: string;
  refseq: string[];
  biotype: string;
  seqRegion: string;
  start: number;
  end: number;
  strand: string;
  geneId: string;
  canonical: boolean;
  isChildren: boolean;
};
export type ITranscriptFilter = IDynamic & {
  searchText?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
};

// =======

// =====  HPO
export type IHPO = IDynamic & {
  hpoId: string;
  name: string;
  def: string;
  altID: string[];
  parents: string[];
  children: string[];
};
export type IHPOFilter = IDynamic & {
  searchText?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
};
// =======

// =========== ICD10
export type IIcd10 = IDynamic & {
  id: string;
  desc: string;
  parent: IIcd10Parent;
  children: IIcd10Parent[];
  type: string;
};

export interface IIcd10Parent {
  id: string;
  desc: string;
  type: string;
}
// =======
