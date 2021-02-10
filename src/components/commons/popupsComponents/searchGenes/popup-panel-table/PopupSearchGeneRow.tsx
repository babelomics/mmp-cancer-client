import React, { useCallback } from 'react';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IGene } from '../interfaces';

interface IProps {
  item: IGene;
  rowClick?: (data: IGene) => void;
}
interface ICell {
  children: any;
  hide?: boolean;
}
const useStyles = makeStyles((theme) => ({
  cursor: {
    cursor: 'pointer',
    whiteSpace: 'normal',
    wordBreak: 'break-word'
  },
  hideCell: {
    display: 'none'
  }
}));

function PopupSearchGeneRow(props: IProps) {
  const { item: gene, rowClick } = props;
  const classes = useStyles();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (rowClick) {
        rowClick(gene);
      }
    },
    [rowClick, gene]
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
      <CeteredCell>{gene.geneId}</CeteredCell>
      <CeteredCell>{gene.hgnc}</CeteredCell>
      <CeteredCell>{gene.biotype}</CeteredCell>
      <CeteredCell>{gene.seqRegion}</CeteredCell>
      <CeteredCell>{gene.transcripts.map((x) => x.name).join(',')}</CeteredCell>
      <CeteredCell>{gene.description}</CeteredCell>
    </TableRow>
  );
}

export default PopupSearchGeneRow;
