import React from 'react';
import { Link, Typography } from '@material-ui/core';

interface IProps {
  className?: string;
  text: string;
  color?: 'inherit' | 'initial' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
  href?: string;
  target?: string;
  bold?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: any) => void;
}

const GaiaLink = ({ className, text, color = 'primary', href, target, onClick, bold, style }: IProps) => {
  const handleOnClick = (e: any) => {
    if (!href) {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <Typography className={className} variant="body1" color={color} style={{ cursor: 'pointer', ...style, ...(bold ? { fontWeight: 'bold' } : {}) }}>
      <Link color={color} href={href} target={target} onClick={handleOnClick}>
        {text}
      </Link>
    </Typography>
  );
};
export default GaiaLink;
