import React from 'react';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IUserPermission } from '../../../interfaces';
import { RemoveCircle } from '@material-ui/icons';
import GaiaLink from '../../../../commons/GaiaLink';

interface IProps {
  item: IUserPermission;
  isDeleted: boolean;
  projectDeleted: boolean;
  rowClick?: (associated: IUserPermission) => void;
  onDelete?: (associated: IUserPermission) => void;
  navegateTo: (individualId: string, projectId: string, value: string) => void;
  projectId: string;
}
interface ICell {
  children: any;
  hide?: boolean;
}

const useStyles = makeStyles((theme) => ({
  cursor: {
    whiteSpace: 'normal',
    wordBreak: 'break-word'
  },
  hideCell: {
    display: 'none'
  }
}));

function SpecificsPermissionsRow(props: IProps) {
  const { item: associated } = props;
  const classes = useStyles();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(associated);
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
    <TableRow>
      <CenteredCell>{associated.userId}</CenteredCell>
      <CenteredCell>{associated.userName}</CenteredCell>
      <TableCell className={classes.cursor} style={{ textAlign: 'center' }}>
        {associated.permissionsNameList?.map((p) => {
          const split = p.split(' ');
          const entityId = split[2];
          const entityType = split[1];
          if (entityType !== 'individual') {
            return <div>{p}</div>;
          }
          return (
            <div>
              <GaiaLink
                text={p}
                onClick={() => {
                  props.navegateTo(entityId, props.projectId, '5');
                }}
              />
            </div>
          );
        })}
      </TableCell>

      {!props.projectDeleted && (
        <CenteredCell>
          <IconButton edge="end" onClick={handleDelete}>
            <RemoveCircle />
          </IconButton>
        </CenteredCell>
      )}
    </TableRow>
  );
}

export default SpecificsPermissionsRow;
