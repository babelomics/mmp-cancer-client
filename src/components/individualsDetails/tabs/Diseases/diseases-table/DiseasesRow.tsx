import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import routes from '../../../../router/routes';
import { IHumanDisease } from '../../../../individualsManagement/interfaces';
import { RemoveCircle } from '@material-ui/icons';

interface IProps {
  item: IHumanDisease;
  onDelete?: (phenotypeId: IHumanDisease) => void;
  rowClick: (disease: IHumanDisease) => void;
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

function DiseasesRow(props: IProps) {
  const { item: diseases } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      props.rowClick(diseases);
    },
    [history, diseases]
  );

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(diseases);
    }
  };

  const CenteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  return (
    <TableRow onClick={handleClick}>
      <CenteredCell>{diseases.diseaseId}</CenteredCell>
      <CenteredCell>{diseases.description}</CenteredCell>
      <CenteredCell>{diseases.dateOfDiagnosis}</CenteredCell>
      <CenteredCell>{diseases.comment}</CenteredCell>
      <CenteredCell>
        <IconButton edge="end" onClick={handleDelete}>
          <RemoveCircle />
        </IconButton>
      </CenteredCell>
    </TableRow>
  );
}

export default DiseasesRow;
