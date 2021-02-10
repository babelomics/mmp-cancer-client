import React from 'react';
import { Button, Table, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PanelSetFilter } from '../interfaces';
import SortDirection from '../../commons/tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter: PanelSetFilter;
  setFilter: (newFilter: PanelSetFilter) => void;
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
    const { label, sortId, filter } = this.props;
    if (!!sortId) {
      const selected = !!sortId && sortId === filter.sortBy;
      return (
        <TableCell style={{ textAlign: 'center' }}>
          <BootstrapButton color={selected ? 'primary' : 'default'} onClick={this.handleClick}>
            {label}
            {selected && SortDirection.ASC === filter.sortDirection && <ArrowDownwardIcon fontSize="small" />}
            {selected && SortDirection.DESC === filter.sortDirection && <ArrowUpwardIcon fontSize="small" />}
          </BootstrapButton>
        </TableCell>
      );
    } else {
      return <TableCell style={{ textAlign: 'center' }}>{label}</TableCell>;
    }
  }

  private readonly handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { sortId, filter, setFilter } = this.props;
    const newFilter = {
      ...filter,
      sortBy: sortId,
      sortDirection: sortId === filter.sortBy ? toggleSortDirection(filter.sortDirection) : filter.sortDirection || SortDirection.ASC
    } as PanelSetFilter;
    setFilter(newFilter);
  };
}

interface IProps {
  filter: PanelSetFilter;
  setFilter: (newFilter: PanelSetFilter) => void;
}

function PanelSetTableHeader(props: IProps) {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.identifier')} sortId="diagnosticPanelSetIdentifier" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.name')} sortId="name" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.description')} sortId="description" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.author')} sortId="author" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.assembly')} sortId="assembly" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.ensemblRelease')} sortId="ensemblRelease" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.panelsNumber')} sortId="panelsNumber" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.dateCreated')} sortId="dateCreated" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.dateDelete')} sortId="dateDelete" filter={filter} setFilter={setFilter} />
      </TableRow>
    </TableHead>
  );
}

export default PanelSetTableHeader;
