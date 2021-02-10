import React from 'react';
import { Button, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SortDirection from '../../../tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { ICommonFilter } from '../../../../tabPanelDiagnostic/tabs/interfaces';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter: ICommonFilter;
  setFilter: (newFilter: ICommonFilter) => void;
}

const CustomButton = withStyles({
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
          <CustomButton color={selected ? 'primary' : 'default'} onClick={this.handleClick}>
            {label}
            {selected && SortDirection.ASC === filter.sortDirection && <ArrowDownwardIcon fontSize="small" />}
            {selected && SortDirection.DESC === filter.sortDirection && <ArrowUpwardIcon fontSize="small" />}
          </CustomButton>
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
    } as ICommonFilter;
    setFilter(newFilter);
  };
}

interface IProps {
  filter: ICommonFilter;
  setFilter: (newFilter: ICommonFilter) => void;
}

function PopupIcd10TableHeader(props: IProps) {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('tabPanelDiagnostic.tabs.icd-10.columns.identifier')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('tabPanelDiagnostic.tabs.icd-10.columns.description')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('tabPanelDiagnostic.tabs.icd-10.columns.parents')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('tabPanelDiagnostic.tabs.icd-10.columns.children')} filter={filter} setFilter={setFilter} />
      </TableRow>
    </TableHead>
  );
}

export default PopupIcd10TableHeader;
