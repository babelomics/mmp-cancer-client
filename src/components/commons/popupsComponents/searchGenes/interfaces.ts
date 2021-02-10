import SortDirection from '../../tableFilter/interfaces/SortDirection';

export interface IGene {
  biotype: string;
  description: string;
  end: number;
  geneId: string;
  hgnc: string;
  isChildren: boolean;
  seqRegion: string;
  start: number;
  strand: string;
  transcripts: ITranscript[];
}

interface ITranscript {
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

export interface IPopupSearchGeneFilter {
  searchText?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
}
