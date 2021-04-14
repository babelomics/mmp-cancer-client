import React from 'react';
import { TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface IProps {
  label?: string;
}

class ColumnHeader extends React.PureComponent<IProps> {
  render() {
    const { label = false } = this.props;

    return (
      <TableCell style={{ textAlign: 'center' }}>
        <Typography variant="body2" color="primary">
          {label}
        </Typography>
      </TableCell>
    );
  }
}

function HPOPhenotypeTableHeader(props: IProps) {
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.hpoPhenotype')} />
        <ColumnHeader label={t('commons.fields.observed')} />
        <ColumnHeader label={t('commons.fields.modifiers')} />
        <ColumnHeader label={t('commons.fields.comment')} />
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default HPOPhenotypeTableHeader;
