import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

interface IProps {
  children: React.ReactChild;
}

function PopupPanelRowWrapper(props: IProps) {
  const { children } = props;
  return (
    <TableRow>
      <TableCell colSpan={3}>{children}</TableCell>
    </TableRow>
  );
}

export default PopupPanelRowWrapper;
