import React from 'react';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IGroup } from '../../../interfaces';
import { RemoveCircle } from '@material-ui/icons';

interface IProps {
  item: IGroup;
  isDeleted: boolean;
  rowClick?: (groups: IGroup) => void;
  onDelete?: (groups: IGroup) => void;
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

function UsersGroupsRow(props: IProps) {
  const { item: groups } = props;
  const classes = useStyles();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(groups);
    }
  };
  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  return (
    <TableRow>
      <CeteredCell>{groups.groupId}</CeteredCell>
      <CeteredCell>{groups.name}</CeteredCell>
      <CeteredCell>{groups.description}</CeteredCell>
      <CeteredCell>{groups.permissionsNameList.join(', ')}</CeteredCell>

      {!groups.isChildren && !props.isDeleted && (
        <CeteredCell>
          <IconButton edge="end" onClick={handleDelete}>
            <RemoveCircle />
          </IconButton>
        </CeteredCell>
      )}
    </TableRow>
  );
}

export default UsersGroupsRow;
