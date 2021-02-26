import React from 'react';
import { Button, Checkbox, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DrugFilter } from '../interfaces';
import SortDirection from '../../commons/tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter?: DrugFilter;
  setFilter?: (newFilter: DrugFilter) => void;
  selectAll?: boolean;
  setSelectAll?: (all: boolean) => void;
  checkAll?: boolean;
  loading: boolean;
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
    const { label, sortId, filter, selectAll, setSelectAll, checkAll } = this.props;

    const selectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setSelectAll) {
        setSelectAll(event.target.checked);
      }
    };

    if (!!sortId && !!filter) {
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
    } else if (checkAll) {
      return (
        <TableCell>
          <Checkbox color="default" checked={selectAll} onChange={(event) => selectAllRows(event)} />
        </TableCell>
      );
    } else {
      return <TableCell>{label}</TableCell>;
    }
  }

  private readonly handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { sortId, filter, setFilter } = this.props;
    if (!!filter && !!setFilter) {
      const newFilter = {
        ...filter,
        sortBy: sortId,
        sortDirection: sortId === filter.sortBy ? toggleSortDirection(filter.sortDirection) : filter.sortDirection || SortDirection.ASC
      } as DrugFilter;
      setFilter(newFilter);
    }
  };
}

interface IProps {
  filter: DrugFilter;
  setFilter: (newFilter: DrugFilter) => void;
  selectAll?: boolean;
  setSelectAll: (all: boolean) => void;
  loading: boolean;
}

function DrugTableHeader(props: IProps) {
  const { filter, setFilter, selectAll, setSelectAll, loading } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.standardName')} checkAll selectAll={selectAll} setSelectAll={setSelectAll} loading={loading} />

        <ColumnHeader label={t('commons.fields.standardName')} sortId="standardName" filter={filter} setFilter={setFilter} loading={loading} />

        <ColumnHeader label={t('commons.fields.commonName')} sortId="commonName" filter={filter} setFilter={setFilter} loading={loading} />

        <ColumnHeader label={t('commons.fields.available')} sortId="available" filter={filter} setFilter={setFilter} loading={loading} />

        <ColumnHeader label={t('commons.fields.cost')} sortId="cost" filter={filter} setFilter={setFilter} loading={loading} />

        <ColumnHeader label={t('commons.fields.lastModificationDate')} filter={filter} setFilter={setFilter} loading={loading} />
      </TableRow>
    </TableHead>
  );
}

export default DrugTableHeader;
