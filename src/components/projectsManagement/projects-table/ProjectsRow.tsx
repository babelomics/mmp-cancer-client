import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import routes from '../../router/routes';
import { IProjects } from '../interfaces';
import { doDateFormat } from '../../../utils/utils';

interface IProps {
  item: IProjects;
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

function ProjectsRow(props: IProps) {
  const { item: projects } = props;
  const classes = useStyles();

  const history = useHistory();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      history.push(`${routes.PATH_USER_PROFILE}/${projects.projectId}`);
    },
    [history, projects]
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
      <CeteredCell>{projects.projectId}</CeteredCell>
      <CeteredCell>{projects.name}</CeteredCell>
      <CeteredCell>{projects.description}</CeteredCell>
      <CeteredCell>{''}</CeteredCell>
      <CeteredCell>{projects.assembly}</CeteredCell>
      <CeteredCell>{projects.ensemblRelease}</CeteredCell>
      <CeteredCell>{''}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === projects.creationDate ? null : projects.creationDate)}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === projects.modificationDate ? null : projects.modificationDate)}</CeteredCell>
      <CeteredCell>{projects.individuals}</CeteredCell>
      <CeteredCell>{projects.samples}</CeteredCell>
      <CeteredCell>{projects.analyses}</CeteredCell>
    </TableRow>
  );
}

export default ProjectsRow;
