import React from 'react';
import { Button, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { UserFilter } from '../interfaces';
import SortDirection from '../../commons/tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter: UserFilter;
  hideColumn?: boolean;
  setFilter: (newFilter: UserFilter) => void;
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
    } as UserFilter;
    setFilter(newFilter);
  };
}

interface IProps {
  filter: UserFilter;
  setFilter: (newFilter: UserFilter) => void;
}

function UserTableHeader(props: IProps) {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.identifier')} sortId="identifier" filter={filter} setFilter={setFilter} />
        <ColumnHeader hideColumn={true} label={t('commons.fields.firstName')} sortId="firstName" filter={filter} setFilter={setFilter} />
        <ColumnHeader hideColumn={true} label={t('commons.fields.lastName')} sortId="lastName" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.name')} sortId="firstName" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.email')} sortId="email" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.organization')} sortId="organization" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.dateCreated')} sortId="dateCreated" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.userType')} sortId="userType" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.dateLastAccess')} sortId="dateLastAccess" filter={filter} setFilter={setFilter} />
      </TableRow>
    </TableHead>
  );
}

export default UserTableHeader;
