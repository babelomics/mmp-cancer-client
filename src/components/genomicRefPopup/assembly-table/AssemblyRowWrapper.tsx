import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

interface IProps {
  children: React.ReactChild;
}

function AssemblyRowWrapper(props: IProps) {
  const { children } = props;
  return (
    <TableRow>
      <TableCell colSpan={7}>{children}</TableCell>
    </TableRow>
  );
}

export default AssemblyRowWrapper;
