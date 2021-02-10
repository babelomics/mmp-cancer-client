import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import routes from '../../../components/router/routes';
import { User } from '../interfaces';
import { doDateFormat } from '../../../utils/utils';

interface IProps {
  item: User;
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

function UserRow(props: IProps) {
  const { item: user } = props;
  const classes = useStyles();

  const history = useHistory();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      history.push(`${routes.PATH_USER_PROFILE}/${user.identifier}`);
    },
    [history, user]
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
      <CeteredCell>{user.identifier}</CeteredCell>
      <CeteredCell hide>{user.firstName}</CeteredCell>
      <CeteredCell hide>{user.lastName}</CeteredCell>
      <CeteredCell>{`${user.firstName} ${user.lastName}`}</CeteredCell>
      <CeteredCell>{user.email}</CeteredCell>
      <CeteredCell>{user.organization}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === user.dateCreated ? null : user.dateCreated)}</CeteredCell>
      <CeteredCell>{user.userType}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === user.dateLastAccess ? null : user.dateLastAccess)}</CeteredCell>
    </TableRow>
  );
}

export default UserRow;
