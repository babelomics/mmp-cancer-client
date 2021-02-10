import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

interface IProps {
  children: React.ReactChild;
}

function PopupIcd10RowWrapper(props: IProps) {
  const { children } = props;
  return (
    <TableRow>
      <TableCell colSpan={4}>{children}</TableCell>
    </TableRow>
  );
}

export default PopupIcd10RowWrapper;
