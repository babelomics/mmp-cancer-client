import React, { useEffect, useState } from 'react';
import { makeStyles, TextField, useTheme } from '@material-ui/core';

interface IProps {
  name: string;
  label?: string;
  variant?: any | undefined;
  formik?: any;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  className?: string;
  fullWidth?: boolean;
  //debounce?: number;
  multiline?: boolean;
  rows?: number;
  InputLabelProps?: any;
  style?: any;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme) => ({
  disabledError: {
    borderColor: 'red !important'
  }
}));

const GaiaTextField = ({
  required,
  disabled,
  type,
  name,
  label,
  formik,
  rows,
  multiline,
  className,
  fullWidth = true,
  onChange,
  InputLabelProps = {},
  variant = 'outlined',
  style = {},
  value
}: IProps) => {
  const [valueState, setValue] = useState(formik ? formik.values[name] : value ?? '');
  const theme = useTheme();
  const classes = useStyles();
  //const [timer, setTimer] = useState<any>(debounce);

  useEffect(() => {
    if (formik) {
      setValue(formik.values[name]);
    }
  }, [formik?.values[name]]);

  useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, [value]);

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
    //  clearTimeout(timer);
    setValue(value);
    //setTimer(setTimeout(() => triggerChange(e), debounce));
    triggerChange(e);
  };

  const backgroundStyle = (): any => {
    const hasErrors = formik && formik.submitCount > 0 && !!formik.errors[name];
    if (!hasErrors) {
      return { WebkitBoxShadow: `0 0 0 1000px ${theme.textfield.background} inset` };
    }
    return {};
  };

  const getStylesError = () => {
    if (disabled && formik && formik.submitCount > 0 && !!formik.errors[name]) {
      console.log('ENTRA');
      return classes.disabledError;
    }
    return undefined;
  };

  return (
    <TextField
      disabled={disabled}
      className={className}
      required={required}
      variant={variant}
      inputProps={{ required: false, style: { backgroundColor: 'transparent', ...backgroundStyle() } }}
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
      style={style}
      InputProps={{ classes: { notchedOutline: getStylesError() } }}
    />
  );
};
export default GaiaTextField;
