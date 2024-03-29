import React from 'react';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { ITranscript } from '../../interfaces';
import { RemoveCircle } from '@material-ui/icons';

interface IProps {
  item: ITranscript;
  isDeleted: boolean;
  rowClick: (transcript: ITranscript) => void;
  onDelete?: (transcript: ITranscript) => void;
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

function TranscriptRow(props: IProps) {
  const { item: transcript } = props;
  const classes = useStyles();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(transcript);
    }
  };
  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  return (
    <TableRow>
      <CeteredCell>{transcript.transcriptId}</CeteredCell>
      <CeteredCell>{transcript.biotype}</CeteredCell>
      <CeteredCell>{transcript.geneId}</CeteredCell>
      <CeteredCell>{transcript.name}</CeteredCell>
      <CeteredCell>{transcript.canonical.toString()}</CeteredCell>
      <CeteredCell>{transcript.refseq.join(',')}</CeteredCell>
      <CeteredCell>{transcript.seqRegion}</CeteredCell>
      {!transcript.isChildren && !props.isDeleted && (
        <CeteredCell>
          <IconButton edge="end" onClick={handleDelete}>
            <RemoveCircle />
          </IconButton>
        </CeteredCell>
      )}
    </TableRow>
  );
}

export default TranscriptRow;
