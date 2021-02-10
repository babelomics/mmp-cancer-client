import React, { useCallback } from 'react';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import { ITableSpeciesData } from '../interfaces';

interface IProps {
  item: ITableSpeciesData;
  rowClick?: (data: ITableSpeciesData) => void;
  //From Redux
  //openSpeciesPopup: boolean;
}

const useStyles = makeStyles((theme) => ({
  cursor: {
    cursor: 'pointer'
  }
}));

function SpecieRow(props: IProps) {
  const { item: species, rowClick } = props;
  const classes = useStyles();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (rowClick) {
        rowClick(species);
      }
    },
    [rowClick, species]
  );

  return (
    <TableRow onClick={handleClick}>
      <TableCell className={classes.cursor}>{species.taxonomyId}</TableCell>
      <TableCell className={classes.cursor}>{species.scientificName} </TableCell>
      <TableCell className={classes.cursor}>{species.commonName}</TableCell>
    </TableRow>
  );
}

export default SpecieRow;
