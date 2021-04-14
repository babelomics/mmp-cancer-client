import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import routes from '../../router/routes';
import { IIndividual } from '../interfaces';
import { doDateFormat } from '../../../utils/utils';

interface IProps {
  item: IIndividual;
  projectId: string;
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

function IndividualsRow(props: IProps) {
  const { item: individual, projectId } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      history.push(`${routes.PATH_INDIVIDUALS_DETAILS}/${projectId}/${individual.individualId}`);
    },
    [history, individual]
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
      <CeteredCell>{individual.individualId}</CeteredCell>
      <CeteredCell>{individual.name}</CeteredCell>
      <CeteredCell>{doDateFormat(individual.dateOfBirth)}</CeteredCell>
      <CeteredCell>{individual.lifeStatus?.status}</CeteredCell>
      <CeteredCell>{individual.sex}</CeteredCell>
      <CeteredCell>{individual.comment}</CeteredCell>
    </TableRow>
  );
}

export default IndividualsRow;
