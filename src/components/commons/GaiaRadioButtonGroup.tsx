import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@material-ui/core';

interface IProps {
  name: string;
  items: {
    label: string;
    value: string;
  }[];
  color?: 'primary' | 'secondary' | 'default' | undefined;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom' | undefined;
  value?: string;
  formik?: any;
  row?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GaiaRadioButtonGroup = ({ items, labelPlacement, color = 'primary', value, name, formik, row = true, onChange }: IProps) => {
  const [valueState, setValue] = useState<string | undefined>(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formik) {
      formik.handleChange(e);
      if (onChange) {
        onChange(e);
      }
    } else {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <FormControl error={formik ? formik.submitCount > 0 && !!formik.errors[name] : undefined}>
      <RadioGroup name={name} value={formik ? formik.values[name] : valueState} onChange={handleChange} row={row}>
        {items.map((i) => (
          <FormControlLabel labelPlacement={labelPlacement} value={i.value} control={<Radio color={color} />} label={i.label} />
        ))}
      </RadioGroup>
      <FormHelperText>{formik ? formik.submitCount > 0 && formik.errors[name] : undefined}</FormHelperText>
    </FormControl>
  );
};
export default GaiaRadioButtonGroup;
