import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface IProps {
  label?: string;
}

class ColumnHeader extends React.PureComponent<IProps> {
  render() {
    const { label = false } = this.props;

    return <TableCell style={{ textAlign: 'center' }}>{label}</TableCell>;
  }
}

function PermissionTabTableHeader(props: IProps) {
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <ColumnHeader label={t('commons.fields.identifier')} />
        <ColumnHeader label={t('commons.fields.name')} />
        <ColumnHeader label={t('commons.fields.permission')} />
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default PermissionTabTableHeader;
