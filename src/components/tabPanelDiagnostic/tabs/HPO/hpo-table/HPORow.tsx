import React from 'react';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IHPO } from '../../interfaces';
import { RemoveCircle } from '@material-ui/icons';

interface IProps {
  item: IHPO;
  isDeleted: boolean;
  rowClick: (hpo: IHPO) => void;
  onDelete?: (hpo: IHPO) => void;
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

function HPORow(props: IProps) {
  const { item: hpo } = props;
  const classes = useStyles();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(hpo);
    }
  };
  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''} `} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };
  return (
    <TableRow>
      <CeteredCell>{hpo.hpoId}</CeteredCell>
      <CeteredCell>{hpo.name}</CeteredCell>
      <CeteredCell>
        <div style={{ whiteSpace: 'normal' }}>{hpo.def}</div>
      </CeteredCell>
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

export default HPORow;
