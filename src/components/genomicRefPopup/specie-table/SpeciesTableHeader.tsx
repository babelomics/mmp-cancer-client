import React from 'react';
import { Button, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ITableSpeciesDataFilter } from '../interfaces';
import SortDirection from '../../commons/tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter: ITableSpeciesDataFilter;
  setFilter: (newFilter: ITableSpeciesDataFilter) => void;
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
        <TableCell>
          <BootstrapButton color={'primary'} onClick={this.handleClick}>
            {label}
            {selected && SortDirection.ASC === filter.sortDirection && <ArrowDownwardIcon fontSize="small" />}
            {selected && SortDirection.DESC === filter.sortDirection && <ArrowUpwardIcon fontSize="small" />}
          </BootstrapButton>
        </TableCell>
      );
    } else {
      return <TableCell>{label}</TableCell>;
    }
  }

  private readonly handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { sortId, filter, setFilter } = this.props;
    const newFilter = {
      ...filter,
      sortBy: sortId,
      sortDirection: sortId === filter.sortBy ? toggleSortDirection(filter.sortDirection) : filter.sortDirection || SortDirection.ASC
    } as ITableSpeciesDataFilter;
    setFilter(newFilter);
  };
}

interface IProps {
  filter: ITableSpeciesDataFilter;
  setFilter: (newFilter: ITableSpeciesDataFilter) => void;
}

function SpeciesTableHeader(props: IProps) {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.ncbid')} sortId="taxonomyId" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.scientificName')} sortId="scientificName" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.commonName')} sortId="commonName" filter={filter} setFilter={setFilter} />
      </TableRow>
    </TableHead>
  );
}

export default SpeciesTableHeader;
