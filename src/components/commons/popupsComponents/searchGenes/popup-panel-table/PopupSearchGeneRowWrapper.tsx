import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

interface IProps {
  children: React.ReactChild;
}

function PopupSearchGeneRowWrapper(props: IProps) {
  const { children } = props;
  return (
    <TableRow>
      <TableCell colSpan={6}>{children}</TableCell>
    </TableRow>
  );
}

export default PopupSearchGeneRowWrapper;
