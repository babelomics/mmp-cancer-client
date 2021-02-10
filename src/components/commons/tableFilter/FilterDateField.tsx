import React from 'react';
import { TextField } from '@material-ui/core';


interface IProps {
    label: string;
    value?: Date;
    field: string;
    onChange: (newValue: Date | undefined, field: string) => void;
    [props: string]: any;
}


function FilterDateField(props: IProps) {
    const { label, value, onChange, ...restProps } = props;
    const dateStr = undefined === value ? "" : value.toISOString().substring(0, 10);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value as string;
        const date = !!value ? new Date(value) : undefined;
        onChange(date, props.field);
    };
    return (
        <TextField
            {...restProps}
            label={label}
            type="date"
            value={dateStr}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="dense"
        />
    );
}


export default FilterDateField;