import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import routes from '../../router/routes';
import { Registration } from '../interfaces';
import { doDateFormat } from '../../../utils/utils';

interface IProps {
  item: Registration;
}
interface ICell {
  children: any;
  hide?: boolean;
}

const useStyles = makeStyles((theme) => ({
  cursor: {
    cursor: 'pointer'
  },
  attended: {
    backgroundColor: 'lightgray'
  },
  hideCell: {
    display: 'none'
  }
}));

function RegistrationRow(props: IProps) {
  const { item: registration } = props;
  const classes = useStyles();

  const history = useHistory();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      history.push(`${routes.PATH_ADMIN_REVIEW_REQUEST}/${registration.identifier}`);
    },
    [history, registration]
  );
  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };
  return (
    <TableRow onClick={handleClick} className={registration.attended ? classes.attended : undefined}>
      <CeteredCell>{registration.identifier}</CeteredCell>
      <CeteredCell hide>{registration.firstName}</CeteredCell>
      <CeteredCell hide>{registration.lastName}</CeteredCell>
      <CeteredCell>{`${registration.firstName} ${registration.lastName}`}</CeteredCell>
      <CeteredCell>{registration.organization}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === registration.applicationDate ? null : registration.applicationDate)}</CeteredCell>
    </TableRow>
  );
}

export default RegistrationRow;
