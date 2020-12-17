import React, { useCallback } from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CancelIcon from '@material-ui/icons/Cancel';
import DelayedTextField from './DelayedTextField';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
    }),
);


interface IProps {
    value: string;
    onChange: (newValue: string) => void;
    [props: string]: any
}


function Searchbar(props: IProps) {

    const { value, onChange, ...rest } = props;

    const classes = useStyles();

    const handleReset = useCallback(() => { onChange(""); }, [onChange]);

    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <SearchIcon />
            </IconButton>
            <DelayedTextField className={classes.input} {...rest} value={value} onChange={onChange} />
            <IconButton className={classes.iconButton} onClick={handleReset}>
                <CancelIcon />
            </IconButton>
        </Paper>
    );
}


export default Searchbar;