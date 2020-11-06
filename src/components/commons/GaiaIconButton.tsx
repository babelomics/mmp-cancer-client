import React from 'react';
import { Badge, IconButton } from '@material-ui/core';

interface IProps {
  icon: React.ReactNode | (() => React.ReactNode);
  color?: 'primary' | 'inherit' | 'secondary' | 'default' | undefined;
  size?: 'small' | 'medium' | undefined;
  badge?: boolean;
  badgeCount?: number;
  badgeCountMax?: number;
  badgeColor?: 'primary' | 'secondary' | 'default' | 'error' | undefined;
  badgeVerticalAlign?: 'top' | 'bottom';
  badgeHorizontalAlign?: 'right' | 'left';
  disabled?: boolean;
  onClick?: (e: any) => void;
}

const GaiaIconButton = ({
  icon,
  color = 'inherit',
  size,
  badge = false,
  badgeCount = 0,
  badgeCountMax = 100,
  badgeColor = 'error',
  badgeHorizontalAlign = 'right',
  badgeVerticalAlign = 'top',
  disabled,
  onClick
}: IProps) => {
  return (
    <IconButton color={color} disabled={disabled} onClick={onClick} size={size}>
      {badge ? (
        <Badge
          anchorOrigin={{
            vertical: badgeVerticalAlign,
            horizontal: badgeHorizontalAlign
          }}
          badgeContent={badgeCount}
          color={badgeColor}
          max={badgeCountMax}
        >
          {icon}
        </Badge>
      ) : (
        <React.Fragment>{icon}</React.Fragment>
      )}
    </IconButton>
  );
};
export default GaiaIconButton;
