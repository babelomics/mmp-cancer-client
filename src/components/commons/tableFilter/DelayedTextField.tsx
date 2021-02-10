import React, { useEffect, useState } from 'react';
import { InputBase } from '@material-ui/core';

const DEFAULT_DELAY_MS = 250;

interface IProps {
  delay?: number;
  value: string;
  onChange: (newText: string) => void;
  [prop: string]: any;
}

function DelayedTextField(props: IProps) {
  const { delay, value, onChange, ...rest } = props;
  const [text, setText] = useState(props.value || '');

  useEffect(() => {
    if (value !== text) {
      setText(value);
    }
  }, [value]);

  useEffect(() => {
    if (text != value) {
      const timerId = setTimeout(() => {
        onChange(text);
      }, delay || DEFAULT_DELAY_MS);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [text]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value as string;
    setText(newValue);
  };

  return (
    <InputBase
      {...props}
      value={text}
      onChange={handleTextChange}
      onKeyPress={(e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      }}
    />
  );
}

export default DelayedTextField;
