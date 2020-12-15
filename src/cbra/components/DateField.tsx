import React from 'react';
import { TextField } from '@material-ui/core';


interface IProps {
    label: string;
    value?: Date;
    onChange: (newValue?: Date) => void;
    [props: string]: any;
}


function DateField(props: IProps) {
    const { label, value, onChange, ...restProps } = props;
    const dateStr = undefined === value ? "" : value.toISOString().substring(0, 10);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value as string;
        const date = !!value ? new Date(value) : undefined;
        onChange(date);
    };
    return (
        <TextField
            {...restProps}
            label={label}
            type="date"
            value={dateStr}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
        />
    );
}


export default DateField;