import React from 'react';
import { TextField } from '@material-ui/core';

interface IProps {
  label: string;
  value?: string;
  field: string;
  onChange: (newValue: string, field: string) => void;
  [props: string]: any;
}

function FilterTextField(props: IProps) {
  const { label, value, onChange, ...restProps } = props;
  const valueStr = undefined === value ? null : value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value as string;
    onChange(value, props.field);
  };
  return <TextField {...restProps} label={label} value={valueStr} onChange={handleChange} variant="outlined" margin="dense" fullWidth />;
}

export default FilterTextField;
