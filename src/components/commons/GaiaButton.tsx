import React from 'react';
import { Button } from '@material-ui/core';

interface IProps {
  text: string;
  variant?: 'contained' | 'text' | 'outlined' | undefined;
  color?: 'primary' | 'inherit' | 'secondary' | 'default' | undefined;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit' | undefined;
  uppercase?: boolean;
  fullWidth?: boolean;
  onClick?: (e: any) => void;
  style?: any;
}

const GaiaButton = ({ text, variant = 'contained', color = 'primary', disabled, type = 'button', uppercase = true, fullWidth, onClick, style }: IProps) => {
  return (
    <Button variant={variant} color={color} type={type} disabled={disabled} fullWidth={fullWidth} onClick={onClick} style={style}>
      {uppercase ? text.toUpperCase() : text}
    </Button>
  );
};
export default GaiaButton;
