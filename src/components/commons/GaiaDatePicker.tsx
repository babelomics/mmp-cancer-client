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
}

const GaiaDatePicker = ({ label, name, formik, fullWidth, disabled, onChange }: IProps) => {
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
      value={formik ? moment(formik.values[name] || new Date(), 'DD/MM/YYYY') : dateState}
      onChange={handleChange}
      fullWidth={fullWidth}
      disabled={disabled}
      style={{ margin: 0 }}
    />
  );
};
export default GaiaDatePicker;
