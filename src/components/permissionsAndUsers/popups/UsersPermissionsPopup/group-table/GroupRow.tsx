import React from 'react';
import { Checkbox, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IGroup } from '../../../interfaces';

interface IProps {
  item: IGroup;
  selectedRows: any[];
  setSelectedRows: (selected: any[], item?: IGroup, checked?: boolean) => void;
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

function GroupRow(props: IProps) {
  const { item: group, selectedRows, setSelectedRows } = props;
  const classes = useStyles();

  const CeteredCell = (props: ICell) => {
    return <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`}>{props.children}</TableCell>;
  };

  const selectRow = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rows = [...selectedRows];
    if (event.target.checked) {
      rows.push(group);
    } else {
      const index = rows.findIndex((r) => r.guid === group.guid);
      rows.splice(index, 1);
    }
    setSelectedRows([...rows], group, event.target.checked);
  };

  const clickSelect = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <TableRow role="checkbox">
      <CeteredCell>
        <Checkbox color="primary" checked={selectedRows.find((r) => r.guid === group.guid)} onChange={(event) => selectRow(event)} onClick={(event) => clickSelect(event)} />
      </CeteredCell>
      <CeteredCell>{group.groupId}</CeteredCell>
      <CeteredCell>{group.name}</CeteredCell>
    </TableRow>
  );
}

export default GroupRow;
