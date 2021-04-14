import React, { useCallback } from 'react';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import { ITranscriptPopup } from '../interfaces';

interface IProps {
  item: ITranscriptPopup;
  rowClick?: (data: ITranscriptPopup) => void;
}
interface ICell {
  children: any;
  hide?: boolean;
}

const useStyles = makeStyles((theme) => ({
  cursor: {
    cursor: 'pointer'
  },
  hideCell: {
    display: 'none'
  }
}));

function TranscriptPopupRow(props: IProps) {
  const { item: transcript, rowClick } = props;
  const classes = useStyles();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (rowClick) {
        rowClick(transcript);
      }
    },
    [rowClick, transcript]
  );
  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  return (
    <TableRow onClick={handleClick}>
      <CeteredCell>{transcript.transcriptId}</CeteredCell>
      <CeteredCell>{transcript.biotype}</CeteredCell>
      <CeteredCell>{transcript.geneId}</CeteredCell>
      <CeteredCell>{transcript.name}</CeteredCell>
      <CeteredCell>{transcript.canonical.toString()}</CeteredCell>
      <CeteredCell>{transcript.refseq.join(',')}</CeteredCell>
      <CeteredCell>{transcript.seqRegion}</CeteredCell>
    </TableRow>
  );
}

export default TranscriptPopupRow;
