import React, { useCallback } from 'react';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IUserPermission } from '../../../interfaces';
import { RemoveCircle } from '@material-ui/icons';

interface IProps {
  item: IUserPermission;
  isDeleted: boolean;
  projectDeleted: boolean;

  rowClick?: (associated: IUserPermission) => void;
  onDelete?: (associated: IUserPermission) => void;
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

function AssociatedGroupsRow(props: IProps) {
  const { item: associated, rowClick } = props;
  const classes = useStyles();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(associated);
    }
  };

  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (rowClick) {
        rowClick(associated);
      }
    },
    [rowClick, associated]
  );

  return (
    <TableRow onClick={handleClick}>
      <CeteredCell>{associated.userId}</CeteredCell>
      <CeteredCell>{associated.userName}</CeteredCell>
      <TableCell className={classes.cursor} style={{ textAlign: 'center' }}>
        {associated.permissionsNameList?.map((p, i) => (
          <div key={`p-${i}`}>{p}</div>
        ))}
      </TableCell>
      <CeteredCell>{associated.groupsIdList?.join(', ')}</CeteredCell>

      {!props.projectDeleted && (
        <CeteredCell>
          <IconButton edge="end" onClick={handleDelete}>
            <RemoveCircle />
          </IconButton>
        </CeteredCell>
      )}
    </TableRow>
  );
}

export default AssociatedGroupsRow;
