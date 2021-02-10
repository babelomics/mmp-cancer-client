import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IProjectsFilter, IProjects } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import ProjectsRow from './ProjectsRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import ProjectsTableHeader from './ProjectsTableHeader';
import ProjectsRowWrapper from './ProjectsRowWrapper';

interface IProps {
  filter: IProjectsFilter;
  setFilter: (newFilter: IProjectsFilter) => void;
}

function getUserId(projects: IProjects) {
  return projects.projectId;
}

function ProjectsTable(props: IProps) {
  const { filter } = props;

  const fetchProjectsPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getProjectsPage(filter, pageSize, page);
      // return MmpClient.getProjectsPage(filter, pageSize, page);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <ProjectsTableHeader {...props} />
        <TableBody>
          <LazyList<IProjects> token={filter} ChildElem={ProjectsRow} fetchPage={fetchProjectsPage} ChildWrapper={ProjectsRowWrapper} getElemId={getUserId} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectsTable;
