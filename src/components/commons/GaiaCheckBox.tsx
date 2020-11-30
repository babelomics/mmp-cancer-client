import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface IProps {
  color?: 'primary' | 'secondary' | 'default' | undefined;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom' | undefined;
  name: string;
  checked?: boolean;
  text?: string;
  formik?: any;
  onChange?: (value: boolean | null) => void;
  disabled?: boolean;
}

const GaiaCheckBox = ({ text, labelPlacement, color = 'primary', checked, name, formik, onChange, disabled=false }: IProps) => {
  const [checkedState, setCheckedState] = useState<boolean>(checked || false);

  useEffect(() => {
    setCheckedState(checked ?? false);
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formik) {
      formik.handleChange(e);
    } else {
      setCheckedState(e.target.checked);
      if (onChange) {
        onChange(e.target.checked ? true : null);
      }
    }
  };

  return (
    <FormControlLabel labelPlacement={labelPlacement} control={<Checkbox name={name} color={color} checked={formik && formik.values[name] ? formik.values[name] : checkedState} onChange={handleChange} disabled={disabled} />} label={text}/>
  );
};
export default GaiaCheckBox;
