import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { ITranscriptFilter, ITranscript } from '../../interfaces';
import LazyList from '../../../../commons/tableFilter/LazyList';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import TranscriptTableHeader from './TranscriptTableHeader';
import TranscriptRowWrapper from './TranscriptRowWrapper';
import TranscriptRow from './TranscriptRow';

interface IProps {
  filter: ITranscriptFilter;
  itemsList: any[];
  assembly: string;
  onDelete: (transcript: ITranscript) => void;
  setFilter: (newFilter: ITranscriptFilter) => void;
}

function getTranscriptId(transcript: ITranscript) {
  return transcript.transcriptId;
}

function TranscriptTable(props: IProps) {
  const { filter, onDelete, itemsList } = props;

  const fetchTranscriptList = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getTranscriptList(filter, itemsList);
    },
    [filter, itemsList]
  );

  return (
    <TableContainer>
      <Table>
        <TranscriptTableHeader {...props} />
        <TableBody>
          <LazyList<ITranscript>
            token={filter}
            ChildElem={TranscriptRow}
            fetchPage={fetchTranscriptList}
            ChildWrapper={TranscriptRowWrapper}
            getElemId={getTranscriptId}
            onDelete={onDelete}
            isReduxOnly
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TranscriptTable;
