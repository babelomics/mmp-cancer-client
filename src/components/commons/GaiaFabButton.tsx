import React from 'react';
import { Badge, Fab, IconButton, makeStyles, Tooltip } from '@material-ui/core';

interface IProps {
  icon: React.ReactNode | (() => React.ReactNode);
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium' | 'large';
  component?: any;
  variant?: 'extended' | 'round';
  disabled?: boolean;
  iconSize?: number;
  tooltip?: string;
  style?: React.CSSProperties;
  onClick?: (e: any) => void;
}

const useStyles = makeStyles((theme) => ({
  bPrimary: {
    backgroundColor: theme.buttons.primary.main,
    '&:hover': {
      backgroundColor: theme.buttons.primary.dark
    },
    color: theme.buttons.primary.text
  },

  bSecondary: {
    backgroundColor: theme.buttons.secondary.main,
    '&:hover': {
      backgroundColor: theme.buttons.secondary.dark
    },
    color: theme.buttons.secondary.text
  },

  bDefault: {
    backgroundColor: theme.buttons.default.main,
    boxShadow: 'none',
    border: '1px solid lightgray',
    '&:hover': {
      borderColor: 'black',
      backgroundColor: 'transparent'
    },
    color: theme.buttons.default.text
  }
}));

const GaiaFabButton = ({ icon, color = 'primary', size = 'small', variant = 'round', component = 'span', disabled, iconSize, tooltip = '', onClick, style }: IProps) => {
  const classes = useStyles();

  const getStyleClass = () => {
    if (color === 'secondary') {
      return classes.bSecondary;
    }

    if (color === 'default') {
      return classes.bDefault;
    }
    return classes.bPrimary;
  };

  return (
    <Tooltip title={tooltip}>
      <Fab classes={{ root: getStyleClass() }} disabled={disabled} onClick={onClick} size={size} variant={variant} component={component} style={style} disableRipple>
        <React.Fragment>{React.cloneElement(icon as React.ReactElement<any>, { style: { width: iconSize, height: iconSize } })}</React.Fragment>
      </Fab>
    </Tooltip>
  );
};
export default GaiaFabButton;
