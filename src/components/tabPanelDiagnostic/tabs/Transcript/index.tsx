import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITranscript, ITranscriptFilter } from '../interfaces';
import GaiaContainer from '../../../commons/GaiaContainer';
import TranscriptFilterButtons from './transcript-filter-buttons/TranscriptFilterButtons';
import TranscriptTable from './Transcript-table/TranscriptTable';

interface IProps {
  assembly: string;
  itemsList: any[];
  setTranscriptOpenPopup: () => void;
  deleteTranscript: (id: string) => void;
}

const defaultUserFilter = {} as ITranscriptFilter;

const TranscriptList = (props: IProps) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ITranscriptFilter>(defaultUserFilter);

  const handleDelete = (transcript: ITranscript) => {
    props.deleteTranscript(transcript.transcriptId);
  };

  return (
    <React.Fragment>
      <TranscriptFilterButtons filter={filter} setFilter={setFilter} setTranscriptOpenPopup={props.setTranscriptOpenPopup} />
      <TranscriptTable filter={filter} setFilter={setFilter} {...props} onDelete={handleDelete} itemsList={props.itemsList} />
    </React.Fragment>
  );
};

export default TranscriptList;
