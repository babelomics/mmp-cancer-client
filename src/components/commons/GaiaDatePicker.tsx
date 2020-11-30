import React, { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment, { Moment } from 'moment';

interface IProps {
  label: string;
  name: string;
  formik?: any;
  fullWidth?: boolean;
  disabled?: boolean;
  onChange?: (date: MaterialUiPickersDate, value?: string | null | undefined) => void;
  InputLabelProps?: any;
}

const GaiaDatePicker = ({ label, name, formik, fullWidth, disabled, onChange, InputLabelProps = {} }: IProps) => {
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

  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="DD/MM/YYYY"
      margin="normal"
      label={label}
      value={formik ? (formik.values[name] !== null ?(moment(formik.values[name], 'DD/MM/YYYY')) : null) : dateState}
      onChange={handleChange}
      fullWidth={fullWidth}
      disabled={disabled}
      style={{ margin: 0 }}      
      InputLabelProps={InputLabelProps}
    />
  );
};
export default GaiaDatePicker;
