import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface IProps {
    labelTrue: string;
    labelFalse: string;
    value?: boolean;
    field: string;
    onChange: (newValue: boolean | undefined, field: string) => void;
}


function FilterCheckTrueFalseField(props: IProps) {
    const { labelTrue, labelFalse, value, onChange } = props;
    const [checkedStateYes, setCheckedStateYes] = useState<boolean | undefined>(value=== true ? true : false);
    const [checkedStateNo, setCheckedStateNo] = useState<boolean | undefined>(value=== false ? true : false);
  
    useEffect(() => {
      setCheckedStateYes(value=== true ? true : false);
      setCheckedStateNo(value=== false ? true : false);
    }, [value]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
        let ch = undefined as undefined | boolean;
        if(e.target.name === 'true') {
          setCheckedStateYes(e.target.checked);
          setCheckedStateNo(false);
          if (e.target.checked) {
            ch = true;
          }
        }
        else if(e.target.name === 'false') {
          setCheckedStateNo(e.target.checked);
          setCheckedStateYes(false);
          if (e.target.checked) {
            ch = false;
          }
        }
        if (onChange) {
          onChange(ch, props.field);
        }
    };
    return (
        <>
            <FormControlLabel control={
                <Checkbox name="true" color = 'primary' checked={checkedStateYes} onChange={handleChange} />
            } label={labelTrue} />
            <FormControlLabel control={
                <Checkbox name="false" color = 'primary' checked={checkedStateNo} onChange={handleChange} />
            } label={labelFalse} />
        </>
    );
}


export default FilterCheckTrueFalseField;