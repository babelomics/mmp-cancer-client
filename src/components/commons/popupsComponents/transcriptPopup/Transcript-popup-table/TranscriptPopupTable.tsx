import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { ITranscriptPopupFilter, ITranscriptPopup } from '../interfaces';
import LazyList from '../../../tableFilter/LazyList';
import MmpClient from '../../../tableFilter/MmpClient';
import TranscriptPanelTableHeader from './TranscriptPopupTableHeader';
import TranscriptPanelRowWrapper from './TranscriptPopupRowWrapper';
import TranscriptPanelRow from './TranscriptPopupRow';

interface IProps {
  filter: ITranscriptPopupFilter;
  assembly: string;
  exclude: string[];
  ensmblRelease: string;
  setFilter: (newFilter: ITranscriptPopupFilter) => void;
  addTranscript: (transcript: any) => void;
}

function getTranscriptId(transcript: ITranscriptPopup) {
  return transcript.transcriptId;
}

function TranscriptPopupTable(props: IProps) {
  const { filter, assembly, addTranscript, exclude, ensmblRelease } = props;

  const fetchTranscriptList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getTranscriptModalList(filter, pageSize, page, assembly, ensmblRelease);
    },
    [filter]
  );

  const handleRowClick = (transcript: ITranscriptPopup) => {
    addTranscript(transcript);
  };

  return (
    <TableContainer>
      <Table>
        <TranscriptPanelTableHeader {...props} />
        <TableBody>
          <LazyList<ITranscriptPopup>
            rowClick={handleRowClick}
            token={filter}
            ChildElem={TranscriptPanelRow}
            fetchPage={fetchTranscriptList}
            ChildWrapper={TranscriptPanelRowWrapper}
            getElemId={getTranscriptId}
            scrollAncestor={'transcriptModal'}
            exclude={{ exclude: exclude, field: 'transcriptId' }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TranscriptPopupTable;
