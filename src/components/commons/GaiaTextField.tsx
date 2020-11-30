import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

interface IProps {
  name: string;
  label: String;
  variant?: any | undefined;
  formik?: any;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  className?: string;
  fullWidth?: boolean;
  debounce?: number;
  multiline?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  InputLabelProps?: any;
}

const GaiaTextField = ({ required, disabled, type, name, label, formik, rows, multiline, className, fullWidth = true, debounce = 50, onChange, InputLabelProps = {}, variant }: IProps) => {
  const [valueState, setValue] = useState(formik ? formik.values[name] : '');
  const [timer, setTimer] = useState<any>(debounce);

  useEffect(() => {
    setValue(formik.values[name]);
  }, [formik.values[name]]);

  const triggerChange = (e: React.ChangeEvent<any>) => {
    if (formik) {
      formik.handleChange(e);
    } else {
      if (onChange) {
        onChange(e);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    const value = e.target.value;
    clearTimeout(timer);
    setValue(value);
    setTimer(setTimeout(() => triggerChange(e), debounce));
  };

  let blueStyle = {};
  if (variant === 'filled') {
    blueStyle = { backgroundColor: '#dbecfb' };
  }

  return (
    <TextField
      disabled={disabled}
      className={className}
      required={required}
      variant={variant}
      inputProps={{ required: false }}
      type={type}
      name={name}
      multiline={multiline}
      label={label}
      value={valueState}
      onChange={handleChange}
      rows={rows}
      error={formik ? formik.submitCount > 0 && !!formik.errors[name] : undefined}
      helperText={formik ? formik.submitCount > 0 && formik.errors[name] : undefined}
      fullWidth={fullWidth}
      InputLabelProps={InputLabelProps}
      style={blueStyle}
    />
  );
};
export default GaiaTextField;
