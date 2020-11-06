import React from 'react';
import { Badge, Icon } from '@material-ui/core';

interface IProps {
  className?: string;
  icon: string | undefined;
  size?: number;
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | 'disabled' | 'action' | 'error' | undefined;
  badge?: boolean;
  badgeCount?: number;
  badgeCountMax?: number;
  badgeColor?: 'primary' | 'secondary' | 'default' | 'error' | undefined;
  badgeVerticalAlign?: 'top' | 'bottom';
  badgeHorizontalAlign?: 'right' | 'left';
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: any) => void;
}

const GaiaIcon = ({
  className,
  icon,
  size = 25,
  color = 'primary',
  badge = false,
  badgeCount = 0,
  badgeCountMax = 100,
  badgeColor = 'error',
  badgeHorizontalAlign = 'right',
  badgeVerticalAlign = 'top',
  disabled,
  style,
  onClick
}: IProps) => {
  if (!icon) return null;

  return (
    <Icon className={className} color={color} onClick={disabled ? undefined : onClick} style={{ fontSize: size, ...style }}>
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
    </Icon>
  );
};
export default GaiaIcon;
