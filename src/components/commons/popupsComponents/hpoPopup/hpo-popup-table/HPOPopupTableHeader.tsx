import React from 'react';
import { Button, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { IHPOPopupFilter } from '../interfaces';
import SortDirection from '../../../tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter: IHPOPopupFilter;
  hideColumn?: boolean;
  setFilter: (newFilter: IHPOPopupFilter) => void;
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
        <TableCell style={hideColumn ? { display: 'none' } : { textAlign: 'center', whiteSpace: 'normal' }}>
          <BootstrapButton color={selected ? 'primary' : 'default'} onClick={this.handleClick}>
            {label}
            {selected && SortDirection.ASC === filter.sortDirection && <ArrowDownwardIcon fontSize="small" />}
            {selected && SortDirection.DESC === filter.sortDirection && <ArrowUpwardIcon fontSize="small" />}
          </BootstrapButton>
        </TableCell>
      );
    } else {
      return <TableCell style={{ textAlign: 'center', whiteSpace: 'normal' }}>{label}</TableCell>;
    }
  }

  private readonly handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { sortId, filter, setFilter } = this.props;
    const newFilter = {
      ...filter,
      sortBy: sortId,
      sortDirection: sortId === filter.sortBy ? toggleSortDirection(filter.sortDirection) : filter.sortDirection || SortDirection.ASC
    } as IHPOPopupFilter;
    setFilter(newFilter);
  };
}

interface IProps {
  filter: IHPOPopupFilter;
  setFilter: (newFilter: IHPOPopupFilter) => void;
}

function HPOPopupTableHeader(props: IProps) {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.identifier')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.name')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.description')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.parents')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.children')} filter={filter} setFilter={setFilter} />
      </TableRow>
    </TableHead>
  );
}

export default HPOPopupTableHeader;
