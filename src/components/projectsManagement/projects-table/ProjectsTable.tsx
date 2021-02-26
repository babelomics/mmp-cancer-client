import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IProjectsFilter, IProject } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import ProjectRow from './ProjectRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import ProjectTableHeader from './ProjectsTableHeader';
import ProjectRowWrapper from './ProjectRowWrapper';

interface IProps {
  filter: IProjectsFilter;
  setFilter: (newFilter: IProjectsFilter) => void;
}

function getProjectId(project: IProject) {
  return project.projectId;
}

function ProjectsTable(props: IProps) {
  const { filter } = props;

  const fetchProjectsPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getProjectsPage(filter, pageSize, page);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <ProjectTableHeader {...props} />
        <TableBody>
          <LazyList<IProject> token={filter} ChildElem={ProjectRow} fetchPage={fetchProjectsPage} ChildWrapper={ProjectRowWrapper} getElemId={getProjectId} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectsTable;
