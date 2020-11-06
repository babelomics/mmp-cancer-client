import React from 'react';
import { Link, Typography } from '@material-ui/core';

interface IProps {
  text: string;
  color?: 'inherit' | 'initial' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
  href?: string;
  target?: string;
  onClick?: (e: any) => void;
}

const GaiaLink = ({ text, color = 'primary', href, target, onClick }: IProps) => {
  const handleOnClick = (e: any) => {
    if (!href) {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <Typography variant="body1" color={color} style={{ cursor: 'pointer' }}>
      <Link color={color} href={href} target={target} onClick={handleOnClick}>
        {text}
      </Link>
    </Typography>
  );
};
export default GaiaLink;
