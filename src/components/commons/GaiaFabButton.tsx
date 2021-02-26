import React from 'react';
import { Badge, Fab, IconButton } from '@material-ui/core';

interface IProps {
  icon: React.ReactNode | (() => React.ReactNode);
  color?: 'primary' | 'inherit' | 'secondary' | 'default';
  size?: 'small' | 'medium' | 'large';
  component?: any;
  variant?: 'extended' | 'round';
  disabled?: boolean;
  onClick?: (e: any) => void;
}

const GaiaFabButton = ({ icon, color = 'primary', size = 'small', variant = 'round', component = 'span', disabled, onClick }: IProps) => {
  return (
    <Fab color={color} disabled={disabled} onClick={onClick} size={size} variant={variant} component={component}>
      <React.Fragment>{icon}</React.Fragment>
    </Fab>
  );
};
export default GaiaFabButton;
