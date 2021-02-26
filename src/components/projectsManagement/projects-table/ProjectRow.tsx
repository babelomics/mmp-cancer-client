import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import routes from '../../router/routes';
import { IProject } from '../interfaces';
import { doDateFormat } from '../../../utils/utils';

interface IProps {
  item: IProject;
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
  },
  greyRow: {
    backgroundColor: 'lightgray'
  }
}));

function ProjectRow(props: IProps) {
  const { item: project } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      history.push(`${routes.PATH_PROJECT_PROFILE}/${project.projectId}`);
    },
    [history, project]
  );

  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  return (
    <TableRow onClick={handleClick} className={project.deletionDate ? classes.greyRow : undefined}>
      <CeteredCell>{project.projectId}</CeteredCell>
      <CeteredCell>{project.name}</CeteredCell>
      <CeteredCell>{project.description}</CeteredCell>
      <CeteredCell>{project.organism}</CeteredCell>
      <CeteredCell>{project.assembly}</CeteredCell>
      <CeteredCell>{project.ensemblRelease}</CeteredCell>
      <CeteredCell>{project.accessType}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === project.creationDate ? null : project.creationDate)}</CeteredCell>
      <CeteredCell>{doDateFormat(undefined === project.modificationDate ? null : project.modificationDate)}</CeteredCell>
      <CeteredCell>{project.individualsNumber}</CeteredCell>
      <CeteredCell>{project.samplesNumber}</CeteredCell>
      <CeteredCell>{project.analysesNumber}</CeteredCell>
    </TableRow>
  );
}

export default ProjectRow;
