import React, { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment, { Moment } from 'moment';
import { useTheme } from '@material-ui/core';

interface IProps {
  label: string;
  name: string;
  formik?: any;
  fullWidth?: boolean;
  disabled?: boolean;
  InputLabelProps?: any;
  disableFuture?: boolean;
  onChange?: (date: MaterialUiPickersDate, value?: string | null | undefined) => void;
}

const GaiaDatePicker = ({ label, name, formik, fullWidth, disabled, onChange, InputLabelProps = {}, disableFuture }: IProps) => {
  const theme = useTheme();
  const [dateState, setDate] = useState<Moment | Date | string | null | undefined>(new Date());

  const handleChange = (date: MaterialUiPickersDate, value?: string | null | undefined) => {
    if (formik) {
      formik.handleChange({
        target: {
          name: name,
          type: 'text',
          value: value
        }
      });
    } else {
      setDate(date);
      if (onChange) {
        onChange(date, value);
      }
    }
  };

  const backgroundStyle = (): any => {
    const hasErrors = formik && formik.submitCount > 0 && !!formik.errors[name];
    if (!hasErrors) {
      return { WebkitBoxShadow: `0 0 0 1000px ${theme.textfield.background} inset` };
    }
    return {};
  };

  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="DD/MM/YYYY"
      margin="normal"
      // label={label}
      value={formik ? (formik.values[name] !== null ? moment(formik.values[name], 'DD/MM/YYYY') : null) : dateState}
      onChange={handleChange}
      fullWidth={fullWidth}
      disabled={disabled}
      style={{ margin: 0 }}
      InputLabelProps={InputLabelProps}
      disableFuture={disableFuture}
      inputVariant="outlined"
      InputProps={{ style: { backgroundColor: 'transparent', ...backgroundStyle() } }}
      inputProps={{ style: { backgroundColor: 'transparent', ...backgroundStyle() } }}
    />
  );
};
export default GaiaDatePicker;
