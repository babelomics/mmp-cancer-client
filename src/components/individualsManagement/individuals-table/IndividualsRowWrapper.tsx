import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

interface IProps {
  children: React.ReactChild;
}

function IndividualsRowWrapper(props: IProps) {
  const { children } = props;
  return (
    <TableRow>
      <TableCell colSpan={12}>{children}</TableCell>
    </TableRow>
  );
}

export default IndividualsRowWrapper;
