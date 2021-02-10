import React from 'react';
import { Button, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ITranscriptFilter } from '../../interfaces';
import SortDirection from '../../../../commons/tableFilter/interfaces/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function toggleSortDirection(direction?: SortDirection) {
  return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}

interface CHProps {
  label: string;
  sortId?: string;
  filter: ITranscriptFilter;
  hideColumn?: boolean;
  setFilter: (newFilter: ITranscriptFilter) => void;
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
    } as ITranscriptFilter;
    setFilter(newFilter);
  };
}

interface IProps {
  filter: ITranscriptFilter;
  setFilter: (newFilter: ITranscriptFilter) => void;
}

function TranscriptTableHeader(props: IProps) {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.identifier')} sortId="transcriptId" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.biotype')} sortId="biotype" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.geneIdentifier')} sortId="gengeneIdeIdentifier" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.hgncGene')} sortId="name" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.canonical')} sortId="canonical" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.refSeqNM')} sortId="refseq" filter={filter} setFilter={setFilter} />
        <ColumnHeader label={t('commons.fields.chromosomalRegion')} sortId="seqRegion" filter={filter} setFilter={setFilter} />
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default TranscriptTableHeader;
