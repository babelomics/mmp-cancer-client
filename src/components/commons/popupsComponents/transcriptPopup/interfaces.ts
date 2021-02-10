import SortDirection from '../../tableFilter/interfaces/SortDirection';

// =====  TRANSCRIPT
export interface ITranscriptPopup {
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
}
export interface ITranscriptPopupFilter {
  searchText?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
}
