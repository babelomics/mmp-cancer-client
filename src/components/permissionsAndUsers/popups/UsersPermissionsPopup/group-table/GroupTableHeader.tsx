import React from 'react';
import { TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface CHProps {
  label: string;
}

class ColumnHeader extends React.PureComponent<CHProps> {
  render() {
    const { label } = this.props;

    return (
      <TableCell style={{ fontWeight: 'bold' }}>
        <Typography variant="body2" color="primary">
          {label}
        </Typography>
      </TableCell>
    );
  }
}

function GroupTableHeader() {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={''} />
        <ColumnHeader label={t('commons.fields.identifier')} />
        <ColumnHeader label={t('commons.fields.name')} />
      </TableRow>
    </TableHead>
  );
}

export default GroupTableHeader;
