import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import routes from '../../router/routes';
import { PanelSet } from '../interfaces';
import { doDateFormat } from '../../../utils/utils';

interface IProps {
  item: PanelSet;
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
  deleted: {
    backgroundColor: 'lightgray'
  }
}));

function PanelSetRow(props: IProps) {
  const { item: panelSet } = props;
  const classes = useStyles();

  const history = useHistory();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      history.push(`${routes.PATH_PANEL_SET_PROFILE}/${panelSet.diagnosticPanelSetIdentifier}`);
    },
    [history, panelSet]
  );
  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  return (
    <TableRow onClick={handleClick} className={panelSet.deletionDate ? classes.deleted : undefined}>
      <CeteredCell>{panelSet.diagnosticPanelSetIdentifier}</CeteredCell>
      <CeteredCell>{panelSet.name}</CeteredCell>
      <CeteredCell>{panelSet.description}</CeteredCell>
      <CeteredCell>{panelSet.author}</CeteredCell>
      <CeteredCell>{panelSet.reference.assembly}</CeteredCell>
      <CeteredCell>{panelSet.reference.ensemblRelease}</CeteredCell>
      <CeteredCell>{panelSet.panelsNumber}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === panelSet.creationDate ? null : panelSet.creationDate)}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === panelSet.deletionDate ? null : panelSet.deletionDate)}</CeteredCell>
    </TableRow>
  );
}

export default PanelSetRow;
