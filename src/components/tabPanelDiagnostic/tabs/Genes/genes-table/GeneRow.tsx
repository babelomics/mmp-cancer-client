import React from 'react';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IGene } from '../../interfaces';
import { RemoveCircle } from '@material-ui/icons';

interface IProps {
  item: IGene;
  rowClick?: (gene: IGene) => void;
  onDelete?: (gene: IGene) => void;
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

function GeneRow(props: IProps) {
  const { item: gene } = props;
  const classes = useStyles();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(gene);
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
      <CeteredCell>{gene.geneId}</CeteredCell>
      <CeteredCell>{gene.hgnc}</CeteredCell>
      <CeteredCell>{gene.biotype}</CeteredCell>
      <CeteredCell>{gene.seqRegion}</CeteredCell>
      <CeteredCell>{gene.transcripts.map((x) => x.name).join(',')}</CeteredCell>
      <CeteredCell>{gene.description}</CeteredCell>
      {!gene.isChildren && (
        <CeteredCell>
          <IconButton edge="end" onClick={handleDelete}>
            <RemoveCircle />
          </IconButton>
        </CeteredCell>
      )}
    </TableRow>
  );
}

export default GeneRow;
