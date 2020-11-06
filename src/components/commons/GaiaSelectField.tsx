import React, { ReactNode, useState } from 'react';
import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@material-ui/core';

interface IProps {
  name: string;
  label: String;
  formik?: any;
  items: any[];
  valueAccessor?: string;
  labelAccessor?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  onChange?: (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
}

const GaiaSelectField = ({ required, disabled, items, valueAccessor, labelAccessor, name, label, formik, className, fullWidth = true, onChange }: IProps) => {
  const [valueState, setValue] = useState('0');

  const renderItems = (): ReactNode => {
    return items.map((e: any, i: number) => {
      let value = i;
      let label = e;
      if (valueAccessor) value = e[valueAccessor];
      if (labelAccessor) label = e[labelAccessor];

      return (
        <MenuItem key={`select-${i}`} value={value}>
          {label}
        </MenuItem>
      );
    });
  };

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode | undefined
  ) => {
    const value = e.target.value;

    if (formik) {
      formik.handleChange(e);
    } else {
      setValue(value as string);
      if (onChange) {
        onChange(e, child);
      }
    }
  };

  return (
    <FormControl required={required} className={className} style={{ width: fullWidth ? '100%' : 'auto' }}>
      <InputLabel>{label}</InputLabel>
      <Select disabled={disabled} name={name} label={label} value={formik ? formik.values[name] : valueState} onChange={handleChange}>
        {renderItems()}
      </Select>
      <FormHelperText>{formik ? formik.submitCount > 0 && formik.errors[name] : ''}</FormHelperText>
    </FormControl>
  );
};
export default GaiaSelectField;
