import React from 'react';
import { Button, TableCell, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { IProjectsFilter } from '../interfaces';
import SortDirection from '../../commons/tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter: IProjectsFilter;
  hideColumn?: boolean;
  setFilter: (newFilter: IProjectsFilter) => void;
}

const BootstrapButton = withStyles({
  label: {
    fontSize: '14px',
    textTransform: 'none',
    fontWeight: 'bold'
  }
})(Button);

class ColumnHeader extends React.PureComponent<CHProps> {
  render() {
    const { label, sortId, filter, hideColumn = false } = this.props;
    if (!!sortId) {
      const selected = !!sortId && sortId === filter.sortBy;
      return (
        <TableCell style={hideColumn ? { display: 'none' } : { textAlign: 'center' }}>
          <BootstrapButton color={'primary'} onClick={this.handleClick}>
            {label}
            {selected && SortDirection.ASC === filter.sortDirection && <ArrowUpwardIcon fontSize="small" />}
            {selected && SortDirection.DESC === filter.sortDirection && <ArrowDownwardIcon fontSize="small" />}
          </BootstrapButton>
        </TableCell>
      );
    } else {
      return (
        <TableCell style={{ textAlign: 'center' }}>
          <Typography variant="body2" color="primary">
            {label}
          </Typography>
        </TableCell>
      );
    }
  }

  private readonly handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { sortId, filter, setFilter } = this.props;
    const newFilter = {
      ...filter,
      sortBy: sortId,
      sortDirection: sortId === filter.sortBy ? toggleSortDirection(filter.sortDirection) : filter.sortDirection || SortDirection.ASC
    } as IProjectsFilter;
    setFilter(newFilter);
  };
}

interface IProps {
  filter: IProjectsFilter;
  setFilter: (newFilter: IProjectsFilter) => void;
}

function ProjectsTableHeader(props: IProps) {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.identifier')} sortId="projectId" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.name')} sortId="name" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.description')} sortId="description" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.organism')} sortId="organism" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.assembly')} sortId="assembly" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.ensemblRelease')} sortId="ensemblRelease" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.typeOfAccess.title')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.createDate')} sortId="creationDate" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.updateDate')} sortId="modificationDate" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.individuals')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.samples')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.analyses')} filter={filter} setFilter={setFilter} />
      </TableRow>
    </TableHead>
  );
}

export default ProjectsTableHeader;
