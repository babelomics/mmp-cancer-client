import React, { useCallback } from 'react';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IGroup } from '../../../interfaces';
import { RemoveCircle } from '@material-ui/icons';

interface IProps {
  item: IGroup;
  isDeleted: boolean;
  excludeGroups: string[];
  projectDeleted: boolean;
  rowClick?: (groups: IGroup) => void;
  onDelete?: (groups: IGroup) => void;
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
  }
}));

function UsersGroupsRow(props: IProps) {
  const { item: group, rowClick } = props;
  const classes = useStyles();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(group);
    }
  };

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (rowClick) {
        rowClick(group);
      }
    },
    [rowClick, group]
  );

  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  return (
    <TableRow onClick={(e) => (!props.projectDeleted ? handleClick(e) : undefined)}>
      <CeteredCell>{group.groupId}</CeteredCell>
      <CeteredCell>{group.name}</CeteredCell>
      <CeteredCell>{group.description}</CeteredCell>
      <TableCell className={classes.cursor} style={{ textAlign: 'center' }}>
        {group.permissionsNameList?.map((p, i) => (
          <div key={`p-${i}`}>{p}</div>
        ))}
      </TableCell>
      {!props.projectDeleted && (
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
