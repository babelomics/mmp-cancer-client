import React, { useCallback } from 'react';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IIcd10 } from '../../interfaces';
import { RemoveCircle } from '@material-ui/icons';

interface IProps {
  item: IIcd10;
  isDeleted: boolean;
  onDelete?: (gene: IIcd10) => void;
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

function Icd10Row(props: IProps) {
  const { item: icd10 } = props;
  const classes = useStyles();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(icd10);
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
      <CeteredCell>{icd10.id}</CeteredCell>
      <CeteredCell>{icd10.desc}</CeteredCell>
      {!props.isDeleted && (
        <CeteredCell>
          <IconButton edge="end" onClick={handleDelete}>
            <RemoveCircle />
          </IconButton>
        </CeteredCell>
      )}
    </TableRow>
  );
}

export default Icd10Row;
