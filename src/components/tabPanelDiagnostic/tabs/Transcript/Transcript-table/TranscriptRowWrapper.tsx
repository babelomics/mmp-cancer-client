import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

interface IProps {
  children: React.ReactChild;
}

function TranscriptRowWrapper(props: IProps) {
  const { children } = props;
  return (
    <TableRow>
      <TableCell colSpan={8}>{children}</TableCell>
    </TableRow>
  );
}

export default TranscriptRowWrapper;
