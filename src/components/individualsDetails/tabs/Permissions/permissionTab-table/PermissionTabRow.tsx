import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import routes from '../../../../router/routes';
import { RemoveCircle } from '@material-ui/icons';
import { IUserPermission } from '../../../../permissionsAndUsers/interfaces';
interface IProps {
  item: IUserPermission;
  rowClick: (data: IUserPermission) => void;
  onDelete?: (userPermissions: IUserPermission) => void;
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
  },
  greyRow: {
    backgroundColor: 'lightgray'
  }
}));

function PermissionTabRow(props: IProps) {
  const { item: permission } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      props.rowClick(permission);
    },
    [history, permission]
  );

  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(permission);
    }
  };

  return (
    <TableRow onClick={handleClick}>
      <CeteredCell>{permission.userId}</CeteredCell>
      <CeteredCell>{permission.userName}</CeteredCell>
      <TableCell className={classes.cursor} style={{ textAlign: 'center' }}>
        {permission.permissionsNameList?.map((p, i) => (
          <div key={`p-${i}`}>{p}</div>
        ))}
      </TableCell>
      <CeteredCell>
        <IconButton edge="end" onClick={handleDelete}>
          <RemoveCircle />
        </IconButton>
      </CeteredCell>
    </TableRow>
  );
}

export default PermissionTabRow;
