import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import routes from '../../router/routes';
import { Panel } from '../interfaces';
import { doDateFormat } from '../../../utils/utils';
import { useTranslation } from 'react-i18next';

interface IProps {
  item: Panel;
}

interface ICell {
  children: any;
  hide?: boolean;
}

const useStyles = makeStyles((theme) => ({
  cursor: {
    cursor: 'pointer'
  },
  deleted: {
    backgroundColor: 'lightgray'
  },
  hideCell: {
    display: 'none'
  },
  numberInput: {
    overflowX: 'scroll',
    width: '100%'
  }
}));

function PanelRow(props: IProps) {
  const { item: panel } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const history = useHistory();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      history.push(`${routes.PATH_TAB_PANEL_DIAGNOSTIC}/${panel.guid}`);
    },
    [history, panel]
  );
  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''} `} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  return (
    <TableRow onClick={handleClick} className={panel.deletionDate ? classes.deleted : undefined}>
      <CeteredCell hide>{panel.guid}</CeteredCell>
      <CeteredCell>{panel.diagnosticPanelIdentifier}</CeteredCell>
      <CeteredCell>{panel.name}</CeteredCell>
      <CeteredCell>
        <div style={{ whiteSpace: 'normal', textAlign: 'justify', width: '400px', maxWidth: '400px', textAlignLast: 'center' }}>{panel.description}</div>
      </CeteredCell>
      <CeteredCell>{panel.author}</CeteredCell>
      <CeteredCell>{panel.ascendingPanels ? t('commons.fields.yesNoField.yes') : t('commons.fields.yesNoField.no')}</CeteredCell>
      <CeteredCell>{panel.descendingPanels ? t('commons.fields.yesNoField.yes') : t('commons.fields.yesNoField.no')}</CeteredCell>
      <CeteredCell>{panel.genessNumber}</CeteredCell>
      <CeteredCell>{panel.transcNumber}</CeteredCell>
      <CeteredCell>{panel.regionsNumber}</CeteredCell>
      <CeteredCell>{panel.variantsNumber}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === panel.creationDate ? null : panel.creationDate)}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === panel.deletionDate ? null : panel.deletionDate)}</CeteredCell>
    </TableRow>
  );
}

export default PanelRow;
