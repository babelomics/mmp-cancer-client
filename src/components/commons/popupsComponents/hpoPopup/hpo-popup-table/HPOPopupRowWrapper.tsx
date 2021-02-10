import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

interface IProps {
  children: React.ReactChild;
}

function HPOPopupRowWrapper(props: IProps) {
  const { children } = props;
  return (
    <TableRow>
      <TableCell colSpan={5}>{children}</TableCell>
    </TableRow>
  );
}

export default HPOPopupRowWrapper;
