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

function DiseasesTableHeader(props: IProps) {
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.identifier')} />
        <ColumnHeader label={t('commons.fields.description')} />
        <ColumnHeader label={t('commons.fields.diagnosisDate')} />
        <ColumnHeader label={t('commons.fields.comment')} />
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default DiseasesTableHeader;
