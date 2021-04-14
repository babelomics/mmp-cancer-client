import React, { useState } from 'react';
import { ITranscript, ITranscriptFilter } from '../interfaces';
import TranscriptFilterButtons from './transcript-filter-buttons/TranscriptFilterButtons';
import TranscriptTable from './Transcript-table/TranscriptTable';

interface IProps {
  assembly: string;
  itemsList: any[];
  isDeleted?: boolean;
  setTranscriptOpenPopup: () => void;
  deleteTranscript: (id: string) => void;
}

const defaultUserFilter = {} as ITranscriptFilter;

const TranscriptList = (props: IProps) => {
  const [filter, setFilter] = useState<ITranscriptFilter>(defaultUserFilter);

  const handleDelete = (transcript: ITranscript) => {
    props.deleteTranscript(transcript.transcriptId);
  };

  return (
    <React.Fragment>
      <TranscriptFilterButtons filter={filter} setFilter={setFilter} setTranscriptOpenPopup={props.setTranscriptOpenPopup} hideAddBtn={props.isDeleted ?? false} />
      <TranscriptTable filter={filter} setFilter={setFilter} {...props} onDelete={handleDelete} itemsList={props.itemsList} isDeleted={props.isDeleted ?? false} />
    </React.Fragment>
  );
};

export default TranscriptList;
