import React, { useCallback } from 'react';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import { User } from '../interfaces';

interface IProps {
  item: User;
  rowClick?: (data: User) => void;
}

const useStyles = makeStyles((theme) => ({
  cursor: {
    cursor: 'pointer',
    whiteSpace: 'normal',
    wordBreak: 'break-word'
  }
}));

function PopupUserRow(props: IProps) {
  const { item: user, rowClick } = props;
  const classes = useStyles();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (rowClick) {
        rowClick(user);
      }
    },
    [rowClick, user]
  );

  return (
    <TableRow onClick={handleClick}>
      <TableCell className={classes.cursor}>{user.identifier}</TableCell>
      <TableCell className={classes.cursor}>{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : ''}</TableCell>
      <TableCell className={classes.cursor}>{user.email}</TableCell>
      <TableCell className={classes.cursor}>{user.organization}</TableCell>
    </TableRow>
  );
}

export default PopupUserRow;
