import React, { useCallback } from 'react';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import { Panel } from '../interfaces';

interface IProps {
    item: Panel;    
    rowClick?: (data: Panel) => void;
}

const useStyles = makeStyles((theme) => ({
    cursor: {
        cursor: "pointer",
        whiteSpace: "normal",
        wordBreak: "break-word"
    },
})
)

function PopupPanelRow(props: IProps) {
    const { item: panel, rowClick } = props;
    const classes = useStyles();
    const handleClick = useCallback((event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if(rowClick) {
            rowClick(panel);
        }
    }, [rowClick, panel]);

    return (
        <TableRow onClick={handleClick}>
            <TableCell className={classes.cursor}>{panel.diagnosticPanelIdentifier}</TableCell>
            <TableCell className={classes.cursor}>{panel.name}</TableCell>
            <TableCell className={classes.cursor}>{panel.description}</TableCell>
        </TableRow>
    );
}

export default PopupPanelRow;