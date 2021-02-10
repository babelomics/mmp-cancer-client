import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

interface IProps {
  children: React.ReactChild;
}

function PanelSetRowWrapper(props: IProps) {
  const { children } = props;
  return (
    <TableRow>
      <TableCell colSpan={9}>{children}</TableCell>
    </TableRow>
  );
}

export default PanelSetRowWrapper;
