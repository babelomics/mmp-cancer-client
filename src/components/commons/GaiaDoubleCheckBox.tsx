import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface IProps {
  color?: 'primary' | 'secondary' | 'default' | undefined;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom' | undefined;
  name: string;
  checked?: boolean;
  text?: string;
  option1: string;
  option2: string;
  name1: string;
  name2: string;
  formik?: any;
  onChange?: (value: boolean | null) => void;
}

const refY = React.createRef<any>();
const refN = React.createRef<any>();

const GaiaDoubleCheckBox = ({ text, labelPlacement, color = 'primary', checked, name, formik, onChange, option1, option2, name1, name2 }: IProps) => {
  const [checkedStateYes, setCheckedStateYes] = useState<boolean | null>(checked=== true ? true : false);
  const [checkedStateNo, setCheckedStateNo] = useState<boolean | null>(checked=== false ? true : false);

  useEffect(() => {
    setCheckedStateYes(checked=== true ? true : false);
    setCheckedStateNo(checked=== false ? true : false);
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formik) {
      formik.handleChange(e);
    } else {
      let ch = null as null | boolean;
      if(e.target.name === 'yes') {
        setCheckedStateYes(e.target.checked);
        setCheckedStateNo(false);
        if (e.target.checked) {
          ch = true;
        }
      }
      else if(e.target.name === 'no') {
        setCheckedStateNo(e.target.checked);
        setCheckedStateYes(false);
        if (e.target.checked) {
          ch = false;
        }
      }
      if (onChange) {
        onChange(ch);
      }
    }
  };

  return (
    <>
      <FormControlLabel labelPlacement={labelPlacement} control={
      <Checkbox ref={refY} name={name1} color={color} checked={formik ? formik.values[name1] : checkedStateYes} onChange={handleChange} />
      } label={option1} />
      <FormControlLabel labelPlacement={labelPlacement} control={
      <Checkbox ref={refN} name={name2} color={color} checked={formik ? formik.values[name2] : checkedStateNo} onChange={handleChange} />
      } label={option2} />
    </>
  );
};
export default GaiaDoubleCheckBox;
