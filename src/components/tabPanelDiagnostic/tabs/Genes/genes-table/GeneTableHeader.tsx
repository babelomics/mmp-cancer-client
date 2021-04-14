import React from 'react';
import { Button, TableCell, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ICommonFilter } from '../../interfaces';
import SortDirection from '../../../../commons/tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter: ICommonFilter;
  hideColumn?: boolean;
  setFilter: (newFilter: ICommonFilter) => void;
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
    } as ICommonFilter;
    setFilter(newFilter);
  };
}

interface IProps {
  filter: ICommonFilter;
  setFilter: (newFilter: ICommonFilter) => void;
}

function GeneTableHeader(props: IProps) {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.identifier')} sortId="geneId" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.hgncName')} sortId="hgnc" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.biotype')} sortId="biotype" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.regions')} sortId="seqRegion" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.canonicalTranscript')} filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.description')} sortId="userType" filter={filter} setFilter={setFilter} />
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default GeneTableHeader;
