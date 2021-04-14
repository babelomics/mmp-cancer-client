import React from 'react';
import { Button, TableCell, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PanelFilter } from '../interfaces';
import SortDirection from '../../commons/tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter: PanelFilter;
  hideColumn?: boolean;
  setFilter: (newFilter: PanelFilter) => void;
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
            {selected && SortDirection.ASC === filter.sortDirection && <ArrowDownwardIcon fontSize="small" />}
            {selected && SortDirection.DESC === filter.sortDirection && <ArrowUpwardIcon fontSize="small" />}
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
    } as PanelFilter;
    setFilter(newFilter);
  };
}

interface IProps {
  filter: PanelFilter;
  setFilter: (newFilter: PanelFilter) => void;
}

function PanelTableHeader(props: IProps) {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader hideColumn={true} label={'guid'} sortId="diagnosticPanelSetIdentifier" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.identifier')} sortId="diagnosticPanelIdentifier" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.name')} sortId="name" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.description')} sortId="description" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.author')} sortId="author" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.ascendingPanels')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.descendingPanels')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.genessNumber')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.transcNumber')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.regionsNumber')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.variantsNumber')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.dateCreated')} sortId="creationDate" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.dateDelete')} sortId="deletionDate" filter={filter} setFilter={setFilter} />
      </TableRow>
    </TableHead>
  );
}

export default PanelTableHeader;
