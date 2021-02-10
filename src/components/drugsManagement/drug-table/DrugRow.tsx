import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox, makeStyles, TableCell, TableContainer, TableRow } from '@material-ui/core';
import routes from '../../router/routes';
import { Drug } from '../interfaces';
import { doDateFormat } from '../../../utils/utils';
import { useTranslation } from 'react-i18next';

interface IProps {
  item: Drug;
  selectedRows: any[];
  setSelectedRows: (selected: any[]) => void;
  selectAll: boolean;
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

function DrugRow(props: IProps) {
  const { item: drug, selectedRows, setSelectedRows, selectAll } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const history = useHistory();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      history.push(`${routes.PATH_DRUG_PROFILE}/${drug.id}`);
    },
    [history, drug]
  );
  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };
  const selectRow = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rows = [...selectedRows];
    if (event.target.checked) {
      rows.push(event.target.value);
    } else {
      const index = rows.indexOf(event.target.value);
      rows.splice(index, 1);
    }
    setSelectedRows([...rows]);
  };

  const clickSelect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <TableRow onClick={handleClick} className={drug.deletionDate ? classes.deleted : undefined} role="checkbox">
      <CeteredCell>
        <Checkbox
          color="default"
          value={drug.standardName}
          checked={selectedRows.includes(drug.standardName) || selectAll}
          onChange={(event) => selectRow(event)}
          onClick={(event) => clickSelect(event)}
          disabled={selectAll}
        />
      </CeteredCell>
      <CeteredCell>{drug.standardName}</CeteredCell>
      <CeteredCell>{drug.commonName}</CeteredCell>
      <CeteredCell>{drug.available ? t('commons.fields.yesNoField.yes') : t('commons.fields.yesNoField.no')}</CeteredCell>
      <CeteredCell>{drug.cost}</CeteredCell>
      <CeteredCell>{doDateFormat(drug.deletionDate === null ? drug.creationDate : drug.deletionDate)}</CeteredCell>
    </TableRow>
  );
}

export default DrugRow;
