import React, { useCallback } from 'react';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import { ITableAssemblyData } from '../interfaces';

interface IProps {
  item: ITableAssemblyData;
  rowClick?: (data: ITableAssemblyData) => void;
}

const useStyles = makeStyles((theme) => ({
  cursor: {
    cursor: 'pointer'
  }
}));

function AssemblyRow(props: IProps) {
  const { item: assembly, rowClick } = props;
  const classes = useStyles();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (rowClick) {
        rowClick(assembly);
      }
    },
    [rowClick, assembly]
  );

  return (
    <TableRow onClick={handleClick}>
      <TableCell className={classes.cursor}>{assembly.accession}</TableCell>
      <TableCell className={classes.cursor}>{assembly.accessionType}</TableCell>
      <TableCell className={classes.cursor}>{assembly.name}</TableCell>
      <TableCell className={classes.cursor}>{assembly.ucscAlias}</TableCell>
    </TableRow>
  );
}

export default AssemblyRow;
